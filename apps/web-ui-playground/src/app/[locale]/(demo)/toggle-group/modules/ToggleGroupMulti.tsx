'use client';

import { Card, Label, ToggleGroup } from '@skyroc/web-ui';
import { items } from './shared';

const ToggleGroupMulti = () => {
  return (
    <Card
      split
      title="Multi"
    >
      <ToggleGroup
        items={items}
        type="multiple"
        itemRender={(item) => {
          return <Label>{item.label}</Label>;
        }}
      />
    </Card>
  );
};

export default ToggleGroupMulti;