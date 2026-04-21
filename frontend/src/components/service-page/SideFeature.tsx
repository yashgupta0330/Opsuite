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
    subTitle?: string;
    image: StrapiMedia | any;
    imagePosition: 'left' | 'right';
    features: FeaturePoint[];
    themeColor?: string;
    blobIndex?: number;
}

const SideFeature: React.FC<SideFeatureProps> = ({
    sectionTitle,
    sectionDescription,
    subTitle,
    image,
    features,
    imagePosition = 'left'
}) => {
    const imageUrl = getStrapiMedia(image?.url || image?.data?.attributes?.url);

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container-fluid mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start max-w-7xl mx-auto">
                    {/* Image Column */}
                    <div className={`relative group w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 ${imagePosition === 'right' ? 'lg:order-last' : 'lg:order-first'}`}>
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={sectionTitle}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-gray-300">
                                <span className="text-6xl">🖼️</span>
                                <span className="text-sm font-medium">Image Placeholder</span>
                            </div>
                        )}
                    </div>

                    {/* Content Column */}
                    <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:order-first' : 'lg:order-last'}`}>
                        <h2 className="card-feature mb-4">
                            {sectionTitle}
                        </h2>
                        
                        {sectionDescription && (
                            <p className="card-subdescription mb-6">
                                {sectionDescription}
                            </p>
                        )}

                        {subTitle && (
                            <h3 className="card-subheading mb-4">
                                {subTitle}
                            </h3>
                        )}

                        {features && features.length > 0 && (
                            <ul className="space-y-4">
                                {features.map((item) => (
                                    <li key={item.id} className="flex items-start gap-3">
                                        <div className="shrink-0 mt-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                                        </div>
                                        <span className="text-gray-600 text-lg">
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SideFeature;