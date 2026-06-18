"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, Sparkles, Smartphone, Clapperboard } from "lucide-react"
import { Section } from "@/components/ui/section"
import { shorts } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"
import { Rainbow, SparkleIcon } from "@/components/icons/emojis"

const floatingIcons: React.ComponentType<{ className?: string }>[] = [
  Smartphone, Star, Clapperboard, Rainbow, SparkleIcon, Sparkles,
]

export default function ShortsPage() {
  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Quick Shorts", "Bite-sized educational shorts for kids. Fun learning in short videos!", "/shorts", shorts.length),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Shorts", url: "/shorts" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-purple/10 via-cream to-white pt-24 pb-12 md:pt-32">
        {floatingIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15 pointer-events-none"
            style={{ top: `${15 + i * 10}%`, left: `${i % 2 === 0 ? 5 : 92}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        ))}
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Quick{" "}
            <span className="bg-gradient-to-r from-purple to-sky bg-clip-text text-transparent">Shorts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 20 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Bite-sized fun for little learners!
          </motion.p>
        </div>
      </section>

      <Section className="bg-gradient-to-b from-white to-cream">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shorts.map((short, i) => (
            <Link key={short.id} href={short.href}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center shadow-soft transition-all duration-300 hover:shadow-card md:h-56"
                style={{
                  background: `linear-gradient(135deg, ${short.color}, ${short.color}66)`,
                }}
              >
                <motion.div
                  className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.2), transparent 60%)`,
                  }}
                />
                <motion.span
                  className="text-5xl md:text-6xl drop-shadow-lg"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {short.emoji}
                </motion.span>
                <p className="mt-4 font-display text-lg font-bold text-white drop-shadow-md">{short.title}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
