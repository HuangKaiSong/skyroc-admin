'use client';

import { Check, X } from 'lucide-react';
import { Tag } from '@skyroc/web-ui';

const TagBasic = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tag>Default</Tag>

      <Tag
        color="success"
        variant="soft"
      >
        <Check className="size-3" />
        Verified
      </Tag>

      <Tag
        color="destructive"
        shape="rounded"
        variant="outline"
      >
        Removable
        <X className="size-3" />
      </Tag>
    </div>
  );
};

export default TagBasic;
