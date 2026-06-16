"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { shorts } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

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
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Quick <span className="text-gradient-purple">Shorts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Bite-sized fun for little learners!
          </motion.p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shorts.map((short, i) => (
            <Link key={short.id} href={short.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex h-48 flex-col items-center justify-center rounded-2xl p-6 text-center shadow-soft transition-all duration-300 hover:shadow-card md:h-56"
                style={{
                  background: `linear-gradient(135deg, ${short.color}, ${short.color}88)`,
                }}
              >
                <motion.span
                  className="text-5xl md:text-6xl"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {short.emoji}
                </motion.span>
                <p className="mt-4 font-display text-lg font-bold text-white">{short.title}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
