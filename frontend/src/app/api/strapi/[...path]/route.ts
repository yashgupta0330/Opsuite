import { getStrapiURL } from '@/lib/strapi-helper';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, 'GET');
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, 'POST');
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, 'PUT');
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, 'DELETE');
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    return handleRequest(request, await params, 'PATCH');
}

async function handleRequest(
    request: NextRequest,
    params: { path: string[] },
    method: string
) {
    try {
        // Reconstruct the Strapi endpoint path
        const strapiPath = '/' + (params.path?.join('/') || '');
        
        // Get query parameters from the original request
        const searchParams = request.nextUrl.searchParams.toString();
        const fullPath = searchParams ? `${strapiPath}?${searchParams}` : strapiPath;
        
        const url = getStrapiURL(fullPath);

        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Forward the body for POST, PUT, PATCH requests
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                const body = await request.text();
                if (body) {
                    fetchOptions.body = body;
                }
            } catch (e) {
                // No body or error reading body
            }
        }

        // In Node.js environment, handle SSL for staging
        if (url.includes('staging.servitiumcrm.com')) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }

        const res = await fetch(url, fetchOptions);

        // Get response body
        const data = await res.json();

        // Return the exact response from Strapi with proper status
        return NextResponse.json(data, {
            status: res.status,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
            }
        });
    } catch (error) {
        console.error('Error in Strapi proxy:', error);
        return NextResponse.json(
            { error: 'Proxy request failed', details: String(error) },
            { status: 500 }
        );
    }
}
