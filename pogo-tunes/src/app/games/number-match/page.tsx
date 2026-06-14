"use client"

import { motion } from "framer-motion"
import { NumberMatch } from "@/components/games/number-match"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NumberMatchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow/5 via-cream to-white pt-24">
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <Link href="/games" className="mb-6 flex items-center gap-2 font-display text-sm font-semibold text-gray hover:text-yellow-dark transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Games
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-6 shadow-card md:p-10"
        >
          <NumberMatch />
        </motion.div>
      </div>
    </div>
  )
}
