'use client';

import { Switch } from '@skyroc/web-ui';

const SwitchBasic = () => {
  return (
    <div className="flex items-center gap-3">
      <Switch
        defaultChecked
        aria-label="Enable notifications"
      />
      <span className="text-sm text-muted-foreground">Enable notifications</span>
    </div>
  );
};

export default SwitchBasic;
