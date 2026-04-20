"use client";

import { StatCardProps } from "@/types/stat";
import Image from "next/image";
import { useState } from "react";
import "./stat.css";

const statsData: StatCardProps[] = [
  {
    icon: "/stats/house.png",
    alt: "Households",
    bgMobile: "bg-white border border-[#5AAEDB] xl:border-0 rounded-xl xl:rounded-none",
    bgDesktop: "xl:bg-[#C3DFF2]", // Base color for active state
    filterMobile: "",
    filterDesktop: "",
    title: "Indian Households Served",
    value: "15M+",
    valueClass: "text-gray-900",
    text: "Delivering reliable, consistent service experiences on a scale",
    hrColor: "border-[#0284c7]",
    textColor: "text-gray-900",
  },
   {
    icon: "/stats/client.png",
    alt: "Clients",
    bgMobile: "bg-white border border-[#CC6E48] xl:border-0 rounded-xl xl:rounded-none",
    bgDesktop: "xl:bg-[#EAD2CC]",
    filterMobile: "",
    filterDesktop: "xl:filter-none xl:brightness-100 xl:invert-0",
    title: "Enterprise Clients",
    value: "40+",
    valueClass: "text-gray-900 xl:group-hover:text-white",
    text: "Chosen by leading brands  to run mission-critical service ops.",
    hrColor: "border-[#C75324]",
    textColor: "text-gray-900 xl:group-hover:text-white",
  },
  {
    icon: "/stats/ticket.png",
    alt: "Tickets",
    bgMobile: "bg-white border border-[#CC6E48] xl:border-0 rounded-xl xl:rounded-none",
    bgDesktop: "xl:bg-[#EAD2CC]",
    filterMobile: "",
    filterDesktop: "xl:filter-none xl:brightness-100 xl:invert-0",
    title: "Tickets Handled Monthly",
    value: "3M+",
    valueClass: "text-gray-900 xl:group-hover:text-white",
    text: "Driving faster resolutions and smoother customer journeys",
    hrColor: "border-[#C75324]",
    textColor: "text-gray-900 xl:group-hover:text-white",
  },
   {
    icon: "/stats/dollar.png",
    alt: "Transactions",
    bgMobile: "bg-white border border-[#5AAEDB] xl:border-0 rounded-xl xl:rounded-none",
    bgDesktop: "xl:bg-[#C3DFF2]",
    filterMobile: "",
    filterDesktop: "",
    title: "Monthly Transactions",
    value: "$100M+",
    valueClass: "text-gray-900",
    text: "Secure & high-value service transactions with confidence",
    hrColor: "border-[#0284c7]",
    textColor: "text-gray-900",
  },
];

function StatCard({
  icon,
  alt,
  bgMobile,
  bgDesktop,
  filterMobile,
  filterDesktop,
  title,
  value,
  valueClass,
  text,
  hrColor,
  textColor,
  isActive,
  onMouseEnter,
}: StatCardProps) {
  // Determine which card this is
  const isHouseholds = title === "Indian Households Served" && value === "15M+";
  const isTransactions = title === "Monthly Transactions" && value === "$100M+";
  const isEnterpriseClients = title === "Enterprise Clients" && value === "40+";
  const isTickets = title === "Tickets Handled Monthly" && value === "3M+";

  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`flex flex-col items-start text-left px-4 xl:px-6 py-4 xl:py-8 transition-all duration-300 cursor-pointer group h-36 xl:h-90 overflow-hidden ${bgMobile} ${isActive ? bgDesktop : 'xl:bg-[#f4f6fc]'} `}
    >

      {/* Mobile: Icon + Title in a row */}
      <div className="flex items-center gap-6 mb-6 xl:hidden w-full">
        <div className={`shrink-0 ${filterMobile}`}>
          <Image src={icon} alt={alt} width={48} height={48} />
        </div>
        <p
          className={`text-lg font-semibold ${textColor} transition-colors duration-300`}
        >
          {title}
        </p>
      </div>

      {/* Desktop: Icon and Title stacked */}
      <div className="hidden xl:block w-full">
        <div className={`mb-3 ${filterDesktop}`}>
          <Image src={icon} alt={alt} width={48} height={48} />
        </div>
        <p
          className={`mb-8 text-lg font-semibold leading-7 ${textColor} ${isActive && (isHouseholds || isTransactions) ? '!text-[#0284C7]' : ''} ${isActive && (isEnterpriseClients || isTickets) ? '!text-[#C75324]' : ''} transition-colors duration-300`}
        >
          {title}
        </p>
      </div>

      {/* Group 2: Value and Text */}
      <div className="w-full flex-1 flex flex-col justify-end">
        {/* Mobile View */}
        <div className="xl:hidden w-full text-left">
          <h3
          className={`mb-3 text-left text-[2rem] font-semibold leading-10 ${valueClass} ${(isHouseholds || isTransactions) ? 'group-hover:text-[#0284C7]' : ''} ${(isEnterpriseClients || isTickets) ? 'group-hover:text-[#C75324]' : ''} transition-colors duration-300`}
          >
            {value}
          </h3>
        </div>

        {/* Desktop View */}
        <div className="hidden xl:block w-full relative overflow-hidden text-left" style={{ minHeight: '140px' }}>
          <div className="w-full text-left">
            <h3
          className={`mb-3 text-left text-[3rem] font-semibold leading-15 transition-transform duration-500 ease-in-out ${isActive ? '-translate-y-2' : ''} ${valueClass} ${isActive && (isHouseholds || isTransactions) ? '!text-[#0284C7]' : ''} ${isActive && (isEnterpriseClients || isTickets) ? '!text-[#C75324]' : ''} transition-colors duration-300`}
            >
              {value}
            </h3>
            <div className={`w-full transition-all duration-500 ease-in-out ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              <hr className={`w-full border-t-2 mb-3 ${hrColor}`} />
              <p
                className="text-base leading-5.5 text-[rgba(70,75,104,0.8)]"
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className="stats-section flex justify-center py-16" style={{ background: 'rgba(244, 246, 252, 1)', minHeight: 'auto' }}>
      <div className=" container-fluid  w-full ">
        {/* Space above heading ensured by py-16 on section and no extra top margin or 64px if needed */}
        <div className="text-center "> 
          <h2 className="text-center mb-4 heading-2">
            Transforming Service Into Business Growth
          </h2>
          <p className="sub-description mt-4 text-center xl:max-w-[70%] mx-auto">
            ServitiumCRM turns customer service into a growth driver by improving operational efficiency, revenue impact, and long-term customer value.
          </p>
        </div>
        
        <div 
          className="grid grid-cols-1 xl:grid-cols-4 gap-4 xl:gap-4.5 mt-10 xl:mt-20"
          onMouseLeave={() => setHoveredIndex(0)}
        >
          {statsData.map((item, idx) => (
            <StatCard 
              key={idx} 
              {...item} 
              isActive={hoveredIndex === idx} 
              onMouseEnter={() => setHoveredIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
