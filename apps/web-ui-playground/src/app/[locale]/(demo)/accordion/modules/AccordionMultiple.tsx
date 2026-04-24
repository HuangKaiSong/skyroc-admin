import { Accordion } from '@skyroc/web-ui';
import { items } from './shared';

const AccordionMultiple = () => {
  return (
    <Accordion
      items={items}
      type="multiple"
    />
  );
};

export default AccordionMultiple;
