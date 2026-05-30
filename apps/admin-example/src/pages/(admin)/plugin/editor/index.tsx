import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/plugin/editor/')({
  beforeLoad: () => {
    throw redirect({ to: '/plugin/editor/markdown' });
  }
});
