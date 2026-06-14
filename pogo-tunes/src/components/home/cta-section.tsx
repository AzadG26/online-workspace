"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-coral via-purple to-sky py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/5"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-white/5"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-6 text-6xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎵
          </motion.div>

          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Join Our Learning Community!
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
                className="gap-3"
              >
                <Play className="h-6 w-6 text-coral" />
                Subscribe on YouTube
              </Button>
            </Link>
            <Link href="/videos">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-dark"
              >
                Browse Videos <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 font-body text-sm text-white/60">
            500+ videos and growing • 100% free • No ads • No signup required
          </p>
        </motion.div>
      </div>
    </section>
  )
}
