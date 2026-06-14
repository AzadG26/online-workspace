"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shuffleArray, playChime, triggerConfetti } from "@/hooks/use-game"

const SHAPES = [
  { name: "Circle", emoji: "⭕", color: "#FF6B6B" },
  { name: "Square", emoji: "🟧", color: "#FF9F43" },
  { name: "Triangle", emoji: "🔺", color: "#6BCBFF" },
  { name: "Star", emoji: "⭐", color: "#FFD93D" },
  { name: "Heart", emoji: "❤️", color: "#FF6B6B" },
  { name: "Diamond", emoji: "💎", color: "#6EE7B7" },
]

const SHAPE_CARDS = [
  { name: "Circle", emoji: "⭕", color: "#FF6B6B" },
  { name: "Square", emoji: "🟧", color: "#FF9F43" },
  { name: "Triangle", emoji: "🔺", color: "#6BCBFF" },
  { name: "Star", emoji: "⭐", color: "#FFD93D" },
  { name: "Heart", emoji: "❤️", color: "#FF6B6B" },
  { name: "Diamond", emoji: "💎", color: "#6EE7B7" },
  { name: "Oval", emoji: "🥚", color: "#B28DFF" },
  { name: "Cross", emoji: "❌", color: "#FF6B6B" },
]

interface ShapeSorterProps {
  onComplete?: (score: number) => void
}

export function ShapeSorter({ onComplete }: ShapeSorterProps) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [currentShape, setCurrentShape] = useState(SHAPES[0])
  const [options, setOptions] = useState(SHAPE_CARDS)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [started, setStarted] = useState(false)

  const initRound = useCallback(() => {
    const shuffled = shuffleArray(SHAPES)
    setCurrentShape(shuffled[0])
    setOptions(shuffleArray(SHAPE_CARDS).slice(0, 4))
    setFeedback(null)
  }, [])

  const startGame = () => {
    setRound(0)
    setScore(0)
    setStarted(true)
    initRound()
  }

  const handleAnswer = (shape: (typeof SHAPE_CARDS)[0]) => {
    if (feedback) return
    if (shape.name === currentShape.name) {
      playChime(523, "sine")
      setFeedback("correct")
      setScore((s) => s + 10)
      setTimeout(() => {
        const next = round + 1
        if (next >= 6) {
          triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
          onComplete?.(score + 10)
        } else {
          setRound(next)
          initRound()
        }
      }, 1000)
    } else {
      playChime(150, "sawtooth")
      setFeedback("wrong")
      setTimeout(() => setFeedback(null), 800)
    }
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6 text-6xl">
          🔷
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-dark">Shape Sorter</h3>
        <p className="mt-2 font-body text-gray text-center max-w-md">
          Find the matching shape from the options!
        </p>
        <Button variant="sky" size="lg" className="mt-6" onClick={startGame}>
          Start Game
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-sky/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Score</p>
            <p className="font-display text-lg font-bold text-sky-dark">{score}</p>
          </div>
          <div className="rounded-xl bg-purple/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Round</p>
            <p className="font-display text-lg font-bold text-purple">{round + 1} / 6</p>
          </div>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-sky/10 hover:text-sky-dark"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
      </div>

      {round < 6 ? (
        <div className="flex flex-col items-center gap-8">
          <motion.div
            key={round}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex h-28 w-28 items-center justify-center rounded-3xl shadow-soft"
            style={{ background: `${currentShape.color}15` }}
          >
            <span className="text-5xl">{currentShape.emoji}</span>
          </motion.div>

          <p className="font-display text-lg font-bold text-dark">Find the same shape!</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {options.map((shape) => (
                <motion.button
                  key={shape.name + round}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(shape)}
                  disabled={feedback !== null}
                  className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl shadow-soft transition-all ${
                    feedback === "correct" && shape.name === currentShape.name
                      ? "bg-green text-white scale-110"
                      : feedback === "wrong" && shape.name === currentShape.name
                        ? "bg-coral text-white"
                        : "bg-white text-dark hover:shadow-card"
                  }`}
                >
                  <span className="text-3xl">{shape.emoji}</span>
                  <span className="mt-1 font-display text-xs font-bold">{shape.name}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-12"
        >
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }} className="mb-4 text-6xl">
            🎉
          </motion.div>
          <h3 className="font-display text-2xl font-bold text-dark">Game Complete!</h3>
          <p className="mt-2 font-body text-gray">Final Score: {score}</p>
          <Button variant="sky" className="mt-4" onClick={startGame}>
            Play Again <Sparkles className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
