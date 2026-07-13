import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { settings } from '../lib/settings';
import { slugify } from '../lib/slug';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('posts');
    const publishedPosts = posts
        .filter((p) => p.data.published)
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    return rss({
        title: settings.site_title,
        description: settings.tagline,
        site: context.site || 'http://localhost:4321',
        items: publishedPosts.map((post) => ({
            title: post.data.title,
            description: post.data.excerpt || '',
            pubDate: post.data.date,
            link: `/posts/${post.data.slug || slugify(post.data.title)}`,
            categories: post.data.categories,
            author: post.data.author,
        })),
        customData: `<language>en-PH</language>`,
    });
}
