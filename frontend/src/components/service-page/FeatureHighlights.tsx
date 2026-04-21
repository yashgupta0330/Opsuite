"use client";

import { getStrapiMedia } from '@/lib/strapi-helper';
import Image from 'next/image';
import React, { useState } from 'react';

interface HighlightListItem {
    id: number;
    title: string;
    description: string;
    icon?: any;
}

interface ComparisonCard {
    title: string;
    bgImage?: any;
    icon?: any;
    items: HighlightListItem[];
}

interface SummaryItem {
    id: number;
    text: string;
    icon?: any;
}

interface FeatureHighlightsProps {
    badgeText?: string;
    sectionTitle: string;
    beforeCard?: ComparisonCard;
    afterCard?: ComparisonCard;
    summaryItems?: SummaryItem[];
}

const FeatureIcon = ({ iconUrl, fallback }: { iconUrl: string | null, fallback?: React.ReactNode }) => {
    const [imageError, setImageError] = useState(false);

    if (!iconUrl || imageError) {
        return fallback || (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        );
    }

    return (
        <Image
            src={iconUrl}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            onError={() => setImageError(true)}
        />
    );
};

const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({
    badgeText,
    sectionTitle,
    beforeCard,
    afterCard,
    summaryItems,
}) => {
    return (
        <section className="bg-white py-12 md:py-20 flex justify-center w-full overflow-hidden">
            <div className="container-fluid flex flex-col items-center">
                
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
                    {badgeText && (
                        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium border border-[#A6E8EE] bg-white text-[#1D1D1F] rounded-full shadow-sm">
                            {badgeText}
                        </span>
                    )}
                    <h2 className="heading-1 max-w-[800px] mx-auto leading-[1.2]">
                        {sectionTitle}
                    </h2>
                </div>

                {/* Comparison Grid */}
                <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-stretch mb-16">
                    
                    {/* Before Card */}
                    {beforeCard && (
                        <div className="relative p-8 md:p-12 rounded-[32px] border border-gray-100 overflow-hidden group min-h-[500px] flex flex-col">
                            {/* Full Card Background Image */}
                            {beforeCard.bgImage && (
                                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                                    <Image 
                                        src={getStrapiMedia(beforeCard.bgImage) || ''} 
                                        alt="" 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                                        <FeatureIcon 
                                            iconUrl={getStrapiMedia(beforeCard.icon)} 
                                            fallback={
                                                <div className="text-[#CC0000]">
                                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            }
                                        />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#8B0000]">
                                        {beforeCard.title}
                                    </h3>
                                </div>

                                <div className="space-y-8">
                                    {beforeCard.items.map((item) => (
                                        <div key={item.id} className="flex gap-5 group">
                                            <div className="flex-shrink-0">
                                                <FeatureIcon iconUrl={getStrapiMedia(item.icon)} />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-[#1D1D1F] mb-1 leading-tight">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[#6E6E73] text-base leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Separator Arrow */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6E6E73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                    </div>

                    {/* After Card */}
                    {afterCard && (
                        <div className="relative p-8 md:p-12 rounded-4xl border border-gray-100 overflow-hidden group min-h-125 flex flex-col">
                            {/* Full Card Background Image */}
                            {afterCard.bgImage && (
                                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                                    <Image 
                                        src={getStrapiMedia(afterCard.bgImage) || ''} 
                                        alt="" 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                                        <FeatureIcon 
                                            iconUrl={getStrapiMedia(afterCard.icon)} 
                                            fallback={
                                                <div className="text-[#2ECC71]">
                                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            }
                                        />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#006430]">
                                        {afterCard.title}
                                    </h3>
                                </div>

                                <div className="space-y-8">
                                    {afterCard.items.map((item) => (
                                        <div key={item.id} className="flex gap-5 group">
                                            <div className="flex-shrink-0">
                                                <FeatureIcon iconUrl={getStrapiMedia(item.icon)} />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-[#1D1D1F] mb-1 leading-tight">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[#6E6E73] text-base leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Summary Bar */}
                {summaryItems && summaryItems.length > 0 && (
                    <div className="w-full max-w-7xl mx-auto px-6 py-8 md:py-10 bg-[#FAFAFA] border border-gray-100 rounded-[24px]">
                        <div className="flex flex-wrap justify-between md:justify-center gap-y-8 md:gap-x-12 lg:gap-x-16">
                            {summaryItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <FeatureIcon 
                                            iconUrl={getStrapiMedia(item.icon)} 
                                            fallback={
                                                <div className="w-5 h-5 flex items-center justify-center text-primary-500">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                            }
                                        />
                                    </div>
                                    <span className="text-[17px] font-medium text-[#1D1D1F]">
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeatureHighlights;
