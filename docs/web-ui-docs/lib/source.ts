import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import type { Folder, Node, Root } from 'fumadocs-core/page-tree';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export type DocsSection = 'components' | 'overview';

function hasSectionPage(node: Node, section: DocsSection): boolean {
  const prefix = `/${section}/`;

  if (node.type === 'page') {
    return node.url === `/${section}` || node.url.startsWith(prefix);
  }

  if (node.type === 'folder') {
    const indexMatches = node.index
      ? node.index.url === `/${section}` || node.index.url.startsWith(prefix)
      : false;

    return indexMatches || node.children.some(child => hasSectionPage(child, section));
  }

  return false;
}

function findSectionFolder(root: Root, section: DocsSection): Folder | undefined {
  return root.children.find(
    (node): node is Folder => node.type === 'folder' && hasSectionPage(node, section),
  );
}

export function getSectionPageTree(section: DocsSection): Root {
  const root = source.getPageTree();
  const folder = findSectionFolder(root, section);

  if (!folder) return root;

  return {
    ...root,
    name: folder.name,
    children: folder.children,
  };
}

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
