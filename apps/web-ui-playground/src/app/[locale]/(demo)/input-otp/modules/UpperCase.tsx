'use client';

import { useState } from 'react';
import { InputOTP } from '@skyroc/web-ui';

const UpperCase = () => {
  const [value, setValue] = useState('');

  function handleChange(newValue: string) {
    setValue(newValue.toUpperCase());
  }

  return (
    <InputOTP
      placeholder="○"
      value={value}
      onChange={handleChange}
    />
  );
};

export default UpperCase;
