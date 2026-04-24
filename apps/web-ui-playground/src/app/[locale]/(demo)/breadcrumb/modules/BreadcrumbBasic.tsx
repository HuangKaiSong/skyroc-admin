'use client';

import { Breadcrumb, toast } from '@skyroc/web-ui';
import type { BreadcrumbItem } from '@skyroc/web-ui';
import { items } from './shared';

const BreadcrumbBasic = () => {
  function handleItemClick(item: BreadcrumbItem) {
    toast.success(`You clicked ${item.label}`, {
      classNames: {
        title: '!text-xs',
        toast: '!w-auto !px-2 !py-1.5'
      },
      position: 'top-center'
    });
  }

  return (
    <Breadcrumb
      handleItemClick={handleItemClick}
      items={items}
    />
  );
};

export default BreadcrumbBasic;
