import SectionRenderer from '@/components/service-page/SectionRenderer';
import { getCollectionPageBySlug, getCollectionSlugs } from '@/lib/strapi-pages';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ThemeSync from '@/components/ThemeSync';

// Enable dynamic params
export const dynamicParams = true;

// Generate static params for known pages
export async function generateStaticParams() {
  const slugs = await getCollectionSlugs('service-pages');

  return slugs
    .filter((slug) => slug.includes('/'))
    .map((slug) => ({ slug: slug.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCollectionPageBySlug('service-pages', slug);
  if (!page) return {};

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.shortDescription,
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = await getCollectionPageBySlug('service-pages', slug);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <ThemeSync theme={page.themeColor} />
      <main>
        <SectionRenderer sections={page.sections} themeColor={page.themeColor} />
      </main>
    </>
  );
}
