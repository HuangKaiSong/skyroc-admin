'use client';

import { Switch } from '@skyroc/web-ui';

const SwitchDisabled = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch
          disabled
          aria-label="Disabled unchecked switch"
        />
        <span className="text-sm text-muted-foreground">Disabled</span>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          defaultChecked
          disabled
          aria-label="Disabled checked switch"
        />
        <span className="text-sm text-muted-foreground">Disabled checked</span>
      </div>
    </div>
  );
};

export default SwitchDisabled;
