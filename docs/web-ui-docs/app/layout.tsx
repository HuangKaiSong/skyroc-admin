import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Sonner, TooltipProvider } from '@skyroc/web-ui';
// oxlint-disable-next-line import/no-unassigned-import
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

interface RootLayoutProps {
  /** 文档应用主体内容，由 Next.js 注入 */
  children: ReactNode;
}

const Layout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <TooltipProvider>
            {children}
            <Sonner />
          </TooltipProvider>
        </RootProvider>
      </body>
    </html>
  );
};

export default Layout;
