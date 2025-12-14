import { createFileRoute, redirect } from '@tanstack/react-router';

import '../App.css';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.isLoggedIn) {
      throw redirect({ to: '/home' });
    }

    throw redirect({ to: '/login' });
  },
  staticData: {
    icon: 'icon-home'
  }
});
