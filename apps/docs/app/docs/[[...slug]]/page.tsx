import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { ComponentPreview } from '@/components/mdx';
import { source } from '@/lib/source';

interface PageProps {
  /** Route params */
  params: Promise<{ slug?: string[] }>;
}

const Page = async (props: PageProps) => {
  const { params } = props;
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            ComponentPreview
          }}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps) {
  const { params } = props;
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  return {
    description: page.data.description,
    title: page.data.title
  };
}
