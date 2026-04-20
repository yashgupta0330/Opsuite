import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { Fragment } from 'react';
import { getStrapiMedia } from '@/lib/strapi-helper';

type BlockNode = Record<string, unknown>;

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function renderInlineChildren(children: BlockNode[]) {
    return children.map((child, i) => {
        if (child.type === 'link') {
            const nested = (child.children as BlockNode[]) ?? [];
            return (
                <a
                    key={i}
                    href={String(child.url ?? '#')}
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {nested.map((c, j) => <Fragment key={j}>{String(c.text ?? '')}</Fragment>)}
                </a>
            );
        }

        let node: React.ReactNode = String(child.text ?? '');
        if (child.bold) node = <strong>{node}</strong>;
        if (child.italic) node = <em>{node}</em>;
        if (child.underline) node = <u>{node}</u>;
        if (child.strikethrough) node = <s>{node}</s>;
        if (child.code) node = <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">{node}</code>;
        return <Fragment key={i}>{node}</Fragment>;
    });
}

function renderBlock(block: BlockNode, i: number): React.ReactNode {
    const children = (block.children as BlockNode[]) ?? [];

    switch (block.type) {
        case 'paragraph':
            return <p key={i}>{renderInlineChildren(children)}</p>;

        case 'heading': {
            const level = Math.min(Math.max((block.level as number) ?? 2, 1), 6);
            const text = children.map(c => String(c.text ?? '')).join('');
            const id = slugify(text);
            const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            return <Tag key={i} id={id}>{renderInlineChildren(children)}</Tag>;
        }

        case 'list': {
            const Tag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
                <Tag key={i}>
                    {children.map((item, j) => (
                        <li key={j}>{renderInlineChildren((item.children as BlockNode[]) ?? [])}</li>
                    ))}
                </Tag>
            );
        }

        case 'image': {
            const img = block.image as BlockNode | undefined;
            if (!img) return null;
            const src = getStrapiMedia(String(img.url ?? '')) || String(img.url ?? '');
            if (!src) return null;
            return (
                <figure key={i} className="my-6">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                        <Image src={src} alt={String(img.alternativeText ?? '')} fill className="object-cover" />
                    </div>
                    {!!img.caption && (
                        <figcaption className="text-center text-sm text-gray-500 mt-2">{String(img.caption)}</figcaption>
                    )}
                </figure>
            );
        }

        case 'quote':
            return (
                <blockquote key={i} className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                    {renderInlineChildren(children)}
                </blockquote>
            );

        case 'code':
            return (
                <pre key={i} className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono my-4">
                    <code>{children.map(c => String(c.text ?? '')).join('')}</code>
                </pre>
            );

        default:
            return null;
    }
}

export const BlogContent = ({ content }: { content: unknown }) => {
    if (Array.isArray(content)) {
        if (content.length === 0) return null;
        return (
            <div className="blog-content-rich prose prose-lg max-w-none space-y-4">
                {(content as BlockNode[]).map((block, i) => renderBlock(block, i))}
            </div>
        );
    }

    if (typeof content === 'string' && content.length > 0) {
        return (
            <div
                className="blog-content-rich prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            />
        );
    }

    return null;
};

