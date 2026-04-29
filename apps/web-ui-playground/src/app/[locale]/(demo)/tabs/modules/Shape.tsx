'use client';

import type { TabsOptionData } from '@skyroc/web-ui';
import { Tabs } from '@skyroc/web-ui';

const tabs = [
  { children: 'Overview content', label: 'Overview', value: 'overview' },
  { children: 'Activity content', label: 'Activity', value: 'activity' },
  { children: 'Settings content', label: 'Settings', value: 'settings' }
] satisfies TabsOptionData[];

const Shape = () => {
  return (
    <div className="flex flex-col gap-5">
      <Tabs
        classNames={{ content: 'p-3 border border-border rounded-1' }}
        defaultValue="overview"
        items={tabs}
        shape="square"
      />

      <Tabs
        classNames={{ content: 'p-3 border border-border rounded-1' }}
        defaultValue="overview"
        items={tabs}
        shape="rounded"
      />
    </div>
  );
};

export default Shape;
