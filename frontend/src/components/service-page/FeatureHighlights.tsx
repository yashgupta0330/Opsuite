"use client";

import { getStrapiMedia } from '@/lib/strapi-helper';
import Image from 'next/image';
import React, { useState } from 'react';


interface HighlightItem {
    id: number;
    title: string;
    description: string;
    icon?: {
        url?: string;
        data?: {
            attributes?: {
                url?: string;
            };
        };
    } | null;
}

interface FeatureHighlightsProps {
    sectionTitle: string;
    sectionDescription?: string;
    highlights: HighlightItem[];
    themeColor?: string;
}

const FeatureIcon = ({ iconUrl }: { iconUrl: string | null }) => {
    const [imageError, setImageError] = useState(false);

    if (!iconUrl || imageError) {
        return (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        );
    }

    return (
        <Image
            src={iconUrl}
            alt=""
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            onError={() => setImageError(true)}
        />
    );
};

const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({
    sectionTitle,
    sectionDescription,
    highlights,
}) => {
    return (
        <section className="bg-white flex justify-center w-full">
            <div
                className="container-fluid gap-6 md:gap-16 flex flex-col items-center"
            >
                <div className="text-center max-w-275.75 mx-auto">
                    <h2 className="heading-2 mb-4">
                        {sectionTitle}
                    </h2>
                    {sectionDescription && (
                        <p className="sub-description">
                            {sectionDescription}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 w-full">
                    {highlights.map((item) => {
                        const iconUrl = getStrapiMedia(item.icon?.url || item.icon?.data?.attributes?.url || null);
                        return (
                            <div key={item.id} className="feature-highlight-card flex gap-4 items-start md:flex-col md:gap-0 group">
                                <div className="icon-box-theme rounded-xl shrink-0 md:mb-4">
                                    <FeatureIcon iconUrl={iconUrl} />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="card-title-small transition-colors mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="card-desc-small md:max-w-[94%]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeatureHighlights;
