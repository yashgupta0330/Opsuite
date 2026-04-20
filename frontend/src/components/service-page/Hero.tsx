import { getStrapiMedia } from '@/lib/strapi-helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



interface HeroProps {
    heading: string;
    subheading?: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    image: any;
    themeColor?: string;
}

const Hero: React.FC<HeroProps> = ({
    heading,
    subheading,
    description,
    primaryButtonText,
    primaryButtonLink,
    image,
}) => {
    const imageUrl = getStrapiMedia(image?.url || image?.data?.attributes?.url);
    console.log("image URL in Hero section" + imageUrl);
    return (
        <section
            className="relative overflow-hidden flex items-center bg-theme-gradient pt-44 pb-0"
        >
            {/* Design Radial Orb - centered behind the persona image to match design */}
            <div
                className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-40 blur-[120px] bg-[radial-gradient(circle,var(--color-base-60)_0%,transparent_70%)]"
            />

            <div className="masthead container-fluid mx-auto relative z-10">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[453px]">
                        {/* Text Content */}
                        <div className="w-full lg:max-w-[628px] flex flex-col items-start justify-center">
                            {subheading && (
                                <div className="hero-badge-white mb-3 ">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary">
                                        <path d="M5.4 12V6.6H0V5.4H5.4V0H6.6V5.4H12V6.6H6.6V12H5.4Z" fill="currentColor" className="hidden" />
                                        <path d="M6 12C6 8.68629 3.31371 6 0 6C3.31371 6 6 3.31371 6 0C6 3.31371 8.68629 6 12 6C8.68629 6 6 8.68629 6 12Z" fill="currentColor" />
                                        <path d="M9.5 4.5C9.5 3.39543 8.60457 2.5 7.5 2.5C8.60457 2.5 9.5 1.60457 9.5 0.5C9.5 1.60457 10.3954 2.5 11.5 2.5C10.3954 2.5 9.5 3.39543 9.5 4.5Z" fill="currentColor" />
                                    </svg>
                                    <span className="font-semibold text-xs capitalize tracking-wide">
                                        {subheading}
                                    </span>
                                </div>
                            )}
                            <h1 className="heading-1 mb-6 tracking-tight max-w-[594px] text-black">
                                {heading}
                            </h1>
                            <p className="sub-description mb-10 max-w-[573px]">
                                {description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={primaryButtonLink || '#'}
                                    className="btn btn-dark"
                                >
                                    {primaryButtonText}
                                </Link>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="relative group w-full lg:max-w-[740px]">
                            <div className="relative overflow-hidden rounded-2xl">
                                {imageUrl ? (
                                    <div className="aspect-604/453 w-full relative">
                                        <Image
                                            src={imageUrl}
                                            alt={heading}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-4/3 bg-gray-100 flex items-center justify-center text-gray-400">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Dashboard Preview
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
