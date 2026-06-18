"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameTimer, useGameScore, triggerConfetti, playChime } from "@/hooks/use-game"

const SHAPES = ["🔴", "🔵", "🟡", "🟢", "🟣", "🟠", "🔷", "💜"]

interface Pattern {
  display: string[]
  options: string[]
  answer: number
  type: string
}

function generatePattern(level: number): Pattern {
  const baseLen = level <= 3 ? 4 : level <= 6 ? 6 : 8
  const seqLen = 2 + Math.floor(level / 3)
  const seq: string[] = []
  const available = SHAPES.slice(0, Math.min(2 + Math.floor(level / 2), 6))
  for (let i = 0; i < seqLen; i++) {
    seq.push(available[Math.floor(Math.random() * available.length)])
  }
  const display: string[] = []
  for (let i = 0; i < baseLen; i++) {
    display.push(seq[i % seq.length])
  }
  const correctNext = seq[baseLen % seq.length]
  const wrongOptions = new Set<string>()
  wrongOptions.add(correctNext)
  while (wrongOptions.size < 3) {
    const pick = available[Math.floor(Math.random() * available.length)]
    wrongOptions.add(pick)
  }
  const options = shuffleOptions(Array.from(wrongOptions))
  const answer = options.indexOf(correctNext)
  const type = level <= 3 ? "Easy" : level <= 6 ? "Medium" : "Hard"
  return { display, options, answer, type }
}

function shuffleOptions(arr: string[]): string[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function PatternMatch() {
  const [level, setLevel] = useState(1)
  const [pattern, setPattern] = useState<Pattern | null>(null)
  const [selected, setSelected] = useState(-1)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const score = useGameScore()
  const timer = useGameTimer(120)
  const streakRef = useRef(0)

  const startGame = useCallback(() => {
    setLevel(1)
    setSelected(-1)
    setFeedback(null)
    setShowComplete(false)
    setShowCelebration(false)
    score.reset()
    timer.reset(120)
    timer.start()
    setPattern(generatePattern(1))
    setGameStarted(true)
    streakRef.current = 0
  }, [score, timer])

  const nextLevel = useCallback(() => {
    if (level >= 10) {
      timer.stop()
      setShowCelebration(true)
      score.complete()
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
      return
    }
    const newLevel = level + 1
    setLevel(newLevel)
    setSelected(-1)
    setFeedback(null)
    setPattern(generatePattern(newLevel))
  }, [level, timer, score])

  const chooseOption = useCallback((index: number) => {
    if (!pattern || feedback) return
    setSelected(index)
    if (index === pattern.answer) {
      setFeedback("correct")
      streakRef.current += 1
      const bonus = streakRef.current >= 3 ? 15 : 0
      score.addPoints(10 + bonus)
      playChime(600)
      setTimeout(() => playChime(800), 150)
      triggerConfetti(
        window.innerWidth / 2 + Math.random() * 100 - 50,
        window.innerHeight / 2 + Math.random() * 100 - 50,
      )
      setTimeout(() => nextLevel(), 1200)
    } else {
      setFeedback("wrong")
      streakRef.current = 0
      score.incrementMoves()
      playChime(200, "square")
      setTimeout(() => {
        setSelected(-1)
        setFeedback(null)
      }, 800)
    }
  }, [pattern, feedback, score, nextLevel])

  return (
    <div className="relative min-h-[500px]">
      {!gameStarted && (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.span className="text-8xl" animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            🔷
          </motion.span>
          <h3 className="mt-6 font-display text-2xl font-bold text-dark">Pattern Match!</h3>
          <p className="mt-2 font-body text-gray">What comes next in the pattern?</p>
          <p className="mt-1 font-body text-sm text-gray/60">10 levels of fun!</p>
          <Button variant="yellow" className="mt-6" onClick={startGame}>
            Start Playing!
          </Button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="mb-4 flex items-center justify-between rounded-xl bg-cream/50 p-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold text-yellow-dark">
                Level {level}/10
              </span>
              <span className="rounded-full bg-yellow/20 px-2 py-0.5 font-display text-xs font-semibold text-yellow-dark">
                {pattern?.type}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-yellow-dark">
                <Star className="h-4 w-4 fill-current" /> {score.score.score}
              </span>
              <span className="font-display text-sm font-bold text-sky">⏱ {timer.timeLeft}s</span>
              {streakRef.current >= 2 && (
                <span className="flex items-center gap-1 font-display text-sm font-bold text-coral">
                  <Zap className="h-4 w-4 fill-current" /> {streakRef.current}x
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={startGame}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-b from-yellow/5 via-white to-cream p-6">
            <div className="mb-8 text-center">
              <p className="font-display text-sm font-semibold text-gray">What comes next?</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 flex flex-wrap justify-center gap-3"
                >
                  {pattern?.display.map((shape, i) => (
                    <motion.span
                      key={`${level}-${i}`}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-soft"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {shape}
                    </motion.span>
                  ))}
                  <motion.span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-yellow/40 text-2xl"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ?
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {pattern?.options.map((option, i) => {
                let btnClass = "bg-white shadow-soft hover:shadow-card hover:-translate-y-1"
                if (feedback === "correct" && i === pattern.answer) {
                  btnClass = "bg-green/10 shadow-card border-2 border-green scale-110"
                } else if (feedback === "wrong" && i === selected) {
                  btnClass = "bg-red/10 border-2 border-red shake"
                }
                return (
                  <motion.button
                    key={`${level}-opt-${i}`}
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-all duration-300 ${btnClass}`}
                    onClick={() => chooseOption(i)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    disabled={feedback !== null}
                  >
                    {option}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {(timer.timeLeft <= 0 || showCelebration) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="rounded-2xl bg-white p-8 text-center shadow-card"
              >
                <motion.span
                  className="text-6xl"
                  animate={showCelebration ? { rotate: 360 } : {}}
                  transition={{ repeat: showCelebration ? Infinity : 0, duration: 3, ease: "linear" }}
                >
                  {showCelebration ? "🏆" : "⏰"}
                </motion.span>
                <h4 className="mt-4 font-display text-2xl font-bold text-dark">
                  {showCelebration ? "Pattern Master!" : "Time's Up!"}
                </h4>
                <p className="mt-2 font-body text-gray">Score: {score.score.score}</p>
                {showCelebration && (
                  <p className="mt-1 font-display text-sm font-bold text-green">You completed all 10 levels! 🌟</p>
                )}
                <Button variant="yellow" className="mt-6" onClick={startGame}>
                  Play Again
                </Button>
              </motion.div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    i + 1 < level ? "bg-yellow" : i + 1 === level ? "bg-yellow-dark" : "bg-gray/20"
                  }`}
                />
              ))}
            </div>
            <span className="font-display text-xs text-gray/60">Level {level}/10</span>
          </div>
        </>
      )}
    </div>
  )
}
