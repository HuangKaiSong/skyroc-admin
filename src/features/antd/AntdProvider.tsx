import type { PropsWithChildren } from 'react';

import { globalConfig } from '@/config';

const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <AConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
    >
      <AWatermark
        className="h-full"
        content={globalConfig.watermarkText}
        {...globalConfig.watermarkConfig}
      />
      {children}
    </AConfigProvider>
  );
};

export default AntdProvider;
