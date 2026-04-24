'use client';

import { useState } from 'react';
import type { CheckedState } from '@skyroc/web-ui';
import { Checkbox } from '@skyroc/web-ui';

const CheckboxBasic = () => {
  const [checked, setChecked] = useState<CheckedState>(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
    >
      Accept terms and conditions
    </Checkbox>
  );
};

export default CheckboxBasic;
