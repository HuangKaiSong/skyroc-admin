import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/plugin/')({
  beforeLoad: () => {
    throw redirect({ to: '/plugin/copy' });
  }
});
