"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, ChevronLeft, ChevronRight, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { playChime } from "@/hooks/use-game"

interface TraceItem {
  label: string
  display: string
  emoji: string
  word: string
}

const TRACE_CATEGORIES: { name: string; items: TraceItem[] }[] = [
  {
    name: "Uppercase",
    items: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => ({
      label: l, display: l, emoji: "", word: l,
    })),
  },
  {
    name: "Lowercase",
    items: "abcdefghijklmnopqrstuvwxyz".split("").map(l => ({
      label: l, display: l, emoji: "", word: l,
    })),
  },
  {
    name: "Numbers",
    items: "12345678910".split("").map((n, i) => ({
      label: n, display: n, emoji: ["", "", "🐦", "🍀", "🍎", "✋", "🐝", "🌈", "🐙", "🪐", "🍩"][i], word: n,
    })),
  },
  {
    name: "Words",
    items: [
      { label: "CAT", display: "CAT", emoji: "🐱", word: "cat" },
      { label: "DOG", display: "DOG", emoji: "🐶", word: "dog" },
      { label: "SUN", display: "SUN", emoji: "☀️", word: "sun" },
      { label: "BALL", display: "BALL", emoji: "⚽", word: "ball" },
      { label: "FISH", display: "FISH", emoji: "🐟", word: "fish" },
      { label: "BIRD", display: "BIRD", emoji: "🐦", word: "bird" },
      { label: "STAR", display: "STAR", emoji: "⭐", word: "star" },
      { label: "MOON", display: "MOON", emoji: "🌙", word: "moon" },
      { label: "TREE", display: "TREE", emoji: "🌳", word: "tree" },
      { label: "BOOK", display: "BOOK", emoji: "📚", word: "book" },
      { label: "APPLE", display: "APPLE", emoji: "🍎", word: "apple" },
      { label: "HEART", display: "HEART", emoji: "❤️", word: "heart" },
    ],
  },
]

interface Point { x: number; y: number }

function generateGuidePath(letter: string, w: number, h: number): Point[] {
  const cx = w / 2
  const cy = h / 2
  const pts: Point[] = []
  const l = letter.toUpperCase()

  if (l === "A") {
    for (let i = 0; i <= 20; i++) { pts.push({ x: cx - 40 + i * 4, y: cy + 60 - i * 6 }) }
    for (let i = 0; i <= 20; i++) { pts.push({ x: cx - 40 + i * 4, y: cy + 60 - i * 6 }) }
    for (let i = 0; i <= 20; i++) { pts.push({ x: cx - 40 + i * 4, y: cy + 60 }) }
  } else if (l === "B") {
    for (let i = 0; i <= 40; i++) { pts.push({ x: cx - 30, y: cy + 60 - i * 3 }) }
    for (let i = 0; i <= 20; i++) {
      const angle = -Math.PI / 2 + (i / 20) * Math.PI
      pts.push({ x: cx - 30 + 30 * Math.cos(angle), y: cy + 30 + 30 * Math.sin(angle) })
    }
    for (let i = 0; i <= 20; i++) {
      const angle = -Math.PI / 2 + (i / 20) * Math.PI
      pts.push({ x: cx - 30 + 30 * Math.cos(angle), y: cy - 30 + 30 * Math.sin(angle) })
    }
  } else {
    const numPts = 40
    for (let i = 0; i <= numPts; i++) {
      const t = i / numPts
      const angle = t * Math.PI * 2
      pts.push({ x: cx + 40 * Math.cos(angle), y: cy + 40 * Math.sin(angle) - 10 })
    }
  }
  return pts
}

export default function TracingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)
  const [category, setCategory] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tracedPoints, setTracedPoints] = useState<Point[]>([])
  const [guidePath] = useState<Point[]>([])
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [showStar, setShowStar] = useState(false)
  const lastPos = useRef<Point | null>(null)
  const completionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentItem = TRACE_CATEGORIES[category].items[itemIndex]
  const items = TRACE_CATEGORIES[category].items

  const drawGuide = useCallback(() => {
    const canvas = overlayRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    const path = generateGuidePath(currentItem.label, rect.width, rect.height)
    ctx.strokeStyle = "#FFD93D60"
    ctx.lineWidth = 3
    ctx.setLineDash([6, 6])
    ctx.beginPath()
    if (path.length > 0) {
      ctx.moveTo(path[0].x, path[0].y)
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y)
      }
      ctx.stroke()
    }

    const cx = rect.width / 2
    const cy = rect.height / 2 + 20
    ctx.fillStyle = "#B28DFF30"
    ctx.font = `${Math.min(rect.width * 0.4, 160)}px "Baloo 2", cursive`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(currentItem.label, cx, cy)
  }, [currentItem])

  const clearTraces = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)
  }, [])

  useEffect(() => {
    clearTraces()
    drawGuide()
    setTracedPoints([])
    setCompleted(false)
    setShowStar(false)
    if (completionTimeout.current) clearTimeout(completionTimeout.current)
  }, [category, itemIndex, clearTraces, drawGuide])

  const getPos = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startTrace = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e)
    if (!pos) return
    setIsDrawing(true)
    lastPos.current = pos
    setTracedPoints([pos])
  }, [])

  const moveTrace = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    e.preventDefault()
    const pos = getPos(e)
    if (!pos || !lastPos.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = completed ? "#6EE7B7" : "#B28DFF"
    ctx.lineWidth = 6
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()

    lastPos.current = pos
    setTracedPoints(prev => [...prev, pos])

    const path = generateGuidePath(currentItem.label, canvas.width, canvas.height)
    if (path.length > 0 && !completed) {
      const lastPt = path[path.length - 1]
      const dist = Math.sqrt((pos.x - lastPt.x) ** 2 + (pos.y - lastPt.y) ** 2)
      if (dist < 20 && tracedPoints.length > 10) {
        setCompleted(true)
        setShowStar(true)
        setScore(s => s + 10)
        playChime(600)
        setTimeout(() => playChime(800), 150)
        ctx.strokeStyle = "#6EE7B7"
        ctx.lineWidth = 8
        if (completionTimeout.current) clearTimeout(completionTimeout.current)
        completionTimeout.current = setTimeout(() => setShowStar(false), 2000)
      }
    }
  }, [isDrawing, completed, tracedPoints, currentItem])

  const stopTrace = useCallback(() => {
    setIsDrawing(false)
    lastPos.current = null
  }, [])

  const prevItem = useCallback(() => {
    setItemIndex(i => (i > 0 ? i - 1 : items.length - 1))
  }, [items.length])

  const nextItem = useCallback(() => {
    setItemIndex(i => (i < items.length - 1 ? i + 1 : 0))
  }, [items.length])

  const speakLetter = useCallback(() => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(currentItem.label)
      utter.rate = 0.7
      utter.pitch = 1.2
      speechSynthesis.cancel()
      speechSynthesis.speak(utter)
    }
  }, [currentItem])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            ✏️
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Word <span className="text-gradient-purple">Tracing</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Trace letters and words with your finger or mouse!</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {TRACE_CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => { setCategory(i); setItemIndex(0) }}
              className={`rounded-full px-4 py-2 font-display text-sm font-bold transition-all ${
                category === i ? "bg-purple text-white shadow-md" : "bg-cream text-gray hover:bg-purple/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold text-purple">
                {currentItem.emoji} {currentItem.label}
              </span>
              <button
                onClick={speakLetter}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-purple/10 text-purple hover:bg-purple/20 transition-all"
                title="Listen"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-yellow-dark">
                <Star className="h-4 w-4 fill-current" /> {score}
              </span>
              <span className="font-display text-sm text-gray/60">
                {itemIndex + 1}/{items.length}
              </span>
            </div>
          </div>

          <div
            className="relative touch-none"
            style={{ width: "100%", paddingBottom: "60%" }}
          >
            <canvas
              ref={overlayRef}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ width: "100%", height: "100%" }}
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 rounded-2xl cursor-crosshair"
              style={{ width: "100%", height: "100%" }}
              onMouseDown={startTrace}
              onMouseMove={moveTrace}
              onMouseUp={stopTrace}
              onMouseLeave={stopTrace}
              onTouchStart={startTrace}
              onTouchMove={moveTrace}
              onTouchEnd={stopTrace}
            />
            <AnimatePresence>
              {showStar && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <motion.span
                    className="text-7xl"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ⭐
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={prevItem}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-gray hover:bg-purple/10 hover:text-purple transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-display text-lg font-bold text-dark">
              {currentItem.display}
            </span>
            <button
              onClick={nextItem}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-gray hover:bg-purple/10 hover:text-purple transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="purple" onClick={() => { clearTraces(); drawGuide(); setTracedPoints([]); setCompleted(false); setShowStar(false) }}>
            <RefreshCw className="mr-2 h-4 w-4" /> Redo
          </Button>
        </div>

        <div className="mt-8 rounded-3xl bg-gradient-to-br from-purple/5 to-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-dark">How to Trace ✏️</h3>
          <ul className="mt-3 space-y-2 font-body text-sm text-gray">
            <li>👆 Use your <strong>finger</strong> or <strong>mouse</strong> to trace the letter</li>
            <li>🎯 Follow the <strong>dotted guide</strong> path</li>
            <li>⭐ Complete the trace to <strong>earn a star</strong></li>
            <li>🔄 Click <strong>Redo</strong> to try again</li>
            <li>🔊 Click the <strong>speaker</strong> to hear the letter sound</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
