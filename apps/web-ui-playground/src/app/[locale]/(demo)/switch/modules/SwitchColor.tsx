'use client';

import { Switch } from '@skyroc/web-ui';

const colors = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'] as const;

const SwitchColor = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map(color => (
        <div
          className="flex items-center gap-2"
          key={color}
        >
          <Switch
            defaultChecked
            color={color}
            aria-label={`${color} switch`}
          />
          <span className="text-sm text-muted-foreground">{color}</span>
        </div>
      ))}
    </div>
  );
};

export default SwitchColor;
