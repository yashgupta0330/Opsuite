"use client";

import { getStrapiMedia } from '@/lib/strapi-helper';
import Image from 'next/image';
import React from 'react';


interface StrapiMedia {
    url?: string;
    data?: {
        id: number;
        attributes: {
            url: string;
            name?: string;
            alternativeText?: string;
        };
    } | null;
    attributes?: {
        url: string;
    };
}

interface FeaturePoint {
    id: number;
    title: string;
    description: string;
    icon: StrapiMedia | any;
}

interface SideFeatureProps {
    sectionTitle: string;
    sectionDescription?: string;
    image: StrapiMedia | any;
    imagePosition: 'left' | 'right';
    features: FeaturePoint[];
    themeColor?: string;
    blobIndex?: number;
}

const FeatureIcon = ({ iconUrl }: { iconUrl: string | null }) => {
    const [imageError, setImageError] = React.useState(false);

    if (!iconUrl || imageError) {
        return (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

const SideFeature: React.FC<SideFeatureProps> = ({
    sectionTitle,
    sectionDescription,
    image,
    features,
    imagePosition = 'left'
}) => {
    const imageUrl = getStrapiMedia(image?.url || image?.data?.attributes?.url);

    return (
        <section className="container-fluid mx-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto">
                {/* Image Column */}
                <div className={`relative group w-full h-80 md:h-105 bg-white rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden ${imagePosition === 'right' ? 'lg:order-last order-last' : 'lg:order-first order-last'}`}>
                    <div className="absolute inset-0 bg-linear-to-br from-orange-50/50 to-transparent" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={sectionTitle}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        ) : (
                            <span className="text-gray-300 text-7xl">🖼️</span>
                        )}
                    </div>
                </div>

                {/* Content Column */}
                <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:order-first order-first' : 'lg:order-last order-first'}`}>
                    <h3 className="card-feature mb-4">
                        {sectionTitle}
                    </h3>
                    {sectionDescription && (
                        <p className="card-subdescription">
                            {sectionDescription}
                        </p>
                    )}
                    <div className="industry-list">
                        {features.map((item) => {
                            const iconData = item.icon?.data?.attributes || item.icon?.attributes || item.icon?.data || item.icon;
                            const iconUrl = getStrapiMedia(iconData);
                            return (
                                <div key={item.id} className="flex gap-2 group items-start">
                                    <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                                        <FeatureIcon iconUrl={iconUrl} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="card-subheading mb-1 md:mb-4">
                                            {item.title}
                                        </h4>
                                        <p className="card-text">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SideFeature;