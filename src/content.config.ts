import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
    schema: z.object({
        title: z.string(),
        slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
        date: z.coerce.date(),
        published: z.boolean().default(false),
        excerpt: z.string().optional(),
        categories: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        author: z.string(),
        featured_image: z.string().optional(),
    }),
});

const pagesCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
    schema: z.object({
        title: z.string(),
    }),
});

export const collections = {
    posts: postsCollection,
    pages: pagesCollection,
};
