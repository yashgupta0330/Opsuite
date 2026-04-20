'use client';

import { getStrapiMedia } from '@/lib/strapi-helper';
import Image from 'next/image';
import React, { useState } from 'react';
import { Dialog, DialogCloseButton, DialogHeader, DialogPanel } from '@/components/ui/Dialog';

interface StrapiMedia {
    url?: string | null;
    alternativeText?: string | null;
    name?: string | null;
}

interface TestimonialData {
    content?: string;
    authorName?: string;
    authorRole?: string;
    authorImage?: StrapiMedia | null;
    logo?: StrapiMedia | null;
    videoUrl?: string;
    // Strapi v4 compatibility
    attributes?: TestimonialData;
    data?: { attributes?: TestimonialData };
}

interface TestimonialBannerProps {
    testimonial?: TestimonialData | null;
    themeColor?: string;
}

function getYouTubeEmbedUrl(url?: string): string | null {
    const value = url?.trim();
    if (!value) return null;
    const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/))([^&?/\s]+)/i);
    if (!match?.[1]) return null;
    return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0`;
}

const TestimonialBanner: React.FC<TestimonialBannerProps> = ({ testimonial, themeColor }) => {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [textModalOpen, setTextModalOpen] = useState(false);

    // Handle both Strapi v4 (data.attributes) and v5 flat data
    const tData = testimonial?.attributes || testimonial?.data?.attributes || testimonial;

    if (!tData) return null;

    const quote = (tData.content || '').replace(/<[^>]*>/g, '').trim();
    const authorName = tData.authorName || '';
    const authorRole = tData.authorRole;
    const videoUrl = tData.videoUrl;
    const logoMedia = tData.logo as StrapiMedia | null | undefined;

    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    const hasVideoButton = Boolean(embedUrl);

    const logoUrl = getStrapiMedia(logoMedia?.url ?? null);
    const logoAlt = logoMedia?.alternativeText?.trim() || logoMedia?.name?.trim() || `${authorName} logo`;

    const validThemes = ['purple', 'orange', 'blue', 'yellow'];
    const selectedTheme =
        themeColor && validThemes.includes(themeColor.toLowerCase())
            ? themeColor.toLowerCase()
            : 'blue';
    const bgImage = `/card/${selectedTheme}.png`;

    const previewLimit = 205;
    const truncatedQuote =
        quote.length > previewLimit ? `${quote.slice(0, previewLimit).trimEnd()}...` : quote;
    const shouldShowReadMore = quote.length > previewLimit;

    return (
        <>
            <section className="bg-white text-text-main py-10">
                <div className="max-w-7xl mx-auto px-gutter-xs md:px-gutter-md">
                    <div className="relative flex items-center overflow-hidden rounded-[18px] p-6 md:p-9">
                        {/* Background Image */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <Image
                                src={bgImage}
                                alt="Background design"
                                fill
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="relative z-10 flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                            {/* Content side */}
                            <div
                                className={`flex w-full min-w-0 flex-col justify-center text-white lg:flex-[1_1_auto] ${hasVideoButton ? 'lg:max-w-[calc(100%-260px)]' : 'lg:max-w-none'}`}
                            >
                                {logoUrl && (
                                    <div className="mb-4">
                                        <Image
                                            src={logoUrl}
                                            alt={logoAlt}
                                            width={180}
                                            height={40}
                                            className="h-10 w-auto object-contain"
                                        />
                                    </div>
                                )}

                                <p className="text-sm md:text-3xl leading-snug text-white">
                                    &ldquo;{truncatedQuote}&rdquo;{' '}
                                    {shouldShowReadMore && (
                                        <button
                                            type="button"
                                            onClick={() => setTextModalOpen(true)}
                                            className="inline cursor-pointer whitespace-nowrap text-sm font-semibold text-white underline decoration-white/70 underline-offset-4 transition hover:text-white/85"
                                        >
                                            Read full testimonial
                                        </button>
                                    )}
                                </p>

                                <div className="mt-6 md:mt-8">
                                    <p className="text-white font-bold text-base md:text-2xl">{authorName}</p>
                                    {authorRole && (
                                        <p className="text-white/70 text-xs md:text-base">{authorRole}</p>
                                    )}
                                </div>
                            </div>

                            {/* Watch Video button */}
                            {hasVideoButton && (
                                <div className="relative z-10 flex shrink-0 items-center justify-center lg:ml-auto">
                                    <button
                                        type="button"
                                        onClick={() => setVideoModalOpen(true)}
                                        className="inline-flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-xl bg-[#3B82F6] px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#2563EB]"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        Watch Video
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            <Dialog open={videoModalOpen && !!embedUrl} onClose={() => setVideoModalOpen(false)}>
                <DialogPanel className="sm:max-w-3xl">
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <DialogHeader className="px-6 py-3">
                            <div />
                            <DialogCloseButton onClick={() => setVideoModalOpen(false)} />
                        </DialogHeader>

                        <div className="px-6 pb-4">
                            <div className="flex items-center gap-3">
                                {logoUrl && (
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white p-1.5">
                                        <Image src={logoUrl} alt={logoAlt} width={44} height={44} />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{authorName}</h3>
                                    {authorRole && <p className="text-sm text-gray-500">{authorRole}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="relative mx-6 aspect-video overflow-hidden rounded-xl">
                            <iframe
                                src={embedUrl ?? ''}
                                className="h-full w-full"
                                allow="autoplay; encrypted-media; fullscreen"
                                allowFullScreen
                                title="Testimonial video"
                            />
                        </div>

                        <div className="flex justify-center bg-white px-6 py-4">
                            <button
                                type="button"
                                onClick={() => setVideoModalOpen(false)}
                                className="min-w-27.5 cursor-pointer rounded-lg bg-[#3B82F6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

            {/* Full Testimonial Text Modal */}
            <Dialog open={textModalOpen && !!quote} onClose={() => setTextModalOpen(false)}>
                <DialogPanel className="sm:max-w-4xl">
                    <div className="relative flex max-h-[calc(100dvh-6rem)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:max-h-[calc(100dvh-7rem)]">
                        <DialogHeader className="border-b border-gray-100 bg-white px-4 py-3">
                            {logoUrl ? (
                                <Image
                                    src={logoUrl}
                                    alt={logoAlt}
                                    width={170}
                                    height={34}
                                    className="h-auto max-w-42.5 object-contain"
                                />
                            ) : (
                                <div />
                            )}
                            <DialogCloseButton
                                onClick={() => setTextModalOpen(false)}
                                ariaLabel="Close full testimonial"
                            />
                        </DialogHeader>

                        <div className="relative flex min-h-0 flex-1 flex-col px-4 py-4 md:px-6 md:py-5">
                            <div className="absolute inset-0">
                                <Image src={bgImage} alt="" fill sizes="768px" className="object-cover" />
                            </div>

                            <div className="relative z-10 flex min-h-0 flex-1 flex-col text-white">
                                <div className="min-h-0 overflow-y-auto pr-1">
                                    <p className="text-base leading-[1.65] text-white md:leading-normal">
                                        &ldquo;{quote}&rdquo;
                                    </p>
                                </div>

                                <div className="mt-4 shrink-0">
                                    <p className="text-xl font-bold leading-tight text-white">{authorName}</p>
                                    {authorRole && (
                                        <p className="mt-1 text-sm font-medium text-white md:text-[15px]">
                                            {authorRole}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center bg-white px-4 py-3">
                            <button
                                type="button"
                                onClick={() => setTextModalOpen(false)}
                                className="min-w-27.5 cursor-pointer rounded-lg bg-[#3B82F6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
};

export default TestimonialBanner;
