import { AdminLayout as WebAdminLayout, hasMatchedRoutePermission } from '@skyroc/web-admin-layouts';
import { NotificationButton } from '@skyroc/web-admin-notification';
import { DarkModeContainer } from '@skyroc/web-ui-compose';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import SystemLogo from '@/components/SystemLogo';
import UserAvatar from '@/features/auth/components/UserAvatar';

const AdminFooter = () => {
  return (
    <DarkModeContainer className="h-full flex-center">
      <a href="https://github.com/Ohh-889/skyroc-admin/blob/main/LICENSE" rel="noopener noreferrer" target="_blank">
        Copyright MIT © 2021 Skyroc
      </a>
    </DarkModeContainer>
  );
};

const AdminLayout = () => {
  const { t } = useTranslation();

  return (
    <WebAdminLayout
      footer={<AdminFooter />}
      headerMiddleActions={<NotificationButton className="px-12px" />}
      headerRightActions={<UserAvatar />}
      logo={<SystemLogo className="text-32px text-primary" />}
      logoTitle={t('system.title')}
    />
  );
};

export const Route = createFileRoute('/(admin)')({
  component: AdminLayout,
  beforeLoad: async ({ context, location, matches }) => {
    if (!context.isLoggedIn) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }

    const userInfo = context.isAuthInitialized ? context.userInfo : await context.initAuth();

    if (!hasMatchedRoutePermission(matches, userInfo)) {
      throw redirect({ to: '/403' });
    }
  }
});
