# changelog

## [1.0.0] - 2025-07-16

### added

- astro v7 static site with react 19 islands
- custom UI components from scratch - button, card, input, skeleton, badge, dialog (no library dependencies)
- dark theme with orange (#FF9300) accent from the official CPU logo
- Newsreader headings + system sans-serif body via @fontsource
- floating pill navigation with responsive mobile layout and blank spacer on home
- landing page with full-viewport hero (96px logo), about section from settings, and latest posts grid
- posts collection with slugify auto-generation, paginated listing (6 per page), and single post view with reading time
- category, tag, and author filter pages - all clickable from post metadata
- static pages from content collection - about, privacy, terms, contact
- custom 404 page
- RSS feed at `/rss.xml` and automatic sitemap
- client-side search with Fuse.js, Ctrl+K shortcut, and SPA navigation via Astro's `navigate()`
- JSON search index endpoint generated at build time
- Pages CMS configuration for editors (posts, pages, settings, media)
- featured image support - upload via CMS, displays on post page and as OG image
- smooth page transitions via Astro ClientRouter
- JSON-LD structured data and Open Graph meta tags
- responsive design with mobile-first approach
- body scroll lock when search dialog is open
- backdrop blur on search overlay with enter/exit transitions
- click-outside-to-close on search dialog
- prefers-reduced-motion support
- WCAG AA colour contrast compliance
- favicon with CPU branding
- `slugify` utility used consistently across the entire codebase
- `.prettierrc`, `.editorconfig`, `.env.example`, strict TypeScript config
