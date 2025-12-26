import { QueryClientProvider } from '@tanstack/react-query';
import { useAtomsDevtools } from 'jotai-devtools';

import LazyAnimate from './features/animate/LazyMotion';
import AntdContextHolder from './features/antd/AntdContextHolder';
import AntdProvider from './features/antd/AntdProvider';
import { NotificationProvider } from './features/chat';
import Devtools from './features/effects/Devtools';
import GlobalEffect from './features/effects/GlobalEffect';
import JotaiProvider from './features/jotai/JotaiProvider';
import { globalStore } from './features/jotai/store';
import RouterProvider from './features/router/RouterProvider';
import { queryClient } from './service/queryClient';

const Provider = ({ children }: { children: React.ReactNode }) => {
  useAtomsDevtools('demo', { store: globalStore });
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Devtools />
        {children}
      </JotaiProvider>
    </QueryClientProvider>
  );
};
const App = () => (
  <Provider>
    <AntdProvider>
      <AntdContextHolder>
        <NotificationProvider>
          <LazyAnimate>
            <RouterProvider />
            <GlobalEffect />
          </LazyAnimate>
        </NotificationProvider>
      </AntdContextHolder>
    </AntdProvider>
  </Provider>
);

export default App;
