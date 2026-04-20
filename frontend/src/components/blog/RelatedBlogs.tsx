import { BlogCard } from './BlogCard';
import { getStrapiMedia } from '@/lib/strapi-helper';

export const RelatedBlogs = ({ blogs }: { blogs: any[] }) => {
    return (
        <section className="py-12">
            <div className="container-fluid-blog">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-system-black">You Might Also Like</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            summary={blog.summary || blog.excerpt}
                            date={blog.date}
                            timeToRead={blog.timeToRead || 5}
                            image={getImageUrl(blog)}
                            slug={blog.slug}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const getImageUrl = (blog: any) => {
    // Handle both direct image string (from mock) and Strapi object
    if (typeof blog.image === 'string') return blog.image;

    const cover = blog.coverImage;
    let url = '';

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
}