import { getStrapiMedia, getStrapiURL } from "@/lib/strapi-helper";
import Image from "next/image";

interface StatItem {
  value?: string;
  label?: string;
}

interface FeaturedCaseStudy {
  id: number;
  heading: string;
  imageUrl: string | null;
  stats: StatItem[];
}

interface SectionCard {
  id: string;
  heading: string;
  content: string;
  footerPrimary: string;
  footerSecondary?: string;
  logo?: string | null;
}

function pickAttributes<T extends Record<string, any>>(value: T): T {
  return (value?.attributes || value) as T;
}

function plainText(value?: string): string {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function getTestimonials() {
  const url = getStrapiURL('/testimonials?populate=*&sort[0]=id:asc');
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return [];
  }
}

async function getCaseStudies() {
  const params = new URLSearchParams();
  params.set('sort[0]', 'id:asc');
  params.set('pagination[pageSize]', '20');
  params.set('fields[0]', 'title');
  params.set('fields[1]', 'companyName');
  params.set('fields[2]', 'intro');
  params.set('fields[3]', 'tag');
  params.set('populate[heroCardImage][fields][0]', 'url');
  params.set('populate[statistics][fields][0]', 'value');
  params.set('populate[statistics][fields][1]', 'label');

  const url = getStrapiURL(`/case-studies?${params.toString()}`);

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching case studies:', err);
    return [];
  }
}

export default async function TestimonialsSection() {
  const [strapiTestimonials, strapiCaseStudies] = await Promise.all([
    getTestimonials(),
    getCaseStudies(),
  ]);

  const testimonialCards: SectionCard[] = strapiTestimonials
    .map((item: any): SectionCard | null => {
      const attrs = pickAttributes(item);
      const cardType = attrs.type || 'standard';
      if (cardType !== 'standard') return null;

      return {
        id: `testimonial-${item.id}`,
        heading: attrs.authorCompany || attrs.logoText || attrs.authorName || 'Client Story',
        content: plainText(attrs.content),
        footerPrimary: attrs.authorName || attrs.authorCompany || 'Client',
        footerSecondary: attrs.authorRole,
        logo: getStrapiMedia(attrs.logo?.url || attrs.logo?.data?.attributes?.url),
      };
    })
    .filter(Boolean) as SectionCard[];

  const caseStudyCards: SectionCard[] = strapiCaseStudies
    .map((item: any): SectionCard => {
      const attrs = pickAttributes(item);
      return {
        id: `case-study-${item.id}`,
        heading: attrs.companyName || attrs.title || 'Case Study',
        content: plainText(attrs.intro),
        footerPrimary: attrs.tag || 'Case Study',
        footerSecondary: attrs.title && attrs.title !== attrs.companyName ? attrs.title : undefined,
        logo: getStrapiMedia(attrs.heroCardImage?.url || attrs.heroCardImage?.data?.attributes?.url),
      };
    })
    .filter((card: SectionCard) => Boolean(card.content));

  const featuredCaseStudy = strapiCaseStudies
    .map((item: any): FeaturedCaseStudy => {
      const attrs = pickAttributes(item);
      const statsRaw = Array.isArray(attrs.statistics) ? attrs.statistics : [];
      const stats = statsRaw
        .map((stat: any) => {
          const s = pickAttributes(stat);
          return {
            value: s.value,
            label: s.label,
          } as StatItem;
        })
        .filter((stat: StatItem) => stat.value || stat.label)
        .slice(0, 3);

      return {
        id: item.id,
        heading: attrs.companyName || attrs.title || 'Case Study',
        imageUrl: getStrapiMedia(attrs.heroCardImage?.url || attrs.heroCardImage?.data?.attributes?.url),
        stats,
      };
    })
    .find((item: FeaturedCaseStudy) => item.imageUrl || item.stats.length > 0);

  const homepageCards = [...caseStudyCards, ...testimonialCards];

  if (homepageCards.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-[#F8FAFC]">
      <div className="container-fluid">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="heading-2">What Our Clients Say About Us</h2>
            <p className="sub-description mt-4 mx-auto max-w-3xl text-sm md:text-base">
              Hear directly from customers who have improved service efficiency and achieved
              measurable business outcomes with ServitiumCRM.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(260px,420px)_1fr]">
            {featuredCaseStudy && (
              <article className="relative hidden overflow-hidden rounded-3xl xl:block">
                {featuredCaseStudy.imageUrl ? (
                  <Image
                    src={featuredCaseStudy.imageUrl}
                    alt={featuredCaseStudy.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 40vw, 420px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#2567F4]" />
                )}
                <div className="absolute inset-0 bg-[#2567F4]/75" />

                <div className="relative z-10 flex h-full min-h-107.5 flex-col justify-between p-7 text-white">
                  <h3 className="text-2xl font-bold leading-tight">{featuredCaseStudy.heading}</h3>

                  <div className="space-y-6">
                    {featuredCaseStudy.stats.length > 0 ? (
                      featuredCaseStudy.stats.map((stat: StatItem, idx: number) => (
                        <div key={`${featuredCaseStudy.id}-${idx}`}>
                          <p className="text-5xl font-semibold leading-none">{stat.value}</p>
                          <p className="mt-2 text-3xl font-medium text-white/90">{stat.label}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-base text-white/90">Real-world outcomes from customer implementations.</p>
                    )}
                  </div>
                </div>
              </article>
            )}

            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex w-max gap-6 pr-4">
                {homepageCards.map((card) => {
                  const isFeatured = featuredCaseStudy && card.id === `case-study-${featuredCaseStudy.id}`;
                  return (
                    <article
                      key={card.id}
                      className={`flex h-107.5 w-[min(86vw,510px)] shrink-0 snap-start flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:p-8 ${isFeatured ? "xl:hidden" : ""}`}
                    >
                      <div className="min-h-[48px] pt-1">
                        {card.logo ? (
                          <Image
                            src={card.logo}
                            alt={card.heading}
                            width={180}
                            height={48}
                            className="h-12 w-auto object-contain"
                          />
                        ) : (
                          <h3 className="text-[38px] font-bold leading-none text-[#18191D]">{card.heading}</h3>
                        )}
                      </div>

                      <div className="mt-5 flex-1 overflow-y-auto pr-2">
                        <p className="text-sm leading-[1.65] text-[#5F6577] md:text-base">
                          {card.content}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-gray-100 pt-5">
                        <p className="truncate text-3xl font-bold text-[#18191D]">
                          {card.footerPrimary}
                        </p>
                        {card.footerSecondary && (
                          <p className="truncate text-sm text-[#5F6577] md:text-base">{card.footerSecondary}</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}