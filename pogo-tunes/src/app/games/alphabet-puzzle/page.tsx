"use client"

import { motion } from "framer-motion"
import { AlphabetPuzzle } from "@/components/games/alphabet-puzzle"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AlphabetPuzzlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky/5 via-cream to-white pt-24">
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <Link href="/games" className="mb-6 flex items-center gap-2 font-display text-sm font-semibold text-gray hover:text-sky-dark transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Games
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-6 shadow-card md:p-10"
        >
          <AlphabetPuzzle />
        </motion.div>
      </div>
    </div>
  )
}
