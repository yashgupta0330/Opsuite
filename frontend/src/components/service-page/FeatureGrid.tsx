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

interface GridCard {
    id: number;
    title: string;
    description: string;
    image: StrapiMedia | null;
    mediaType?: 'icon' | 'image';
}

interface FeatureGridProps {
    sectionTitle: string;
    sectionDescription?: string;
    badgeText?: string;
    bgImage?: StrapiMedia | null;
    cards: GridCard[];
    themeColor?: string;
}

const CardItem: React.FC<{ card: GridCard }> = ({ card }) => {
    const iconUrl = getStrapiMedia(card.image);

    return (
        <div className="bg-white rounded-2xl p-8 flex flex-col h-full border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:translate-y-[-4px] group">
            {iconUrl && (
                <div className="mb-6 w-12 h-12 relative grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image
                        src={iconUrl}
                        alt=""
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </div>
            )}
            
            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                {card.title}
            </h3>
            
            <p className="text-gray-500 text-base leading-relaxed">
                {card.description}
            </p>
        </div>
    );
};

const FeatureGrid: React.FC<FeatureGridProps> = ({
    sectionTitle,
    sectionDescription,
    badgeText,
    bgImage,
    cards,
}) => {
    if (!cards || cards.length === 0) return null;

    const backgroundUrl = getStrapiMedia(bgImage);

    return (
        <section className="relative py-20 overflow-hidden min-h-[600px] flex items-center">
            {/* Background Image/Gradient */}
            {backgroundUrl ? (
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={backgroundUrl} 
                        alt="" 
                        fill 
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white/10" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-[#F8F9FE] z-0" />
            )}

            <div className="container-fluid relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    {badgeText && (
                        <div className="mb-6">
                            <span className="inline-block px-4 py-1.5 text-sm font-bold border border-cyan-200 bg-cyan-50/50 text-cyan-700 rounded-full">
                                {badgeText}
                            </span>
                        </div>
                    )}
                    
                    <h2 className="text-3xl md:text-[2.8rem] font-bold text-gray-900 mb-6 leading-[1.1]">
                        {sectionTitle}
                    </h2>
                    
                    {sectionDescription && (
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            {sectionDescription}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;