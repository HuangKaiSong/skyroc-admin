import { Store } from '@skyroc/hooks';
import type { ToastOptions } from './types';

/** 带唯一标识的 Toast 条目 */
export interface ToastEntry extends ToastOptions {
  /** 唯一标识 */
  id: string;
}

/** Toast 状态管理器，继承 Store 基类获得订阅能力 */
class ToastManager extends Store<ToastEntry[]> {
  private idCounter = 0;

  constructor() {
    super([]);
  }

  /** 添加一个 Toast，返回其 id */
  add(options: ToastOptions): string {
    const id = this.nextId();
    this.setState(prev => [...prev, { ...options, id }]);
    return id;
  }

  /** 关闭所有 Toast */
  closeAll() {
    this.setState([]);
  }

  /** 移除指定 Toast */
  remove(id: string) {
    this.setState(prev => prev.filter(e => e.id !== id));
  }

  /** 清除所有已有 Toast 并创建一个新的，返回其 id */
  solo(options: ToastOptions): string {
    const id = this.nextId();
    this.setState([{ ...options, id }]);
    return id;
  }

  /** 原地更新指定 Toast 的内容（保持同一实例） */
  update(id: string, options: ToastOptions) {
    this.setState(prev => prev.map(e => (e.id === id ? { ...e, ...options } : e)));
  }

  private nextId(): string {
    this.idCounter += 1;
    return `toast-${this.idCounter}`;
  }
}

export const toastManager = new ToastManager();
