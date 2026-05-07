'use client';

import { useState } from 'react';
import { Switch } from '@skyroc/web-ui';

const SwitchControlled = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={checked}
        aria-label="Sync account"
        onCheckedChange={setChecked}
      />
      <span className="text-sm text-muted-foreground">
        {checked ? 'Sync enabled' : 'Sync disabled'}
      </span>
    </div>
  );
};

export default SwitchControlled;
