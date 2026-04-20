import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  summary: string;
  date: string;
  timeToRead: number;
  image: string;
  slug: string;
  category?: string;
}

export const BlogCard = ({ title, summary, date, timeToRead, image, slug, category }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${slug}`} className="group h-full">
      <div className="bg-white rounded-[12px] flex flex-col h-full shadow-blog-card transition-all duration-300 hover:shadow-blog-card-hover hover:-translate-y-[5px] overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden rounded-t-[12px] img-sweep-effect">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-600 group-hover:scale-110"
          />
        </div>
        {/* Card Body */}
        <div className="p-4 md:p-[16px_20px] flex flex-col grow bg-white rounded-b-[12px]">
          <div className="flex items-center gap-[9px] mb-2">
            <span className="text-gray-base text-[12px] font-medium leading-[21px]">{date}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
              <circle cx="2.5" cy="2.5" r="2.5" fill="#979797" />
            </svg>
            <span className="text-gray-base text-[12px] font-medium leading-[21px]">{timeToRead} min read</span>
          </div>
          {category && (
            <span className="inline-block text-[11px] font-semibold text-brand-primary mb-2">
              {category}
            </span>
          )}
          <div className="flex flex-col gap-2 grow mb-4">
            <h5 className="text-system-black text-[20px] font-semibold leading-[1.4] tracking-[0.3px] line-clamp-2 min-h-[2.8em]">
              {title}
            </h5>
            <p className="text-system-black text-[14px] leading-[21px] line-clamp-3">
              {summary}
            </p>
          </div>
          <div className="mt-auto">
            <button className="px-6 py-2 text-[14px] font-medium text-system-black bg-transparent border border-system-black rounded-full cursor-pointer">
              Read More
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
