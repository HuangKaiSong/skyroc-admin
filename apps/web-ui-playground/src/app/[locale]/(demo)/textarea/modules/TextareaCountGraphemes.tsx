'use client';

import { useState } from 'react';
import GraphemeSplitter from 'grapheme-splitter';
import { Card, Textarea } from '@skyroc/web-ui';
import type { TextareaProps } from '@skyroc/web-ui';

const splitter = new GraphemeSplitter();

const countGraphemes = (text: TextareaProps['value']) => {
  if (!text) {
    return 0;
  }
  return splitter.countGraphemes(String(text));
};

const TextareaCountGraphemes = () => {
  const [value, setValue] = useState<TextareaProps['value']>('🌷🇨🇳');

  return (
    <Card
      split
      title="Count graphemes"
    >
      <Textarea
        showCount
        countGraphemes={countGraphemes}
        value={value}
        onTextChange={setValue}
      />
    </Card>
  );
};

export default TextareaCountGraphemes;
