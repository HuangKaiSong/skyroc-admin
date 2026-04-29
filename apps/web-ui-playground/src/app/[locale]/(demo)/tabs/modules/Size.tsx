'use client';

import type { TabsOptionData, TabsProps } from '@skyroc/web-ui';
import { Tabs } from '@skyroc/web-ui';

const tabs = [
  { children: 'Small content', label: 'One', value: 'one' },
  { children: 'Medium content', label: 'Two', value: 'two' },
  { children: 'Large content', label: 'Three', value: 'three' }
] satisfies TabsOptionData[];

const sizes: TabsProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const Size = () => {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map(size => (
        <Tabs
          classNames={{ content: 'p-3 border border-border rounded-1' }}
          defaultValue="one"
          items={tabs}
          key={size}
          size={size}
        />
      ))}
    </div>
  );
};

export default Size;
