"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shuffleArray, playChime, triggerConfetti } from "@/hooks/use-game"

const ANIMALS = [
  { name: "Elephant", emoji: "🐘", clue: "I have a long trunk and big ears" },
  { name: "Lion", emoji: "🦁", clue: "I am the king of the jungle" },
  { name: "Monkey", emoji: "🐒", clue: "I love bananas and climbing trees" },
  { name: "Dog", emoji: "🐶", clue: "I am a human's best friend" },
  { name: "Cat", emoji: "🐱", clue: "I purr and love to nap" },
  { name: "Fish", emoji: "🐟", clue: "I live underwater and swim" },
  { name: "Bird", emoji: "🐦", clue: "I have wings and can fly" },
  { name: "Turtle", emoji: "🐢", clue: "I carry my home on my back" },
]

interface AnimalPuzzleProps {
  onComplete?: (score: number) => void
}

export function AnimalPuzzle({ onComplete }: AnimalPuzzleProps) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [currentAnimal, setCurrentAnimal] = useState(ANIMALS[0])
  const [options, setOptions] = useState<string[]>([])
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [started, setStarted] = useState(false)

  const initRound = useCallback(() => {
    const shuffled = shuffleArray(ANIMALS)
    setCurrentAnimal(shuffled[0])
    const others = shuffleArray(ANIMALS.filter((a) => a.name !== shuffled[0].name))
      .slice(0, 3)
      .map((a) => a.name)
    const allOptions = shuffleArray([shuffled[0].name, ...others])
    setOptions(allOptions)
    setFeedback(null)
  }, [])

  const startGame = () => {
    setRound(0)
    setScore(0)
    setStarted(true)
    initRound()
  }

  const handleAnswer = (name: string) => {
    if (feedback) return
    if (name === currentAnimal.name) {
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
          🐾
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-dark">Animal Puzzle</h3>
        <p className="mt-2 font-body text-gray text-center max-w-md">
          Read the clue and guess which animal it is!
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex h-32 w-32 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-sky/20 to-cream shadow-soft"
          >
            <span className="text-6xl">{currentAnimal.emoji}</span>
          </motion.div>

          <div className="max-w-md rounded-2xl bg-yellow/10 px-6 py-4 text-center">
            <p className="font-display text-lg font-bold text-dark">Who am I?</p>
            <p className="mt-2 font-body text-gray italic">{currentAnimal.clue}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {options.map((name) => (
                <motion.button
                  key={name + round}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(name)}
                  disabled={feedback !== null}
                  className={`rounded-2xl px-6 py-4 font-display text-lg font-bold shadow-soft transition-all ${
                    feedback === "correct" && name === currentAnimal.name
                      ? "bg-green text-white scale-110"
                      : feedback === "wrong" && name === currentAnimal.name
                        ? "bg-coral text-white"
                        : "bg-white text-dark hover:shadow-card"
                  }`}
                >
                  {name}
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
