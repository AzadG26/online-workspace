"use client"

import { useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, Printer, ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { categories } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

const worksheetCategories = categories.slice(0, 6)

const worksheetContent: Record<string, { title: string; lines: string[] }> = {
  "ABC": { title: "ABC Practice", lines: ["A _ _ _ _ _", "B _ _ _ _ _", "C _ _ _ _ _", "D _ _ _ _ _", "E _ _ _ _ _", "F _ _ _ _ _", "G _ _ _ _ _", "H _ _ _ _ _", "I _ _ _ _ _", "J _ _ _ _ _", "K _ _ _ _ _", "L _ _ _ _ _"] },
  "Counting": { title: "Counting Practice", lines: ["1 _ _ _ _ _", "2 _ _ _ _ _", "3 _ _ _ _ _", "4 _ _ _ _ _", "5 _ _ _ _ _", "6 _ _ _ _ _", "7 _ _ _ _ _", "8 _ _ _ _ _", "9 _ _ _ _ _", "10 _ _ _ _"] },
  "Colors": { title: "Colors Practice", lines: ["Red _ _ _ _ _", "Blue _ _ _ _ _", "Green _ _ _ _ _", "Yellow _ _ _ _ _", "Orange _ _ _ _ _", "Purple _ _ _ _ _", "Pink _ _ _ _ _"] },
  "Animals": { title: "Animals Practice", lines: ["Dog _ _ _ _ _", "Cat _ _ _ _ _", "Bird _ _ _ _ _", "Fish _ _ _ _ _", "Horse _ _ _ _ _", "Cow _ _ _ _ _"] },
  "Shapes": { title: "Shapes Practice", lines: ["Circle: O _ _ _ _", "Square: _ _ _ _ _", "Triangle: _ _ _ _", "Rectangle: _ _ _", "Star: _ _ _ _ _"] },
  "Hindi": { title: "Hindi Practice", lines: ["अ _ _ _ _ _", "आ _ _ _ _ _", "इ _ _ _ _ _", "ई _ _ _ _ _", "उ _ _ _ _ _", "ऊ _ _ _ _ _", "ए _ _ _ _ _", "ऐ _ _ _ _ _"] },
}

export default function WorksheetsPage() {
  const handleDownload = useCallback((catTitle: string) => {
    const ws = worksheetContent[catTitle]
    if (!ws) return
    const win = window.open("", "_blank")
    if (!win) return
    win.document.write(`<!DOCTYPE html><html><head><title>${ws.title} - Pogo Tunes</title><style>
      body { font-family: 'Comic Sans MS', cursive, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
      h1 { color: #FF6B6B; font-size: 28px; text-align: center; }
      .emoji { font-size: 48px; text-align: center; margin: 20px 0; }
      .line { font-size: 24px; padding: 12px 0; border-bottom: 2px dashed #eee; letter-spacing: 8px; }
      .footer { text-align: center; margin-top: 40px; color: #999; font-size: 14px; }
      @media print { body { padding: 20px; } }
    </style></head><body>
      <div class="emoji">${catTitle === "ABC" ? "🔤" : catTitle === "Counting" ? "🔢" : catTitle === "Colors" ? "🎨" : catTitle === "Animals" ? "🐾" : catTitle === "Shapes" ? "🔷" : "🕉️"}</div>
      <h1>${ws.title} Worksheet</h1>
      <p style="text-align:center;color:#666">Practice tracing and writing! ✏️</p>
      ${ws.lines.map(l => `<div class="line">${l}</div>`).join("")}
      <div class="footer">© Pogo Tunes — pogotunes.vercel.app</div>
      <script>window.onload = function() { window.print(); }</script>
    </body></html>`)
    win.document.close()
  }, [])

  const handlePrint = useCallback((catTitle: string) => {
    handleDownload(catTitle)
  }, [handleDownload])
  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Free Worksheets", "Download free printable worksheets for kids. Practice letters, numbers, colors, and more!", "/worksheets", worksheetCategories.length),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Worksheets", url: "/worksheets" },
          ]),
        ]}
      />
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
                  <button className="flex items-center gap-2 rounded-full bg-coral px-4 py-2 font-display text-xs font-bold text-white transition-all hover:bg-coral-dark" onClick={() => handleDownload(cat.title)}>
                    <Download className="h-3.5 w-3.5" /> Download PDF
                  </button>
                  <button className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-xs font-bold text-gray transition-all hover:bg-gray/20" onClick={() => handlePrint(cat.title)}>
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
