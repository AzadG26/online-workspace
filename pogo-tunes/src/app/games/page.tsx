"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Gamepad2 } from "lucide-react"
import { Section } from "@/components/ui/section"
import { games } from "@/data/content"

export default function GamesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Fun <span className="text-gradient-yellow">Learning Games</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Play and learn with our collection of interactive educational games!
          </motion.p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <Link key={game.id} href={game.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-card md:p-8"
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
                    <span key={skill} className="rounded-full bg-white/20 px-3 py-1 font-display text-xs font-semibold text-white">
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
      </Section>
    </>
  )
}
