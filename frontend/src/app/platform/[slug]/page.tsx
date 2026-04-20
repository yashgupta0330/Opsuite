import SectionRenderer from '@/components/service-page/SectionRenderer';
import { getCollectionPageBySlug } from '@/lib/strapi-pages';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = await getCollectionPageBySlug('platforms', slug);
    if (!page) return {};

    return {
        title: page.metaTitle || page.title,
        description: page.metaDescription || page.shortDescription,
    };
}


export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getCollectionPageBySlug('platforms', slug);

    if (!page) {
        return notFound();
    }

    return (
        <main data-theme={page.themeColor?.toLowerCase()}>
            <SectionRenderer sections={page.sections} themeColor={page.themeColor} />
        </main>
    );
}
