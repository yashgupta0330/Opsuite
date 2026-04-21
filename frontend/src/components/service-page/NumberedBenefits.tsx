
import React from 'react';

interface BenefitItem {
    id: number;
    number: string;
    title: string;
    description: string;
}

interface NumberedBenefitsProps {
    chip?: string;
    sectionTitle: string;
    sectionDescription?: string;
    items: BenefitItem[];
    themeColor?: string;
}

const NumberedBenefits: React.FC<NumberedBenefitsProps> = ({
    chip,
    sectionTitle,
    sectionDescription,
    items,
}) => {
    return (
        <section className="container-fluid ">
            {/* Heading Area */}
            <div className=" mb-10 md:mb-16 flex flex-col items-center">
                {chip && (
                    <span className="badge-theme">
                        {chip}
                    </span>
                )}
                <h2 className="heading-2 mb-4 text-center">
                    {sectionTitle}
                </h2>
                {sectionDescription && (
                    <p className="sub-description text-center mx-auto  md:max-w-[85%]">
                        {sectionDescription}
                    </p>
                )}
            </div>

            {/* Impact Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 ">
                {items.map((item, index) => (
                    <div key={item.id || index} className="flex items-center gap-6 border-b border-gray-200 py-8 transition-all hover:bg-white/30 group">
                        {/* Number Label */}
                        <span className="text-3xl md:text-4xl font-bold text-brand-primary opacity-50 ">
                            {item.number.toString().padStart(2, "0")}
                        </span>

                        {/* Text Content */}
                        <div className="flex-1">
                            <p className="text-base md:text-xl  leading-[1.6] font-normal">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NumberedBenefits;