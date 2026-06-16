"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Globe, BookOpen } from "lucide-react"
import { Section } from "@/components/ui/section"
import { characters } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { aboutPageSchema, organizationSchema } from "@/lib/structured-data"

export default function AboutPage() {
  return (
    <>
      <StructuredData schema={[aboutPageSchema(), organizationSchema()]} />
      <section className="relative overflow-hidden bg-gradient-to-b from-coral/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            About <span className="text-gradient-coral">Pogo Tunes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Making learning fun, free, and accessible for every child around the world.
          </motion.p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { icon: Heart, title: "Our Mission", text: "To provide every child with free, high-quality educational content that makes learning joyful and engaging.", color: "text-coral", bg: "bg-coral/10" },
              { icon: Sparkles, title: "Our Vision", text: "A world where every child, regardless of their background, has access to premium learning resources.", color: "text-purple", bg: "bg-purple/10" },
              { icon: Globe, title: "Global Reach", text: "Content available in multiple languages, helping children worldwide learn in their native language.", color: "text-sky", bg: "bg-sky/10" },
              { icon: BookOpen, title: "Free Forever", text: "No subscriptions, no paywalls, no ads. We believe education should be free for everyone.", color: "text-green", bg: "bg-green/10" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-soft"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-dark">{item.title}</h3>
                <p className="mt-2 font-body text-sm text-gray leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Meet Our Characters" subtitle="Our friendly characters make learning fun!" className="bg-gradient-to-b from-white to-cream">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {characters.map((char, i) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-white p-6 text-center shadow-soft"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-3xl">
                  {char.emoji}
                </div>
                <h3 className="font-display text-lg font-bold" style={{ color: char.color }}>{char.name}</h3>
                <p className="text-sm font-semibold text-gray font-display">{char.role}</p>
                <p className="mt-2 font-body text-sm text-gray">{char.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
