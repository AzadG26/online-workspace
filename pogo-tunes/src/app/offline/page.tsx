"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Gamepad2, BookOpen } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-coral/5 via-cream to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center"
      >
        <motion.span
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl"
        >
          🦊
        </motion.span>
        <h1 className="mt-6 font-display text-3xl font-bold text-dark">You&apos;re Offline</h1>
        <p className="mt-4 max-w-md font-body text-lg text-gray">
          Don&apos;t worry! Pogo Tunes will be back as soon as you&apos;re connected again.
          Try these pages that might be saved:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-display text-lg font-bold text-dark shadow-soft transition-all hover:shadow-card"
          >
            <Home className="h-5 w-5 text-coral" /> Home
          </Link>
          <Link
            href="/games"
            className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-display text-lg font-bold text-dark shadow-soft transition-all hover:shadow-card"
          >
            <Gamepad2 className="h-5 w-5 text-sky" /> Games
          </Link>
          <Link
            href="/flashcards"
            className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-display text-lg font-bold text-dark shadow-soft transition-all hover:shadow-card"
          >
            <BookOpen className="h-5 w-5 text-purple" /> Flashcards
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
