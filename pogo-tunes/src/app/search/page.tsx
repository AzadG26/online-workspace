"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, X, Gamepad2, BookOpen, Sparkles } from "lucide-react"
import { categories, featuredVideos, games, blogPosts, shorts } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { breadcrumbSchema } from "@/lib/structured-data"

const ALL_CONTENT = [
  ...categories.map((c) => ({ title: c.title, description: c.description, href: c.href, icon: c.emoji, type: "Category" as const })),
  ...featuredVideos.map((v) => ({ title: v.title, description: `${v.category} · ${v.views} views`, href: v.href, icon: "🎵", type: "Video" as const })),
  ...games.map((g) => ({ title: g.title, description: g.description, href: g.href, icon: g.icon, type: "Game" as const })),
  ...blogPosts.map((b) => ({ title: b.title, description: b.category, href: b.href, icon: "📖", type: "Blog" as const })),
  ...shorts.map((s) => ({ title: s.title, description: "Quick Short", href: s.href, icon: s.emoji, type: "Short" as const })),
]

const floatingIcons = ["🔍", "⭐", "🌈", "🎵", "✨"]

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
    <>
      <StructuredData
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://pogotunes.vercel.app/search/#search",
            name: "Search Pogo Tunes",
            description: "Search for educational content, games, videos, and articles for kids.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://pogotunes.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Search", url: "/search" },
          ]),
        ]}
      />
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream to-white pt-24 md:pt-32">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-10 pointer-events-none"
            style={{ top: `${15 + i * 12}%`, left: `${i % 2 === 0 ? 5 : 92}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            {icon}
          </motion.div>
        ))}

        <div className="mx-auto max-w-4xl px-4 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="font-display text-3xl font-bold text-dark md:text-4xl"
          >
            Search{" "}
            <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Pogo Tunes</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mt-6"
          >
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search songs, ABCs, numbers, games..."
              className="w-full rounded-2xl border border-white/50 bg-white/70 py-4 pl-14 pr-14 font-body text-lg text-dark outline-none backdrop-blur-xl transition-all focus:border-coral/50 focus:shadow-glow-coral"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl bg-coral/10 text-coral transition-all hover:bg-coral/20"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>

          {query && (
            <div className="mt-8 space-y-8">
              {results.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-16"
                >
                  <motion.span
                    className="text-7xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔍
                  </motion.span>
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
                          className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 shadow-soft backdrop-blur-xl border border-white/50 transition-all hover:shadow-card hover:-translate-y-0.5"
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
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h2 className="font-display text-lg font-bold text-dark">Popular Categories</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {categories.slice(0, 12).map((cat) => (
                  <a
                    key={cat.id}
                    href={cat.href}
                    className="group rounded-full bg-white/70 px-5 py-3 font-display text-sm font-semibold text-gray shadow-soft backdrop-blur-xl border border-white/50 transition-all hover:bg-gradient-to-r hover:from-coral hover:to-purple hover:text-white hover:shadow-glow-coral"
                  >
                    {cat.emoji} {cat.title}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
