"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Clock, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { featuredVideos, categories } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

export default function VideosPage() {
  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Learning Videos", "Educational videos for kids covering ABCs, counting, colors, animals, and more.", "/videos", featuredVideos.length),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Videos", url: "/videos" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-coral/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Learning <span className="text-gradient-coral">Videos</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Sing, dance, and learn with hundreds of educational videos!
          </motion.p>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-coral px-5 py-2 font-display text-sm font-bold text-white">
              All
            </button>
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="rounded-full bg-cream px-5 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-coral/10 hover:text-coral"
              >
                {cat.emoji} {cat.title}
              </Link>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredVideos.map((video, i) => (
              <Link key={video.id} href={video.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-card"
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
                    <div className="flex h-full items-center justify-center">
                      <span className="text-5xl opacity-30">
                        {["🔤", "🔢", "🐾", "🎨", "🕉️", "🔷", "🍎", "🐶"][i]}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral text-white shadow-glow-coral transition-all group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1">
                      <span className="flex items-center gap-1 font-display text-xs text-white">
                        <Clock className="h-3 w-3" /> {video.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold text-dark line-clamp-2 group-hover:text-coral transition-colors">
                      {video.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <Badge variant={
                        video.category === "ABC" ? "coral" :
                        video.category === "Counting" ? "yellow" :
                        video.category === "Animals" ? "sky" :
                        video.category === "Colors" ? "green" : "purple"
                      }>
                        {video.category}
                      </Badge>
                      <span className="flex items-center gap-1 font-body text-xs text-gray">
                        <Eye className="h-3 w-3" /> {video.views}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-cream px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="font-display text-3xl font-bold text-dark">
            Subscribe for New Videos Every Week!
          </h2>
          <p className="mt-4 font-body text-gray">
            Join millions of families learning with Pogo Tunes on YouTube.
          </p>
          <Link
            href="https://www.youtube.com/@Pogotunes?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 font-display text-lg font-bold text-white shadow-soft transition-all hover:shadow-glow-coral hover:scale-105"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <Play className="h-4 w-4 fill-coral text-coral" />
            </span>
            Subscribe on YouTube
          </Link>
        </motion.div>
      </section>
    </>
  )
}
