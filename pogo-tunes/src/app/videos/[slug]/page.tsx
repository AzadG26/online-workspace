"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Eye, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getVideoContent, featuredVideos } from "@/data/content"

function VideoDetailContent() {
  const params = useParams()
  const slug = params.slug as string
  const video = getVideoContent(slug)
  const [showEmbed, setShowEmbed] = useState(false)

  if (!video) {
    return (
      <div className="flex flex-col items-center py-20">
        <span className="text-6xl">🎬</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-dark">Video Not Found</h1>
        <p className="mt-2 font-body text-gray">This video doesn&apos;t exist.</p>
        <Link href="/videos" className="mt-6 font-display text-coral font-bold hover:underline">
          ← Back to Videos
        </Link>
      </div>
    )
  }

  const related = featuredVideos
    .filter((v) => v.category === video.category && v.id !== video.id)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <Link
        href="/videos"
        className="mb-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-gray hover:text-coral transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Videos
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl shadow-card"
          >
            {video.youtubeId ? (
              <div className="relative aspect-video">
                {showEmbed ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-coral/10 to-purple/10">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <button
                      onClick={() => setShowEmbed(true)}
                      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-coral text-white shadow-glow-coral transition-all hover:scale-110"
                      aria-label="Play video"
                    >
                      <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <p className="relative z-10 mt-4 font-display text-sm font-bold text-white drop-shadow-lg">
                      Click to watch on YouTube
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-coral/10 to-purple/10">
                <span className="text-8xl opacity-20">▶️</span>
                <a
                  href={`https://www.youtube.com/@Pogotunes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-coral text-white shadow-glow-coral transition-all hover:scale-110">
                    <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </a>
              </div>
            )}
            <div className="bg-white p-6">
              <div className="flex items-center gap-3">
                <Badge variant="coral">{video.category}</Badge>
                <span className="flex items-center gap-1 font-body text-sm text-gray">
                  <Clock className="h-4 w-4" /> {video.duration}
                </span>
                <span className="flex items-center gap-1 font-body text-sm text-gray">
                  <Eye className="h-4 w-4" /> {video.views}
                </span>
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold text-dark">{video.title}</h1>
              <p className="mt-2 font-body text-gray">
                Sing and learn with this fun educational video from Pogo Tunes!
              </p>
              {video.youtubeId && (
                <a
                  href={`https://youtu.be/${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2 font-display text-sm font-bold text-white transition-all hover:shadow-glow-coral"
                >
                  Watch on YouTube <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-dark">Related Videos</h2>
          <div className="mt-4 space-y-4">
            {related.map((v) => (
              <Link key={v.id} href={v.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex gap-3 rounded-2xl bg-white p-3 shadow-soft transition-all hover:shadow-card"
                >
                  <div className="relative flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-coral/10 to-purple/10 overflow-hidden">
                    {v.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl opacity-30">▶️</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-bold text-dark line-clamp-2">{v.title}</h3>
                    <span className="flex items-center gap-1 font-body text-xs text-gray">
                      <Clock className="h-3 w-3" /> {v.duration}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VideoDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/5 via-cream to-white pt-24">
      <VideoDetailContent />
    </div>
  )
}
