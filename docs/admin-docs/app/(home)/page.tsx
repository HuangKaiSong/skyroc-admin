import type { LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  Code2,
  DatabaseZap,
  GitBranch,
  Layers3,
  LockKeyhole,
  Palette,
  Route,
  Sparkles,
  Terminal,
  WandSparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Skyroc Admin React 文档',
  description: 'Skyroc Admin React 新版开发文档'
};

interface HomePageProps {
  /** 首页当前不消费路由参数，保留 props 入口便于后续扩展。 */
  params?: never;
}

interface StackItem {
  /** 技术栈展示名称。 */
  label: string;
}

interface FeatureItem {
  /** 功能标题。 */
  title: string;
  /** 功能说明。 */
  description: string;
  /** 功能图标。 */
  icon: LucideIcon;
}

interface GuideItem {
  /** 文档入口路径。 */
  href: string;
  /** 入口标题。 */
  title: string;
  /** 入口说明。 */
  description: string;
  /** 入口图标。 */
  icon: LucideIcon;
}

const stackItems: readonly StackItem[] = [
  { label: 'React 19' },
  { label: 'Vite' },
  { label: 'TypeScript' },
  { label: 'TanStack Router' },
  { label: 'React Query' },
  { label: 'Jotai' },
  { label: 'Ant Design' },
  { label: 'UnoCSS' }
];

const featureItems: readonly FeatureItem[] = [
  {
    title: '文件路由系统',
    description: '用约定式页面结构生成 route tree，菜单、标题和权限跟随页面演进。',
    icon: Route
  },
  {
    title: '权限与菜单',
    description: '登录守卫、静态权限、动态菜单和超级角色由启动层统一接入。',
    icon: LockKeyhole
  },
  {
    title: '请求服务分层',
    description: 'urls、api、hooks、keys、types 拆分清晰，页面开发直接复用服务 hooks。',
    icon: DatabaseZap
  },
  {
    title: '主题与国际化',
    description: '暗色模式、主题色、Ant Design 适配、本地图标和语言包统一管理。',
    icon: Palette
  },
  {
    title: 'Monorepo 能力',
    description: 'admin-layouts、theme、i18n、notification、vite preset 以 workspace 包复用。',
    icon: Boxes
  },
  {
    title: '开发工具链',
    description: 'Vite、pnpm、类型检查、构建预览和 devtools 保持清晰的启动顺序。',
    icon: WandSparkles
  }
];

const guideItems: readonly GuideItem[] = [
  {
    href: '/docs/getting-started/quick-start',
    title: '快速开始',
    description: '安装依赖、启动开发环境、构建和预览。',
    icon: Terminal
  },
  {
    href: '/docs/architecture/bootstrap',
    title: '启动流程',
    description: '理解 main、bootstrap、App 和 Provider 顺序。',
    icon: GitBranch
  },
  {
    href: '/docs/routing/overview',
    title: '路由与菜单',
    description: '新增页面、配置菜单、处理权限和外链。',
    icon: Layers3
  }
];

const HomePage = (props: HomePageProps) => {
  const { params } = props;
  void params;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f7ff] text-slate-950 dark:bg-[#0d1029] dark:text-white">
      <section className="relative isolate overflow-hidden border-b border-[#646cff]/12 bg-white text-slate-950 dark:border-white/10 dark:bg-[#0d1029] dark:text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(100,108,255,0.28),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(32,128,240,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(82,196,26,0.12),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fbfbff_56%,#f1f2ff_100%)] dark:bg-[radial-gradient(circle_at_50%_16%,rgba(100,108,255,0.32),transparent_28%),radial-gradient(circle_at_18%_24%,rgba(32,128,240,0.18),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(82,196,26,0.12),transparent_28%),linear-gradient(180deg,#0d1029_0%,#171b3f_58%,#0d1029_100%)]" />
        <div className="absolute left-[10%] top-32 hidden rounded-[8px] border border-[#2080f0]/25 bg-white/80 px-4 py-3 text-xs text-slate-600 shadow-xl shadow-[#2080f0]/10 backdrop-blur md:block dark:border-[#2080f0]/30 dark:bg-white/8 dark:text-[#c7ddff] dark:shadow-[#2080f0]/10">
          <div className="mb-2 flex items-center gap-2 text-[#2080f0]">
            <Code2 className="size-4" aria-hidden="true" />
            routeTree.gen.ts
          </div>
          <code className="font-mono text-[11px]">createRouter(routeTree)</code>
        </div>
        <div className="absolute right-[9%] top-36 hidden rounded-[8px] border border-[#52c41a]/25 bg-white/80 px-4 py-3 text-xs text-slate-600 shadow-xl shadow-[#52c41a]/10 backdrop-blur lg:block dark:border-[#52c41a]/30 dark:bg-white/8 dark:text-[#d9f7be] dark:shadow-[#52c41a]/10">
          <div className="mb-2 flex items-center gap-2 text-[#52c41a]">
            <BadgeCheck className="size-4" aria-hidden="true" />
            workspace packages
          </div>
          <code className="font-mono text-[11px]">@skyroc/web-admin-*</code>
        </div>

        <div className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-7xl flex-col items-center px-5 pb-14 pt-16 text-center sm:px-6 lg:px-8">
          <div className="relative mt-2 flex size-24 items-center justify-center rounded-full border border-[#646cff]/25 bg-white shadow-[0_18px_70px_rgba(100,108,255,0.26)] dark:border-[#646cff]/30 dark:bg-white/8 dark:shadow-[0_0_90px_rgba(100,108,255,0.28)]">
            <div className="absolute inset-[-18px] -z-10 rounded-full border border-[#646cff]/18 dark:border-[#646cff]/18" />
            <Image src="/skyroc-logo.svg" alt="Skyroc Admin React" width={58} height={58} priority />
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#646cff]/18 bg-white/80 px-3 py-1 text-xs font-medium text-[#646cff] shadow-sm backdrop-blur dark:border-[#646cff]/28 dark:bg-white/8 dark:text-[#b8bcff]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            源码事实导向 · 二次开发入口
          </div>

          <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-[#646cff] via-[#2080f0] to-[#646cff] bg-clip-text text-transparent dark:from-[#a6abff] dark:via-[#7db8ff] dark:to-[#646cff]">
              Skyroc Admin React
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-pretty text-xl leading-9 text-slate-600 dark:text-slate-300">
            面向 apps/admin 的新版开发文档，按真实源码说明启动、路由、权限、请求、主题、通知和部署边界。
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {stackItems.map(item => (
              <span
                key={item.label}
                className="rounded-full border border-slate-200 bg-white/82 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur dark:border-white/12 dark:bg-white/8 dark:text-slate-200"
              >
                {item.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/docs/getting-started/quick-start"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#646cff] px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(100,108,255,0.32)] transition-colors duration-200 hover:bg-[#747bff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#646cff]"
            >
              开始使用
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#646cff]/22 bg-white/82 px-5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition-colors duration-200 hover:border-[#646cff]/45 hover:bg-[#f1f2ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#646cff] dark:border-white/14 dark:bg-white/8 dark:text-white dark:hover:border-[#646cff]/50 dark:hover:bg-white/14"
            >
              查看文档
              <BookOpen className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-3">
            {[
              ['29', '正文页面', 'text-[#646cff]'],
              ['4', '新增专题', 'text-[#2080f0]'],
              ['1', '源码事实源', 'text-[#52c41a]']
            ].map(item => (
              <div
                key={item[0]}
                className="rounded-[8px] border border-slate-200 bg-white/76 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.07]"
              >
                <p className={`text-2xl font-semibold ${item[2]}`}>{item[0]}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold text-[#646cff] dark:text-[#b8bcff]">Core Features</p>
          <h2 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">强大功能，清晰边界</h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            首页只放导读；具体实现进入文档页后按源码路径展开。
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map(item => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 hover:border-[#646cff]/38 hover:bg-[#f7f7ff] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#646cff]/40 dark:hover:bg-[#646cff]/10"
              >
                <div className="flex size-10 items-center justify-center rounded-[8px] border border-[#646cff]/14 bg-[#646cff]/8 text-[#646cff] dark:border-[#646cff]/24 dark:bg-[#646cff]/14 dark:text-[#b8bcff]">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-[#52c41a]">Read Next</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">
              从这里进入开发路径
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              先跑起来，再看启动链路和路由菜单。首页少讲概念，文档页讲清楚真实代码。
            </p>
          </div>

          <div className="grid gap-4">
            {guideItems.map(item => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex cursor-pointer items-center gap-4 rounded-[8px] border border-slate-200 bg-[#fbfbff] p-4 shadow-sm transition-colors duration-200 hover:border-[#646cff]/38 hover:bg-[#f1f2ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#646cff] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#646cff]/40 dark:hover:bg-[#646cff]/10"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-[#646cff] text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-slate-950 dark:text-white">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</span>
                  </span>
                  <ArrowRight className="size-5 text-slate-400 transition-colors duration-200 group-hover:text-[#646cff]" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
