'use client';

import { Accordion } from '@skyroc/web-ui';
import { items } from './shared';

const AccordionSingle = () => {
  return (
    <Accordion
      items={items}
      type="single"
    />
  );
};

export default AccordionSingle;