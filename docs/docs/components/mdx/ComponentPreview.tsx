'use client';

import { PhoneFrame } from '@/components/phone-frame';

interface ComponentPreviewProps {
  /** Component route name (e.g. "button" → /components/button) */
  component: string;

  /** Frame height in pixels */
  height?: number;
}

const PREVIEW_BASE_URL = process.env.NEXT_PUBLIC_NATIVE_PREVIEW_URL || '/native-preview';

const ComponentPreview = (props: ComponentPreviewProps) => {
  const { component, height } = props;

  const src = `${PREVIEW_BASE_URL}/components/${component}`;

  return (
    <div className="not-prose my-8 flex justify-center">
      <PhoneFrame height={height} src={src} title={`${component} preview`} />
    </div>
  );
};

export { ComponentPreview };
