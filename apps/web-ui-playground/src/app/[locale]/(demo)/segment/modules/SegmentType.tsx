'use client';

import type { SegmentProps } from '@skyroc/web-ui';
import { Segment } from '@skyroc/web-ui';

const items: SegmentProps['items'] = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'settings', label: 'Settings' }
];

const SegmentType = () => {
  return (
    <div className="flex flex-col gap-4">
      <Segment
        defaultValue="overview"
        items={items}
        type="pill"
      />

      <Segment
        defaultValue="overview"
        items={items}
        type="line"
      />

      <Segment
        defaultValue="overview"
        enableIndicator={false}
        items={items}
      />
    </div>
  );
};

export default SegmentType;
