import { BlogContent } from '@/components/blog/BlogContent';
import { RelatedBlogs } from '@/components/blog/RelatedBlogs';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { getStrapiMedia, getStrapiURL } from '@/lib/strapi-helper';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const REVALIDATE_TIME = 60;
const FALLBACK_IMAGE = '/placeholder-image/placeholder.png';

function generateTOC(content: unknown): { id: string; title: string }[] {
    if (typeof content === 'string') {
        return Array.from(
            (content as string).matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)
        ).map(m => ({ id: m[1], title: m[2] }));
    }
    if (Array.isArray(content)) {
        return (content as Record<string, unknown>[])
            .filter(block => block.type === 'heading' && block.level === 2)
            .map(block => {
                const children = (block.children as Record<string, unknown>[]) ?? [];
                const text = children.map(c => String(c.text ?? '')).join('');
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return { id, title: text };
            });
    }
    return [];
}

function extractImageUrl(coverImage: unknown): string {
    if (Array.isArray(coverImage) && coverImage.length > 0) {
        return getStrapiMedia((coverImage[0] as Record<string, unknown>)?.url as string) || FALLBACK_IMAGE;
    }
    if (coverImage && typeof coverImage === 'object') {
        const c = coverImage as Record<string, unknown>;
        if (c.url) return getStrapiMedia(c.url as string) || FALLBACK_IMAGE;
        const nested = (c.data as Record<string, unknown>)?.attributes as Record<string, unknown> | undefined;
        if (nested?.url) return getStrapiMedia(nested.url as string) || FALLBACK_IMAGE;
    }
    return FALLBACK_IMAGE;
}

async function fetchBlog(slug: string) {
    try {
        const url = getStrapiURL(`/blogs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=coverImage`);
        const res = await fetch(url, { next: { revalidate: REVALIDATE_TIME } });
        if (!res.ok) return null;
        const data = await res.json();
        return (data.data as Record<string, unknown>[])?.[0] ?? null;
    } catch {
        return null;
    }
}

async function fetchRelatedBlogs(currentSlug: string): Promise<Record<string, unknown>[]> {
    try {
        const url = getStrapiURL('/blogs?populate[0]=coverImage&sort[0]=date:desc&pagination[pageSize]=4');
        const res = await fetch(url, { next: { revalidate: REVALIDATE_TIME } });
        if (!res.ok) return [];
        const data = await res.json();
        return ((data.data as Record<string, unknown>[]) ?? [])
            .filter(b => b.slug !== currentSlug)
            .slice(0, 3);
    } catch {
        return [];
    }
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const raw = await fetchBlog(slug);
    if (!raw) return {};
    return {
        title: raw.title as string,
        description: (raw.excerpt as string) || (raw.title as string),
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [raw, related] = await Promise.all([fetchBlog(slug), fetchRelatedBlogs(slug)]);

    if (!raw) return notFound();

    const dateStr = (raw.date || raw.publishedAt) as string | undefined;
    const blog = {
        title: raw.title as string,
        date: dateStr
            ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : '',
        timeToRead: parseInt(String(raw.readTime ?? '')) || 5,
        image: extractImageUrl(raw.coverImage),
        content: (raw.content ?? []) as unknown,
    };

    const toc = generateTOC(blog.content);

    return (
        <main className="bg-white">
            {/* Header */}
            <section className="masthead pb-10 bg-white">
                <div className="container-fluid">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="w-full lg:w-1/2">
                            <Link href="/blogs" className="text-system-black text-[16px] font-semibold hover:underline mb-6 inline-block">
                                ← All Blogs
                            </Link>
                            <h1 className="text-system-black text-3xl xl:text-[2.25rem] font-bold leading-[1.3] mb-5">
                                {blog.title}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-text text-[14px]">
                                <span>{blog.date}</span>
                                <span>•</span>
                                <span>{blog.timeToRead} min read</span>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="relative aspect-video rounded-[18px] overflow-hidden">
                                <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="py-10 lg:py-16">
                <div className="container-fluid">
                    <div className="flex gap-0 xl:gap-20">
                        <BlogSidebar toc={toc} />
                        <div className="flex-1 max-w-full xl:max-w-[calc(100%-540px)]">
                            <BlogContent content={blog.content} />
                        </div>
                        <aside className="hidden xl:block w-65">
                            <div className="rounded-xl bg-[#FAFAFA] p-5 border border-[#F1F1F1] sticky top-25">
                                <p className="text-[1.125rem] font-semibold text-system-black mb-2">About ServitiumCRM</p>
                                <p className="text-[14px] text-[#555] leading-[1.55] mb-4">
                                    Transforming after-sales service management with intelligent CRM solutions for modern businesses.
                                </p>
                                <Link href="/mycompany/about-us" className="text-[14px] font-semibold text-system-black hover:underline">
                                    Learn more
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {related.length > 0 && <RelatedBlogs blogs={related} />}
        </main>
    );
}
