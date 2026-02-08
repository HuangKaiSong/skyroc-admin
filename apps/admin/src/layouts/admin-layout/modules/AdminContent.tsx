import { Outlet } from '@tanstack/react-router';

const GlobalContent = () => {
  return (
    <div className="h-full grow bg-layout p-16px">
      <Outlet />
    </div>
  );
};

export default GlobalContent;
