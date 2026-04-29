'use client';

import { Badge, Tabs } from '@skyroc/web-ui';
import type { TabsOptionData } from '@skyroc/web-ui';

const tabs = [
  { children: 'Inbox content', label: 'Inbox', value: 'inbox' },
  { children: 'Alerts content', label: 'Alerts', value: 'alerts' },
  { children: 'Archive content', label: 'Archive', value: 'archive', disabled: true }
] satisfies TabsOptionData[];

const Render = () => {
  return (
    <div className="lt-sm:w-auto w-[360px]">
      <Tabs
        classNames={{ content: 'p-4 border border-border rounded-1' }}
        defaultValue="inbox"
        items={tabs}
        renderContent={({ active, item }) => (
          <div className="flex items-center justify-between gap-3">
            <span>{item.children}</span>
            {active ? <Badge size="sm">Active</Badge> : null}
          </div>
        )}
        renderTrigger={({ active, item }) => (
          <span className="inline-flex items-center gap-2">
            {item.label}
            {active ? <span className="size-1.5 rounded-full bg-primary" /> : null}
          </span>
        )}
      />
    </div>
  );
};

export default Render;
