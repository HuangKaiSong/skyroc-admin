import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 gap-4">
      <h1 className="text-3xl font-bold">Skyroc Admin 项目文档</h1>
      <p className="text-fd-muted-foreground">
        基于 React 19 + TypeScript + Vite 的跨端 monorepo 后台管理系统
      </p>
      <p>
        前往{' '}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{' '}
        查看完整文档。
      </p>
    </div>
  );
}
