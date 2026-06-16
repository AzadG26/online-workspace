"use client"

import { useState, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { getShortContent, shorts } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { breadcrumbSchema } from "@/lib/structured-data"

function ShortDetailContent() {
  const params = useParams()
  const slug = params.slug as string
  const short = getShortContent(slug)
  const [showEmbed, setShowEmbed] = useState(false)

  const playVideo = useCallback(() => setShowEmbed(true), [])

  if (!short) {
    return (
      <div className="flex flex-col items-center py-20">
        <span className="text-6xl">🎬</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-dark">Short Not Found</h1>
        <p className="mt-2 font-body text-gray">This short doesn&apos;t exist.</p>
        <Link href="/shorts" className="mt-6 font-display text-coral font-bold hover:underline">
          ← Back to Shorts
        </Link>
      </div>
    )
  }

  const related = shorts.filter((s) => s.id !== short.id).slice(0, 6)

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <StructuredData
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "@id": `https://pogotunes.vercel.app${short.href}/#video`,
            name: short.title,
            description: `${short.title} - Quick educational short for kids from Pogo Tunes.`,
            publisher: { "@id": "https://pogotunes.vercel.app/#organization" },
          },
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Shorts", url: "/shorts" },
            { name: short.title, url: short.href },
          ]),
        ]}
      />
      <Link
        href="/shorts"
        className="mb-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-gray hover:text-purple transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shorts
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        {short.youtubeId ? (
          <div className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[2rem] shadow-card">
            {showEmbed ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${short.youtubeId}?autoplay=1&rel=0`}
                title={short.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${short.youtubeId}/hqdefault.jpg`}
                  alt={short.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button
                    onClick={playVideo}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-purple shadow-lg transition-all hover:scale-110"
                    aria-label="Play short"
                  >
                    <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-64 w-64 items-center justify-center rounded-[2rem] shadow-card md:h-80 md:w-80"
            style={{ background: `linear-gradient(135deg, ${short.color}, ${short.color}88)` }}
          >
            <span className="text-8xl md:text-9xl">{short.emoji}</span>
          </motion.div>
        )}
        <h1 className="mt-6 font-display text-3xl font-bold text-dark">{short.title}</h1>
        <p className="mt-2 font-body text-lg text-gray text-center max-w-md">
          Learn about {short.title.toLowerCase()} with Pogo Tunes!
        </p>
      </motion.div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-dark">More Shorts</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {related.map((s) => (
              <Link key={s.id} href={s.href}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex h-36 flex-col items-center justify-center rounded-2xl shadow-soft transition-all hover:shadow-card"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)` }}
                >
                  <span className="text-4xl">{s.emoji}</span>
                  <p className="mt-3 font-display text-base font-bold text-white">{s.title}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ShortDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple/5 via-cream to-white pt-24">
      <ShortDetailContent />
    </div>
  )
}
