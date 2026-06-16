import type { MetadataRoute } from "next"
import { blogPosts, featuredVideos, shorts, games } from "@/data/content"

const baseUrl = "https://pogotunes.vercel.app"

type SitemapEntry = {
  path: string
  freq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
}

const routes: SitemapEntry[] = [
  { path: "/", freq: "daily", priority: 1 },
  { path: "/abc", freq: "weekly", priority: 0.8 },
  { path: "/about", freq: "monthly", priority: 0.6 },
  { path: "/animals", freq: "weekly", priority: 0.8 },
  { path: "/birds", freq: "weekly", priority: 0.7 },
  { path: "/blog", freq: "weekly", priority: 0.7 },
  { path: "/body-parts", freq: "weekly", priority: 0.7 },
  { path: "/categories", freq: "weekly", priority: 0.7 },
  { path: "/colors", freq: "weekly", priority: 0.8 },
  { path: "/contact", freq: "monthly", priority: 0.5 },
  { path: "/cookie-policy", freq: "yearly", priority: 0.3 },
  { path: "/counting", freq: "weekly", priority: 0.8 },
  { path: "/disclaimer", freq: "yearly", priority: 0.3 },
  { path: "/dmca", freq: "yearly", priority: 0.3 },
  { path: "/flashcards", freq: "weekly", priority: 0.7 },
  { path: "/fruits", freq: "weekly", priority: 0.7 },
  { path: "/games", freq: "weekly", priority: 0.8 },
  { path: "/hindi", freq: "weekly", priority: 0.8 },
  { path: "/offline", freq: "monthly", priority: 0.3 },
  { path: "/phonics", freq: "weekly", priority: 0.7 },
  { path: "/privacy", freq: "yearly", priority: 0.3 },
  { path: "/quiz", freq: "weekly", priority: 0.7 },
  { path: "/search", freq: "weekly", priority: 0.6 },
  { path: "/shapes", freq: "weekly", priority: 0.7 },
  { path: "/shorts", freq: "weekly", priority: 0.7 },
  { path: "/terms", freq: "yearly", priority: 0.3 },
  { path: "/vegetables", freq: "weekly", priority: 0.7 },
  { path: "/vehicles", freq: "weekly", priority: 0.7 },
  { path: "/videos", freq: "weekly", priority: 0.8 },
  { path: "/worksheets", freq: "weekly", priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq,
    priority: r.priority,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}${post.href}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const videoRoutes = featuredVideos.map((video) => ({
    url: `${baseUrl}${video.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const shortsRoutes = shorts.map((short) => ({
    url: `${baseUrl}${short.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  const gameRoutes = games.map((game) => ({
    url: `${baseUrl}${game.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...videoRoutes, ...shortsRoutes, ...gameRoutes]
}
