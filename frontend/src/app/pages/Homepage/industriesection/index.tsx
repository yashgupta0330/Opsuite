"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./industriesection.css";

const industries = [
  {
    title: "Consumer Electronics & Durable Goods",
    description:
      "Complete warranty management, multi-location service operations, and field coordination for manufacturers at scale.",
    image: "/industry/appliances.png",
  },
  {
    title: "Sanitaryware & Wellness Products",
    description:
      "Install management,B2B contract handling, and project site coordination for complex deployments",
    image: "/industry/sanitaryware.png",
  },
  {
    title: "HVAC Systems",
    description:
      "Specialized service workflows, charging infrastructure support, and battery lifecycle management",
    image: "/industry/hvac.png",
  },
  {
    title: "EV, Energy & Renewable Systems",
    description:
      "Fast-track warranty claims, walk-in operations , and device swap management for high-velocity service environments. ",
    image: "/industry/mobiles.png",
  },
  {
    title: "Health & Medical Equipment",
    description:
      "Ensure timely maintenance, compliant service workflows, and rapid issue resolution to keep critical equipment operational. ",
    image: "/industry/healthcare.png",
  },
  {
    title: "Industrial Equipment & Machinery",
    description:
      "End-to-end lifecycle management for mobile devices and laptop computers.",
    image: "/industry/industry.png",
  },
];

export default function IndustriesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="!pb-0">
      <div className="container-fluid">
        <div className="px-4 md:px-6">
          <h2 className="heading-2 text-center mx-auto">
            Serving Excellence Across Diverse Industries
          </h2>
          <p className="sub-description text-center md:max-w-[70%] mx-auto mt-4 mb-0">
            Trusted by Service Heads & CIOs, ServitiumCRM supports diverse
            industries, delivering consistent service excellence.  {" "}
          </p>
        </div>
        <div className="flex-1 w-full px-4 md:px-0 mt-12 md:mt-10">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={handleSlideChange}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="industries-swiper w-full"
          >
            {industries.map((item) => (
              <SwiperSlide key={item.title}>
                <div className="relative rounded-xl overflow-hidden cursor-pointer group  transition-[border-color,box-shadow] duration-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-[min-height] duration-500 flex flex-col justify-end min-h-40 group-hover:min-h-60">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-white text-base md:text-lg font-bold leading-tight transition-all duration-500">
                        {item.title}
                      </h3>
                      <span className="text-white text-2xl group-hover:translate-x-1 transition-transform duration-300 shrink-0">
                        →
                      </span>
                    </div>
                    <div className="mt-4 overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100">
                      <hr className="border-t border-white/30 mb-4" />
                      <p className="text-white/90 text-[14px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="w-full flex justify-center md:justify-end items-center mt-10 px-4 md:px-6 gap-3">
            {/* Left Circular Arrow */}
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

            {/* Right Circular Arrow */}
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