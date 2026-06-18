"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Undo2, RotateCcw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const COLORS = ["#FF6B6B", "#FF9F43", "#FFD93D", "#6EE7B7", "#6BCBFF", "#B28DFF", "#FF85A1", "#A0724A", "#2D3436", "#FFFFFF"]
const BRUSH_SIZES = [4, 8, 14, 22]
const PAGES = [
  { name: "Apple", emoji: "🍎", lines: "M100,200 Q100,100 150,80 Q200,60 225,100 Q250,140 225,180 Q200,220 150,220 Z" },
  { name: "Star", emoji: "⭐", lines: "M150,20 L180,110 L270,110 L200,170 L225,260 L150,210 L75,260 L100,170 L30,110 L120,110 Z" },
  { name: "Heart", emoji: "❤️", lines: "M150,240 C80,180 10,120 10,60 C10,10 60,10 80,40 C100,10 150,10 150,60 C150,10 200,10 220,40 C240,10 290,10 290,60 C290,120 220,180 150,240Z" },
  { name: "Butterfly", emoji: "🦋", lines: "M150,150 C100,80 20,80 20,150 C20,220 100,220 150,150 Z M150,150 C200,80 280,80 280,150 C280,220 200,220 150,150 Z M150,150 L150,280 M145,150 L120,220 M155,150 L180,220" },
  { name: "Sun", emoji: "☀️", lines: "M150,50 A100,100 0 1,1 149,50 M150,20 L150,5 M150,280 L150,295 M50,150 L35,150 M265,150 L280,150 M75,75 L65,65 M225,225 L235,235 M75,225 L65,235 M225,75 L235,65" },
]

export default function ColoringBookPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState("#FF6B6B")
  const [brushSize, setBrushSize] = useState(8)
  const [page, setPage] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const lastPos = useRef({ x: 0, y: 0 })

  const getCanvas = () => canvasRef.current
  const getCtx = () => getCanvas()?.getContext("2d")

  const saveState = useCallback(() => {
    const ctx = getCtx()
    const canvas = getCanvas()
    if (ctx && canvas) {
      setHistory(prev => [...prev.slice(-20), ctx.getImageData(0, 0, canvas.width, canvas.height)])
    }
  }, [])

  const initCanvas = useCallback(() => {
    const canvas = getCanvas()
    const ctx = getCtx()
    if (!canvas || !ctx) return
    canvas.width = 560
    canvas.height = 420
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#ddd"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    const path = new Path2D(PAGES[page].lines)
    ctx.stroke(path)
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)])
  }, [page])

  useEffect(() => { initCanvas() }, [initCanvas])

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true)
    const rect = getCanvas()?.getBoundingClientRect()
    if (!rect) return
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    lastPos.current = { x, y }
    saveState()
  }, [saveState])

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    const ctx = getCtx()
    const canvas = getCanvas()
    const rect = canvas?.getBoundingClientRect()
    if (!ctx || !rect) return
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(x, y)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
    lastPos.current = { x, y }
  }, [isDrawing, color, brushSize])

  const stopDraw = useCallback(() => setIsDrawing(false), [])

  const undo = useCallback(() => {
    const ctx = getCtx()
    const canvas = getCanvas()
    if (!ctx || !canvas || history.length <= 1) return
    const newHistory = history.slice(0, -1)
    ctx.putImageData(newHistory[newHistory.length - 1], 0, 0)
    setHistory(newHistory)
  }, [history])

  const clearCanvas = useCallback(() => {
    initCanvas()
  }, [initCanvas])

  const downloadCanvas = useCallback(() => {
    const canvas = getCanvas()
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `coloring-${PAGES[page].name.toLowerCase()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }, [page])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            🎨
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Coloring <span className="text-gradient-coral">Book</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Pick a page and start coloring! 🖍️</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {PAGES.map((p, i) => (
            <button
              key={p.name}
              onClick={() => { setPage(i); setHistory([]) }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-bold transition-all ${
                page === i ? "bg-coral text-white shadow-md" : "bg-cream text-gray hover:bg-coral/10"
              }`}
            >
              {p.emoji} {p.name}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="rounded-2xl shadow-card cursor-crosshair touch-none"
              style={{ maxWidth: "100%", height: "auto", aspectRatio: "4/3" }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </div>

          <div className="flex flex-row gap-3 lg:flex-col">
            <div className="rounded-2xl bg-white p-4 shadow-soft">
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-gray/60">Colors</p>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-8 w-8 rounded-xl border-2 transition-all ${
                      color === c ? "border-dark scale-110 shadow-md" : "border-transparent"
                    } ${c === "#FFFFFF" ? "border-gray/20" : ""}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-soft">
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-gray/60">Size</p>
              <div className="flex gap-2">
                {BRUSH_SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => setBrushSize(s)}
                    className={`flex items-center justify-center rounded-xl border-2 p-2 transition-all ${
                      brushSize === s ? "border-dark bg-cream" : "border-transparent"
                    }`}
                  >
                    <div className="rounded-full bg-dark" style={{ width: s, height: s }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={undo} className="rounded-xl bg-white p-3 shadow-soft hover:shadow-card transition-all" title="Undo">
                <Undo2 className="h-5 w-5 text-gray" />
              </button>
              <button onClick={clearCanvas} className="rounded-xl bg-white p-3 shadow-soft hover:shadow-card transition-all" title="Clear">
                <RotateCcw className="h-5 w-5 text-gray" />
              </button>
              <button onClick={downloadCanvas} className="rounded-xl bg-white p-3 shadow-soft hover:shadow-card transition-all" title="Save as PNG">
                <Download className="h-5 w-5 text-gray" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
