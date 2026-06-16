"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { categories } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

export default function CategoriesPage() {
  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Explore & Learn", "Choose a topic and start your learning adventure with Pogo, Tuni, and Bobo!", "/categories", categories.length),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Categories", url: "/categories" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-coral/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Explore &{" "}
            <span className="text-gradient-purple">Learn</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Choose a topic below and start your learning adventure with Pogo, Tuni, and Bobo!
          </motion.p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={cat.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-card md:p-8"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                  style={{ background: cat.color }}
                />
                <div className="relative flex items-start gap-4">
                  <motion.span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-soft"
                    style={{ background: cat.gradient }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {cat.emoji}
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-dark">{cat.title}</h3>
                    <p className="mt-1 font-body text-sm text-gray">{cat.description}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="rounded-full bg-cream px-3 py-1 font-display text-xs font-semibold text-gray">
                        {cat.count} items
                      </span>
                      <span className="rounded-full bg-cream px-3 py-1 font-display text-xs font-semibold text-gray">
                        Ages {cat.ageRange}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 text-gray transition-all group-hover:translate-x-1 group-hover:text-coral" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
