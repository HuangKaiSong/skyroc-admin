import { atom, useAtom } from 'jotai';

const adminStateAtom = atom({
  siderCollapse: false
});

export const useAdminState = () => {
  const [adminState, setAdminState] = useAtom(adminStateAtom);

  const responsive = useResponsive();

  const isMobile = !responsive.sm;

  return {
    adminState,
    ...adminState,
    isMobile,
    setAdminState
  };
};
