'use client';

import { Divider, ScrollArea } from '@skyroc/web-ui';

const tags = Array.from({ length: 50 }).map((_, index, all) => `v1.2.0-beta.${all.length - index}`);

const ScrollAreaVertical = () => {
  return (
    <ScrollArea
      className="h-72 w-48 rounded-md border"
      orientation="vertical"
    >
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>

        {tags.map(tag => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Divider className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ScrollAreaVertical;
