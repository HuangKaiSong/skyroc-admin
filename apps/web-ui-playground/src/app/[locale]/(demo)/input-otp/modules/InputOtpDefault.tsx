'use client';

import { InputOTP, toast } from '@skyroc/web-ui';

const InputOtpDefault = () => {
  const handleComplete = (value: string[]) => {
    toast.info(`the input value is ${value}`, {
      position: 'top-center'
    });
  };

  return (
    <InputOTP
      inputMode="numeric"
      placeholder="○"
      onComplete={handleComplete}
    />
  );
};

export default InputOtpDefault;
