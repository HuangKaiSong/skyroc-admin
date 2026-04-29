'use client';

import { Password } from '@skyroc/web-ui';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const PasswordSize = () => {
  return (
    <div className="w-96 max-sm:w-auto">
      <div className="flex flex-col gap-3">
        {sizes.map(size => (
          <Password
            defaultValue="abc123"
            key={size}
            placeholder={`${size} password`}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordSize;
