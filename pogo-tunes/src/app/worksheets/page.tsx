"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Printer, Eye, X, Sparkles, Check } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

const worksheetData: Record<string, {
  title: string
  emoji: string
  color: string
  sheets: { name: string; type: "tracing" | "coloring" | "dot-to-dot" | "matching" | "counting"; content: string[] }[]
}> = {
  "ABC": {
    title: "ABC", emoji: "🔤", color: "#FF6B6B",
    sheets: [
      { name: "Trace Letters A-F", type: "tracing", content: ["A A A A A", "B B B B B", "C C C C C", "D D D D D", "E E E E E", "F F F F F"] },
      { name: "Trace Letters G-L", type: "tracing", content: ["G G G G G", "H H H H H", "I I I I I", "J J J J J", "K K K K K", "L L L L L"] },
      { name: "Trace Letters M-R", type: "tracing", content: ["M M M M M", "N N N N N", "O O O O O", "P P P P P", "Q Q Q Q Q", "R R R R R"] },
      { name: "Trace Letters S-Z", type: "tracing", content: ["S S S S S", "T T T T T", "U U U U U", "V V V V V", "W W W W W", "X X X X X", "Y Y Y Y Y", "Z Z Z Z Z"] },
      { name: "Color the ABCs", type: "coloring", content: ["A is for 🍎 Apple", "B is for ⚽ Ball", "C is for 🐱 Cat", "D is for 🐶 Dog", "E is for 🥚 Egg", "F is for 🐸 Frog"] },
    ],
  },
  "Counting": {
    title: "Counting", emoji: "🔢", color: "#FFD93D",
    sheets: [
      { name: "Trace Numbers 1-10", type: "tracing", content: ["1 1 1 1 1", "2 2 2 2 2", "3 3 3 3 3", "4 4 4 4 4", "5 5 5 5 5", "6 6 6 6 6", "7 7 7 7 7", "8 8 8 8 8", "9 9 9 9 9", "10 10 10 10"] },
      { name: "Count & Circle", type: "counting", content: ["🍎🍎 = 2", "🐱🐱🐱 = 3", "⭐ ⭐ ⭐ ⭐ = 4", "🌸🌸🌸🌸🌸 = 5", "🍪🍪🍪🍪🍪🍪 = 6"] },
      { name: "Dot-to-Dot 1-20", type: "dot-to-dot", content: ["1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10", "11 → 12 → 13 → 14 → 15 → 16 → 17 → 18 → 19 → 20"] },
      { name: "Count & Color", type: "coloring", content: ["Color 3 stars ⭐⭐⭐", "Color 5 hearts ❤️❤️❤️❤️❤️", "Color 2 moons 🌙🌙"] },
    ],
  },
  "Colors": {
    title: "Colors", emoji: "🎨", color: "#6EE7B7",
    sheets: [
      { name: "Trace Color Words", type: "tracing", content: ["Red Red Red", "Blue Blue Blue", "Green Green Green", "Yellow Yellow Yellow", "Orange Orange Orange", "Purple Purple Purple"] },
      { name: "Color the Rainbow", type: "coloring", content: ["Red ❤️", "Orange 🧡", "Yellow 💛", "Green 💚", "Blue 💙", "Purple 💜"] },
      { name: "Match Colors", type: "matching", content: ["🍎 → Red", "🌊 → Blue", "☀️ → Yellow", "🌿 → Green", "🍊 → Orange"] },
    ],
  },
  "Animals": {
    title: "Animals", emoji: "🐾", color: "#6BCBFF",
    sheets: [
      { name: "Trace Animal Names", type: "tracing", content: ["Dog Dog Dog", "Cat Cat Cat", "Bird Bird Bird", "Fish Fish Fish", "Horse Horse Horse", "Cow Cow Cow"] },
      { name: "Animal Coloring", type: "coloring", content: ["🐶 Color the Dog brown", "🐱 Color the Cat orange", "🐘 Color the Elephant gray", "🦁 Color the Lion gold"] },
      { name: "Match Animal Sounds", type: "matching", content: ["🐶 → Woof Woof", "🐱 → Meow Meow", "🐮 → Moo Moo", "🐔 → Cluck Cluck"] },
    ],
  },
  "Shapes": {
    title: "Shapes", emoji: "🔷", color: "#FF9F43",
    sheets: [
      { name: "Trace Shape Names", type: "tracing", content: ["Circle Circle", "Square Square", "Triangle Triangle", "Rectangle Rectangle", "Star Star Star"] },
      { name: "Color the Shapes", type: "coloring", content: ["⭕ Color the Circle red", "🟦 Color the Square blue", "🔺 Color the Triangle green", "⭐ Color the Star yellow"] },
      { name: "Draw the Shapes", type: "dot-to-dot", content: ["O — Circle", "□ — Square", "△ — Triangle", "☆ — Star"] },
    ],
  },
  "Hindi": {
    title: "Hindi", emoji: "🕉️", color: "#B28DFF",
    sheets: [
      { name: "Trace Hindi Letters", type: "tracing", content: ["अ अ अ अ अ", "आ आ आ आ आ", "इ इ इ इ इ", "ई ई ई ई ई", "उ उ उ उ उ", "ऊ ऊ ऊ ऊ ऊ", "ए ए ए ए ए"] },
      { name: "Hindi Words", type: "tracing", content: ["अनार अनार", "आम आम", "इलायची", "ईश्वर"] },
    ],
  },
  "Fruits": {
    title: "Fruits", emoji: "🍎", color: "#FF6B6B",
    sheets: [
      { name: "Trace Fruit Names", type: "tracing", content: ["Apple Apple", "Banana Banana", "Orange Orange", "Grape Grape", "Mango Mango"] },
      { name: "Fruit Coloring", type: "coloring", content: ["🍎 Color the Apple red", "🍌 Color the Banana yellow", "🍊 Color the Orange orange", "🍇 Color the Grapes purple"] },
    ],
  },
  "Vegetables": {
    title: "Vegetables", emoji: "🥦", color: "#6EE7B7",
    sheets: [
      { name: "Trace Vegetable Names", type: "tracing", content: ["Carrot Carrot", "Broccoli Broccoli", "Tomato Tomato", "Potato Potato", "Corn Corn"] },
      { name: "Vegetable Coloring", type: "coloring", content: ["🥕 Color the Carrot orange", "🥦 Color the Broccoli green", "🍅 Color the Tomato red"] },
    ],
  },
  "Birds": {
    title: "Birds", emoji: "🦜", color: "#B28DFF",
    sheets: [
      { name: "Trace Bird Names", type: "tracing", content: ["Parrot Parrot", "Owl Owl Owl", "Eagle Eagle", "Penguin Penguin", "Duck Duck Duck"] },
      { name: "Bird Coloring", type: "coloring", content: ["🦜 Color the Parrot green", "🦉 Color the Owl brown", "🐧 Color the Penguin black"] },
    ],
  },
  "Vehicles": {
    title: "Vehicles", emoji: "🚗", color: "#FFD93D",
    sheets: [
      { name: "Trace Vehicle Names", type: "tracing", content: ["Car Car Car", "Bus Bus Bus", "Train Train", "Plane Plane", "Boat Boat Boat"] },
      { name: "Vehicle Coloring", type: "coloring", content: ["🚗 Color the Car red", "🚌 Color the Bus yellow", "✈️ Color the Airplane blue"] },
    ],
  },
  "Body Parts": {
    title: "Body Parts", emoji: "🧍", color: "#FF6B6B",
    sheets: [
      { name: "Trace Body Parts", type: "tracing", content: ["Eyes Eyes Eyes", "Ears Ears Ears", "Nose Nose Nose", "Hands Hands Hands", "Feet Feet Feet"] },
      { name: "My Body Coloring", type: "coloring", content: ["👀 Color the Eyes blue", "👂 Color the Ears pink", "✋ Color the Hands skin"] },
    ],
  },
  "Phonics": {
    title: "Phonics", emoji: "🔊", color: "#B28DFF",
    sheets: [
      { name: "Trace Letter Sounds", type: "tracing", content: ["Aa — Apple", "Bb — Ball", "Cc — Cat", "Dd — Dog", "Ee — Egg", "Ff — Frog"] },
      { name: "Phonics Matching", type: "matching", content: ["🐱 → Cc", "🐶 → Dd", "🍎 → Aa", "⚽ → Bb", "🐸 → Ff"] },
    ],
  },
}

function generateWorksheetHTML(cat: string, sheetIndex: number): string {
  const data = worksheetData[cat]
  if (!data) return ""
  const sheet = data.sheets[sheetIndex]
  const title = `${data.title}: ${sheet.name}`

  let contentHTML = ""
  if (sheet.type === "tracing") {
    contentHTML = sheet.content.map(line => `
      <div class="tracing-line">
        <div class="trace-text">${line}</div>
        <div class="trace-guide">${line.replace(/[^\s]/g, "_ ")}</div>
      </div>
    `).join("")
    contentHTML = `
      <div class="instructions">✏️ Trace each letter/word below:</div>
      ${contentHTML}
    `
  } else if (sheet.type === "coloring") {
    contentHTML = sheet.content.map(line => `
      <div class="coloring-item">
        <div class="coloring-text">${line}</div>
        <div class="coloring-box"></div>
      </div>
    `).join("")
    contentHTML = `
      <div class="instructions">🎨 Read and color each item:</div>
      ${contentHTML}
    `
  } else if (sheet.type === "counting") {
    contentHTML = sheet.content.map(line => `
      <div class="count-line">${line}</div>
    `).join("")
    contentHTML = `
      <div class="instructions">🔢 Count and write the number:</div>
      ${contentHTML}
    `
  } else if (sheet.type === "dot-to-dot") {
    contentHTML = sheet.content.map(line => `
      <div class="dot-line">${line}</div>
    `).join("")
    contentHTML = `
      <div class="instructions">🔗 Connect the dots in order!</div>
      ${contentHTML}
    `
  } else if (sheet.type === "matching") {
    contentHTML = sheet.content.map((pair, i) => {
      const [left, right] = pair.split(" → ")
      return `
        <div class="match-row">
          <div class="match-left">${left}</div>
          <div class="match-arrow">───</div>
          <div class="match-right">${right}</div>
        </div>
      `
    }).join("")
    contentHTML = `
      <div class="instructions">🔗 Draw a line to match each pair:</div>
      ${contentHTML}
    `
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Pogo Tunes</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700;800&family=Nunito:wght@400;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Nunito', sans-serif;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
      background: #fff;
      color: #2D3436;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px dashed #FFEAA7;
    }
    .header .emoji { font-size: 48px; }
    .header h1 {
      font-family: 'Baloo 2', cursive;
      font-size: 32px;
      color: ${data.color};
      margin-top: 8px;
    }
    .header .subtitle {
      font-size: 14px;
      color: #999;
      margin-top: 4px;
    }
    .instructions {
      font-family: 'Baloo 2', cursive;
      font-size: 18px;
      color: #666;
      margin-bottom: 20px;
      text-align: center;
      padding: 10px;
      background: #FFF5F5;
      border-radius: 12px;
    }
    .tracing-line {
      padding: 14px 0;
      border-bottom: 2px dashed #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .trace-text { font-size: 24px; font-weight: 700; color: #2D3436; letter-spacing: 4px; }
    .trace-guide { font-size: 20px; color: #ddd; letter-spacing: 6px; }
    .coloring-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 2px dashed #eee;
    }
    .coloring-text { font-size: 20px; font-weight: 600; }
    .coloring-box {
      width: 80px;
      height: 80px;
      border: 3px dashed #ccc;
      border-radius: 16px;
    }
    .count-line {
      font-size: 28px;
      padding: 16px 0;
      text-align: center;
      border-bottom: 2px dashed #eee;
    }
    .dot-line {
      font-size: 22px;
      padding: 16px 0;
      text-align: center;
      letter-spacing: 6px;
      border-bottom: 2px dashed #eee;
    }
    .match-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      padding: 14px 0;
      border-bottom: 2px dashed #eee;
    }
    .match-left { font-size: 28px; width: 80px; text-align: center; }
    .match-arrow { font-size: 18px; color: #ccc; }
    .match-right { font-size: 18px; font-weight: 700; width: 120px; text-align: center; color: ${data.color}; }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #eee;
      font-size: 12px;
      color: #bbb;
    }
    .footer a { color: ${data.color}; text-decoration: none; }
    @media print {
      body { padding: 20px; }
      .coloring-box { border-style: solid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="emoji">${data.emoji}</div>
    <h1>${title}</h1>
    <p class="subtitle">Pogo Tunes — Free Educational Worksheets</p>
  </div>
  ${contentHTML}
  <div class="footer">
    © Pogo Tunes — <a href="https://pogotunes.vercel.app">pogotunes.vercel.app</a>
  </div>
  <script>window.onload=function(){setTimeout(function(){window.print()},500)}</script>
</body>
</html>`
}

export default function WorksheetsPage() {
  const [preview, setPreview] = useState<{ cat: string; sheet: number } | null>(null)

  const handleDownload = useCallback((cat: string, sheetIndex: number) => {
    const html = generateWorksheetHTML(cat, sheetIndex)
    if (!html) return
    const win = window.open("", "_blank")
    if (!win) return
    win.document.write(html)
    win.document.close()
  }, [])

  const handlePrint = useCallback((cat: string, sheetIndex: number) => {
    handleDownload(cat, sheetIndex)
  }, [handleDownload])

  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Free Worksheets", "Download free printable worksheets for kids. Practice letters, numbers, colors, and more!", "/worksheets", Object.keys(worksheetData).length),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Worksheets", url: "/worksheets" }]),
        ]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-green/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold text-dark md:text-5xl">
            Free <span className="text-gradient-green">Worksheets</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray">
            {Object.values(worksheetData).reduce((sum, c) => sum + c.sheets.length, 0)} printable worksheets across {Object.keys(worksheetData).length} categories!
          </motion.p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(worksheetData).map(([catKey, data], i) => (
            <motion.div
              key={catKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-card"
            >
              <div
                className="flex items-center justify-center p-8"
                style={{ background: `linear-gradient(135deg, ${data.color}15, ${data.color}08)` }}
              >
                <span className="text-6xl">{data.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-dark">{catKey} Worksheets</h3>
                <p className="mt-1 font-body text-sm text-gray">{data.sheets.length} sheets available</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {data.sheets.map((s, si) => (
                    <span key={si} className={`rounded-full px-2.5 py-0.5 font-display text-[10px] font-semibold ${
                      s.type === "tracing" ? "bg-coral/10 text-coral" :
                      s.type === "coloring" ? "bg-green/10 text-green-dark" :
                      s.type === "matching" ? "bg-purple/10 text-purple-dark" :
                      "bg-yellow/10 text-yellow-dark"
                    }`}>
                      {s.type === "tracing" ? "✏️" : s.type === "coloring" ? "🎨" : s.type === "matching" ? "🔗" : "🔢"} {s.type}
                    </span>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {data.sheets.slice(0, 3).map((s, si) => (
                    <div key={si} className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream">
                        <span className="text-xs">{si + 1}</span>
                      </div>
                      <span className="flex-1 font-body text-xs text-gray truncate">{s.name}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setPreview({ cat: catKey, sheet: si })}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-cream text-gray/60 hover:bg-coral/10 hover:text-coral transition-all"
                          title="Preview"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDownload(catKey, si)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-cream text-gray/60 hover:bg-green/10 hover:text-green-dark transition-all"
                          title="Download"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handlePrint(catKey, si)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-cream text-gray/60 hover:bg-purple/10 hover:text-purple-dark transition-all"
                          title="Print"
                        >
                          <Printer className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {data.sheets.length > 3 && (
                    <p className="text-center font-display text-[10px] font-semibold text-gray/40">
                      +{data.sheets.length - 3} more sheets
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="mx-auto max-w-2xl">
          <Sparkles className="mx-auto h-8 w-8 text-green-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">More Coming Soon!</h2>
          <p className="mt-2 font-body text-gray">
            We&apos;re adding new worksheets every week. Check back for more fun learning activities!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/games"><Button variant="green">Play Games</Button></Link>
            <Link href="/coloring-book"><Button variant="coral">🎨 Try Coloring Book</Button></Link>
          </div>
        </div>
      </Section>

      <AnimatePresence>
        {preview && (() => {
          const data = worksheetData[preview.cat]
          const sheet = data?.sheets[preview.sheet]
          if (!data || !sheet) return null
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
              onClick={() => setPreview(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-card"
              >
                <button
                  onClick={() => setPreview(null)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cream text-gray hover:bg-coral/10 hover:text-coral"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <span className="text-4xl">{data.emoji}</span>
                  <h3 className="mt-2 font-display text-xl font-bold text-dark">{sheet.name}</h3>
                  <p className="font-body text-sm text-gray">
                    {sheet.type === "tracing" ? "✏️ Tracing practice" :
                     sheet.type === "coloring" ? "🎨 Coloring activity" :
                     sheet.type === "matching" ? "🔗 Matching exercise" :
                     sheet.type === "counting" ? "🔢 Counting practice" : "🔗 Connect the dots"}
                  </p>
                </div>
                <div className="mt-6 rounded-2xl bg-cream/50 p-4">
                  {sheet.content.map((line, i) => (
                    <div key={i} className="border-b border-dashed border-white py-3 last:border-0">
                      <p className="font-body text-base text-dark">{line}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="green" onClick={() => { handleDownload(preview.cat, preview.sheet); setPreview(null) }}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" onClick={() => { handlePrint(preview.cat, preview.sheet); setPreview(null) }}>
                    <Printer className="mr-2 h-4 w-4" /> Print
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </>
  )
}
