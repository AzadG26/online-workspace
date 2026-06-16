<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Pogo%20Tunes-FF6B6B?style=for-the-badge&logo=nextdotjs&logoColor=white">
    <img alt="Pogo Tunes" src="https://img.shields.io/badge/Pogo%20Tunes-FF6B6B?style=for-the-badge&logo=nextdotjs&logoColor=white" width="200">
  </picture>
</p>

<h1 align="center">Pogo Tunes — Fun Learning for Kids</h1>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js%2016-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React%2019-087EA4?logo=react&logoColor=white" alt="React 19"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4"></a>
  <br>
  <a href="https://github.com/AzadG26/online-workspace"><img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License"></a>
  <a href="https://pogotunes.netlify.app"><img src="https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?logo=netlify&logoColor=white" alt="Live Demo"></a>
  <a href="https://www.youtube.com/@Pogotunes"><img src="https://img.shields.io/badge/YouTube-FF0000?logo=youtube&logoColor=white" alt="YouTube"></a>
</p>

<p align="center">
  <strong>Premium educational platform for toddlers, preschoolers, and early learners.</strong><br>
  Interactive games, quizzes, flashcards, videos, and worksheets — all free and ad-free.
</p>

---

## ✨ Features

### 🎮 Interactive Games
| Game | Description |
|------|------------|
| **Memory Match** | Find matching pairs — 6 levels, 12 pairs max |
| **Alphabet Puzzle** | Tap letters in alphabetical order — 6 levels |
| **Color Sort** | Match colors to their names — 6 rounds |
| **Number Match** | Count dots and match to numbers |
| **Shape Sorter** | Identify shapes from options |
| **Animal Puzzle** | Guess the animal from clues |
| **Quiz Engine** | 12+ MCQ questions across 8 categories |

### 📚 Learning Categories
ABCs, Hindi Varnamala, Counting (1-100), Colors, Animals, Birds, Fruits, Vegetables, Vehicles, Shapes, Body Parts, Phonics — each with interactive learning grids and video content.

### 🎬 Media Library
- Educational videos with category filtering
- Quick shorts for bite-sized learning
- Rich blog articles with related posts

### ⚡ Technical Highlights
- **PWA** — Offline support, installable, service worker caching
- **SEO** — Sitemap, robots.txt, Open Graph, Twitter Cards, structured metadata
- **Accessibility** — Skip-to-content, ARIA labels, full keyboard navigation
- **Animations** — Framer Motion page transitions, micro-interactions, confetti
- **Performance** — Static generation (SSG), code-splitting, optimized images

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/AzadG26/online-workspace.git
cd online-workspace/pogo-tunes

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build     # Builds 34+ routes
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 🌍 Deploy Online (100% Free)

All features work on every free tier below — games, quizzes, PWA, service worker, dynamic routes, SEO — no paid plan needed.

### 🚀 Option 1: Vercel (Recommended — Easiest)

Vercel is made by the creators of Next.js. Everything works out of the box.

```bash
# 1. Push your code to GitHub (already done)

# 2. Go to https://vercel.com and click "Add New → Project"

# 3. Import your GitHub repo (AzadG26/online-workspace)

# 4. In "Configure Project", set:
#    Root Directory:  pogo-tunes/
#    Framework:       Next.js  (auto-detected)
#    Build Command:   npm run build  (auto)
#    Output Dir:      .next  (auto)

# 5. Click "Deploy" — done in ~2 minutes
```

**What you get free:** Auto SSL, custom domain, 100 GB bandwidth/mo, 100 GB-hours serverless execution, CI/CD from GitHub.

**Custom domain (optional):**
1. Go to Project → Settings → Domains
2. Add your domain (e.g. `pogotunes.com`)
3. Update your domain's DNS Nameservers to Vercel's

---

### 🟣 Option 2: Netlify (Great Alternative)

```bash
# 1. Go to https://netlify.com and click "Add new site → Import existing project"

# 2. Connect your GitHub repo (AzadG26/online-workspace)

# 3. In deploy settings:
#    Root Directory:  pogo-tunes/
#    Build Command:   npm run build
#    Publish Dir:     .next

# 4. Add a netlify.toml (already included — configures Next.js)

# 5. Click "Deploy"
```

**What you get free:** Auto SSL, custom domain, 100 GB bandwidth/mo, 300 build minutes/mo.

---

### ☁️ Option 3: Cloudflare Pages (Fastest CDN)

```bash
# 1. Go to https://pages.cloudflare.com and click "Create a project"

# 2. Connect your GitHub repo

# 3. In build settings:
#    Root Directory:  pogo-tunes/
#    Build Command:   npm run build
#    Build Output:    .next

# 4. Click "Save and Deploy"

# ⚠️ Do NOT include wrangler.toml — it triggers the wrong deploy command.
# Build settings are configured in the dashboard only.

# For API routes to work on Cloudflare Pages, install the adapter:
#   npm install @cloudflare/next-on-pages
# Then change Build Command to: npx @cloudflare/next-on-pages
```

**What you get free:** Auto SSL, custom domain, unlimited bandwidth, 500K requests/mo, global CDN.

**⚠️ Cloudflare note:** API routes require the `@cloudflare/next-on-pages` adapter. Vercel/Netlify support API routes natively with no extra setup. Do not include `wrangler.toml` in your repo — Cloudflare Pages CI auto-detects it and runs the wrong deploy command.

---

### ✅ Checklist — Verify Everything Works After Deploy

| Feature | How to Test |
|---------|------------|
| Home page | Visit `/` — hero, categories, videos load |
| Games | Visit `/games` — all 6 games playable |
| Quiz | Visit `/quiz` — questions load, score tracks |
| Flashcards | Visit `/flashcards` — flip, shuffle, auto-play |
| Search | Visit `/search?q=abc` — results appear |
| Blog | Visit `/blog` + article pages |
| Videos | Visit `/videos` + detail pages |
| Dynamic routes | `/games/memory-match`, `/blog/[slug]` etc. |
| PWA | Open in Chrome → install prompt appears |
| Offline | Go offline → `/offline` page shows |
| SEO | View page source — meta tags, structured data present |
| 404 | Visit `/anything-random` — styled 404 page |
| Mobile | Resize browser — responsive layout |
| Service Worker | DevTools → Application → Service Workers → registered |

---

## 🏗️ Project Structure

```
pogo-tunes/
├── public/              # Static assets, PWA manifest, service worker
│   ├── manifest.json    # Web App Manifest
│   ├── sw.js           # Service Worker
│   └── icon-*.svg       # PWA icons
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── games/       # 6 game routes
│   │   ├── blog/        # Blog listing + [slug] details
│   │   ├── videos/      # Video listing + [slug] details
│   │   ├── shorts/      # Shorts listing + [slug] details
│   │   ├── quiz/        # Quiz engine
│   │   ├── flashcards/  # Interactive flashcards
│   │   ├── worksheets/  # Downloadable worksheets
│   │   └── ...          # Categories, legal pages, etc.
│   ├── components/      # Reusable React components
│   │   ├── games/       # 6 game components
│   │   ├── ui/          # Design system (Button, Card, Badge, Section)
│   │   ├── layout/      # Header, Footer
│   │   └── home/        # Home page sections
│   ├── data/            # Content data (categories, videos, games, etc.)
│   ├── hooks/           # Custom hooks (useGameScore, useGameTimer)
│   └── lib/             # Utilities (cn, shuffle)
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-coral` | `#FF6B6B` | Primary accent, games |
| `--color-sky` | `#6BCBFF` | Learning, puzzles |
| `--color-purple` | `#B28DFF` | Creative, flashcards |
| `--color-yellow` | `#FFD93D` | Numbers, energy |
| `--color-green` | `#6EE7B7` | Nature, sorting |

- **Fonts:** Baloo 2 (display), Fredoka (rounded), Nunito (body) — via Google Fonts
- **Animations:** Framer Motion throughout — page transitions, hover effects, scroll-triggered entrance, confetti

---

## 🌐 Live Site

The Pogo Tunes Next.js app is deployed at:

- **Netlify:** [https://pogotunes.netlify.app](https://pogotunes.netlify.app)
- **Blogger:** [https://pogotunes.blogspot.com](https://pogotunes.blogspot.com)
- **YouTube:** [@Pogotunes](https://www.youtube.com/@Pogotunes)

---

## 📄 License

This project is [MIT](./LICENSE) licensed.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

<p align="center">
  <sub>Made with ❤️ for kids everywhere</sub>
  <br>
  <a href="https://www.youtube.com/@Pogotunes">YouTube</a> ·
  <a href="https://www.instagram.com/pogo.tunes/">Instagram</a> ·
  <a href="https://www.facebook.com/profile.php?id=61590129552207">Facebook</a> ·
  <a href="https://in.pinterest.com/pogotunes/">Pinterest</a> ·
  <a href="https://x.com/pogotunes">Twitter/X</a>
</p>
