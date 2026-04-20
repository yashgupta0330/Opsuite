import SectionRenderer from '@/components/service-page/SectionRenderer';
import { getSinglePage } from '@/lib/strapi-pages';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSinglePage('industries-page');

  if (!page) {
    return {
      title: 'Industries',
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.shortDescription,
  };
}

export default async function IndustriesPage() {
  const page = await getSinglePage('industries-page');

  if (!page) {
    return notFound();
  }

  return (
    <main data-theme={page.themeColor?.toLowerCase() || 'orange'}>
      <SectionRenderer sections={page.sections} themeColor={page.themeColor} />
    </main>
  );
}