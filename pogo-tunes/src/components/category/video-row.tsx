"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Clock } from "lucide-react"
import { featuredVideos } from "@/data/content"

export function VideoRow({ category }: { category?: string }) {
  const videos = category
    ? featuredVideos.filter((v) => v.category.toLowerCase() === category.toLowerCase())
    : featuredVideos.slice(0, 3)

  return videos.length > 0 ? (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
      {videos.map((video, i) => (
        <Link key={video.id} href={video.href} className="snap-start shrink-0 w-64">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.08 }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="group relative overflow-hidden rounded-2xl bg-white/70 shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-card border border-white/50"
          >
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl opacity-30">🎵</span>
              </div>
              <motion.div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/10">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-coral to-coral-dark text-white shadow-glow-coral"
                >
                  <Play className="ml-0.5 h-4 w-4" />
                </motion.div>
              </motion.div>
              <div className="absolute bottom-2 right-2 rounded-full bg-black/50 backdrop-blur-sm px-2 py-0.5">
                <span className="flex items-center gap-1 font-display text-xs text-white">
                  <Clock className="h-3 w-3" /> {video.duration}
                </span>
              </div>
            </div>
            <div className="p-3">
              <p className="font-display text-sm font-bold text-dark line-clamp-1">{video.title}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="rounded-2xl bg-glass p-8 text-center border border-white/50">
      <p className="font-display text-base text-gray">More videos coming soon for this category! 🎬</p>
      <Link href="/videos" className="mt-2 inline-flex items-center gap-1 font-display text-sm font-bold text-coral hover:underline">
        Browse all videos →
      </Link>
    </div>
  )
}
