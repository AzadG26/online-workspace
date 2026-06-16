# Online Workspace

A collection of educational web projects for children's learning and development.

## Projects

### [Pogo Tunes](./pogo-tunes/) — Next.js Educational Platform

A premium, production-grade children's educational platform built with Next.js 16, TypeScript, and Tailwind CSS v4. Features interactive games, quizzes, flashcards, videos, and more — all completely free and ad-free.

- **35 routes** including games, quizzes, learning categories, blog, and media
- **6 fully playable games** with scoring, levels, animations, and sound effects
- **12 learning categories** covering ABCs, Hindi, Counting, Colors, Animals, and more
- **PWA support** with manifest, service worker, and offline fallback
- **SEO optimized** with sitemap (34 URLs), robots.txt, and structured metadata
- **Deployed on 3 platforms:** Vercel, Netlify, and Blogger

### Live Sites

| Platform | URL | Type |
|----------|-----|------|
| **Vercel** | [pogotunes.vercel.app](https://pogotunes.vercel.app) | Next.js SSR + API (primary) |
| Netlify | [pogotunes.netlify.app](https://pogotunes.netlify.app) | Next.js static + SSR |
| Blogger | [pogotunes.blogspot.com](https://pogotunes.blogspot.com) | Legacy blog |
| YouTube | [@Pogotunes](https://www.youtube.com/@Pogotunes) | Video content |

[View Pogo Tunes README →](./pogo-tunes/README.md)

### Pogotunes Blogger Theme

A custom Blogger theme (XML) for the Pogo Tunes educational content channel — SEO-optimized with improved meta tags and canonical URLs.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, Framer Motion
- **Languages:** TypeScript, CSS
- **Icons:** Lucide React
- **PWA:** Custom service worker, Web App Manifest
- **Cloudflare:** OpenNext adapter for Workers deployment

## Deployment

The Next.js app is configured for multi-platform deployment:

- **Vercel:** `vercel.json` — Next.js framework, auto-configures
- **Netlify:** `netlify.toml` — build command + publish directory
- **Cloudflare:** `wrangler.jsonc` + `open-next.config.ts` — OpenNext adapter for SSR

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
