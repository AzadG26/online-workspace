"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { getShortContent, shorts } from "@/data/content"

function ShortDetailContent() {
  const params = useParams()
  const slug = params.slug as string
  const short = getShortContent(slug)

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
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex h-64 w-64 items-center justify-center rounded-[2rem] shadow-card md:h-80 md:w-80"
          style={{ background: `linear-gradient(135deg, ${short.color}, ${short.color}88)` }}
        >
          <span className="text-8xl md:text-9xl">{short.emoji}</span>
        </motion.div>
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
