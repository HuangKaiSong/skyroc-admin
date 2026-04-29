'use client';

import { useState } from 'react';
import { Password } from '@skyroc/web-ui';

const PasswordControlled = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-80 max-sm:w-auto">
      <Password
        defaultValue="abc123"
        placeholder="Please input password"
        visible={visible}
        onVisibleChange={setVisible}
      />

      <p className="text-muted-foreground mt-2 text-sm">
        Visible:
        {' '}
        {String(visible)}
      </p>
    </div>
  );
};

export default PasswordControlled;
