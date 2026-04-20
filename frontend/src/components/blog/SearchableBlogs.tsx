"use client";

import Fuse from 'fuse.js';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';
import { getStrapiMedia } from '@/lib/strapi-helper';

interface Blog {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: any;
    date: string;
    readTime: string;
    category: string;
    publishedAt: string;
}

interface SearchableBlogsProps {
    initialBlogs: Blog[];
}

export function SearchableBlogs({ initialBlogs }: SearchableBlogsProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Build sorted category list with counts
    const categories = useMemo(() => {
        const map = new Map<string, number>();
        initialBlogs.forEach(b => {
            if (b.category) map.set(b.category, (map.get(b.category) ?? 0) + 1);
        });
        return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    }, [initialBlogs]);

    const fuse = useMemo(() => {
        return new Fuse(initialBlogs, {
            keys: [
                { name: 'title', weight: 2 },
                { name: 'excerpt', weight: 1.5 },
                { name: 'category', weight: 1 },
            ],
            threshold: 0.3,
            ignoreLocation: true,
            minMatchCharLength: 2,
        });
    }, [initialBlogs]);

    const filteredBlogs = useMemo(() => {
        let list = initialBlogs;
        if (activeCategory) list = list.filter(b => b.category === activeCategory);
        if (!searchQuery.trim()) return list;
        const results = fuse.search(searchQuery, { limit: 50 });
        return results.map((result: { item: Blog }) => result.item).filter(b => !activeCategory || b.category === activeCategory);
    }, [fuse, searchQuery, activeCategory, initialBlogs]);

    const latestBlog = initialBlogs[0];

    const getImageUrl = (blog: Blog) => {
        // More robust image URL detection for Strapi 5
        let url = '';
        const cover = blog.coverImage;

        if (Array.isArray(cover) && cover.length > 0) {
            url = cover[0]?.url;
        } else if (cover && cover.url) {
            url = cover.url;
        } else if (cover && cover.data && cover.data.attributes) {
            url = cover.data.attributes.url;
        }

        if (url) {
            return getStrapiMedia(url) || '/assets/img/blogs/default.png';
        }
        return '/assets/img/blogs/default.png';
    };

    return (
        <main className="bg-white">
            {/* Masthead Section */}
            {latestBlog && !searchQuery && (
                <section className="bg-theme-light-yellow overflow-hidden masthead relative min-h-125 lg:min-h-154 flex items-center">
                    <div className="container-fluid relative z-10 w-full py-12 lg:py-16">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-center">
                            <div className="w-full lg:w-1/2 pr-0 lg:pr-20">
                                <div className="content">
                                    <span className="inline-block bg-white text-system-black text-[12px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full mb-6">
                                        Latest Insights
                                    </span>
                                    <h1 className="text-system-black text-4xl lg:text-[4.5rem] font-bold leading-[1.05] mb-6 lg:mb-8 tracking-[-0.02em]">
                                        {latestBlog.title}
                                    </h1>
                                    <p className="text-gray-text text-lg lg:text-[1.25rem] leading-[1.6] mb-8 lg:mb-10 max-w-135">
                                        {latestBlog.excerpt}
                                    </p>
                                    <a href={`/blogs/${latestBlog.slug}`} className="btn-modern-dark">
                                        Read Article
                                    </a>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="relative aspect-video lg:aspect-[1.4] rounded-4xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={getImageUrl(latestBlog)}
                                        alt={latestBlog.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Blogs List Section */}
            <section className="py-16 lg:py-24">
                <div className="container-fluid">
                    {/* Header row: title + search */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-system-black">All Blogs</h2>
                            <p className="text-gray-text mt-2">Explore our latest thoughts and industry news</p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-5 bg-white border border-[#E5E7EB] rounded-full focus:outline-none focus:ring-2 focus:ring-theme-yellow/20 focus:border-theme-yellow text-system-black transition-all text-sm"
                            />
                            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Main content: Blog grid + Sidebar */}
                    <div className="flex flex-col lg:flex-row lg:items-start gap-10">

                        {/* ── Blog Grid ── */}
                        <div className="min-w-0 flex-1">
                            {filteredBlogs.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {filteredBlogs.map((blog) => (
                                        <BlogCard
                                            key={blog.id}
                                            title={blog.title}
                                            summary={blog.excerpt}
                                            date={blog.date}
                                            timeToRead={parseInt(blog.readTime) || 5}
                                            image={getImageUrl(blog)}
                                            slug={blog.slug}
                                            category={blog.category}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                                    <h3 className="text-xl font-semibold text-system-black mb-2">No articles found</h3>
                                    <p className="text-gray-text">Try adjusting your search terms or filter</p>
                                </div>
                            )}
                        </div>

                        {/* ── Right Sidebar ── */}
                        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28">

                            {/* Categories */}
                            {categories.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-[18px] font-bold text-system-black mb-4">Categories</h3>
                                    <ul className="space-y-[10px]">
                                        {categories.map(([cat, count]) => (
                                            <li key={cat}>
                                                <button
                                                    onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                                                    className={`w-full text-left text-[15px] leading-snug transition-colors cursor-pointer ${
                                                        activeCategory === cat
                                                            ? 'font-semibold text-brand-primary'
                                                            : 'text-gray-600 hover:text-system-black'
                                                    }`}
                                                >
                                                    {cat} ({count})
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Featured */}
                            {latestBlog && (
                                <div>
                                    <h3 className="text-[18px] font-bold text-system-black mb-4">Featured</h3>
                                    <a href={`/blogs/${latestBlog.slug}`} className="group block">
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3">
                                            <Image
                                                src={getImageUrl(latestBlog)}
                                                alt={latestBlog.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-gray-500 text-[12px]">{latestBlog.date}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 5 5" fill="none">
                                                <circle cx="2.5" cy="2.5" r="2.5" fill="#979797" />
                                            </svg>
                                            <span className="text-gray-500 text-[12px]">{parseInt(latestBlog.readTime) || 5} min read</span>
                                        </div>
                                        {latestBlog.category && (
                                            <span className="inline-block text-[12px] font-semibold text-brand-primary mb-1">
                                                {latestBlog.category}
                                            </span>
                                        )}
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="text-[15px] font-semibold text-system-black leading-snug line-clamp-3 group-hover:text-brand-primary transition-colors">
                                                {latestBlog.title}
                                            </h4>
                                            <svg className="shrink-0 mt-0.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}