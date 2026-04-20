"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  "Customer Service Operations",
  "Core Capabilities",
  "Technology & Infrastructure",
];

const tabColors: Record<string, { class: string }> = {
  "Customer Service Operations": {
    class: "",
  },
  "Core Capabilities": {
    class: "accent-orange",
  },
  "Technology & Infrastructure": {
    class: "accent-yellow",
  },
};

const features: Record<string, { title: string; desc: string; slug: string }[]> = {
  "Customer Service Operations": [
    {
      title: "Omnichannel Call Registration",
      desc: "Deliver seamless, consistent customer experiences from every touchpoint through one unified platform. ",
      slug: "omnichannel-call-registration",
    },
    {
      title: "Customer & Install Base Management",
      desc: "Real-time insights empower service teams to make faster & smarter decisions effortlessly. ",
      slug: "customer-and-install-base-management",
    },
    {
      title: "Warranty & AMC Management",
      desc: "Automated warranty validation and flexible schemes streamline contracts and drive revenue. ",
      slug: "warranty-and-amc-management",
    },
    {
      title: "Enquiry and Lead Management",
      desc: "Manage leads and enquiries end-to-end, empowering sales teams for faster & smarter conversions.",
      slug: "enquiry-and-lead-management",
    },
    {
      title: "Omnichannel Call Registration",
      desc: "Deliver seamless, consistent customer experiences from every touchpoint through one unified platform.",
      slug: "omnichannel-call-registration",
    },
    {
      title: "B2B Service Operations",
      desc: "Streamline complex B2B service workflows for faster, transparent, and accountable operations",
      slug: "b2b-service-operations",
    },
    {
      title: "Workshop Repair Management",
      desc: "Manage workshop repair efficiently with real-time tracking and streamlined operations.",
      slug: "workshop-repair-management",
    },
    {
      title: "Field Service Management",
      desc: "Mobile-first tools and intelligent scheduling boost first-time fixes and technician productivity. ",
      slug: "field-service-management",
    },
  ],

  "Core Capabilities": [
    {
      title: "Knowledge Management",
      desc: "AI-powered document search and intelligent knowledge base help teams find answers instantly.",
      slug: "knowledge-management",
    },
    {
      title: "Inventory Management",
      desc: "Track product stock levels, purchase history, billing info, and pricing to ensure smooth operations.",
      slug: "inventory-management",
    },
    {
      title: "Reports & Analytics",
      desc: "Real-time data and AI insights with natural language queries drive faster, smarter service decisions.",
      slug: "reports-and-analytics",
    },
    {
      title: "Franchise Payout Management",
      desc: "Automate claims, approvals, and payouts with transparency to streamline partner settlements efficiently",
      slug: "franchise-payout-management",
    },
  ],
  "Technology & Infrastructure": [
    {
      title: "Identity & Access Management",
      desc: "Manage user identities, roles, and permissions securely to control access across the service platform",
      slug: "identity-and-access-management",
    },
    {
      title: "Mobility Framework",
      desc: "Empower field teams with mobile-first tools for smooth, connected operations anytime , anywhere",
      slug: "mobility-framework",
    },
    {
      title: "Integrations",
      desc: "Seamless integrations unify service workflows across channels and platforms for connected operations",
      slug: "integration",
    },
    {
      title: "ServitiumIOT",
      desc: "Remotely access connected products & also predict maintenance needs to reduce downtime at field ",
      slug: "servitium-iot",
    },
  ],
};

export default function CustomerServiceTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentPage, setCurrentPage] = useState(0);

  const featuresPerPage = 4;
  const currentTabFeatures = features[activeTab] || [];
  const totalPages = Math.ceil(currentTabFeatures.length / featuresPerPage);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  const nextTab = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      const currentIndex = tabs.indexOf(activeTab);
      const nextTabIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextTabIndex]);
      setCurrentPage(0);
    }
  };

  const prevTab = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      const currentIndex = tabs.indexOf(activeTab);
      const prevTabIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      const prevTabName = tabs[prevTabIndex];
      const prevTabFeatures = features[prevTabName] || [];
      const prevTabTotalPages = Math.ceil(
        prevTabFeatures.length / featuresPerPage,
      );

      setActiveTab(prevTabName);
      setCurrentPage(prevTabTotalPages - 1);
    }
  };

  const displayedFeatures = currentTabFeatures.slice(
    currentPage * featuresPerPage,
    (currentPage + 1) * featuresPerPage,
  );

  const getUrlPrefix = (tabName: string) => {
    if (tabName === "Customer Service Operations") return "/solutions/";
    return "/platform/";
  };

  return (
    <section
      id="service-excellence-section"
      className={`tab bg-white mx-auto ${tabColors[activeTab].class}`}
    >
      <div className="container-fluid">
        <div className="max-w-7xl mx-auto">
          {/* Heading Section */}
          <div className="w-full">
            <h2 className="heading-2 text-center mx-auto mb-4">
              Powerful Solutions Built for Service Excellence
            </h2>
            <p className="sub-description text-center md:max-w-[60%] xl:max-w-[65%] mx-auto mb-8 md:mb-16">
              ServitiumCRM unifies calls, field service, and customer data into
              one platform, helping teams work smarter with better visibility
              and faster execution.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full">
        {/* Mobile wrapper: tab-bg wraps tabs + cards */}
        <div className="tab-bg md:bg-transparent! pt-12 pb-8 md:py-0">
          <div className="container-fluid">
            <div className="max-w-7xl mx-auto">
              {/* Tabs */}
              <div className="mb-6 md:mb-6">
                {/* Mobile: Vertical Stacked Tabs */}
                <div className="md:hidden mb-10">
                  <ul className="flex flex-col gap-3">
                    {tabs.map((tab) => (
                      <li key={tab}>
                        <button
                          onClick={() => handleTabChange(tab)}
                          className={`w-full flex items-center gap-3 px-6 py-3.5 text-base font-semibold rounded-2xl border transition-all text-left
                            ${activeTab === tab ? "tab-accent text-black border-transparent shadow-md" : "bg-white text-gray-900 border-gray-100 hover:bg-gray-50"}
                          `}
                        >
                          <Image
                            src="/customerservice/frame.png"
                            alt="tab icon"
                            width={28}
                            height={28}
                          />
                          <span>{tab}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desktop: Horizontal Tabs */}
                <div className="hidden md:block overflow-x-auto scrollbar-hide">
                  <ul className="flex items-center justify-between w-full gap-3 bg-white p-2 rounded-3xl border-2 whitespace-nowrap overflow-hidden tab-border">
                    {tabs.map((tab) => (
                      <li key={tab} className="flex-1 min-w-fit">
                        <button
                          onClick={() => handleTabChange(tab)}
                          className={`w-full flex items-center justify-center gap-3 px-6 py-3.75 font-medium rounded-2xl transition-all whitespace-nowrap
                            ${activeTab === tab ? "tab-accent text-black shadow-sm" : "text-gray-700 hover:bg-gray-50"}
                          `}
                        >
                          <Image
                            src="/customerservice/frame.png"
                            alt="tab icon"
                            width={32}
                            height={32}
                          />
                          <span className="text-base md:text-lg xl:text-xl font-semibold leading-5.5">
                            {tab}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Background Wrapper for Cards */}
              <div className={`rounded-2xl md:rounded-4xl p-0 mb-0 md:mb-6`}>
                {/* Desktop: Side by side layout */}
                <div className="hidden md:grid md:grid-cols-2 gap-2 md:bg-[var(--accent-dark)] md:p-3 md:rounded-2xl">
                  {/* Left image card */}
                  <Link
                    href={`${getUrlPrefix(activeTab)}${displayedFeatures[0]?.slug}`}
                    className="relative rounded-xl overflow-hidden shadow-sm group cursor-pointer h-full block"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={
                          displayedFeatures[0]?.title ===
                          "Field Service Management"
                            ? "/customerservice/field.png"
                            : activeTab === "Core Capabilities"
                              ? "/customerservice/core.png"
                              : activeTab === "Technology & Infrastructure"
                                ? "/customerservice/technology.png"
                                : "/customerservice/call.png"
                        }
                        alt={activeTab}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Overlay card at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <h4 className="font-bold text-base md:text-lg xl:text-xl leading-tight">
                          {displayedFeatures[0]?.title}
                        </h4>
                        <Image
                          src="/customerservice/arrow.svg"
                          alt="arrow"
                          width={12}
                          height={12}
                          className="group-hover:translate-x-1 transition-transform duration-300 w-3 h-3"
                        />
                      </div>
                      <p className="font-normal text-[15px] md:text-[16px] leading-relaxed text-gray-600">
                        {displayedFeatures[0]?.desc}
                      </p>
                    </div>
                  </Link>

                  {/* Right feature list */}
                  <div className="flex flex-col gap-2">
                    {displayedFeatures.slice(1).map((feature, idx) => (
                      <FeatureCard
                        key={feature.title + idx}
                        title={feature.title}
                        desc={feature.desc}
                        iconNumber={idx + 1}
                        href={`${getUrlPrefix(activeTab)}${feature.slug}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Mobile: Stacked layout - Image card first, then list cards */}
                <div className="md:hidden flex flex-col gap-6">
                  <Link
                    href={`${getUrlPrefix(activeTab)}${displayedFeatures[0]?.slug}`}
                    className="rounded-2xl overflow-hidden shadow-sm bg-white cursor-pointer group block"
                  >
                    <div className="relative h-[260px] w-full">
                      <Image
                        src={
                          displayedFeatures[0]?.title ===
                          "Field Service Management"
                            ? "/customerservice/field.png"
                            : activeTab === "Core Capabilities"
                              ? "/customerservice/core.png"
                              : activeTab === "Technology & Infrastructure"
                                ? "/customerservice/technology.png"
                                : "/customerservice/call.png"
                        }
                        alt={activeTab}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Text section below the image on mobile */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h4 className="font-bold text-base leading-tight ">
                          {displayedFeatures[0]?.title}
                        </h4>
                        <Image
                          src="/customerservice/arrow.svg"
                          alt="arrow"
                          width={12}
                          height={12}
                          className="group-hover:translate-x-1 transition-transform duration-300 w-3 h-3"
                        />
                      </div>
                      <p className="text-[15px] leading-relaxed text-gray-600">
                        {displayedFeatures[0]?.desc}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-6">
                    {displayedFeatures.slice(1).map((feature, idx) => (
                      <FeatureCard
                        key={feature.title + idx}
                        title={feature.title}
                        desc={feature.desc}
                        iconNumber={idx + 1}
                        href={`${getUrlPrefix(activeTab)}${feature.slug}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end mobile tab-bg wrapper */}

        <div className="container-fluid">
          <div className=" mx-auto">
            {/* Navigation Arrows */}
            <div className="w-full flex justify-end items-center gap-3">
              <button
                onClick={prevTab}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 bg-white border-gray-300 text-gray-800 hover:bg-gray-900 hover:border-gray-900 hover:text-white cursor-pointer"
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
                onClick={nextTab}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 bg-gray-900 border-gray-900 text-white hover:bg-gray-700 hover:border-gray-700 cursor-pointer"
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

            {/* Automation Card Section */}
            <div
              className="w-full relative rounded-3xl md:rounded-3xl overflow-hidden min-h-62.5 flex items-center p-6 md:p-16 mt-16"
              style={{
                backgroundImage: "url('/customerservice/background.png')",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 md:gap-6 max-w-full md:max-w-[75%] xl:max-w-[80%]">
                  <Image
                    src="/customerservice/robot.png"
                    alt="Automation Robot Icon"
                    width={140}
                    height={92}
                    className="w-20 md:w-35 h-auto"
                  />
                  <div>
                    <h3 className="heading-2 mb-4 text-gradient">
                      Smart Automation for Intelligent Service Operations
                    </h3>
                    <p className="text-[#18191DB2] text-sm md:text-xl mb-0">
                      Proven automation powered by AI to simplify service
                      workflows, accelerate response times, and deliver proactive
                      experiences at scale.
                    </p>
                  </div>
                </div>
                <Link
                  href="/mycompany/contact-us"
                  className="btn btn-primary inline-flex items-center whitespace-nowrap shrink-0"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  iconNumber,
  href,
}: {
  title: string;
  desc: string;
  iconNumber: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 md:gap-4 bg-white p-3 md:p-6 rounded-xl md:rounded-xl hover:shadow-md transition-shadow cursor-pointer group shadow-sm block"
    >
      <div
        className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl tab-accent flex items-center justify-center shrink-0`}
      >
        <Image
          src={`/customerservice/icon${iconNumber}.svg`}
          alt={title}
          width={32}
          height={32}
          className="md:w-10 md:h-10 w-8 h-8"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <h4 className="font-bold text-base md:text-lg xl:text-xl leading-5 md:leading-6">
            {title}
          </h4>
          <Image
            src="/customerservice/arrow.svg"
            alt="arrow"
            width={12}
            height={12}
            className="group-hover:translate-x-1 transition-transform duration-300 w-3 h-3"
          />
        </div>
        <p className="font-normal text-[15px] md:text-[16px] leading-4 md:leading-5.5 text-gray-600">
          {desc}
        </p>
      </div>
    </Link>
  );
}