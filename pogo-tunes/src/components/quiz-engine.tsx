"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Sparkles, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { quizQuestions, type QuizQuestion } from "@/data/content"
import { playChime, triggerConfetti } from "@/hooks/use-game"

const CATEGORIES = ["All", ...new Set(quizQuestions.map((q) => q.category))]
const QUESTIONS_PER_ROUND = 5

export function QuizEngine() {
  const [started, setStarted] = useState(false)
  const [category, setCategory] = useState("All")
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [answered, setAnswered] = useState<boolean[]>([])
  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  const filteredQuestions = useMemo(() => {
    const pool = category === "All" ? quizQuestions : quizQuestions.filter((q) => q.category === category)
    return [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_ROUND)
  }, [category])

  const startQuiz = useCallback(() => {
    setQuestions(filteredQuestions)
    setCurrentQ(0)
    setScore(0)
    setSelected(null)
    setFeedback(null)
    setAnswered([])
    setStarted(true)
  }, [filteredQuestions])

  const handleAnswer = (index: number) => {
    if (feedback !== null) return
    setSelected(index)
    const correct = index === questions[currentQ].correctIndex
    if (correct) {
      playChime(523, "sine")
      setFeedback("correct")
      setScore((s) => s + 10)
    } else {
      playChime(150, "sawtooth")
      setFeedback("wrong")
    }
    setTimeout(() => {
      setAnswered((prev) => [...prev, correct])
      setSelected(null)
      setFeedback(null)
      if (currentQ + 1 >= questions.length) {
        const finalScore = score + (correct ? 10 : 0)
        if (finalScore === questions.length * 10) {
          triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
        }
      }
      setCurrentQ((prev) => prev + 1)
    }, 1200)
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center py-12">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6 text-6xl">
          ❓
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-dark">Quiz Time!</h3>
        <p className="mt-2 font-body text-gray text-center max-w-md">
          Test your knowledge with fun questions!
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2 font-display text-sm font-bold transition-all ${
                category === cat ? "bg-coral text-white shadow-glow-coral" : "bg-cream text-gray hover:bg-coral/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <Button variant="coral" size="lg" className="mt-6" onClick={startQuiz}>
          Start Quiz
        </Button>
      </div>
    )
  }

  const isComplete = currentQ >= questions.length
  const correctCount = answered.filter(Boolean).length

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-coral/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Score</p>
            <p className="font-display text-lg font-bold text-coral">{score}</p>
          </div>
          <div className="rounded-xl bg-purple/10 px-4 py-2 text-center">
            <p className="font-display text-xs text-gray">Question</p>
            <p className="font-display text-lg font-bold text-purple">{Math.min(currentQ + 1, questions.length)} / {questions.length}</p>
          </div>
        </div>
        <button
          onClick={() => setStarted(false)}
          className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-coral/10 hover:text-coral"
        >
          <RotateCcw className="h-4 w-4" /> New Quiz
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }} className="mb-4 text-6xl">
              {correctCount === questions.length ? "🏆" : "🎉"}
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-dark">Quiz Complete!</h3>
            <p className="mt-2 font-body text-gray">
              You got {correctCount} out of {questions.length} correct!
            </p>
            <div className="mt-4 flex gap-1">
              {answered.map((correct, i) => (
                <span key={i} className={`text-lg ${correct ? "text-green" : "text-coral"}`}>
                  {correct ? "✓" : "✗"}
                </span>
              ))}
            </div>
            <Button variant="coral" className="mt-6" onClick={() => setStarted(false)}>
              Try Again <Sparkles className="h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-5xl">{questions[currentQ].emoji}</span>
            <h3 className="font-display text-xl font-bold text-dark text-center">
              {questions[currentQ].question}
            </h3>
            <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
              {questions[currentQ].options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: feedback ? 1 : 1.03 }}
                  whileTap={{ scale: feedback ? 1 : 0.97 }}
                  onClick={() => handleAnswer(i)}
                  disabled={feedback !== null}
                  className={`rounded-2xl px-6 py-4 font-display text-lg font-bold shadow-soft transition-all ${
                    feedback === "correct" && selected === i
                      ? "bg-green text-white scale-105"
                      : feedback === "wrong" && selected === i
                        ? "bg-coral text-white"
                        : feedback && i === questions[currentQ].correctIndex
                          ? "bg-green/20 text-green-dark border-2 border-green"
                          : "bg-white text-dark hover:shadow-card"
                  }`}
                >
                  <span className="mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </motion.button>
              ))}
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
                  <span className="font-display font-bold text-coral">
                    The answer was: {questions[currentQ].options[questions[currentQ].correctIndex]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full transition-all ${
                    i < currentQ
                      ? answered[i] ? "bg-green" : "bg-coral"
                      : i === currentQ
                        ? "bg-purple"
                        : "bg-gray-light"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
