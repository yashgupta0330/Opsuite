import React from 'react';

interface AdvantageSectionProps {
    id: number;
    __component: string;
    title: string;
    description?: string;
}

const AdvantageSection: React.FC<AdvantageSectionProps> = ({
    title,
    description
}) => {
    return (
        <section className="bg-white self-stretch flex flex-col items-center pb-0!">
            <div className="container-fluid">
                <div className="flex flex-col items-center text-center">
                    <h2 className="heading-2 mb-4">
                        {title}
                    </h2>
                    {description && (
                        <p className="sub-description md:max-w-[70%]">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdvantageSection;
