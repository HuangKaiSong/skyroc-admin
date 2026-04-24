import { Accordion } from '@skyroc/web-ui';
import { items } from './shared';

const AccordionSlot = () => {
  return (
    <Accordion
      collapsible
      items={items}
      type="single"
    />
  );
};

export default AccordionSlot;
