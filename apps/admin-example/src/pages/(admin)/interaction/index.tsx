import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/interaction/')({
  beforeLoad: () => {
    throw redirect({ to: '/interaction/notification' });
  }
});
