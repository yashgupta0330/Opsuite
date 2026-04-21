import { cache } from 'react';

import { getStrapiURL } from './strapi-helper';
import type { StrapiSection } from '@/components/service-page/SectionRenderer';

type StrapiObject = {
    id?: number;
    attributes?: Record<string, unknown>;
    data?: unknown;
    [key: string]: unknown;
};

function isStrapiObject(value: unknown): value is StrapiObject {
    return typeof value === 'object' && value !== null;
}

export interface StrapiSectionPage {
    id: number;
    title?: string;
    shortDescription?: string;
    themeColor?: string;
    metaTitle?: string;
    metaDescription?: string;
    sections?: StrapiSection[];
    slug?: string;
}

function appendCommonSectionPopulate(params: URLSearchParams) {
    const populateEntries: Array<[string, string]> = [
        ['fields', '*'],
        ['populate[sections][on][sections.hero][populate][image][fields][0]', 'url'],
        ['populate[sections][on][sections.advantage-section][populate]', '*'],
        ['populate[sections][on][sections.feature-highlights][populate][beforeCard][populate][items][populate][icon][fields][0]', 'url'],
        ['populate[sections][on][sections.feature-highlights][populate][beforeCard][populate][bgImage][fields][0]', 'url'],
        ['populate[sections][on][sections.feature-highlights][populate][beforeCard][populate][icon][fields][0]', 'url'],
        ['populate[sections][on][sections.feature-highlights][populate][afterCard][populate][items][populate][icon][fields][0]', 'url'],
        ['populate[sections][on][sections.feature-highlights][populate][afterCard][populate][bgImage][fields][0]', 'url'],
        ['populate[sections][on][sections.feature-highlights][populate][afterCard][populate][icon][fields][0]', 'url'],
        ['populate[sections][on][sections.feature-highlights][populate][summaryItems][populate][icon][fields][0]', 'url'],
        ['populate[sections][on][sections.side-feature][populate][features][populate][icon][fields][0]', 'url'],
        ['populate[sections][on][sections.side-feature][populate][image][fields][0]', 'url'],
        ['populate[sections][on][sections.feature-grid][populate][cards][populate][image][fields][0]', 'url'],
        ['populate[sections][on][sections.numbered-benefits][populate]', '*'],
        ['populate[sections][on][sections.testimonial-banner][populate][testimonial][populate][logo][fields][0]', 'url'],
        ['populate[sections][on][sections.testimonial-banner][populate][testimonial][populate][authorImage][fields][0]', 'url'],
        ['populate[sections][on][sections.testimonial-banner][populate][testimonial][fields]', '*'],
        ['populate[sections][on][sections.contact-section][populate][featuresList][populate][icon][fields][0]', 'url'],
    ];

    for (const [key, value] of populateEntries) {
        params.set(key, value);
    }
}

async function fetchFromStrapi(url: string, revalidate = 60) {
    const fetchOptions: RequestInit = {
        next: { revalidate },
    };

    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

function normalizeEntry<T>(entry: unknown): T | null {
    if (!isStrapiObject(entry)) {
        return null;
    }

    if (entry.attributes) {
        return {
            id: entry.id,
            ...entry.attributes,
        } as T;
    }

    return entry as T;
}

function extractEntries<T>(payload: unknown): T[] {
    if (isStrapiObject(payload) && Array.isArray(payload.data)) {
        return payload.data
            .map((entry) => normalizeEntry<T>(entry))
            .filter(Boolean) as T[];
    }

    if (
        isStrapiObject(payload) &&
        isStrapiObject(payload.data) &&
        Array.isArray(payload.data.data)
    ) {
        return payload.data.data
            .map((entry) => normalizeEntry<T>(entry))
            .filter(Boolean) as T[];
    }

    return [];
}

function extractSingleEntry<T>(payload: unknown): T | null {
    if (isStrapiObject(payload) && Array.isArray(payload.data)) {
        return normalizeEntry<T>(payload.data[0]);
    }

    if (isStrapiObject(payload) && payload.data) {
        return normalizeEntry<T>(payload.data);
    }

    return null;
}

export const getCollectionPageBySlug = cache(async (collection: string, slugInput: string | string[]) => {
    const slugSegments = Array.isArray(slugInput) ? slugInput.filter(Boolean) : [slugInput].filter(Boolean);
    const slug = slugSegments.join('/');
    const lastSegment = slugSegments[slugSegments.length - 1];

    const params = new URLSearchParams();
    appendCommonSectionPopulate(params);

    if (slug) {
        let index = 0;
        const slugWithTrailingSlash = slug.startsWith('/') ? slug : `/${slug}`;
        
        params.set(`filters[slug][$in][${index++}]`, slug);
        if (slug !== slugWithTrailingSlash) {
            params.set(`filters[slug][$in][${index++}]`, slugWithTrailingSlash);
        }

        if (lastSegment && lastSegment !== slug && lastSegment !== slugWithTrailingSlash) {
            params.set(`filters[slug][$in][${index++}]`, lastSegment);
        }
    }

    const url = getStrapiURL(`/${collection}?${params.toString()}`);

    try {
        const payload = await fetchFromStrapi(url);
        const entries = extractEntries<StrapiSectionPage>(payload);
        return entries[0] ?? null;
    } catch (error) {
        console.error(`Error fetching ${collection} page for slug:`, slugInput, error);
        return null;
    }
});

export const getSinglePage = cache(async (contentType: string) => {
    const params = new URLSearchParams();
    appendCommonSectionPopulate(params);

    const url = getStrapiURL(`/${contentType}?${params.toString()}`);

    try {
        const payload = await fetchFromStrapi(url);
        return extractSingleEntry<StrapiSectionPage>(payload);
    } catch (error) {
        console.error(`Error fetching single page ${contentType}:`, error);
        return null;
    }
});

export async function getCollectionSlugs(collection: string) {
    const url = getStrapiURL(`/${collection}?fields[0]=slug&pagination[pageSize]=100`);

    try {
        const payload = await fetchFromStrapi(url);
        return extractEntries<StrapiSectionPage>(payload)
            .map((entry) => entry.slug)
            .filter((slug): slug is string => Boolean(slug));
    } catch (error) {
        console.error(`Error fetching slugs for ${collection}:`, error);
        return [];
    }
}