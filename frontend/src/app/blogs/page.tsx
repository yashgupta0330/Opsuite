import { SearchableBlogs } from '@/components/blog/SearchableBlogs';
import { getStrapiURL } from '@/lib/strapi-helper';

const REVALIDATE_TIME = 60;

async function getBlogs(): Promise<unknown[]> {
    try {
        const url = getStrapiURL('/blogs?populate[0]=coverImage&sort[0]=date:desc&pagination[pageSize]=100');
        const res = await fetch(url, { next: { revalidate: REVALIDATE_TIME } });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data.data) ? data.data : [];
    } catch {
        return [];
    }
}

export default async function BlogListingPage() {
    const blogs = await getBlogs();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <SearchableBlogs initialBlogs={blogs as any} />;
}
