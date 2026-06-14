"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { shuffleArray, playChime, triggerConfetti } from "@/hooks/use-game"

const LEVELS = [
  { letters: ["A", "B", "C", "D"], label: "A-D" },
  { letters: ["E", "F", "G", "H"], label: "E-H" },
  { letters: ["I", "J", "K", "L"], label: "I-L" },
  { letters: ["M", "N", "O", "P"], label: "M-P" },
  { letters: ["Q", "R", "S", "T"], label: "Q-T" },
  { letters: ["U", "V", "W", "X", "Y", "Z"], label: "U-Z" },
]

interface AlphabetPuzzleProps {
  onComplete?: (score: number) => void
}

export function AlphabetPuzzle({ onComplete }: AlphabetPuzzleProps) {
  const [started, setStarted] = useState(false)
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [tiles, setTiles] = useState<string[]>([])
  const [slots, setSlots] = useState<(string | null)[]>([])
  const [draggingTile, setDraggingTile] = useState<string | null>(null)
  const [selectedTile, setSelectedTile] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const startLevel = useCallback((lvl: number) => {
    const l = LEVELS[lvl]
    setTiles(shuffleArray(l.letters))
    setSlots(new Array(l.letters.length).fill(null))
    setDraggingTile(null)
    setSelectedTile(null)
    setCompleted(false)
  }, [])

  const startGame = () => {
    setLevel(0)
    setScore(0)
    setStarted(true)
    startLevel(0)
  }

  const handleTileClick = (tile: string) => {
    if (completed) return
    if (selectedTile === tile) {
      setSelectedTile(null)
      return
    }
    playChime(440, "sine")
    setSelectedTile(tile)
    const nextEmpty = slots.findIndex((s) => s === null)
    if (nextEmpty !== -1) {
      const newSlots = [...slots]
      newSlots[nextEmpty] = tile
      setSlots(newSlots)
      setTiles((prev) => prev.filter((t) => t !== tile))
      setSelectedTile(null)

      const l = LEVELS[level]
      if (newSlots.every((s) => s !== null)) {
        const correct = newSlots.every((s, i) => s === l.letters[i])
        if (correct) {
          playChime(523, "sine")
          setTimeout(() => playChime(659, "sine"), 100)
          setTimeout(() => playChime(784, "sine"), 200)
          setScore((s) => s + 10)
          setCompleted(true)
        } else {
          playChime(150, "sawtooth")
          setTimeout(() => {
            setTiles(shuffleArray(l.letters))
            setSlots(new Array(l.letters.length).fill(null))
          }, 800)
        }
      }
    }
  }

  const nextLevel = () => {
    const next = level + 1
    if (next >= LEVELS.length) {
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
      onComplete?.(score)
      return
    }
    setLevel(next)
    startLevel(next)
  }

  const restart = () => {
    setLevel(0)
    setScore(0)
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6 text-6xl">
          🧩
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-dark">Alphabet Puzzle</h3>
        <p className="mt-2 font-body text-gray text-center max-w-md">
          Tap the letters in the correct alphabetical order!
        </p>
        <Button variant="sky" size="lg" className="mt-6" onClick={startGame}>
          Start Game
        </Button>
      </div>
    )
  }

  const l = LEVELS[level]
  const allDone = level >= LEVELS.length

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-sky/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Score</p>
            <p className="font-display text-lg font-bold text-sky-dark">{score}</p>
          </div>
          <div className="rounded-xl bg-purple/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Level</p>
            <p className="font-display text-lg font-bold text-purple">{level + 1} / {LEVELS.length}</p>
          </div>
        </div>
        <button
          onClick={restart}
          className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-sky/10 hover:text-sky-dark"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
      </div>

      <AnimatePresence mode="wait">
        {allDone ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }} className="mb-4 text-6xl">
              🎉
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-dark">All Levels Complete!</h3>
            <p className="mt-2 font-body text-gray">Final Score: {score}</p>
            <Button variant="sky" className="mt-4" onClick={startGame}>
              Play Again <Sparkles className="h-4 w-4" />
            </Button>
          </motion.div>
        ) : completed ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }} className="mb-4 text-6xl">
              ⭐
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-dark">Level Complete!</h3>
            <p className="mt-2 font-body text-gray">You ordered {l.label} correctly!</p>
            <Button variant="sky" className="mt-4" onClick={nextLevel}>
              {level + 1 >= LEVELS.length ? "Finish" : "Next Level"} <Sparkles className="h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="font-display text-lg font-bold text-dark">
              Tap letters in order: <span className="text-sky-dark">{l.label}</span>
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {slots.map((slot, i) => (
                <motion.div
                  key={i}
                  layout
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-display font-bold transition-all ${
                    slot
                      ? "bg-gradient-to-br from-sky to-sky-light text-white shadow-card"
                      : "border-2 border-dashed border-gray-light bg-cream"
                  }`}
                >
                  {slot || "?"}
                </motion.div>
              ))}
            </div>

            {tiles.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                <AnimatePresence>
                  {tiles.map((tile) => (
                    <motion.button
                      key={tile}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTileClick(tile)}
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-display font-bold shadow-soft transition-all ${
                        selectedTile === tile
                          ? "bg-sky text-white scale-110 shadow-card"
                          : "bg-white text-dark hover:shadow-card"
                      }`}
                    >
                      {tile}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
