import { render, screen } from '@testing-library/react';
import type { CSSProperties, ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  GLOBAL_HEADER_MENU_ID,
  GLOBAL_HEADER_MENU_SELECTOR,
  GLOBAL_SIDER_MENU_ID,
  GLOBAL_SIDER_MENU_SELECTOR
} from '../src/constant';

vi.mock('@tanstack/react-router', () => ({
  Link: (props: { children?: ReactNode; className?: string; style?: CSSProperties; to?: string }) => {
    const { children, className, style, to = '' } = props;

    return (
      <a className={className} href={to} style={style}>
        {children}
      </a>
    );
  },
  Outlet: () => null,
  useChildMatches: () => [],
  useNavigate: () => vi.fn()
}));

interface MockStorage {
  data: Partial<StorageType.Local>;
  get: <K extends keyof StorageType.Local>(key: K) => StorageType.Local[K] | null;
  remove: (key: keyof StorageType.Local) => void;
  set: <K extends keyof StorageType.Local>(key: K, value: StorageType.Local[K]) => void;
}

function createStorage(): MockStorage {
  const data: Partial<StorageType.Local> = {};

  return {
    data,
    get: key => data[key] ?? null,
    remove: key => {
      delete data[key];
    },
    set: (key, value) => {
      data[key] = value;
    }
  };
}

function createBaseOptions() {
  return {
    defaultHome: '/home' as Router.RoutePath,
    defaultIcon: 'mdi:menu',
    menuCategories: {
      admin: {
        key: 'admin',
        layout: '/(admin)' as Router.RouteId
      }
    },
    routeMode: 'static' as const,
    routeTree: {
      children: []
    } as any,
    storage: createStorage()
  };
}

function renderCustomLogo(style: CSSProperties) {
  return (
    <div>
      <span>custom logo height {String(style.height)}</span>
    </div>
  );
}

vi.mock('@skyroc/materials', () => ({
  AdminLayout: (props: { children?: ReactNode; Footer?: ReactNode; Header?: ReactNode; Sider?: ReactNode }) => {
    const { children, Footer, Header, Sider } = props;

    return (
      <div>
        <header>{Header}</header>
        <aside>{Sider}</aside>
        <main>{children}</main>
        <footer>{Footer}</footer>
      </div>
    );
  },
  LAYOUT_SCROLL_EL_ID: 'layout-scroll'
}));

vi.mock('@skyroc/web-admin-theme', () => ({
  useSettingsTheme: () => ({
    fixedHeaderAndTab: false,
    footer: { fixed: false, height: 48, right: false, visible: true },
    header: { height: 56 },
    layout: { mode: 'vertical', scrollMode: 'wrapper' },
    sider: { collapsedWidth: 64, width: 240 },
    tab: { height: 40, visible: true }
  })
}));

vi.mock('../src/state/use-admin-state', () => ({
  useAdminState: () => ({
    contentXScrollable: false,
    fullContent: false,
    isMobile: false,
    mixSiderFixed: false,
    siderCollapse: false,
    toggleSiderCollapse: vi.fn()
  })
}));

vi.mock('../src/state/menus/use-admin-menus', () => ({
  useAdminMenus: () => ({
    childLevelMenus: [],
    isActiveFirstLevelMenuHasChildren: false,
    secondLevelMenus: []
  })
}));

vi.mock('../src/modules/admin-header/AdminHeader', async () => {
  const actual = await vi.importActual<typeof import('../src/context')>('../src/context');

  return {
    default: () => {
      const { headerLeftActions, headerMiddleActions, headerRightActions, logo, logoTitle } =
        actual.useAdminLayoutContext();

      return (
        <div>
          {logo}
          {logoTitle}
          {headerLeftActions}
          {headerMiddleActions}
          {headerRightActions}
        </div>
      );
    }
  };
});

vi.mock('../src/modules/admin-menu/AdminMenu', () => ({
  default: () => null
}));

vi.mock('../src/modules/admin-tab/AdminTab', () => ({
  default: () => null
}));

describe('admin layouts setup', () => {
  it('throws before setup is called', async () => {
    vi.resetModules();

    const { getAdminLayoutsOptions } = await import('../src/setup');

    expect(() => getAdminLayoutsOptions()).toThrow(/setupAdminLayouts/);
  });
});

describe('menu generation', () => {
  it('generates static menus from injected routeTree', async () => {
    vi.resetModules();

    const { setupAdminLayouts } = await import('../src/setup');
    const { menuGenerator } = await import('../src/features/menus/menu-generator');

    setupAdminLayouts({
      ...createBaseOptions(),
      routeTree: {
        children: [
          {
            id: '/(admin)',
            children: [
              {
                fullPath: '/home',
                id: '/(admin)/home',
                options: {
                  staticData: {
                    menu: {
                      icon: 'mdi:home',
                      order: 1
                    },
                    title: 'Home'
                  }
                }
              }
            ]
          }
        ]
      } as any
    });

    const result = menuGenerator.generate({
      userInfo: {
        buttons: [],
        roles: [],
        userId: '1',
        userName: 'Admin'
      }
    });

    expect(result.home).toBe('/home');
    expect(result.allMenus.get('admin')?.[0]).toMatchObject({
      icon: 'mdi:home',
      key: '/home',
      title: 'Home'
    });
    expect(result.quickReferenceMenus.get('admin')?.get('/home')?.title).toBe('Home');
  });
});

describe('tab helpers', () => {
  it('builds tab ids with multi-tab routes', async () => {
    vi.resetModules();

    const { setupAdminLayouts } = await import('../src/setup');
    const { getTabByMenuInfo } = await import('../src/state/tabs/shared');

    setupAdminLayouts(createBaseOptions());

    const tab = getTabByMenuInfo(
      {
        id: '/(admin)/detail',
        key: '/detail',
        menu: { icon: 'mdi:file' },
        path: '/detail',
        tab: { multi: true },
        title: 'Detail'
      } as Menu.QuickReferenceMenu,
      '/detail',
      '/detail?id=1'
    );

    expect(tab).toMatchObject({
      fullPath: '/detail?id=1',
      icon: 'mdi:file',
      id: '/detail?id=1',
      label: 'Detail'
    });
  });
});

describe('layout menu target constants', () => {
  it('keeps DOM ids separate from Portal selectors', () => {
    expect(GLOBAL_HEADER_MENU_ID).toBe('__GLOBAL_HEADER_MENU__');
    expect(GLOBAL_HEADER_MENU_SELECTOR).toBe('#__GLOBAL_HEADER_MENU__');
    expect(GLOBAL_SIDER_MENU_ID).toBe('__GLOBAL_SIDER_MENU__');
    expect(GLOBAL_SIDER_MENU_SELECTOR).toBe('#__GLOBAL_SIDER_MENU__');
  });
});

describe('AdminLayout', () => {
  it('renders app-provided slots', async () => {
    vi.resetModules();

    const { setupAdminLayouts } = await import('../src/setup');
    const { default: AdminLayout } = await import('../src/AdminLayout');

    setupAdminLayouts(createBaseOptions());

    render(
      <AdminLayout
        content={<div>content slot</div>}
        footer={<div>footer slot</div>}
        headerLeftActions={<button type="button">left slot</button>}
        headerMiddleActions={<button type="button">middle slot</button>}
        headerRightActions={<button type="button">right slot</button>}
        logo={<div>logo mark slot</div>}
        logoTitle={<div>logo title slot</div>}
      />
    );

    expect(screen.getAllByText('logo mark slot').length).toBeGreaterThan(0);
    expect(screen.getAllByText('logo title slot').length).toBeGreaterThan(0);
    expect(screen.getByText('left slot')).toBeInTheDocument();
    expect(screen.getByText('middle slot')).toBeInTheDocument();
    expect(screen.getByText('right slot')).toBeInTheDocument();
    expect(screen.getByText('content slot')).toBeInTheDocument();
    expect(screen.getByText('footer slot')).toBeInTheDocument();
    expect(document.getElementById(GLOBAL_SIDER_MENU_ID)).toBeInTheDocument();
    expect(document.querySelector(GLOBAL_SIDER_MENU_SELECTOR)).toBe(document.getElementById(GLOBAL_SIDER_MENU_ID));
  });

  it('allows replacing the default logo with a render function', async () => {
    vi.resetModules();

    const { setupAdminLayouts } = await import('../src/setup');
    const { default: AdminLayout } = await import('../src/AdminLayout');

    setupAdminLayouts(createBaseOptions());

    render(<AdminLayout logoComponent={renderCustomLogo} />);

    expect(screen.getAllByText('custom logo height 56px').length).toBeGreaterThan(0);
  });

  it('allows replacing the default logo with a React node', async () => {
    vi.resetModules();

    const { setupAdminLayouts } = await import('../src/setup');
    const { default: AdminLayout } = await import('../src/AdminLayout');

    setupAdminLayouts(createBaseOptions());

    render(<AdminLayout logoComponent={<span>custom logo node</span>} />);

    expect(screen.getAllByText('custom logo node').length).toBeGreaterThan(0);
  });
});
