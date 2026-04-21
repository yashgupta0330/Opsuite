import React from 'react';

interface AdvantageSectionProps {
    id: number;
    __component: string;
    title: string;
    description?: string;
    badgeText?: string;
}

const AdvantageSection: React.FC<AdvantageSectionProps> = ({
    title,
    description,
    badgeText
}) => {
    return (
        <section className="bg-white self-stretch flex flex-col items-center py-16 md:py-24">
            <div className="container-fluid">
                <div className="flex flex-col items-center text-center">
                    {badgeText && (
                        <div className="mb-6">
                            <span className="inline-block px-4 py-1.5 text-sm font-medium border border-[#A6E8EE] bg-[#F0FBFC] text-[#1D1D1F] rounded-full shadow-sm">
                                {badgeText}
                            </span>
                        </div>
                    )}
                    <h2 className="heading-1 mb-8 max-w-[900px] leading-[1.1]">
                        {title}
                    </h2>
                    {description && (
                        <p className="sub-description max-w-[800px] mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdvantageSection;
