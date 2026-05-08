import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HomePageProps extends PageProps<'/'> {}

const packageGroups = [
  {
    title: '基础能力',
    description: '通用工具、色彩处理和任务调度，适合被业务应用、组件库和工程脚本复用。',
    items: [
      { name: '@skyroc/utils', href: '/docs/utils/overview' },
      { name: '@skyroc/color', href: '/docs/color' },
      { name: '@skyroc/scheduler', href: '/docs/scheduler' }
    ]
  },
  {
    title: '请求与状态',
    description: '从 HTTP 客户端到业务服务封装，再到跨组件状态管理。',
    items: [
      { name: '@skyroc/axios', href: '/docs/axios' },
      { name: '@skyroc/service', href: '/docs/service' },
      { name: '@skyroc/core-state', href: '/docs/state' }
    ]
  },
  {
    title: '工程工具',
    description: '围绕仓库协作、版本发布、changelog 和构建产物清理的 CLI 能力。',
    items: [{ name: '@skyroc/scripts', href: '/docs/scripts' }]
  }
] as const;

const HomePage = (props: HomePageProps) => {
  const { params: _params, searchParams: _searchParams } = props;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-14 md:py-20">
      <section className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-fd-muted-foreground">Skyroc Admin Core</p>
        <h1 className="mb-5 text-4xl font-semibold tracking-normal md:text-5xl">@core 基础设施文档</h1>
        <p className="text-lg leading-8 text-fd-muted-foreground">
          面向业务应用、组件库和工程工具的核心包说明，覆盖工具函数、请求服务、状态管理、任务调度、色彩系统和自动化脚本。
        </p>
        <Link
          href="/docs"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          查看总览
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {packageGroups.map(group => (
          <article key={group.title} className="rounded-lg border bg-fd-card p-5 text-fd-card-foreground">
            <h2 className="mb-2 text-base font-semibold">{group.title}</h2>
            <p className="mb-5 min-h-16 text-sm leading-6 text-fd-muted-foreground">{group.description}</p>
            <div className="flex flex-col gap-2">
              {group.items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center justify-between rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
                >
                  {item.name}
                  <ArrowRight className="size-4 text-fd-muted-foreground" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
