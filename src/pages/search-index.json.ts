import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { slugify } from '../lib/slug';

/**
 * generate a json endpoint of all published posts for client-side search
 * this runs at build time and produces a static json file
 */
export async function GET(context: APIContext) {
    const posts = await getCollection('posts');
    const publishedPosts = posts
        .filter((p) => p.data.published)
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    const index = publishedPosts.map((post) => ({
        title: post.data.title,
        slug: post.data.slug || slugify(post.data.title),
        excerpt: post.data.excerpt || '',
        date: post.data.date.toISOString(),
        categories: post.data.categories,
        tags: post.data.tags,
    }));

    return new Response(JSON.stringify(index), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
