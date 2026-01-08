import { Outlet } from '@tanstack/react-router';

const GlobalContent = () => {
  return (
    <div className="p-16px bg-layout grow h-full">
      <Outlet />
    </div>
  );
};

export default GlobalContent;
