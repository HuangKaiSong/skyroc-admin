import Link from 'next/link';

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Skyroc UI</h1>
      <p className="text-lg text-muted-foreground">
        A cross-platform component library for React &amp; React Native
      </p>
      <div className="flex gap-4">
        <Link
          href="/docs/native"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Native Components
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
