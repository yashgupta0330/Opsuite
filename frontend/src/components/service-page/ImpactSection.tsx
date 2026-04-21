import { getStrapiMedia } from '@/lib/strapi-helper';
import Image from 'next/image';
import React from 'react';

interface ImpactCardData {
    id: number;
    metric: string;
    title: string;
    description: string;
    icon: any;
    colorScheme: 'cyan' | 'pink' | 'yellow' | 'green';
}

interface ImpactSectionProps {
    badgeText?: string;
    title: string;
    cards: ImpactCardData[];
}

const colorMap = {
    cyan: {
        bg: 'bg-[#D1F7F1]',
        text: 'text-[#007C7C]',
        iconBg: 'bg-[#007C7C]/10',
    },
    pink: {
        bg: 'bg-[#FDE7F7]',
        text: 'text-[#C41C8C]',
        iconBg: 'bg-[#C41C8C]/10',
    },
    yellow: {
        bg: 'bg-[#FFF2CD]',
        text: 'text-[#A67800]',
        iconBg: 'bg-[#A67800]/10',
    },
    green: {
        bg: 'bg-[#F0F7E0]',
        text: 'text-[#6A8100]',
        iconBg: 'bg-[#6A8100]/10',
    }
};

const ImpactSection: React.FC<ImpactSectionProps> = ({
    badgeText,
    title,
    cards
}) => {
    if (!cards || cards.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container-fluid">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                    {badgeText && (
                        <div className="mb-6">
                            <span className="inline-block px-5 py-2 text-sm font-bold border border-[#A6E8EE] bg-[#F0FBFC] text-[#007C7C] rounded-full shadow-sm">
                                {badgeText}
                            </span>
                        </div>
                    )}
                    <h2 className="heading-1 leading-[1.2]">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card) => {
                        const scheme = colorMap[card.colorScheme] || colorMap.cyan;
                        const iconUrl = getStrapiMedia(card.icon);

                        return (
                            <div 
                                key={card.id} 
                                className={`${scheme.bg} rounded-2xl p-8 flex flex-col h-full shadow-xs transition-transform duration-300 hover:scale-[1.02]`}
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <span className={`text-3xl lg:text-4xl font-bold ${scheme.text}`}>
                                        {card.metric}
                                    </span>
                                    {iconUrl && (
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center p-2 ${scheme.iconBg}`}>
                                            <Image 
                                                src={iconUrl} 
                                                alt="" 
                                                width={24} 
                                                height={24} 
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mt-auto">
                                    <h4 className={`text-xl font-bold mb-2 ${scheme.text}`}>
                                        {card.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {card.description}
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

export default ImpactSection;
