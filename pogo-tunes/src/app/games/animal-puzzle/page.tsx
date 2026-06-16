"use client"

import { motion } from "framer-motion"
import { AnimalPuzzle } from "@/components/games/animal-puzzle"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { gameSchema, breadcrumbSchema } from "@/lib/structured-data"
import { getGameContent } from "@/data/content"

export default function AnimalPuzzlePage() {
  const game = getGameContent("animal-puzzle")

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky/5 via-cream to-white pt-24">
      {game && (
        <StructuredData
          schema={[
            gameSchema(game),
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Games", url: "/games" },
              { name: game.title, url: game.href },
            ]),
          ]}
        />
      )}
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <Link href="/games" className="mb-6 flex items-center gap-2 font-display text-sm font-semibold text-gray hover:text-sky-dark transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Games
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-6 shadow-card md:p-10"
        >
          <AnimalPuzzle />
        </motion.div>
      </div>
    </div>
  )
}
