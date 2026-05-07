import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        // Dev: proxy to Expo Web dev server
        source: '/native-preview/:path*',
        destination: `${process.env.NEXT_PUBLIC_NATIVE_PREVIEW_URL || 'http://localhost:8081'}/:path*`
      }
    ];
  }
};

export default withMDX(config);
