import { useEffect } from 'react';

import { useAdminTab } from './tabs/use-admin-tab';

/**
 * Admin Tab Effect Component
 *
 * This component handles tab caching on page unload
 * and should be mounted in the admin layout
 */
const AdminTabEffect = () => {
  const { cacheTabs } = useAdminTab();

  useEffect(() => {
    const handleBeforeUnload = () => {
      cacheTabs();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AdminTabEffect;
