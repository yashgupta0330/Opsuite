import SectionRenderer from '@/components/service-page/SectionRenderer';
import { getCollectionPageBySlug, getCollectionSlugs } from '@/lib/strapi-pages';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Enable dynamic params to allow pages not in generateStaticParams
export const dynamicParams = true;

// Generate static params for known solution pages
export async function generateStaticParams() {
    const slugs = await getCollectionSlugs('service-pages');

    return slugs
        .filter((slug) => !slug.includes('/'))
        .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = await getCollectionPageBySlug('service-pages', slug);
    if (!page) return {};

    return {
        title: page.metaTitle || page.title,
        description: page.metaDescription || page.shortDescription,
    };
}


export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getCollectionPageBySlug('service-pages', slug);

    if (!page) {
        return notFound();
    }

    return (
        <main data-theme={page.themeColor?.toLowerCase()}>
            <SectionRenderer sections={page.sections} themeColor={page.themeColor} />
        </main>
    );
}
