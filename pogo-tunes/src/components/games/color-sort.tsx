"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, RotateCcw, Sparkles, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shuffleArray, playChime, triggerConfetti } from "@/hooks/use-game"

const COLOR_DATA = [
  { name: "Red", hex: "#FF6B6B", emoji: "🔴" },
  { name: "Blue", hex: "#6BCBFF", emoji: "🔵" },
  { name: "Yellow", hex: "#FFD93D", emoji: "🟡" },
  { name: "Green", hex: "#6EE7B7", emoji: "🟢" },
  { name: "Purple", hex: "#B28DFF", emoji: "🟣" },
  { name: "Orange", hex: "#FF9F43", emoji: "🟠" },
]

interface ColorSortProps {
  onComplete?: (score: number) => void
}

export function ColorSort({ onComplete }: ColorSortProps) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [currentColor, setCurrentColor] = useState(COLOR_DATA[0])
  const [options, setOptions] = useState(COLOR_DATA)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [started, setStarted] = useState(false)

  const initRound = useCallback(() => {
    const shuffled = shuffleArray(COLOR_DATA)
    setCurrentColor(shuffled[0])
    setOptions(shuffleArray(COLOR_DATA))
    setFeedback(null)
  }, [])

  const startGame = () => {
    setRound(0)
    setScore(0)
    setStarted(true)
    initRound()
  }

  const handleAnswer = (color: typeof COLOR_DATA[0]) => {
    if (feedback) return
    if (color.name === currentColor.name) {
      playChime(523, "sine")
      setFeedback("correct")
      setScore((s) => s + 10)
      setTimeout(() => {
        const nextRound = round + 1
        if (nextRound >= 6) {
          triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
          onComplete?.(score + 10)
        } else {
          setRound(nextRound)
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
          🎨
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-dark">Color Sort</h3>
        <p className="mt-2 font-body text-gray text-center max-w-md">
          Match the color shown with its correct name!
        </p>
        <Button variant="green" size="lg" className="mt-6" onClick={startGame}>
          Start Game
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-xl bg-green/10 px-4 py-2 text-center">
          <p className="font-display text-xs text-gray">Score</p>
          <p className="font-display text-lg font-bold text-green-dark">{score}</p>
        </div>
        <div className="rounded-xl bg-purple/10 px-4 py-2 text-center">
          <p className="font-display text-xs text-gray">Round</p>
          <p className="font-display text-lg font-bold text-purple">{round + 1} / 6</p>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-green/10 hover:text-green-dark"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
      </div>

      {round < 6 ? (
        <div className="flex flex-col items-center gap-8">
          <motion.div
            key={round}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex h-32 w-32 items-center justify-center rounded-3xl shadow-float"
            style={{ background: currentColor.hex }}
          >
            <span className="text-5xl">{currentColor.emoji}</span>
          </motion.div>

          <p className="font-display text-lg font-bold text-dark">What color is this?</p>

          <div className="grid grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {options.map((color) => (
                <motion.button
                  key={color.name + round}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(color)}
                  disabled={feedback !== null}
                  className={`rounded-2xl px-6 py-4 font-display text-lg font-bold shadow-soft transition-all ${
                    feedback === "correct" && color.name === currentColor.name
                      ? "bg-green text-white scale-110"
                      : feedback === "wrong" && color.name === currentColor.name
                        ? "bg-coral text-white"
                        : "bg-white text-dark hover:shadow-card"
                  }`}
                >
                  <span className="mr-2 text-2xl">{color.emoji}</span>
                  {color.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {feedback === "correct" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 rounded-full bg-green/10 px-6 py-3"
              >
                <Check className="h-5 w-5 text-green-dark" />
                <span className="font-display font-bold text-green-dark">Correct! +10 points</span>
              </motion.div>
            )}
            {feedback === "wrong" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 rounded-full bg-coral/10 px-6 py-3"
              >
                <X className="h-5 w-5 text-coral" />
                <span className="font-display font-bold text-coral">Try again!</span>
              </motion.div>
            )}
          </AnimatePresence>
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
          <div className="mt-4 flex gap-4">
            <Button variant="green" onClick={startGame}>
              Play Again <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
