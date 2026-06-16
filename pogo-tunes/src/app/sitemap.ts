import type { MetadataRoute } from "next"
import { blogPosts, featuredVideos, shorts } from "@/data/content"

const baseUrl = "https://pogotunes.com"

const routes: { path: string; freq: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", freq: "daily", priority: 1 },
  { path: "/abc", freq: "weekly", priority: 0.8 },
  { path: "/about", freq: "weekly", priority: 0.8 },
  { path: "/animals", freq: "weekly", priority: 0.8 },
  { path: "/blog", freq: "weekly", priority: 0.8 },
  { path: "/categories", freq: "weekly", priority: 0.8 },
  { path: "/colors", freq: "weekly", priority: 0.8 },
  { path: "/contact", freq: "weekly", priority: 0.8 },
  { path: "/counting", freq: "weekly", priority: 0.8 },
  { path: "/flashcards", freq: "weekly", priority: 0.8 },
  { path: "/games", freq: "weekly", priority: 0.8 },
  { path: "/hindi", freq: "weekly", priority: 0.8 },
  { path: "/privacy", freq: "weekly", priority: 0.8 },
  { path: "/search", freq: "weekly", priority: 0.8 },
  { path: "/shorts", freq: "weekly", priority: 0.8 },
  { path: "/terms", freq: "weekly", priority: 0.8 },
  { path: "/videos", freq: "weekly", priority: 0.8 },
  { path: "/worksheets", freq: "weekly", priority: 0.8 },
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

  return [...staticRoutes, ...blogRoutes, ...videoRoutes, ...shortsRoutes]
}
