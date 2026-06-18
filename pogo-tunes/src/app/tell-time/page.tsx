"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { playChime, triggerConfetti } from "@/hooks/use-game"

function randomTime(): { hour: number; minute: number } {
  const h = Math.floor(Math.random() * 12) + 1
  const m = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
  return { hour: h, minute: m }
}

function formatTime(h: number, m: number): string {
  const ampm = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`
}

const OPTIONS = ["o'clock", "quarter past", "half past", "quarter to"]

export default function TellTimePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [targetTime, setTargetTime] = useState(randomTime)
  const [score, setScore] = useState(0)
  const [questionNum, setQuestionNum] = useState(1)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [started, setStarted] = useState(false)

  const drawClock = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    const size = Math.min(rect.width, rect.height)
    const cx = rect.width / 2
    const cy = rect.height / 2
    const r = size * 0.42

    ctx.clearRect(0, 0, rect.width, rect.height)

    ctx.beginPath()
    ctx.arc(cx, cy, r + 8, 0, Math.PI * 2)
    ctx.fillStyle = "#FFF5F5"
    ctx.fill()
    ctx.strokeStyle = "#FFD93D"
    ctx.lineWidth = 4
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()
    ctx.strokeStyle = "#FFEAA7"
    ctx.lineWidth = 3
    ctx.stroke()

    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * Math.PI / 180
      const num = i === 0 ? 12 : i
      ctx.fillStyle = "#2D3436"
      ctx.font = `${r * 0.16}px "Baloo 2", cursive`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(String(num), cx + r * 0.78 * Math.cos(angle), cy + r * 0.78 * Math.sin(angle))
    }

    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 - 90) * Math.PI / 180
      const isHour = i % 5 === 0
      ctx.beginPath()
      ctx.arc(cx + r * 0.92 * Math.cos(angle), cy + r * 0.92 * Math.sin(angle), isHour ? 3 : 1.5, 0, Math.PI * 2)
      ctx.fillStyle = isHour ? "#2D3436" : "#ddd"
      ctx.fill()
    }

    const { hour, minute } = targetTime
    const minuteAngle = (minute * 6 - 90) * Math.PI / 180
    const hourAngle = ((hour % 12) * 30 + minute * 0.5 - 90) * Math.PI / 180

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + r * 0.5 * Math.cos(hourAngle), cy + r * 0.5 * Math.sin(hourAngle))
    ctx.strokeStyle = "#2D3436"
    ctx.lineWidth = 6
    ctx.lineCap = "round"
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + r * 0.7 * Math.cos(minuteAngle), cy + r * 0.7 * Math.sin(minuteAngle))
    ctx.strokeStyle = "#FF6B6B"
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(cx, cy, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#FF6B6B"
    ctx.fill()
  }, [targetTime])

  useEffect(() => { drawClock() }, [drawClock])
  useEffect(() => { const handle = setInterval(drawClock, 1000); return () => clearInterval(handle) }, [drawClock])

  const getAnswer = useCallback((t: { hour: number; minute: number }) => {
    if (t.minute === 0) return 0
    if (t.minute === 15) return 1
    if (t.minute === 30) return 2
    if (t.minute === 45) return 3
    return 0
  }, [])

  const newQuestion = useCallback(() => {
    const t = randomTime()
    setTargetTime(t)
    setFeedback(null)
    setSelectedOption(null)
    setQuestionNum(n => n + 1)
  }, [])

  const startGame = useCallback(() => {
    setScore(0)
    setQuestionNum(1)
    setTargetTime(randomTime())
    setFeedback(null)
    setSelectedOption(null)
    setStarted(true)
  }, [])

  const checkAnswer = useCallback((optionIndex: number) => {
    if (feedback) return
    setSelectedOption(optionIndex)
    const correct = getAnswer(targetTime)
    if (optionIndex === correct) {
      setFeedback("correct")
      setScore(s => s + 10)
      playChime(600)
      setTimeout(() => playChime(800), 150)
      if (questionNum >= 10) {
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
        setTimeout(() => setStarted(false), 1500)
      } else {
        setTimeout(() => newQuestion(), 1200)
      }
    } else {
      setFeedback("wrong")
      playChime(200, "square")
      setTimeout(() => { setFeedback(null); setSelectedOption(null) }, 800)
    }
  }, [feedback, targetTime, questionNum, getAnswer, newQuestion])

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
            🕐
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Tell the <span className="text-gradient-yellow">Time</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Look at the clock and pick the right time!</p>
        </div>

        {!started ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 text-center">
            <p className="font-display text-lg font-bold text-dark">10 questions to test your clock skills! ⏰</p>
            <p className="mt-2 font-body text-sm text-gray/60">Quarter past, half past, quarter to, and o'clock</p>
            <Button variant="yellow" size="lg" className="mt-8" onClick={startGame}>
              Start Learning!
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-cream/50 p-4">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-yellow-dark">
                <Star className="h-4 w-4 fill-current" /> {score}
              </span>
              <span className="font-display text-sm font-bold text-gray">Question {Math.min(questionNum, 10)}/10</span>
              <Button variant="ghost" size="sm" onClick={startGame}><RefreshCw className="h-4 w-4" /></Button>
            </div>

            <div className="mt-8">
              <canvas
                ref={canvasRef}
                className="mx-auto w-72 h-72 md:w-80 md:h-80"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {OPTIONS.map((opt, i) => {
                const isCorrect = feedback === "correct" && i === getAnswer(targetTime)
                const isWrong = feedback === "wrong" && i === selectedOption
                const isReveal = feedback === "correct" && i === getAnswer(targetTime)
                let btnClass = "bg-white hover:bg-yellow/10 border-2 border-transparent"
                if (isReveal || isCorrect) btnClass = "bg-green/10 border-green scale-105 shadow-md"
                else if (isWrong) btnClass = "bg-red/10 border-red"
                return (
                  <motion.button
                    key={i}
                    className={`rounded-2xl p-5 font-display text-lg font-bold text-dark transition-all ${btnClass}`}
                    onClick={() => checkAnswer(i)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={feedback !== null}
                  >
                    {opt}
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-4 flex justify-center gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 w-4 rounded-full transition-all ${
                    i + 1 < questionNum ? "bg-yellow" : i + 1 === questionNum ? "bg-yellow-dark" : "bg-gray/20"
                  }`}
                />
              ))}
            </div>

            {questionNum > 10 && (
              <div className="mt-6 text-center">
                <p className="font-display text-lg font-bold text-green">All done! Great job! 🎉</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
