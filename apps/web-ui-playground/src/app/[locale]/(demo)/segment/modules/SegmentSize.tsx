'use client';

import type { SegmentProps } from '@skyroc/web-ui';
import { Segment } from '@skyroc/web-ui';

const items: SegmentProps['items'] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' }
];

const sizes: SegmentProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const SegmentSize = () => {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map(size => (
        <Segment
          defaultValue="day"
          items={items}
          key={size}
          size={size}
        />
      ))}
    </div>
  );
};

export default SegmentSize;
