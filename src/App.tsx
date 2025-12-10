import { RouterProvider } from '@tanstack/react-router';

import AntdContextHolder from './features/antd/AntdContextHolder';
import AntdProvider from './features/antd/AntdProvider';
import { router } from './features/router';

const App = () => {
  return (
    <AntdProvider>
      <AntdContextHolder>
        <RouterProvider router={router} />
      </AntdContextHolder>
    </AntdProvider>
  );
};

export default App;
