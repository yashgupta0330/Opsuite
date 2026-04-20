import React from 'react';

interface AdvantageSectionProps {
    id: number;
    __component: string;
    title: string;
    description?: string;
    badge?: string;
}

const AdvantageSection: React.FC<AdvantageSectionProps> = ({
    title,
    description,
    badge
}) => {
    return (
        <section className="bg-white self-stretch flex flex-col items-center py-20">
            <div className="container-fluid">
                <div className="flex flex-col items-center text-center">
                    {badge && (
                        <div className="mb-6">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-200 bg-cyan-50/50 text-cyan-700 text-xs font-bold uppercase tracking-wider">
                                {badge}
                            </span>
                        </div>
                    )}
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#18191D] mb-6 leading-tight max-w-4xl">
                        {title}
                    </h2>
                    {description && (
                        <p className="sub-description md:max-w-[70%] text-lg text-gray-500">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdvantageSection;
