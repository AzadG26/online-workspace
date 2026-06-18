"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Play, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const floatingShapes = [
  { emoji: "⭐", x: "10%", y: 80, delay: 0, duration: 4 },
  { emoji: "🌈", x: "85%", y: 120, delay: 0.5, duration: 3.5 },
  { emoji: "🎵", x: "20%", y: 300, delay: 1, duration: 4.5 },
  { emoji: "✨", x: "75%", y: 250, delay: 0.3, duration: 3 },
  { emoji: "🎨", x: "90%", y: 400, delay: 0.8, duration: 3.8 },
  { emoji: "📚", x: "5%", y: 450, delay: 1.2, duration: 4.2 },
]

export function Hero() {
  const { scrollYProgress } = useScroll()
  const heroParallax = useTransform(scrollYProgress, [0, 0.2], [0, -40])

  return (
    <section className="relative min-h-[650px] overflow-hidden bg-gradient-to-br from-cream via-cream to-white pt-24 md:pt-32">
      <motion.div style={{ y: heroParallax }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,107,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(178,141,255,0.08),transparent_50%)]" />
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-25"
            style={{ top: shape.y, left: shape.x }}
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: shape.duration, repeat: Infinity, ease: "easeInOut", delay: shape.delay }}
          >
            {shape.emoji}
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-coral/20 bg-gradient-to-r from-coral/10 to-purple/10 px-4 py-2 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-coral" />
              <span className="font-display text-xs font-bold text-coral">
                Free Educational Platform
              </span>
            </motion.div>

            <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-dark">Learning is</span>{" "}
              <span className="bg-gradient-to-r from-coral via-coral-dark to-purple bg-clip-text text-transparent">Fun</span>
              <br />
              <span className="text-dark">with </span>
              <span className="bg-gradient-to-r from-purple via-purple-dark to-sky bg-clip-text text-transparent">Pogo</span>
              <span className="text-dark"> &amp; Friends</span>
            </h1>

            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-gray md:text-xl">
              Join Pogo, Tuni, and Bobo on an exciting learning adventure!
              Songs, games, videos, and activities — all completely free.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/videos">
                <Button variant="coral" size="lg">
                  <Play className="h-5 w-5" /> Start Learning
                </Button>
              </Link>
              <Link href="/abc">
                <Button variant="white" size="lg">
                  Explore ABCs <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex items-center gap-8"
            >
              {[
                { value: "500+", label: "Videos", color: "text-coral" },
                { value: "50+", label: "Games", color: "text-purple" },
                { value: "1000+", label: "Activities", color: "text-sky" },
              ].map((stat) => (
                <div key={stat.label} className="relative">
                  <p className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="font-body text-xs text-gray">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative h-[340px] w-[340px] md:h-[440px] md:w-[440px]">
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-coral/15 via-yellow/10 to-purple/15 blur-xl"
                animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-coral/10 via-yellow/5 to-purple/10 blur-lg"
                animate={{ scale: [1.05, 1, 1.05] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-8xl md:text-9xl drop-shadow-2xl"
                  >
                    🦊
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 font-display text-xl font-bold bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent"
                  >
                    Pogo
                  </motion.p>
                  <p className="font-body text-sm text-gray">The Energetic Explorer</p>
                </div>
              </div>
              <motion.div
                className="absolute -top-2 -right-2 text-5xl drop-shadow-lg"
                animate={{ y: [0, -8, 0], rotate: [0, 8, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                🐰
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 text-5xl drop-shadow-lg"
                animate={{ y: [0, 8, 0], rotate: [0, -8, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                🐻
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
