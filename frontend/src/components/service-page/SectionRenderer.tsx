import React from 'react';

import AdvantageSection from './AdvantageSection';
import ContactSection from './ContactSection';
import FeatureGrid from './FeatureGrid';
import FeatureHighlights from './FeatureHighlights';
import Hero from './Hero';
import NumberedBenefits from './NumberedBenefits';
import SideFeature from './SideFeature';
import TestimonialBanner from './TestimonialBanner';

type SectionComponentProps = Record<string, unknown>;

export interface StrapiSection extends SectionComponentProps {
    id?: number;
    __component: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionComponents: { [key: string]: React.ComponentType<any> } = {
    'sections.hero': Hero,
    'sections.advantage-section': AdvantageSection,
    'sections.feature-highlights': FeatureHighlights,
    'sections.side-feature': SideFeature,
    'sections.feature-grid': FeatureGrid,
    'sections.numbered-benefits': NumberedBenefits,
    'sections.testimonial-banner': TestimonialBanner,
    'sections.contact-section': ContactSection,
};

interface SectionRendererProps {
    sections?: StrapiSection[];
    themeColor?: string;
}

export default function SectionRenderer({ sections, themeColor }: SectionRendererProps) {
    if (!sections?.length) {
        return null;
    }

    return (
        <>
            {sections.map((section, index) => {
                const Component = sectionComponents[section.__component];

                if (!Component) {
                    console.warn(`Component not found for: ${section.__component}`);
                    return null;
                }

                const extraProps: Record<string, unknown> = { themeColor };

                if (section.__component === 'sections.side-feature') {
                    extraProps.blobIndex = sections
                        .slice(0, index)
                        .filter((item) => item.__component === 'sections.side-feature').length;
                }

                return (
                    <Component
                        key={`${section.__component}-${section.id ?? index}-${index}`}
                        {...section}
                        {...extraProps}
                    />
                );
            })}
        </>
    );
}