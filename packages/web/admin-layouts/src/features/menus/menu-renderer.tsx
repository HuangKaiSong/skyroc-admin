import { BeyondHiding } from '@skyroc/web-ui-antd';
import { I18nLabel, SvgIcon } from '@skyroc/web-ui-compose';
import { createElement } from 'react';

import { getAdminLayoutsOptions } from '../../setup';
import type { GeneratedMenu } from './menu-generator';

function createMenuTitle(menu: GeneratedMenu) {
  return <I18nLabel fallback={menu.title} i18nKey={menu.i18nKey} />;
}

function createMenuExtra(menu: GeneratedMenu) {
  if (!menu.extra) return undefined;

  const { extras } = getAdminLayoutsOptions();
  const Extra = extras?.[menu.extra];

  if (!Extra) return undefined;

  return createElement(Extra, menu);
}

function renderMenu(menu: GeneratedMenu): Menu.CommonMenu {
  if (menu.type === 'divider') {
    return {
      key: menu.key,
      label: null,
      order: menu.order,
      title: menu.title,
      type: 'divider'
    };
  }

  const title = createMenuTitle(menu);
  const { defaultIcon } = getAdminLayoutsOptions();
  const commonMenu: Menu.CommonMenu = {
    extra: createMenuExtra(menu),
    i18nKey: menu.i18nKey,
    icon: <SvgIcon icon={menu.icon || defaultIcon} localIcon={menu.localIcon} style={{ fontSize: '20px' }} />,
    key: menu.key,
    label: <BeyondHiding title={title} />,
    order: menu.order,
    title: menu.title,
    type: menu.type
  };

  if (menu.children?.length) {
    commonMenu.children = renderCommonMenus(menu.children);
  }

  return commonMenu;
}

export function renderCommonMenus(menus: GeneratedMenu[]) {
  return menus.map(renderMenu);
}
