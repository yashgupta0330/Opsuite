import { getStrapiMedia } from '@/lib/strapi-helper';
import Image from 'next/image';
import React from 'react';
interface GridCard {
    id: number;
    title: string;
    description: string;
    image: any;
    mediaType?: 'icon' | 'image';
}

interface FeatureGridProps {
    sectionTitle: string;
    sectionDescription?: string;
    cards: GridCard[];
    themeColor?: string;
}


const MediaComponent: React.FC<{ card: GridCard, className?: string }> = ({ card, className }) => {
    const imageUrl = getStrapiMedia(card.image?.url || card.image?.data?.attributes?.url);
    const mediaType = card.mediaType || 'image';

    if (mediaType === 'icon') {
        return (
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg  mb-4 ${className}`}>
                {imageUrl ? (
                    <Image src={imageUrl} alt={card.title} width={40} height={40} className="object-contain" />
                ) : (
                    <div className="w-10 h-10     rounded-full" />
                )}
            </div>
        );
    }

    return (
        <div className={`w-full relative overflow-hidden rounded bg-(--color-base-10) ${className}`}>
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-primary/40 font-medium">Image</div>
            )}
        </div>
    );
};

const CardItem: React.FC<{ card: GridCard, variant?: 'compact' | 'large', hideMedia?: boolean, mediaPosition?: 'top' | 'bottom' }> = ({ card, variant = 'large', hideMedia, mediaPosition }) => {
    const isCompact = variant === 'compact';
    const effectiveMediaPosition = mediaPosition || (isCompact ? 'bottom' : 'top');

    return (
        <div className={`bg-white rounded-lg border border-gray-100 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${isCompact ? 'gap-2' : 'gap-4'}`}>
            {!hideMedia && card.mediaType === 'icon' && <MediaComponent card={card} />}
            
            {!hideMedia && card.mediaType !== 'icon' && effectiveMediaPosition === 'top' && (
                <MediaComponent card={card} className="aspect-[4/3]" />
            )}

            <div className="flex flex-col grow">
                <h3 className={`font-bold text-gray-900 mb-2 ${isCompact ? 'text-lg' : 'text-xl'}`}>
                    {card.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
                    {card.description}
                </p>
            </div>

            {!hideMedia && card.mediaType !== 'icon' && effectiveMediaPosition === 'bottom' && (
                <MediaComponent card={card} className="aspect-[4/3]" />
            )}
        </div>
    );
};

// --- INTEGRATION SPECIALIZED COMPONENTS ---

const CardItemIntegration: React.FC<{ card: GridCard, index: number }> = ({ card, index }) => {
    const imageUrl = getStrapiMedia(card.image?.url || card.image?.data?.attributes?.url);
    
    // Cards 1, 3, and 9 (0-indexed: 0, 2, 8) show large centered images
    const isImageOnlyCard = index === 0 || index === 2 || index === 8;
    
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg gap-4 group">
            {isImageOnlyCard && imageUrl && (
                <div className="w-full aspect-4/3 relative overflow-hidden rounded-xl">
                    <Image
                        src={imageUrl}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            <div className="flex justify-between items-start w-full">
                {!isImageOnlyCard && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg ">
                        <Image 
                            src="/integration/icon.svg" 
                            alt="Integration icon" 
                            width={40} 
                            height={40}
                        />
                    </div>
                )}
                {!isImageOnlyCard && imageUrl && (
                    <div className="h-12 w-auto relative min-w-23">
                        <Image 
                            src={imageUrl} 
                            alt={`${card.title} logo`} 
                            fill 
                            className="object-contain object-right"
                        />
                    </div>
                )}
                {isImageOnlyCard && (
                    <div className="w-10 h-10" /> // Spacer for layout consistency
                )}
            </div>

            <div className="flex flex-col grow">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">
                    {card.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
                    {card.description}
                </p>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const FeatureGrid: React.FC<FeatureGridProps> = ({
    sectionTitle,
    sectionDescription,
    cards,
}) => {
    if (!cards || cards.length === 0) return null;

    const count = cards.length;

    // Trigger specialized layout for 11 or 12 cards (Integration page style)
    if (count >= 11) {
        return (
            <section className="py-20 bg-(--color-base-10)">
                <div className="container-fluid">
                    <div className="text-center max-w-5xl mx-auto mb-16">
                        <h2 className="heading-2 mb-6">
                            {sectionTitle}
                        </h2>
                        {sectionDescription && (
                            <p className="sub-description ">
                                {sectionDescription}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                       {cards.map((card, index) => (
                           <div 
                             key={card.id} 
                             className={`${(index === 0 || index === 2 || index === 8) ? 'lg:row-span-2' : ''}`}
                           >
                               <CardItemIntegration card={card} index={index} />
                           </div>
                       ))}
                    </div>
                </div>
            </section>
        );
    }

    const renderLayout = () => {
        if (count === 4) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    <div className="md:col-span-4">
                        <CardItem card={cards[0]} />
                    </div>
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <CardItem card={cards[1]} variant="compact" />
                        <CardItem card={cards[2]} variant="compact" />
                    </div>
                    <div className="md:col-span-4">
                        <CardItem card={cards[3]} mediaPosition="bottom" />
                    </div>
                </div>
            );
        }

        if (count === 5) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <CardItem card={cards[0]} variant="compact" />
                        <CardItem card={cards[1]} variant="compact" />
                    </div>
                    <div className="md:col-span-4">
                        <CardItem card={cards[2]} />
                    </div>
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <CardItem card={cards[3]} variant="compact" />
                        <CardItem card={cards[4]} variant="compact" />
                    </div>
                </div>
            );
        }

        if (count === 6) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card} variant="compact" />
                    ))}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <CardItem 
                        key={card.id} 
                        card={card} 
                        mediaPosition={index === 1 ? 'bottom' : 'top'}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="py-20 bg-(--color-base-10)">
            <div className="container-fluid">
                <div className="text-center max-w-5xl mx-auto mb-16">
                    <h2 className="heading-2 mb-6">
                        {sectionTitle}
                    </h2>
                    {sectionDescription && (
                        <p className="sub-description ">
                            {sectionDescription}
                        </p>
                    )}
                </div>

                {renderLayout()}
            </div>
        </section>
    );
};

export default FeatureGrid;