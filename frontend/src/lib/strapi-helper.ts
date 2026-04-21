export function getStrapiURL(path = '') {
    const baseUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL ||
        'http://localhost:1337';

    return `${baseUrl}/api${path}`;
}

export function getStrapiMedia(urlData: any) {
    if (!urlData) {
        return null;
    }

    // Extract URL if it's an object (Strapi v4/v5 format)
    let url = typeof urlData === 'string' ? urlData : null;
    if (!url && typeof urlData === 'object') {
        url = urlData.url || urlData.data?.attributes?.url || null;
    }

    if (!url) {
        return null;
    }

    // If already a full URL, return as-is
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Local public assets (e.g. /about-us/manage.png) — serve from Next.js /public
    // Only /uploads/* paths need the Strapi domain prepended
    if (url.startsWith('/') && !url.startsWith('/uploads')) {
        return url;
    }

    // Strapi uploads — prepend the public domain so browser can reach them
    const strapiUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL ||
        'http://localhost:1337';

    return `${strapiUrl}${url}`;
}
