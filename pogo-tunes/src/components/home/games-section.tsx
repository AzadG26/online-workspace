"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Gamepad2 } from "lucide-react"
import { Section } from "@/components/ui/section"
import { games } from "@/data/content"

export function GamesSection() {
  return (
    <Section
      title="Fun Learning Games"
      subtitle="Play and learn with interactive educational games!"
      wave="bottom"
      waveColor="#FFFFFF"
      className="bg-gradient-to-b from-cream to-white"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, i) => (
          <Link key={game.id} href={game.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-card"
              style={{ background: game.gradient }}
            >
              <div className="flex items-start justify-between">
                <motion.span
                  className="text-5xl"
                  whileHover={{ scale: 1.2, rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {game.icon}
                </motion.span>
                <Gamepad2 className="h-6 w-6 text-white/50" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{game.title}</h3>
              <p className="mt-2 font-body text-sm text-white/80">{game.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {game.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/20 px-3 py-1 font-display text-xs font-semibold text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 font-display text-sm font-bold text-white/90 transition-all group-hover:gap-3">
                Play Now <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <Link
          href="/games"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-yellow px-6 py-3 font-display text-sm font-bold text-white shadow-soft transition-all hover:shadow-card hover:scale-105"
        >
          All Games <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
