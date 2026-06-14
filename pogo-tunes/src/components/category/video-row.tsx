"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Clock } from "lucide-react"
import { featuredVideos } from "@/data/content"

export function VideoRow({ category }: { category?: string }) {
  const videos = category
    ? featuredVideos.filter((v) => v.category.toLowerCase() === category.toLowerCase())
    : featuredVideos.slice(0, 3)

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
      {videos.map((video, i) => (
        <Link key={video.id} href={video.href} className="snap-start shrink-0 w-64">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-card"
          >
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl opacity-30">🎵</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white transition-all group-hover:scale-110">
                  <Play className="ml-0.5 h-4 w-4" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5">
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
  )
}
