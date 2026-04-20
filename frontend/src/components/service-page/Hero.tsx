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
    
    return (
        <section className="relative overflow-hidden bg-white pt-44 pb-20">
            {/* Design Radial Orbs for Background Texture */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20" />

            <div className="masthead container-fluid mx-auto relative z-10">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 px-4">
                        {/* Text Content - Left Side */}
                        <div className="w-full lg:max-w-[580px] flex flex-col items-start text-left">
                            {subheading && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#99F2F9] text-[#0B7285] mb-6 shadow-sm">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2V12L9.5 9.5L12 2Z" fill="currentColor" />
                                    </svg>
                                    <span className="font-bold text-xs uppercase tracking-wider">
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
                                    className="px-8 py-3.5 rounded-full border border-gray-300 text-[#011857] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    View Features <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </Link>
                                <Link
                                    href={primaryButtonLink || '#'}
                                    className="px-8 py-3.5 rounded-full bg-[#011857] text-white font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                                >
                                    {primaryButtonText} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Image Content - Right Side */}
                        <div className="relative w-full lg:max-w-[650px]">
                            <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                                {imageUrl ? (
                                    <div className="relative rounded-2xl p-1">
                                        <Image
                                            src={imageUrl}
                                            alt={heading}
                                            width={1000}
                                            height={750}
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-video bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                                        <div className="text-center">
                                            <p className="font-medium">Solution Dashboard Preview</p>
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

