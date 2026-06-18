"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Play, ArrowRight, Sparkles, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Star, SparkleIcon, Rainbow, MusicNote, PaintPalette } from "@/components/icons/emojis"

const particleIcons = [Star, MusicNote, Rainbow, SparkleIcon, PaintPalette, Star, SparkleIcon, MusicNote]

const particles = Array.from({ length: 8 }, (_, i) => ({
  icon: particleIcons[i],
  x: `${10 + (i * 10)}%`,
  y: `${20 + (i % 4) * 15}%`,
  delay: i * 0.4,
  size: 20 + (i % 3) * 10,
  color: ["#FFD93D", "#FF6B6B", "#B28DFF", "#6BCBFF", "#6EE7B7", "#FFD93D", "#6BCBFF", "#FF6B6B"][i],
}))

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-coral via-purple to-sky py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{ left: p.x, top: p.y }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <p.icon size={p.size} color={p.color} />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <motion.div
            className="mb-6 text-6xl"
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🎵
          </motion.div>

          <h2 className="font-display text-3xl font-bold text-white md:text-5xl drop-shadow-sm">
            Join Our Learning <span className="text-yellow">Community</span>!
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white/80">
            Subscribe to our YouTube channel for hundreds of educational songs, stories, and
            activities. New videos every week!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="https://www.youtube.com/@Pogotunes?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="white"
                size="lg"
                className="gap-3 shadow-xl hover:shadow-2xl"
              >
                <Play className="h-6 w-6 text-coral" />
                Subscribe on YouTube
              </Button>
            </Link>
            <Link href="/videos">
              <Button
                variant="outline"
                size="lg"
                className="border-white/80 text-white hover:bg-white hover:text-dark backdrop-blur-sm"
              >
                Browse Videos <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-6"
          >
            {[
              { icon: Music, text: "500+ videos" },
              { icon: Sparkles, text: "100% free" },
              { icon: Sparkles, text: "No ads" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60">
                <item.icon className="h-3.5 w-3.5" />
                <span className="font-body text-xs">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
