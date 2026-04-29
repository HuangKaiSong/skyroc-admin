'use client';

import type { SelectProps } from '@skyroc/web-ui';
import { Select } from '@skyroc/web-ui';

const fruits: SelectProps['items'] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' }
];

const sizes: SelectProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const SelectSize = () => {
  return (
    <div className="flex flex-col gap-3 lt-sm:w-auto w-[260px]">
      {sizes.map(size => (
        <Select
          defaultValue="apple"
          items={fruits}
          key={size}
          size={size}
        />
      ))}
    </div>
  );
};

export default SelectSize;
