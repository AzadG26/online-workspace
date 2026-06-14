"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shuffleArray, playChime, triggerConfetti } from "@/hooks/use-game"

const PAIRS = [
  { num: 1, dots: "●", word: "One" },
  { num: 2, dots: "●●", word: "Two" },
  { num: 3, dots: "●●●", word: "Three" },
  { num: 4, dots: "●●●●", word: "Four" },
  { num: 5, dots: "●●●●●", word: "Five" },
  { num: 6, dots: "●●●●●●", word: "Six" },
]

interface NumberMatchProps {
  onComplete?: (score: number) => void
}

export function NumberMatch({ onComplete }: NumberMatchProps) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [targets, setTargets] = useState(shuffleArray(PAIRS))
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [started, setStarted] = useState(false)
  const [items, setItems] = useState(shuffleArray(PAIRS))

  const startGame = () => {
    const shuffled = shuffleArray(PAIRS)
    setItems(shuffled)
    setTargets(shuffleArray(PAIRS))
    setRound(0)
    setScore(0)
    setSelected(null)
    setFeedback(null)
    setStarted(true)
  }

  const handleSelect = (num: number) => {
    if (feedback) return
    setSelected(num)
    const target = targets[round]
    if (num === target.num) {
      playChime(523, "sine")
      setFeedback("correct")
      setScore((s) => s + 10)
      setTimeout(() => {
        const next = round + 1
        if (next >= 4) {
          triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
          onComplete?.(score + 10)
        } else {
          setRound(next)
          setSelected(null)
          setFeedback(null)
        }
      }, 1000)
    } else {
      playChime(150, "sawtooth")
      setFeedback("wrong")
      setTimeout(() => {
        setSelected(null)
        setFeedback(null)
      }, 800)
    }
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6 text-6xl">
          🔢
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-dark">Number Match</h3>
        <p className="mt-2 font-body text-gray text-center max-w-md">
          Count the dots and match them to the right number!
        </p>
        <Button variant="yellow" size="lg" className="mt-6" onClick={startGame}>
          Start Game
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-yellow/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Score</p>
            <p className="font-display text-lg font-bold text-yellow-dark">{score}</p>
          </div>
          <div className="rounded-xl bg-purple/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Round</p>
            <p className="font-display text-lg font-bold text-purple">{round + 1} / 4</p>
          </div>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-yellow/10 hover:text-yellow-dark"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
      </div>

      {round < 4 ? (
        <div className="flex flex-col items-center gap-8">
          <motion.div
            key={round}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex h-32 w-32 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-yellow/20 to-yellow/5 shadow-soft"
          >
            <p className="font-display text-3xl font-bold text-yellow-dark">{targets[round].num}</p>
            <p className="font-display text-sm text-gray">{targets[round].word}</p>
          </motion.div>

          <p className="font-display text-lg font-bold text-dark">Which has the same count?</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {items.slice(0, 4).map((item) => (
              <motion.button
                key={item.num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(item.num)}
                disabled={feedback !== null}
                className={`flex h-28 w-28 flex-col items-center justify-center rounded-2xl text-2xl shadow-soft transition-all ${
                  feedback === "correct" && selected === item.num
                    ? "bg-green text-white scale-110"
                    : feedback === "wrong" && selected === item.num
                      ? "bg-coral text-white"
                      : "bg-white text-dark hover:shadow-card"
                }`}
              >
                <span className="text-lg leading-tight">{item.dots}</span>
                <span className="mt-1 font-display text-sm font-bold">{item.num}</span>
              </motion.button>
            ))}
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
          <Button variant="yellow" className="mt-4" onClick={startGame}>
            Play Again <Sparkles className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
