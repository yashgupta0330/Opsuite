"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const features = [
  {
    title: "AI-Driven Service Excellence",
    desc: "AI-powered SLA monitoring, intelligent dispatch, predictive analytics, and low-code customization drive smarter, more efficient service operations.",
  },
  {
    title: "Domain-Driven Intelligence",
    desc: "Deep understanding of service operations embedded into every workflow. Our platform understands your service operations because we've been solving them since day one.",
  },
  {
    title: "Enterprise-Ready Performance",
    desc: "Build on Oracle Cloud for reliability at scale. Handle millions of tickets monthly with confidence, security, and zero compromise on speed.",
  },
  {
    title: "Complete Service Ecosystem",
    desc: "	End-to-end solutions from call centres to field service, warehouse to franchisees-unify every touchpoint in one intelligent platform that drives measurable business outcomes.",
  },
];

export default function WhyServitium() {
  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      return 0;
    }
    return null;
  });

  useEffect(() => {
    const handleResize = () => {
      setOpenIndex(window.innerWidth >= 1024 ? 0 : null);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section >
      <div className="container-fluid mx-auto">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 text-center">Why Do Brands Choose ServitiumCRM?</h2>
          <p className="sub-description mt-6 text-center md:mx-auto mb-8 md:mb-16">
            Built on industry best practices, ServitiumCRM delivers scalable,
            efficient, and connected service operations trusted by leading
            brands.
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 xl:gap-24 items-start">
          {/* Left Side - Accordion */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className={`border-b border-gray-100 last:border-0 pb-4 transition-all duration-300`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between md:py-4 text-left focus:outline-none group"
                  >
                    <span className="card-title">{item.title}</span>
                    {openIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-gray-900"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-gray-400 "
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-40 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="sub-description pr-12">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full max-w-[70%] lg:max-w-none mx-auto lg:mx-0 lg:w-1/2 rounded-2xl overflow-hidden lg:mb-0">
            <Image
              src="/whyservitium/crm.png"
              alt="Feature Illustration Placeholder"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}