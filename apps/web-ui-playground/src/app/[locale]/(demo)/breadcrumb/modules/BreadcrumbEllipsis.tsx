'use client';

import { Breadcrumb } from '@skyroc/web-ui';
import { items3 } from './shared';

const BreadcrumbEllipsisDemo = () => {
  return (
    <Breadcrumb
      ellipsis
      // oxlint-disable-next-line no-console
      handleItemClick={item => console.log('Clicked:', item.value)}
      items={items3}
    />
  );
};

export default BreadcrumbEllipsisDemo;
