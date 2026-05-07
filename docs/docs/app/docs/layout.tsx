import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

interface LayoutProps {
  /** Page content */
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: 'Skyroc UI'
      }}
    >
      {children}
    </DocsLayout>
  );
};

export default Layout;
