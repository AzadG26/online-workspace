"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-b from-cream via-cream to-white pt-24 md:pt-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-[10%] text-4xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] text-3xl opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🌈
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[20%] text-3xl opacity-15"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🎵
        </motion.div>
        <motion.div
          className="absolute top-60 left-[60%] text-2xl opacity-15"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          ✨
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-coral" />
              <span className="font-display text-xs font-semibold text-coral">
                Free Educational Platform
              </span>
            </motion.div>

            <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Learning is{" "}
              <span className="text-gradient-coral">Fun</span>
              <br />
              with <span className="text-gradient-purple">Pogo</span>{" "}
              <span className="text-gradient-sky">&amp; Friends</span>
            </h1>

            <p className="mt-6 max-w-lg font-body text-lg text-gray md:text-xl">
              Join Pogo, Tuni, and Bobo on an exciting learning adventure!
              Songs, games, videos, and activities — all completely free.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/videos">
                <Button variant="coral" size="lg">
                  <Play className="h-5 w-5" /> Start Learning
                </Button>
              </Link>
              <Link href="/abc">
                <Button variant="outline" size="lg">
                  Explore ABCs
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-8">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-coral">500+</p>
                <p className="font-body text-xs text-gray">Videos</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-purple">50+</p>
                <p className="font-body text-xs text-gray">Games</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-sky">1000+</p>
                <p className="font-body text-xs text-gray">Activities</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative h-[320px] w-[320px] md:h-[400px] md:w-[400px]">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-coral/20 via-yellow/20 to-purple/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-8xl md:text-9xl"
                  >
                    🦊
                  </motion.div>
                  <p className="mt-4 font-display text-xl font-bold text-coral">Pogo</p>
                  <p className="font-body text-sm text-gray">The Energetic Explorer</p>
                </div>
              </div>
              <motion.div
                className="absolute -top-4 -right-4 text-5xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🐰
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 text-5xl"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
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
