"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameScore, triggerConfetti, playChime, shuffleArray } from "@/hooks/use-game"

const EMOJIS = ["🐶", "🐱", "🐘", "🦁", "🐒", "🐦", "🐟", "🐄", "🐸", "🦋", "🐢", "🐝"]

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

interface MemoryMatchProps {
  onComplete?: (score: number) => void
}

export function MemoryMatch({ onComplete }: MemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [isLocked, setIsLocked] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [level, setLevel] = useState(1)
  const [totalPairs, setTotalPairs] = useState(6)
  const { score, incrementMoves, addPoints, complete, reset: resetScore } = useGameScore()

  const initGame = useCallback((pairs: number) => {
    const selected = shuffleArray(EMOJIS).slice(0, pairs)
    const cardPairs = [...selected, ...selected].map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(shuffleArray(cardPairs))
    setFlippedIds([])
    setIsLocked(false)
    setGameStarted(true)
    resetScore()
  }, [resetScore])

  useEffect(() => {
    initGame(totalPairs)
  }, [totalPairs, initGame])

  const handleCardClick = useCallback(
    (id: number) => {
      if (isLocked) return
      const card = cards.find((c) => c.id === id)
      if (!card || card.isFlipped || card.isMatched) return
      if (flippedIds.length >= 2) return

      playChime(440, "sine")
      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)))
      const newFlipped = [...flippedIds, id]
      setFlippedIds(newFlipped)

      if (newFlipped.length === 2) {
        incrementMoves()
        setIsLocked(true)
        const [first, second] = newFlipped
        const card1 = cards.find((c) => c.id === first)!
        const card2 = cards.find((c) => c.id === second)!

        if (card1.emoji === card2.emoji) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first || c.id === second ? { ...c, isMatched: true } : c,
              ),
            )
            setFlippedIds([])
            setIsLocked(false)
            addPoints(10)
            playChime(523, "sine")
            setTimeout(() => playChime(659, "sine"), 100)

            const allMatched = cards.every((c) => c.isMatched || c.id === first || c.id === second)
            if (allMatched) {
              complete()
              setTimeout(() => {
                triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
                onComplete?.(score.score + 10)
              }, 300)
            }
          }, 600)
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first || c.id === second ? { ...c, isFlipped: false } : c,
              ),
            )
            setFlippedIds([])
            setIsLocked(false)
          }, 1000)
        }
      }
    },
    [cards, flippedIds, isLocked, incrementMoves, addPoints, complete, score.score, onComplete],
  )

  const nextLevel = () => {
    setLevel((l) => l + 1)
    setTotalPairs((p) => Math.min(p + 2, 12))
  }

  const restart = () => {
    setLevel(1)
    setTotalPairs(6)
    setGameStarted(false)
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 text-6xl"
        >
          🧠
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-dark">Memory Match</h3>
        <p className="mt-2 font-body text-gray text-center max-w-md">
          Find matching pairs of cute emojis! Test your memory skills!
        </p>
        <Button variant="coral" size="lg" className="mt-6" onClick={() => initGame(totalPairs)}>
          Start Game
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-coral/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Score</p>
            <p className="font-display text-lg font-bold text-coral">{score.score}</p>
          </div>
          <div className="rounded-xl bg-purple/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Moves</p>
            <p className="font-display text-lg font-bold text-purple">{score.moves}</p>
          </div>
          <div className="rounded-xl bg-yellow/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Level</p>
            <p className="font-display text-lg font-bold text-yellow-dark">{level}</p>
          </div>
        </div>
        <button
          onClick={restart}
          className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-coral/10 hover:text-coral"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
      </div>

      <AnimatePresence mode="wait">
        {score.completed ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-4 text-6xl"
            >
              🎉
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-dark">Level Complete!</h3>
            <p className="mt-2 font-body text-gray">
              Score: {score.score} | Moves: {score.moves} | Pairs: {score.pairs}
            </p>
            <div className="mt-4 flex gap-4">
              <Button variant="coral" onClick={nextLevel}>
                Next Level <Sparkles className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={restart}>
                Start Over
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-4 gap-3 md:gap-4"
            style={{ maxWidth: totalPairs > 6 ? 500 : 400 }}
          >
            {cards.map((card) => (
              <motion.button
                key={card.id}
                whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleCardClick(card.id)}
                className={`relative flex aspect-square items-center justify-center rounded-2xl text-3xl transition-all duration-300 md:text-4xl ${
                  card.isMatched
                    ? "bg-green/10 opacity-60 cursor-default"
                    : card.isFlipped
                      ? "bg-white shadow-card"
                      : "bg-gradient-to-br from-coral to-coral-light text-white shadow-soft cursor-pointer hover:shadow-card"
                }`}
                aria-label={card.isFlipped ? card.emoji : "Hidden card"}
                disabled={card.isMatched}
              >
                <AnimatePresence mode="wait">
                  {card.isFlipped || card.isMatched ? (
                    <motion.span
                      key="front"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.emoji}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="back"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="text-2xl"
                    >
                      ❓
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${score.pairs > i * 3 ? "text-yellow fill-yellow" : "text-gray-light"}`}
          />
        ))}
      </div>
    </div>
  )
}
