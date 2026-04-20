export interface ServicePage {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    category: "Customer Service Operations" | "Mobility Suite" | "Core Capabilities" | "Technology & Infrastructure";
    rank?: number;
}

export interface ModuleData {
    core: ServicePage[];
    tech: ServicePage[];
}

export interface SolutionsData {
    cso: ServicePage[];
    mobility: ServicePage[];
}

import { cache } from 'react';
import { getStrapiURL } from './strapi-helper';

export async function getSolutions(): Promise<SolutionsData> {
    return _getSolutions();
}

const _getSolutions = cache(async (): Promise<SolutionsData> => {
    try {
        const url = getStrapiURL('/service-pages?fields[0]=title&fields[1]=slug&fields[2]=shortDescription&fields[3]=category&fields[4]=rank&pagination[pageSize]=100');
        console.log(`[FETCH_START] getSolutions | Env: ${typeof window === 'undefined' ? 'Server' : 'Client'} | URL: ${url}`);
        
        const fetchOptions: RequestInit = {
            next: { revalidate: 60 }
        };

        const res = await fetch(url, fetchOptions);
        console.log(`[FETCH_SUCCESS] getSolutions | Status: ${res.status}`);

        if (!res.ok) {
            console.error("Failed to fetch solutions:", res.statusText);
            return { cso: [], mobility: [] };
        }

        const data = await res.json();
        
        // Strapi v5 structure check
        let rawPages = [];
        if (Array.isArray(data.data)) {
            rawPages = data.data;
        } else if (data.data && Array.isArray(data.data.data)) {
            rawPages = data.data.data;
        }

        const pages: ServicePage[] = rawPages || [];

        // Sort pages by rank (ascending). Default rank is 100 if not set.
        const sortedPages = [...pages].sort((a, b) => (a.rank ?? 100) - (b.rank ?? 100));

        const cso = sortedPages.filter(
            (p) => p.category === "Customer Service Operations"
        );
        const mobility = sortedPages.filter((p) => p.category === "Mobility Suite");

        return { cso, mobility };
    } catch (error) {
        console.error(`[Fetch Error] Failed to fetch solutions from ${getStrapiURL('/service-pages')}:`, error);
        return { cso: [], mobility: [] };
    }
});

export async function getModules(): Promise<ModuleData> {
    return _getModules();
}

const _getModules = cache(async (): Promise<ModuleData> => {
    try {
        const url = getStrapiURL('/modules?fields[0]=title&fields[1]=slug&fields[2]=shortDescription&fields[3]=category&fields[4]=rank&pagination[pageSize]=100');
        console.log(`[FETCH_START] getModules | Env: ${typeof window === 'undefined' ? 'Server' : 'Client'} | URL: ${url}`);
        
        const fetchOptions: RequestInit = {
            next: { revalidate: 60 }
        };


        const res = await fetch(url, fetchOptions);
        console.log(`[FETCH_SUCCESS] getModules | Status: ${res.status}`);

        if (!res.ok) {
            console.error("Failed to fetch modules items:", res.statusText);
            return { core: [], tech: [] };
        }

        const data = await res.json();
        let rawPages = [];
        if (Array.isArray(data.data)) {
            rawPages = data.data;
        } else if (data.data && Array.isArray(data.data.data)) {
            rawPages = data.data.data;
        }

        const pages: ServicePage[] = rawPages || [];

        // Sort pages by rank (ascending). Default rank is 100 if not set.
        const sortedPages = [...pages].sort((a, b) => (a.rank ?? 100) - (b.rank ?? 100));

        const core = sortedPages.filter(
            (p) => p.category === "Core Capabilities"
        );
        const tech = sortedPages.filter((p) => p.category === "Technology & Infrastructure");

        return { core, tech };
    } catch (error) {
        console.error("Error fetching modules:", error);
        return { core: [], tech: [] };
    }
});

export interface Testimonial {
    id: number;
    content: string;
    authorName: string;
    authorRole: string;
    authorCompany: string;
    storyLink: string | null;
    logo?: {
        url: string;
    } | null;
    bgImage?: {
        url: string;
    } | null;
    authorImage?: {
        url: string;
    } | null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
    return _getTestimonials();
}

const _getTestimonials = cache(async (): Promise<Testimonial[]> => {
    try {
        const url = getStrapiURL('/testimonials?populate=*');
        console.log(`[FETCH_START] getTestimonials | Env: ${typeof window === 'undefined' ? 'Server' : 'Client'} | URL: ${url}`);
        
        const fetchOptions: RequestInit = {
            next: { revalidate: 3600 }
        };

        const res = await fetch(url, fetchOptions);

        if (!res.ok) {
            console.error("Failed to fetch testimonials:", res.statusText);
            return [];
        }

        const data = await res.json();
        let rawData = [];
        if (Array.isArray(data.data)) {
            rawData = data.data;
        } else if (data.data && Array.isArray(data.data.data)) {
            rawData = data.data.data;
        }

        return rawData || [];
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
});
