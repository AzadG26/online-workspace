"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Gamepad2, Sparkles } from "lucide-react"
import { Section } from "@/components/ui/section"
import { games } from "@/data/content"

export function GamesSection() {
  return (
    <Section
      title={<span>Fun <span className="bg-gradient-to-r from-coral to-yellow bg-clip-text text-transparent">Learning</span> Games</span>}
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
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative overflow-hidden rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-card"
              style={{ background: game.gradient }}
            >
              <motion.div
                className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)`,
                }}
              />
              <div className="flex items-start justify-between">
                <motion.span
                  className="text-5xl drop-shadow-lg"
                  whileHover={{ scale: 1.2, rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {game.icon}
                </motion.span>
                <Sparkles className="h-5 w-5 text-white/40" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white drop-shadow-sm">{game.title}</h3>
              <p className="mt-2 font-body text-sm text-white/80">{game.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {game.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 font-display text-xs font-semibold text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 font-display text-sm font-bold text-white transition-all group-hover:gap-3 drop-shadow-sm">
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
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-yellow px-6 py-3 font-display text-sm font-bold text-white shadow-soft transition-all duration-300 hover:shadow-glow-coral hover:scale-105"
        >
          All Games <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
