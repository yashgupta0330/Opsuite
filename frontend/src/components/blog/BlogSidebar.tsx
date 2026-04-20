'use client';
import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  title: string;
}

export const BlogSidebar = ({ toc }: { toc: TOCItem[] }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 140,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside className="hidden xl:block w-[240px] sticky top-[100px] h-fit">
      <nav>
        <ul className="space-y-3">
          {toc.map((item) => (
            <li
              key={item.id}
              className={`relative pl-0 transition-all duration-300 ${activeId === item.id ? 'before:content-[""] before:absolute before:-left-[14px] before:top-[8px] before:w-[6px] before:height-[6px] before:rounded-full before:bg-system-black' : ''
                }`}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-[14px] leading-[1.6] text-left transition-colors duration-300 cursor-pointer ${activeId === item.id ? 'text-system-black font-semibold' : 'text-system-black'
                  }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
