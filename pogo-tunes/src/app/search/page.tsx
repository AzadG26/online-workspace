"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, X, Gamepad2, BookOpen, Sparkles } from "lucide-react"
import { categories, featuredVideos, games, blogPosts, shorts } from "@/data/content"

const ALL_CONTENT = [
  ...categories.map((c) => ({ title: c.title, description: c.description, href: c.href, icon: c.emoji, type: "Category" as const })),
  ...featuredVideos.map((v) => ({ title: v.title, description: `${v.category} · ${v.views} views`, href: v.href, icon: "🎵", type: "Video" as const })),
  ...games.map((g) => ({ title: g.title, description: g.description, href: g.href, icon: g.icon, type: "Game" as const })),
  ...blogPosts.map((b) => ({ title: b.title, description: b.category, href: b.href, icon: "📖", type: "Blog" as const })),
  ...shorts.map((s) => ({ title: s.title, description: "Quick Short", href: s.href, icon: s.emoji, type: "Short" as const })),
]

export default function SearchPage() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ALL_CONTENT.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    )
  }, [query])

  const groupedResults = useMemo(() => {
    const groups: Record<string, typeof results> = {}
    results.forEach((item) => {
      if (!groups[item.type]) groups[item.type] = []
      groups[item.type].push(item)
    })
    return groups
  }, [results])

  return (
    <section className="min-h-screen bg-gradient-to-b from-cream to-white pt-24 md:pt-32">
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-dark md:text-4xl"
        >
          Search <span className="text-gradient-coral">Pogo Tunes</span>
        </motion.h1>

        <div className="relative mt-6">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, ABCs, numbers, games..."
            className="w-full rounded-2xl border-2 border-cream-dark bg-white py-4 pl-14 pr-14 font-body text-lg text-dark outline-none transition-all focus:border-coral focus:shadow-glow-coral"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray hover:text-dark"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {query && (
          <div className="mt-8 space-y-8">
            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-12"
              >
                <span className="text-6xl">🔍</span>
                <p className="mt-4 font-display text-xl font-bold text-dark">No results found</p>
                <p className="mt-2 font-body text-gray">
                  Try searching for ABC, counting, animals, colors, or games
                </p>
              </motion.div>
            ) : (
              Object.entries(groupedResults).map(([type, items]) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="font-display text-lg font-bold text-dark flex items-center gap-2">
                    {type === "Category" && <Sparkles className="h-4 w-4 text-coral" />}
                    {type === "Video" && <span className="text-coral">🎵</span>}
                    {type === "Game" && <Gamepad2 className="h-4 w-4 text-sky" />}
                    {type === "Blog" && <BookOpen className="h-4 w-4 text-purple" />}
                    {type === "Short" && <span className="text-yellow">📱</span>}
                    {type}s
                    <span className="text-sm font-normal text-gray ml-1">({items.length})</span>
                  </h2>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5"
                      >
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div className="min-w-0">
                          <p className="font-display text-sm font-bold text-dark truncate">{item.title}</p>
                          <p className="font-body text-xs text-gray truncate">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <h2 className="font-display text-lg font-bold text-dark">Popular Categories</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {categories.slice(0, 12).map((cat) => (
                <a
                  key={cat.id}
                  href={cat.href}
                  className="rounded-full bg-white px-5 py-3 font-display text-sm font-semibold text-gray shadow-soft transition-all hover:bg-coral hover:text-white hover:shadow-glow-coral"
                >
                  {cat.emoji} {cat.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
