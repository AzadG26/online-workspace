"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameTimer, useGameScore, triggerConfetti, playChime, shuffleArray } from "@/hooks/use-game"

const WORDS = [
  { word: "CAT", emoji: "🐱", hint: "A furry pet that says Meow!" },
  { word: "DOG", emoji: "🐶", hint: "A pet that barks and wags its tail!" },
  { word: "SUN", emoji: "☀️", hint: "It shines bright in the sky!" },
  { word: "FISH", emoji: "🐟", hint: "It swims in water!" },
  { word: "BIRD", emoji: "🐦", hint: "It has wings and can fly!" },
  { word: "FROG", emoji: "🐸", hint: "A green animal that jumps!" },
  { word: "STAR", emoji: "⭐", hint: "It twinkles in the night sky!" },
  { word: "MOON", emoji: "🌙", hint: "You see it in the sky at night!" },
  { word: "TREE", emoji: "🌳", hint: "A tall plant with leaves!" },
  { word: "BOOK", emoji: "📚", hint: "You read stories from it!" },
  { word: "DUCK", emoji: "🦆", hint: "A bird that says Quack!" },
  { word: "FISH", emoji: "🐠", hint: "A colorful swimmer in the ocean!" },
  { word: "BALL", emoji: "⚽", hint: "You play games with it!" },
  { word: "CAKE", emoji: "🎂", hint: "A sweet treat for birthdays!" },
  { word: "BEAR", emoji: "🧸", hint: "A fluffy stuffed toy!" },
]

export default function WordBuilderPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrambled, setScrambled] = useState<string[]>([])
  const [placed, setPlaced] = useState<string[]>([])
  const [selectedFromScrambled, setSelectedFromScrambled] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [started, setStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const timer = useGameTimer(120)
  const score = useGameScore()

  const currentWord = useMemo(() => WORDS[currentIndex], [currentIndex])

  const startGame = useCallback(() => {
    setCurrentIndex(0)
    setGameOver(false)
    score.reset()
    timer.reset(120)
    timer.start()
    const word = WORDS[0]
    setScrambled(shuffleArray(word.word.split("")))
    setPlaced([])
    setFeedback(null)
    setStarted(true)
  }, [score, timer])

  const nextWord = useCallback(() => {
    if (currentIndex >= WORDS.length - 1) {
      timer.stop()
      setGameOver(true)
      score.complete()
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
      return
    }
    const next = currentIndex + 1
    setCurrentIndex(next)
    const word = WORDS[next]
    setScrambled(shuffleArray(word.word.split("")))
    setPlaced([])
    setFeedback(null)
    setSelectedFromScrambled(null)
  }, [currentIndex, timer, score])

  const selectLetter = useCallback((index: number) => {
    if (feedback) return
    setSelectedFromScrambled(index)
  }, [feedback])

  const placeLetter = useCallback(() => {
    if (selectedFromScrambled === null || feedback) return
    const letter = scrambled[selectedFromScrambled]
    const newPlaced = [...placed, letter]
    const newScrambled = scrambled.filter((_, i) => i !== selectedFromScrambled)
    setPlaced(newPlaced)
    setScrambled(newScrambled)
    setSelectedFromScrambled(null)

    if (newPlaced.length === currentWord.word.length) {
      const isCorrect = newPlaced.join("") === currentWord.word
      if (isCorrect) {
        setFeedback("correct")
        score.addPoints(10)
        playChime(600)
        setTimeout(() => playChime(800), 150)
        triggerConfetti(
          window.innerWidth / 2 + Math.random() * 100 - 50,
          window.innerHeight / 2 + Math.random() * 100 - 50,
        )
        setTimeout(() => nextWord(), 1200)
      } else {
        setFeedback("wrong")
        score.incrementMoves()
        playChime(200, "square")
        setTimeout(() => {
          setScrambled(shuffleArray(currentWord.word.split("")))
          setPlaced([])
          setFeedback(null)
        }, 1000)
      }
    }
  }, [selectedFromScrambled, scrambled, placed, currentWord, feedback, score, nextWord])

  const removeLetter = useCallback((index: number) => {
    if (feedback) return
    const letter = placed[index]
    setPlaced(placed.filter((_, i) => i !== index))
    setScrambled([...scrambled, letter])
  }, [placed, scrambled, feedback])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            🧩
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Word <span className="text-gradient-purple">Builder</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Tap the letters in the right order to build words!</p>
        </div>

        {!started ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 text-center">
            <p className="font-display text-lg font-bold text-dark">Build {WORDS.length} words to win! 🏆</p>
            <p className="mt-2 font-body text-sm text-gray/60">Each word has a picture clue to help you</p>
            <Button variant="purple" size="lg" className="mt-8" onClick={startGame}>
              Start Building!
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-cream/50 p-4">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-purple">
                <Star className="h-4 w-4 fill-current" /> {score.score.score}
              </span>
              <span className="font-display text-sm font-bold text-sky">⏱ {timer.timeLeft}s</span>
              <span className="font-display text-sm font-bold text-gray">Word {currentIndex + 1}/{WORDS.length}</span>
              <Button variant="ghost" size="sm" onClick={startGame}><RefreshCw className="h-4 w-4" /></Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord.word}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-8 text-center"
              >
                <motion.span className="text-8xl" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  {currentWord.emoji}
                </motion.span>
                <p className="mt-4 font-display text-lg font-bold text-dark">{currentWord.hint}</p>
                {feedback === "wrong" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 font-display text-sm font-bold text-coral">
                    Not quite! Try again! 💪
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-8 flex min-h-[64px] flex-wrap items-center justify-center gap-2 rounded-2xl bg-cream/50 p-4"
              layout
            >
              {placed.map((letter, i) => (
                <motion.button
                  key={`placed-${i}`}
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-white font-display text-2xl font-bold text-dark shadow-soft"
                  onClick={() => removeLetter(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {letter}
                </motion.button>
              ))}
              {Array.from({ length: currentWord.word.length - placed.length }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 w-14 rounded-xl border-2 border-dashed border-gray/30" />
              ))}
            </motion.div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {scrambled.map((letter, i) => (
                <motion.button
                  key={`scrambled-${i}`}
                  className={`flex h-14 w-14 items-center justify-center rounded-xl font-display text-2xl font-bold text-white transition-all ${
                    selectedFromScrambled === i ? "bg-purple-dark scale-110 shadow-glow-purple" : "bg-purple shadow-soft hover:bg-purple-dark"
                  }`}
                  onClick={() => selectLetter(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={selectedFromScrambled === i ? { y: [0, -4, 0] } : {}}
                  transition={{ repeat: selectedFromScrambled === i ? Infinity : 0, duration: 0.6 }}
                >
                  {letter}
                </motion.button>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="purple"
                size="lg"
                onClick={placeLetter}
                disabled={selectedFromScrambled === null || feedback !== null}
                className={selectedFromScrambled === null ? "opacity-50" : ""}
              >
                {selectedFromScrambled !== null ? `Place "${scrambled[selectedFromScrambled]}" →` : "Tap a letter first!"}
              </Button>
            </div>

            {(timer.timeLeft <= 0 || gameOver) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-2xl bg-white p-8 text-center shadow-card">
                  <motion.span className="text-6xl" animate={gameOver ? { rotate: 360 } : {}} transition={{ repeat: gameOver ? Infinity : 0, duration: 3, ease: "linear" }}>
                    {gameOver ? "🏆" : "⏰"}
                  </motion.span>
                  <h4 className="mt-4 font-display text-2xl font-bold text-dark">
                    {gameOver ? "Word Master!" : "Time's Up!"}
                  </h4>
                  <p className="mt-2 font-body text-lg text-gray">Score: {score.score.score}</p>
                  <p className="font-body text-sm text-gray/60">Words built: {currentIndex}/{WORDS.length}</p>
                  <Button variant="purple" className="mt-6" onClick={startGame}>
                    Play Again
                  </Button>
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
