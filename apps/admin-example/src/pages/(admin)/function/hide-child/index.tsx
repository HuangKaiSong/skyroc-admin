import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/function/hide-child/')({
  beforeLoad: () => {
    throw redirect({ to: '/function/hide-child/one' });
  }
});
