"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Section } from "@/components/ui/section"
import { games } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

const floatingIcons = ["🎮", "⭐", "🎲", "🌈", "✨", "🎯"]

export default function GamesPage() {
  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Fun Learning Games", "Play and learn with interactive educational games for kids.", "/games", games.length),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Games", url: "/games" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow/10 via-cream to-white pt-24 pb-12 md:pt-32">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20 pointer-events-none"
            style={{ top: `${15 + i * 10}%`, left: `${i % 2 === 0 ? 5 : 92}%` }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            {icon}
          </motion.div>
        ))}
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Fun{" "}
            <span className="bg-gradient-to-r from-yellow to-yellow-dark bg-clip-text text-transparent">Learning Games</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 20 }}
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
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative overflow-hidden rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-card md:p-8"
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
                    <span key={skill} className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 font-display text-xs font-semibold text-white">
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
      </Section>
    </>
  )
}
