"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Download, Printer, ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { categories } from "@/data/content"

const worksheetCategories = categories.slice(0, 6)

export default function WorksheetsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-green/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Free <span className="text-gradient-green">Worksheets</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Download and print fun educational worksheets for your child!
          </motion.p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {worksheetCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-card"
            >
              <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-cream to-white p-8">
                <span className="text-7xl opacity-60">{cat.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-dark">{cat.title} Worksheets</h3>
                <p className="mt-1 font-body text-sm text-gray">{cat.description}</p>
                <div className="mt-4 flex gap-2">
                  <button className="flex items-center gap-2 rounded-full bg-coral px-4 py-2 font-display text-xs font-bold text-white transition-all hover:bg-coral-dark">
                    <Download className="h-3.5 w-3.5" /> Download PDF
                  </button>
                  <button className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-xs font-bold text-gray transition-all hover:bg-gray/20">
                    <Printer className="h-3.5 w-3.5" /> Print
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  )
}
