import AntdContextHolder from './features/antd/AntdContextHolder';
import AntdProvider from './features/antd/AntdProvider';
import JotaiProvider from './features/jotai/JotaiProvider';
import RouterProvider from './features/router/RouterProvider';

const App = () => (
  <JotaiProvider>
    <AntdProvider>
      <AntdContextHolder>
        <RouterProvider />
      </AntdContextHolder>
    </AntdProvider>
  </JotaiProvider>
);

export default App;
