import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/function/')({
  beforeLoad: () => {
    throw redirect({ to: '/function/event-bus' });
  }
});
