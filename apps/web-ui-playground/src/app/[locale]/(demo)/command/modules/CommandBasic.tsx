import { Command } from '@skyroc/web-ui';
import { items } from './shared';

const CommandBasic = () => {
  return (
    <Command
      className="rounded-lg border shadow-md"
      items={items}
    />
  );
};

export default CommandBasic;
