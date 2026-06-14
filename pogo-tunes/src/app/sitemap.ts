import type { MetadataRoute } from "next"

const baseUrl = "https://pogotunes.com"

const routes = [
  "/",
  "/abc",
  "/about",
  "/animals",
  "/blog",
  "/categories",
  "/colors",
  "/contact",
  "/counting",
  "/flashcards",
  "/games",
  "/hindi",
  "/privacy",
  "/search",
  "/shorts",
  "/terms",
  "/videos",
  "/worksheets",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }))
}
