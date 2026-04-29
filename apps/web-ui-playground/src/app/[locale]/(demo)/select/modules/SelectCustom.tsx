'use client';

import type { SelectProps } from '@skyroc/web-ui';
import { Select } from '@skyroc/web-ui';

const items: SelectProps['items'] = [
  {
    label: 'Fruits',
    children: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' }
    ]
  },
  { type: 'separator' },
  {
    label: 'Vegetables',
    children: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Potato', value: 'potato' }
    ]
  }
];

const SelectCustom = () => {
  return (
    <div className="lt-sm:w-auto w-[260px]">
      <Select
        classNames={{
          content: 'border-primary/30',
          groupLabel: 'text-primary',
          item: 'focus:bg-primary/10',
          separator: 'bg-primary/20',
          trigger: 'border-primary/40'
        }}
        items={items}
        triggerProps={{
          placeholder: 'Pick an option'
        }}
      />
    </div>
  );
};

export default SelectCustom;
