"use client"

import { motion } from "framer-motion"
import { MemoryMatch } from "@/components/games/memory-match"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MemoryMatchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/5 via-cream to-white pt-24">
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <Link href="/games" className="mb-6 flex items-center gap-2 font-display text-sm font-semibold text-gray hover:text-coral transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Games
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-6 shadow-card md:p-10"
        >
          <MemoryMatch />
        </motion.div>
      </div>
    </div>
  )
}
