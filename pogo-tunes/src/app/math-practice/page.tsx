"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, Zap, Trophy, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameTimer, triggerConfetti, playChime } from "@/hooks/use-game"

interface Problem {
  a: number
  b: number
  op: "+" | "-"
  answer: number
  display: string
}

function generateProblem(difficulty: number): Problem {
  const maxNum = difficulty <= 1 ? 5 : difficulty <= 2 ? 10 : difficulty <= 3 ? 20 : 50
  const useSubtraction = difficulty >= 2 && Math.random() > 0.5
  let a = Math.floor(Math.random() * maxNum) + 1
  let b = Math.floor(Math.random() * maxNum) + 1
  if (useSubtraction && b > a) [a, b] = [b, a]
  const op = useSubtraction ? "-" : "+"
  const answer = op === "+" ? a + b : a - b
  return { a, b, op, answer, display: `${a} ${op} ${b} = ?` }
}

function generateOptions(correct: number, difficulty: number): number[] {
  const options = new Set<number>([correct])
  const range = Math.max(3, Math.floor(correct * 0.5) + 1)
  while (options.size < 4) {
    const offset = Math.floor(Math.random() * range * 2) - range
    const val = correct + offset
    if (val >= 0 && val !== correct) options.add(val)
  }
  return shuffleOptions(Array.from(options))
}

function shuffleOptions(arr: number[]): number[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const DIFFICULTY_LABELS = ["Easy", "Medium", "Hard", "Expert"]

export default function MathPracticePage() {
  const [difficulty, setDifficulty] = useState(1)
  const [problem, setProblem] = useState<Problem>({ a: 2, b: 1, op: "+", answer: 3, display: "2 + 1 = ?" })
  const [options, setOptions] = useState<number[]>([1, 2, 3, 4])
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  const timer = useGameTimer(120)
  const problemCount = useRef(0)

  const newProblem = useCallback((diff: number) => {
    problemCount.current++
    const p = generateProblem(diff)
    setProblem(p)
    setOptions(generateOptions(p.answer, diff))
    setFeedback(null)
  }, [])

  const startGame = useCallback(() => {
    setScore(0)
    setCorrect(0)
    setTotal(0)
    setStreak(0)
    setShowComplete(false)
    problemCount.current = 0
    timer.reset(120)
    timer.start()
    newProblem(difficulty)
    setGameStarted(true)
  }, [difficulty, timer, newProblem])

  const chooseAnswer = useCallback((val: number) => {
    if (feedback) return
    if (val === problem.answer) {
      setFeedback("correct")
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
      const bonus = streak >= 3 ? 5 : 0
      const points = 10 + Math.floor(difficulty * 2) + bonus
      setScore(s => s + points)
      playChime(600)
      setTimeout(() => playChime(800), 150)
      triggerConfetti(
        window.innerWidth / 2 + Math.random() * 100 - 50,
        window.innerHeight / 2 + Math.random() * 100 - 50,
      )
      setTimeout(() => {
        setTotal(t => t + 1)
        if (problemCount.current >= 20) {
          timer.stop()
          setShowComplete(true)
          triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
          return
        }
        newProblem(difficulty)
      }, 800)
    } else {
      setFeedback("wrong")
      setStreak(0)
      playChime(200, "square")
      setTimeout(() => {
        setTotal(t => t + 1)
        newProblem(difficulty)
      }, 1000)
    }
  }, [feedback, problem, streak, difficulty, timer, newProblem])

  useEffect(() => {
    if (!gameStarted) return
    if (difficulty <= 1) newProblem(1)
  }, [difficulty, gameStarted, newProblem])

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            🧮
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Math <span className="text-gradient-yellow">Practice</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Solve math problems and earn points!</p>
        </motion.div>

        {!gameStarted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 text-center">
            <div className="mb-6">
              <p className="font-display text-sm font-semibold text-gray">Choose Difficulty:</p>
              <div className="mt-3 flex justify-center gap-3">
                {DIFFICULTY_LABELS.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setDifficulty(i + 1)}
                    className={`rounded-full px-5 py-2 font-display text-sm font-bold transition-all ${
                      difficulty === i + 1 ? "bg-yellow text-white shadow-md" : "bg-cream text-gray hover:bg-yellow/20"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-4 font-body text-sm text-gray/60">
                {difficulty === 1 ? "Numbers 1-5, addition only" :
                 difficulty === 2 ? "Numbers 1-10, addition & subtraction" :
                 difficulty === 3 ? "Numbers 1-20" :
                 "Numbers 1-50, mixed operations"}
              </p>
            </div>
            <Button variant="yellow" size="lg" onClick={startGame}>
              <Calculator className="mr-2 h-5 w-5" /> Start Practice!
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-cream/50 p-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-display text-sm font-bold text-yellow-dark">
                  <Star className="h-4 w-4 fill-current" /> {score}
                </span>
                <span className="font-display text-sm font-bold text-green">✓ {correct}</span>
                <span className="font-body text-sm text-gray/60">/ {total}</span>
              </div>
              <div className="flex items-center gap-4">
                {streak >= 3 && (
                  <span className="flex items-center gap-1 font-display text-sm font-bold text-coral">
                    <Zap className="h-4 w-4 fill-current" /> {streak}x
                  </span>
                )}
                <span className="font-display text-sm font-bold text-sky">⏱ {timer.timeLeft}s</span>
                <Button variant="ghost" size="sm" onClick={startGame}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={problem.display}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="rounded-3xl bg-gradient-to-br from-yellow/5 to-white p-8 text-center shadow-soft"
                >
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-gray/60">Question {total + 1}</p>
                  <p className="mt-6 font-display text-5xl font-bold text-dark md:text-6xl">{problem.display.replace("= ?", "= ___")}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {options.map((val, i) => {
                  let btnClass = "bg-white shadow-soft hover:shadow-card border-2 border-transparent"
                  if (feedback === "correct" && val === problem.answer) {
                    btnClass = "bg-green/10 border-green shadow-card scale-105"
                  } else if (feedback === "wrong" && val === problem.answer) {
                    btnClass = "bg-green/10 border-green shadow-card"
                  } else if (feedback === "wrong" && val !== problem.answer) {
                    btnClass = "bg-white shadow-soft border-red/30"
                  }
                  return (
                    <motion.button
                      key={`${total}-${i}`}
                      className={`rounded-2xl py-6 font-display text-2xl font-bold text-dark transition-all ${btnClass}`}
                      onClick={() => chooseAnswer(val)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      disabled={feedback !== null}
                    >
                      {val}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: Math.min(total, 20) }, (_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-yellow" />
                ))}
              </div>
            </div>

            {(timer.timeLeft <= 0 || showComplete) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-2xl bg-white p-8 text-center shadow-card">
                  <motion.span className="text-6xl" animate={{ rotate: showComplete ? 360 : 0 }} transition={{ repeat: showComplete ? Infinity : 0, duration: 3, ease: "linear" }}>
                    {showComplete ? "🏆" : "⏰"}
                  </motion.span>
                  <h4 className="mt-4 font-display text-2xl font-bold text-dark">
                    {showComplete ? "Math Whiz!" : "Time's Up!"}
                  </h4>
                  <p className="mt-2 font-body text-lg text-gray">Score: {score}</p>
                  <p className="font-display text-sm text-green">{correct}/{total} correct</p>
                  {correct > 0 && (
                    <p className="font-body text-xs text-gray/60">{Math.round(correct / Math.max(total, 1) * 100)}% accuracy</p>
                  )}
                  <Button variant="yellow" className="mt-6" onClick={startGame}>
                    <Trophy className="mr-2 h-4 w-4" /> Play Again
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
