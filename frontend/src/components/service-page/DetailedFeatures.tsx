import React from 'react';
import { FaCircle } from 'react-icons/fa';

interface BoxItem {
    id: number;
    text: string;
}

interface FeatureCard {
    id: number;
    title: string;
    description: string;
    boxTitle: string;
    boxItems: BoxItem[];
}

interface DetailedFeaturesProps {
    title?: string;
    description?: string;
    cards: FeatureCard[];
    themeColor?: string;
}

const DetailedFeatures: React.FC<DetailedFeaturesProps> = ({
    title,
    description,
    cards,
}) => {
    if (!cards || cards.length === 0) return null;

    return (
        <section className="py-12 lg:py-14 bg-white">
            <div className="container-fluid">
                {title && (
                    <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-12">
                        <h2 className="heading-2 mb-6">
                            {title}
                        </h2>
                        {description && (
                            <p className="sub-description">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-7xl mx-auto">
                    {cards.map((card) => (
                        <div 
                            key={card.id} 
                            className="flex flex-col bg-white rounded-[1.2rem] border border-[#E7EBF0] shadow-[0_2px_10px_rgba(15,23,42,0.05)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                        >
                            <div className="p-6 lg:p-7 pb-4 flex flex-col grow">
                                <h3 className="text-[1.65rem] lg:text-[1.9rem] font-bold text-gray-900 mb-3 leading-tight">
                                    {card.title}
                                </h3>
                                <p className="text-gray-500 text-base lg:text-[1.05rem] leading-[1.55]">
                                    {card.description}
                                </p>
                            </div>

                            <div className="mx-4 mb-4 p-4 lg:p-5 bg-[#EAF2FB] rounded-[0.95rem]">
                                {card.boxTitle && (
                                    <h4 className="text-lg lg:text-[1.35rem] font-bold text-gray-900 mb-3">
                                        {card.boxTitle}
                                    </h4>
                                )}
                                
                                {card.boxItems && card.boxItems.length > 0 && (
                                    <ul className="space-y-2.5">
                                        {card.boxItems.map((item) => (
                                            <li key={item.id} className="flex items-center gap-2.5">
                                                <div className="shrink-0 pt-0.5">
                                                    <FaCircle className="w-1.75 h-1.75 text-[#111827]" />
                                                </div>
                                                <span className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                                    {item.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DetailedFeatures;
