# Computer Professionals' Union

the public website of the Computer Professionals' Union (CPU), a mass organization of Filipino ICT professionals advocating for a nationalist, democratic, and people-centric ICT sector

built with [Astro](https://astro.build) v7, styled with [Tailwind CSS](https://tailwindcss.com) v4, interactive islands in [React](https://react.dev) 19, and content managed through [Pages CMS](https://pagescms.org)

## quick start

```bash
npm install        # install dependencies
npm run dev        # start the dev server
npm run build      # build for production
npm run preview    # preview the production build
```

## content editing with Pages CMS

Pages CMS is a git-based headless CMS that commits directly to this repository. editors use its web UI to create and edit content. each save triggers a commit, which triggers a rebuild on Vercel

### setup

1. deploy this repository to Vercel
2. go to [app.pagescms.org](https://app.pagescms.org) or your self-hosted instance
3. connect your GitHub repository
4. Pages CMS reads `.pages.yml` and configures the editing interface automatically

### what editors can do

- **posts** - create and edit blog posts with markdown, images, categories, and tags. only posts with `published: true` appear on the site
- **static pages** - edit the About, Privacy, and Terms pages
- **site settings** - update the site title, tagline, about text, and social links from the settings editor
- **images** - upload images to `public/images/` through the media library. use them in posts via the rich text editor or as featured images

### how it works

when an editor saves in Pages CMS, it commits the change directly to the repository. that commit triggers an automatic rebuild on Vercel. the live site updates within seconds

## design

- **dark theme**
- **colours** - near-black background (`#0d0d0d`), white text (`#ededed`), orange accent (`#ff9300`) from the official CPU logo
- **typography** - Newsreader for headings, system sans-serif for body
- **responsive layout**
- **WCAG AA** colour contrast throughout
- **prefers-reduced-motion** support

## features

- fully static site (SSG)
- posts with categories, tags, authors, and featured images - all clickable filters
- client-side search with Fuse.js (Ctrl+K to open)
- RSS feed at `/rss.xml`
- automatic sitemap at `/sitemap-index.xml`
- smooth page transitions via Astro's ClientRouter
- JSON-LD structured data for search engines
- Open Graph meta tags for social media previews
- floating pill navigation with responsive mobile layout
- custom 404 page
- self-hosted Umami analytics (no cookies)
- skeleton loaders for the search dialog

## deployment

connect the repository to Vercel. the build command is `npm run build` and the output directory is `dist/`

set these environment variables in your Vercel project settings:

| variable | description |
|---|---|
| `PUBLIC_SITE_URL` | canonical site URL (e.g. `http://cp-union.com`) |
| `PUBLIC_UMAMI_SCRIPT_URL` | Umami tracking script URL |
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami website ID |

## development

```bash
npm run dev        # start the astro dev server
npm run build      # build the static site to dist/
npm run preview    # preview the built site locally
```
