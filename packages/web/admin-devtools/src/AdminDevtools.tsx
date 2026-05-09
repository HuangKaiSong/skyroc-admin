import type { TanStackDevtoolsReactInit, TanStackDevtoolsReactPlugin } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import type { AnyRouter } from '@tanstack/react-router';
import type { DevToolsProps } from 'jotai-devtools';
import type { Store } from 'jotai/vanilla/store';

import { useAtomsDevtools } from 'jotai-devtools/utils';
import { Suspense, lazy, useMemo } from 'react';

type TanStackDevtoolsConfig = NonNullable<TanStackDevtoolsReactInit['config']>;
type AdminDevtoolsTheme = DevToolsProps['theme'];

export interface AdminJotaiDevtoolsConfig {
  /** Redux DevTools connection name for the atom timeline. */
  name?: string;

  /** Whether to show the embedded Jotai inspector panel. */
  panel?: boolean;

  /** Jotai devtools panel position. */
  position?: DevToolsProps['position'];

  /** Whether to record atom changes in the Redux DevTools timeline. */
  timeline?: boolean;
}

export interface AdminDevtoolsConfig {
  /** Whether any admin devtools should be rendered. */
  enabled?: boolean;

  /** Whether to enable Jotai devtools, or the detailed Jotai devtools options. */
  jotai?: boolean | AdminJotaiDevtoolsConfig;

  /** TanStack devtools trigger position. */
  position?: TanStackDevtoolsConfig['position'];

  /** Whether to enable the TanStack Query panel. */
  query?: boolean;

  /** Whether to enable the TanStack Router panel. */
  router?: boolean;

  /** Shared theme for all devtools panels. */
  theme?: AdminDevtoolsTheme;
}

export interface AdminDevtoolsProps {
  /** Devtools feature switches and shell options. */
  config?: AdminDevtoolsConfig;

  /** QueryClient instance used by the application. */
  queryClient?: QueryClient;

  /** TanStack Router instance used by the application. */
  router?: AnyRouter;

  /** Jotai store used by the application. */
  store?: Store;
}

interface JotaiAtomsDevtoolsProps {
  /** Redux DevTools connection name for the atom timeline. */
  name: string;

  /** Jotai store to inspect. */
  store?: Store;
}

interface JotaiDevtoolsProps {
  /** Jotai devtools feature switches and panel options. */
  config?: boolean | AdminJotaiDevtoolsConfig;

  /** Jotai store to inspect. */
  store?: Store;

  /** Shared theme inherited from the root devtools config. */
  theme?: AdminDevtoolsTheme;
}

const TanStackDevtools = lazy(() =>
  import('@tanstack/react-devtools').then(mod => ({ default: mod.TanStackDevtools }))
);

const ReactQueryDevtoolsPanel = lazy(() =>
  import('@tanstack/react-query-devtools').then(mod => ({ default: mod.ReactQueryDevtoolsPanel }))
);

const TanStackRouterDevtoolsPanel = lazy(() =>
  import('@tanstack/react-router-devtools').then(mod => ({ default: mod.TanStackRouterDevtoolsPanel }))
);

const JotaiDevTools = lazy(async () => {
  await import('jotai-devtools/styles.css');

  const mod = await import('jotai-devtools');

  return { default: mod.DevTools };
});

const JotaiAtomsDevtools = (props: JotaiAtomsDevtoolsProps) => {
  const { name, store } = props;

  useAtomsDevtools(name, { store });

  return null;
};

const JotaiDevtools = (props: JotaiDevtoolsProps) => {
  const { config, store, theme } = props;

  if (config === false) {
    return null;
  }

  const jotaiConfig = typeof config === 'object' ? config : {};
  const showPanel = jotaiConfig.panel !== false;
  const showTimeline = jotaiConfig.timeline !== false;

  if (!showPanel && !showTimeline) {
    return null;
  }

  return (
    <>
      {showTimeline ? <JotaiAtomsDevtools name={jotaiConfig.name ?? 'skyroc-admin'} store={store} /> : null}
      {showPanel ? <JotaiDevTools position={jotaiConfig.position} store={store} theme={theme} /> : null}
    </>
  );
};

function isEnabled(value: boolean | undefined) {
  return value !== false;
}

const AdminDevtools = (props: AdminDevtoolsProps) => {
  const { config = {}, queryClient, router, store } = props;

  const plugins = useMemo<TanStackDevtoolsReactPlugin[]>(() => {
    const items: TanStackDevtoolsReactPlugin[] = [];

    if (router && isEnabled(config.router)) {
      items.push({
        id: 'tanstack-router',
        name: 'TanStack Router',
        render: (
          <Suspense fallback={null}>
            <TanStackRouterDevtoolsPanel router={router} />
          </Suspense>
        )
      });
    }

    if (queryClient && isEnabled(config.query)) {
      items.push({
        id: 'tanstack-query',
        name: 'TanStack Query',
        render: (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsPanel client={queryClient} />
          </Suspense>
        )
      });
    }

    return items;
  }, [config.query, config.router, queryClient, router]);

  const tanStackConfig = useMemo<TanStackDevtoolsConfig>(() => {
    return {
      position: config.position ?? 'bottom-right',
      theme: config.theme
    };
  }, [config.position, config.theme]);

  if (config.enabled === false) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      {plugins.length > 0 ? (
        <TanStackDevtools config={tanStackConfig} plugins={plugins} />
      ) : null}

      <JotaiDevtools config={config.jotai} store={store} theme={config.theme} />
    </Suspense>
  );
};

export default AdminDevtools;
