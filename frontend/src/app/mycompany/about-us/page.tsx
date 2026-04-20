"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "./team-carousel.css";

import AdvantageSection from "@/components/service-page/AdvantageSection";
import SideFeature from "@/components/service-page/SideFeature";
import NumberedBenefits from "@/components/service-page/NumberedBenefits";

const whatMakesUsDifferentCards = [
  {
    id: 1,
    title: "Seamless Omni-Channel Engagement",
    description:
      "Engage customers across phone, email, WhatsApp, mobile apps and more all unified within a single customer view to ensure consistent and connected service experiences.",
    icon: "/about-us/icon.svg",
  },
  {
    id: 2,
    title: "AI-Enabled Intelligence & Predictive Workflows",
    description:
      "Advanced AI and machine learning capabilities enable predictive service models, automated workflows and intelligent prioritization helping teams act faster and smarter.",
    icon: "/about-us/icon.svg",
  },
  {
    id: 3,
    title: "Service-First CRM, Not Sales-Centric",
    description:
      "Unlike traditional CRM platforms focused primarily on sales pipelines, ServitiumCRM is engineered specifically for after-sales service operations. It delivers complete operational control along with unified customer insights in a single platform.",
    image: "/about-us/placeholder.png",
  },
  {
    id: 4,
    title: "Oracle Cloud-Powered Scalability",
    description:
      "Built on secure and robust Oracle Cloud Infrastructure (OCI), ServitiumCRM delivers enterprise-grade performance, reliability and scalability for high-volume service environments.",
    icon: "/about-us/icon.svg",
  },
  {
    id: 5,
    title: "Mobile-First for Field & Retail Teams",
    description:
      "Empower technicians, dealers and service partners with intuitive mobile capabilities for request management, tracking, real-time updates and SLA compliance.",
    icon: "/about-us/icon.svg",
  },
];

function IconCard({ card }: { card: (typeof whatMakesUsDifferentCards)[0] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-4">
        <Image src={card.icon!} alt={card.title} width={40} height={40} className="object-contain" />
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-2">{card.title}</h3>
      <p className="text-gray-500 text-base leading-relaxed">{card.description}</p>
    </div>
  );
}

function WhatMakesUsDifferent() {
  const [card1, card2, card3, card4, card5] = whatMakesUsDifferentCards;

  return (
    <section className="py-20 bg-(--color-base-10)">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-6">
            What Makes Us Different
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore the latest product updates, improvements and features designed to help service
            teams work faster, stay informed and deliver better customer experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left column: 2 stacked icon cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <IconCard card={card1} />
            <IconCard card={card2} />
          </div>

          {/* Middle column: tall image card */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg border border-gray-100 p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300 gap-6">
              <div className="relative w-full aspect-4/3 overflow-hidden rounded">
                <Image
                  src={card3.image!}
                  alt={card3.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{card3.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{card3.description}</p>
              </div>
            </div>
          </div>

          {/* Right column: 2 stacked icon cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <IconCard card={card4} />
            <IconCard card={card5} />
          </div>
        </div>
      </div>
    </section>
  );
}

const teamMembers = [
  {
    name: "Tarun Agarwal",
    role: "Director- Technology",
    subRole: "",
    image: "/about-us/tarun.jpg",
    linkedin: "https://www.linkedin.com/in/agarwaltarun/",
  },
  {
    name: "Amit Chauhan",
    role: "VP - Product Engineering & Operations",
    subRole: "",
    image: "/about-us/amit.jpg",
    linkedin: "https://www.linkedin.com/in/amit-chauhan-18059635/",
  },
  {
    name: "Rahul Mishra",
    role: "AVP - Business Growth",
    subRole: "",
    image: "/about-us/rahul.jpg",
    linkedin: "https://linkedin.com/in/rahulmishra82",
  },
  {
    name: "Vipul Jain",
    role: "Product Evangelist & Implementation",
    subRole: "",
    image: "/about-us/vipul.jpg",
    linkedin: "https://www.linkedin.com/in/vipul-jain-2518773/",
  },
  {
    name: "Aashish Narain",
    role: "SPME - Integration Specialist",
    subRole: "(ERP, IoT & Digital)",
    image: "/about-us/ashish.jpg",
    linkedin: "",
  },
  {
    name: "Ashok Balyan",
    role: "SPME - Data Engineering & AI",
    subRole: "",
    image: "/about-us/ashok.png",
    linkedin: "",
  },
  {
    name: "Nitin Goyal",
    role: "PME - Business Process & Implementation",
    subRole: "",
    image: "/about-us/nitin.jpg",
    linkedin: "https://www.linkedin.com/in/nitin-goyal-192680177/",
  },
  {
    name: "Nitin Saxena",
    role: "PME - Business Process & Implementation",
    subRole: "",
    image: "/about-us/saxena.jpg",
    linkedin: "https://www.linkedin.com/in/nitin-saxena-1455b716/",
  },
  {
    name: "Anil Kumar Singh",
    role: "PME - LCNC & Tech",
    subRole: "",
    image: "/about-us/anil.jpg",
    linkedin: "https://www.linkedin.com/in/anil-singh-76b0b0105/",
  },
  {
    name: "Yogita Chhabra",
    role: "Presales Consultant",
    subRole: "",
    image: "/about-us/yogita.jpg",
    linkedin: "https://www.linkedin.com/in/yogita-chhabra-51463740/",
  },
];



function TeamCarouselSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="text-center">
          <h2 className="heading-2">The People Behind ServitiumCRM</h2>
          <p className="sub-description mt-4 md:max-w-4xl mx-auto">
            Our team works closely with enterprises to understand their service
            challenges and deliver practical, scalable solutions that drive
            measurable outcomes.
          </p>
        </div>

        <div className="mt-8 md:mt-12 relative">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={handleSlideChange}
            speed={700}
            grabCursor
            watchSlidesProgress
            resistanceRatio={0.85}
            touchRatio={1}
            longSwipesRatio={0.2}
            longSwipesMs={250}
            spaceBetween={34}
            slidesPerView="auto"
            className="team-swiper w-full pb-12!"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="h-85! w-77.5!">
                <div className="h-85 w-77.5 overflow-hidden rounded-[10px] border border-[#D7e2fc] bg-white ">
                  <div className="relative h-65.5 w-full bg-gray-50">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative h-19.5 px-6 py-3">
                    <div className="pr-10">
                      <h4 className="text-lg font-bold leading-5 text-[#18191D]">
                        {member.name}
                      </h4>
                      <p className="mt-1 text-sm leading-[1.35] text-[#5F6577]">
                        {member.role}
                        {member.subRole ? (
                          <>
                            <br />
                            {member.subRole}
                          </>
                        ) : (
                          <>
                            <br />
                            &nbsp;
                          </>
                        )}
                      </p>
                    </div>
                    {member.linkedin && (
                      <div className="absolute right-3 bottom-3">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2567F4] transition-colors hover:bg-[#E5EFFF]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="w-full flex justify-center md:justify-end items-center mt-6 gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                isBeginning
                  ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                  : "bg-white border-gray-300 text-gray-800 hover:bg-gray-900 hover:border-gray-900 hover:text-white cursor-pointer"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                isEnd
                  ? "bg-gray-900 border-gray-900 text-white/30 cursor-not-allowed"
                  : "bg-gray-900 border-gray-900 text-white hover:bg-gray-700 hover:border-gray-700 cursor-pointer"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const committedToItems = [
  {
    id: 1,
    number: "1",
    title: "",
    description: "Simplifying the complexity of after-sales service operations",
  },
  {
    id: 2,
    number: "2",
    title: "",
    description: "Enhancing service team productivity and performance",
  },
  {
    id: 3,
    number: "3",
    title: "",
    description: "Delivering measurable improvements in customer satisfaction and retention",
  },
  {
    id: 4,
    number: "4",
    title: "",
    description: "Driving service-led revenue growth while optimizing operational costs",
  },
];

const aboutTestimonials = [
  {
    id: 1,
    type: "featured" as const,
    logo: "/about-us/logo.svg",
    bgImage: "/testimonial/hafele.png",
    logoWrapperClassName: "flex justify-start pt-2",
    stats: [
      { value: "0000", label: "Lorem ipsum dolor sit amet" },
      { value: "0000", label: "Lorem ipsum dolor sit amet" },
      { value: "000", label: "Lorem ipsum dolor sit amet" },
    ],
    cta: "View customer story ->",
  },
  {
    id: 2,
    type: "standard" as const,
    logo: "/testimonial/johnson.png",
    logoWrapperClassName: "pt-5",
    content:
      "With WhatsApp and ServitiumCRM integration, we could bring up a lot of confidence in our consumer when he's able to interact with us without any hassles at his own convenience... This entire process has been, you know, it has been a...",
    authorName: "Rakesh Gupta",
    authorRole: "Customer Service Head consectetur, Johnson Pvt. Ltd.",
    authorImage: "/testimonial/author.png",
  },
  {
    id: 3,
    type: "standard" as const,
    logoText: "Finolex",
    logoTextClassName: "text-[40px] leading-none font-bold text-[#0EA5E9]",
    logoWrapperClassName: "pt-3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.",
    authorName: "Marie Bati",
    authorRole: "Lorem ipsum sit amet, consectetur adipiscing elit.",
    authorImage: "/testimonial/marie.png",
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      <section>
        <div
          className="rounded-2xl md:rounded-3xl px-4 py-10 md:px-8 md:py-16 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/about-us/bg.png')" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-white/80 border border-gray-200 px-3 py-1 text-xs md:text-sm font-semibold text-[#18191D]">
              About ServitiumCRM
            </span>

            <h1 className="heading-1">
              Designed to Deliver Consistent, Connected Customer Experiences
            </h1>

            <p className="sub-description mt-4">
              ServitiumCRM is an AI/ML-driven service management platform built
              on deep service delivery expertise. Trusted by service leaders and
              CIOs, it enables intelligent after-sales service.{" "}
            </p>

            <div className="mt-6 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link href="/mycompany/contact-us" className="btn btn-primary">
                Register for a Demo
              </Link>
              <Link href="/solutions" className="btn btn-outlined">
                Explore Features
              </Link>
            </div>

            <div className="mt-8 md:mt-12 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] text-white px-4 py-2 text-xs md:text-sm font-medium">
                <span className="text-yellow-300">*</span>
                Loved by 1M+ users worldwide
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 md:py-18 space-y-12">
        <AdvantageSection
          id={1}
          __component="advantage.section"
          title="What ServitiumCRM Does?"
          description="We enable organizations to deliver satisfaction at every customer touchpoint through consistent scalability."
        />

        <SideFeature
          sectionTitle="Our Mission"
          sectionDescription="To empower enterprises to build exceptional after-sales service that drives customer satisfaction and profitable growth."
          image={{ url: "/about-us/manage.png" }}
          imagePosition="right"
          features={[
            {
              id: 1,
              title: "Eliminate Manual Service Processes",
              description:
                "Remove fragmented workflows and automate service operations end-to-end.",
              icon: { url: "/about-us/mission.svg" },
            },
            {
              id: 2,
              title: "Enable Data-Driven Decisions",
              description:
                "Provide accurate insights to support faster and smarter service decisions.",
              icon: { url: "/about-us/vision.svg" },
            },
            {
              id: 3,
              title: "Improve Fix Rates & Reduce Costs",
              description:
                "Increase first-time fix rates while lowering warranty and service costs.",
              icon: { url: "/about-us/cross.png" },
            },
          ]}
        />

        <SideFeature
          sectionTitle="Our Vision"
          sectionDescription="Is to redefine service delivery across industries by enabling responsive and value-driven experiences."
          image={{ url: "/about-us/manage.png" }}
          imagePosition="left"
          features={[
            {
              id: 1,
              title: "Innovation & Intelligent Automation",
              description:
                "Through innovation and intelligent automation, we transform service delivery.",
              icon: { url: "/about-us/mission.svg" },
            },
            {
              id: 2,
              title: "From Reactive to Proactive",
              description:
                "Move beyond reactive issue resolution to predictive, proactive service.",
              icon: { url: "/about-us/vision.svg" },
            },
            {
              id: 3,
              title: "Anticipate Needs & Delight",
              description:
                "Anticipate needs, prevent disruptions and delight customers consistently.",
              icon: { url: "/about-us/cross.png" },
            },
          ]}
        />
      </div>

      <TeamCarouselSection />

      <WhatMakesUsDifferent />

      <div className="py-12 md:py-16">
        <NumberedBenefits
          sectionTitle="At ServitiumCRM, we are committed to:"
          sectionDescription="We help organizations transition from reactive support models to proactive service excellence, strengthening customer loyalty and turning service into a strategic advantage."
          items={committedToItems}
        />
      </div>

      <section className="container-fluid py-10 md:py-14 ">
        <div
          className="max-w-7xl mx-auto rounded-2xl md:rounded-3xl p-5 md:p-8 min-h-52 md:min-h-62 bg-cover bg-center bg-no-repeat flex items-center"
          style={{ backgroundImage: "url('/about-us/card.png')" }}
        >
          <div className="max-w-[58%] md:max-w-[50%]">
            <Image
              src="/about-us/logo.svg"
              alt="Hafele"
              width={124}
              height={32}
              className="h-6 md:h-8 w-auto object-contain"
            />
            <p className="mt-3 md:mt-4 text-white text-xl md:text-[32px] leading-tight md:leading-[1.08] font-medium">
              &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididu&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-fluid">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="heading-2">What Our Clients Say About Us</h2>
              <p className="sub-description mt-4 mx-auto max-w-3xl">
                Hear directly from customers who have improved service efficiency and achieved
                measurable business outcomes with ServitiumCRM.
              </p>
            </div>

            <div className="grid justify-center gap-6 md:grid-cols-2 xl:grid-cols-3">
              {aboutTestimonials.map((card) =>
                card.type === "featured" ? (
                  <article
                    key={card.id}
                    className="relative h-[494px] w-full max-w-[448px] overflow-hidden rounded-3xl p-6 text-white"
                    style={{
                      backgroundImage: `url('${card.bgImage}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="relative z-10 flex h-full flex-col">
                      <div className={card.logoWrapperClassName}>
                        <Image
                          src={card.logo}
                          alt="Hafele"
                          width={118}
                          height={28}
                          className="h-7 w-auto object-contain"
                        />
                      </div>

                      <div className="mt-10 space-y-7">
                        {card.stats.map((stat) => (
                          <div key={stat.value + stat.label}>
                            <p className="text-[40px] font-bold leading-none tracking-[-0.03em]">
                              {stat.value}
                            </p>
                            <p className="mt-2 text-xl leading-7 text-white/90">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <Link
                        href="/"
                        aria-disabled="true"
                        onClick={(event) => event.preventDefault()}
                        className="mt-auto inline-flex cursor-not-allowed text-base font-semibold text-white/70 underline underline-offset-4 transition-opacity hover:text-white/70"
                      >
                        {card.cta}
                      </Link>
                    </div>
                  </article>
                ) : (
                  <article
                    key={card.id}
                    className="flex h-[494px] w-full max-w-[448px] flex-col rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                  >
                    <div className={`min-h-[48px] ${card.logoWrapperClassName ?? ""}`}>
                      {card.logo ? (
                        <Image
                          src={card.logo}
                          alt={card.authorName}
                          width={116}
                          height={40}
                          className="h-10 w-auto object-contain"
                        />
                      ) : (
                        <p className={card.logoTextClassName}>{card.logoText}</p>
                      )}
                    </div>

                    <p className="mt-8 text-xl leading-[1.7] text-[#5F6577]">
                      {card.content}
                    </p>

                    <div className="mt-auto flex items-center gap-4 pt-8">
                      <Image
                        src={card.authorImage}
                        alt={card.authorName}
                        width={58}
                        height={58}
                        className="h-[58px] w-[58px] rounded-full object-cover"
                      />
                      <div>
                        <p className="text-lg font-bold text-[#18191D]">
                          {card.authorName}
                        </p>
                        <p className="text-base leading-6 text-[#5F6577]">
                          {card.authorRole}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}