/* eslint-disable no-console, class-methods-use-this */
import type { TaskDef, TaskHubOptions, TaskSnapshot, TaskState } from '../types';

const DEFAULT_TICK_INTERVAL = 1000;
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BASE_RETRY_DELAY = 1000;

/**
 * 协作式任务调度中枢
 *
 * 核心思路：一个心跳 + 一个任务注册表 + 依赖关系声明
 * - init 任务：依赖满足后执行一次
 * - periodic 任务：依赖满足后按 interval 周期执行
 * - listener 任务：依赖满足后注册一次，stop 时自动 cleanup
 *
 * 零框架依赖，Web / React Native / Node 均可使用
 */
class TaskHub {
  private tasks = new Map<string, TaskState>();
  private tickTimer: ReturnType<typeof setInterval> | null = null;
  private started = false;
  private readyFired = false;

  private readonly tickInterval: number;
  private readonly maxRetries: number;
  private readonly baseRetryDelay: number;
  private readonly onTaskError?: (taskName: string, error: unknown) => void;
  private readonly onReady?: () => void;

  constructor(options: TaskHubOptions = {}) {
    this.tickInterval = options.tickInterval ?? DEFAULT_TICK_INTERVAL;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.baseRetryDelay = options.baseRetryDelay ?? DEFAULT_BASE_RETRY_DELAY;
    this.onTaskError = options.onTaskError;
    this.onReady = options.onReady;
  }

  /** 注册任务，支持链式调用 */
  register(def: TaskDef): this {
    if (this.tasks.has(def.name)) {
      console.warn(`[TaskHub] Task "${def.name}" already registered, skipping.`);
      return this;
    }

    this.validateDef(def);

    this.tasks.set(def.name, {
      def: { priority: 10, deps: [], ...def },
      status: 'pending',
      lastRun: 0,
      retryCount: 0
    });

    return this;
  }

  /** 批量注册 */
  registerAll(defs: TaskDef[]): this {
    for (const def of defs) {
      this.register(def);
    }
    return this;
  }

  /** 运行时动态追加任务 */
  add(def: TaskDef): this {
    return this.register(def);
  }

  /** 运行时移除任务（会调用 cleanup） */
  remove(name: string): boolean {
    const task = this.tasks.get(name);
    if (!task) return false;

    task.def.cleanup?.();
    this.tasks.delete(name);
    return true;
  }

  /** 启动调度 */
  start(): void {
    if (this.started) return;
    this.started = true;

    // 立即执行首次心跳
    this.tick();

    this.tickTimer = setInterval(() => this.tick(), this.tickInterval);
  }

  /** 停止调度并清理所有任务 */
  stop(): void {
    if (!this.started) return;

    if (this.tickTimer) {
      clearInterval(this.tickTimer);
      this.tickTimer = null;
    }

    // 逆优先级顺序清理（后注册/低优先级的先清理）
    const sorted = [...this.tasks.values()].sort((a, b) => (b.def.priority ?? 10) - (a.def.priority ?? 10));

    for (const task of sorted) {
      task.def.cleanup?.();
    }

    this.tasks.clear();
    this.started = false;
    this.readyFired = false;
  }

  /** 暂停调度（不清理任务，可 resume 恢复） */
  pause(): void {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
      this.tickTimer = null;
    }
  }

  /** 恢复调度 */
  resume(): void {
    if (!this.started || this.tickTimer) return;
    this.tickTimer = setInterval(() => this.tick(), this.tickInterval);
  }

  /** 是否正在运行 */
  get running(): boolean {
    return this.started && this.tickTimer !== null;
  }

  /** 获取全部任务快照（调试用） */
  snapshot(): TaskSnapshot[] {
    return [...this.tasks.values()]
      .sort((a, b) => (a.def.priority ?? 10) - (b.def.priority ?? 10))
      .map(task => ({
        name: task.def.name,
        type: task.def.type,
        status: task.status,
        lastRun: task.lastRun,
        deps: task.def.deps ?? [],
        retryCount: task.retryCount,
        error: task.error ? String(task.error) : undefined
      }));
  }

  /** 获取单个任务状态 */
  getTask(name: string): TaskSnapshot | undefined {
    const task = this.tasks.get(name);
    if (!task) return undefined;

    return {
      name: task.def.name,
      type: task.def.type,
      status: task.status,
      lastRun: task.lastRun,
      deps: task.def.deps ?? [],
      retryCount: task.retryCount,
      error: task.error ? String(task.error) : undefined
    };
  }

  /** 单次心跳：遍历任务表，调度满足条件的任务 */
  private tick(): void {
    const now = Date.now();

    const sorted = [...this.tasks.values()].sort((a, b) => (a.def.priority ?? 10) - (b.def.priority ?? 10));

    for (const task of sorted) {
      switch (task.def.type) {
        case 'init':
          this.tickInit(task);
          break;
        case 'periodic':
          this.tickPeriodic(task, now);
          break;
        case 'listener':
          this.tickListener(task);
          break;
        default:
          break;
      }
    }

    this.checkReady();
  }

  /** init 任务调度：依赖满足 + 待执行 → 执行一次 */
  private tickInit(task: TaskState): void {
    if (task.status === 'done' || task.status === 'running') return;

    // failed 但还有重试机会
    if (task.status === 'failed') {
      if (!this.canRetry(task)) return;
      if (!this.retryDelayElapsed(task)) return;
    }

    if (!this.depsResolved(task)) return;

    this.execute(task);
  }

  /** periodic 任务调度：依赖满足 + 间隔到了 → 再次执行 */
  private tickPeriodic(task: TaskState, now: number): void {
    if (task.status === 'running') return;
    if (!this.depsResolved(task)) return;

    const interval = task.def.interval ?? 5000;

    if (now - task.lastRun >= interval) {
      this.execute(task);
    }
  }

  /** listener 任务调度：依赖满足 + 待执行 → 注册一次 */
  private tickListener(task: TaskState): void {
    if (task.status === 'done' || task.status === 'running') return;

    if (task.status === 'failed') {
      if (!this.canRetry(task)) return;
      if (!this.retryDelayElapsed(task)) return;
    }

    if (!this.depsResolved(task)) return;

    this.execute(task);
  }

  /** 检查依赖是否全部完成 */
  private depsResolved(task: TaskState): boolean {
    const deps = task.def.deps ?? [];
    return deps.every(depName => {
      const dep = this.tasks.get(depName);
      return dep?.status === 'done';
    });
  }

  /** 是否还有重试机会 */
  private canRetry(task: TaskState): boolean {
    return this.maxRetries > 0 && task.retryCount < this.maxRetries;
  }

  /** 重试延迟是否已到（指数退避） */
  private retryDelayElapsed(task: TaskState): boolean {
    const delay = this.baseRetryDelay * 2 ** task.retryCount;
    return Date.now() - task.lastRun >= delay;
  }

  /** 执行单个任务 */
  private async execute(task: TaskState): Promise<void> {
    task.status = 'running';
    task.error = undefined;

    try {
      await task.def.run();
      task.lastRun = Date.now();
      task.status = 'done';
      // 成功后重置重试计数
      task.retryCount = 0;
    } catch (err) {
      task.lastRun = Date.now();
      task.retryCount += 1;
      task.status = 'failed';
      task.error = err;
      this.onTaskError?.(task.def.name, err);
    }
  }

  /** 全部 init 任务完成时触发 onReady */
  private checkReady(): void {
    if (this.readyFired || !this.onReady) return;

    const initTasks = [...this.tasks.values()].filter(t => t.def.type === 'init');
    if (initTasks.length === 0) return;

    const allDone = initTasks.every(t => t.status === 'done');
    if (allDone) {
      this.readyFired = true;
      this.onReady();
    }
  }

  /** 校验任务定义 */

  private validateDef(def: TaskDef): void {
    if (!def.name) {
      throw new Error('[TaskHub] Task name is required.');
    }
    if (!def.run) {
      throw new Error(`[TaskHub] Task "${def.name}" must have a run function.`);
    }
    if (def.type === 'periodic' && def.interval !== undefined && def.interval <= 0) {
      throw new Error(`[TaskHub] Task "${def.name}" interval must be positive.`);
    }

    // 校验 deps 引用的任务是否存在（仅对已注册的检查，允许后续注册补全）
    for (const dep of def.deps ?? []) {
      if (dep === def.name) {
        throw new Error(`[TaskHub] Task "${def.name}" cannot depend on itself.`);
      }
    }
  }
}

export { TaskHub };
