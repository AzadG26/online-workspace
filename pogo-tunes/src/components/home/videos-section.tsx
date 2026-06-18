"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ArrowRight, Clock, Eye } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { featuredVideos } from "@/data/content"

const emojiMap = ["🔤", "🔢", "🐾", "🎨", "🕉️", "🔷"]

export function VideosSection() {
  return (
    <Section
      title={<span>Featured <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Videos</span></span>}
      subtitle="Sing along and learn with our most popular educational videos!"
      className="bg-gradient-to-b from-white to-cream"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredVideos.slice(0, 6).map((video, i) => (
          <Link key={video.id} href={video.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative overflow-hidden rounded-2xl bg-white/70 shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-card border border-white/50"
            >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl opacity-30">{emojiMap[i]}</span>
                </div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/10"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-coral to-coral-dark text-white shadow-glow-coral"
                  >
                    <Play className="ml-0.5 h-6 w-6" />
                  </motion.div>
                </motion.div>
                {video.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="coral">
                      <Play className="h-3 w-3" /> Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1">
                  <span className="flex items-center gap-1 font-display text-xs text-white">
                    <Clock className="h-3 w-3" /> {video.duration}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-display text-base font-bold text-dark line-clamp-2 transition-colors group-hover:text-coral">
                  {video.title}
                </h3>
                <div className="mt-2 flex items-center gap-3">
                  <Badge variant={video.category === "ABC" ? "coral" : video.category === "Counting" ? "yellow" : video.category === "Animals" ? "sky" : video.category === "Colors" ? "green" : "purple"}>
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-purple px-6 py-3 font-display text-sm font-bold text-white shadow-soft transition-all duration-300 hover:shadow-glow-coral hover:scale-105"
        >
          Watch All Videos <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
