'use client';

import { Switch } from '@skyroc/web-ui';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const SwitchSize = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map(size => (
        <div
          className="flex items-center gap-2"
          key={size}
        >
          <Switch
            defaultChecked
            size={size}
            aria-label={`${size} switch`}
          />
          <span className="text-sm text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  );
};

export default SwitchSize;
