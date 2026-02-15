import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import remarkSnackPlayer from './lib/remark-snackplayer';

export const { docs, meta } = defineDocs({
  dir: 'content/docs'
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSnackPlayer]
  }
});
