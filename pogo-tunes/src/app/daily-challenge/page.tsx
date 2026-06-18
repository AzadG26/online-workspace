"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Calendar, Star, Zap, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { playChime, triggerConfetti } from "@/hooks/use-game"

function getDailySeed(): number {
  const now = new Date()
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
}

function getDailyChallenge() {
  const seed = getDailySeed()

  const challenges = [
    {
      type: "quiz",
      emoji: "🧠",
      title: "Trivia Time!",
      question: "How many legs does a spider have?",
      options: ["6", "8", "10", "12"],
      answer: 1,
      points: 20,
    },
    {
      type: "quiz",
      emoji: "🔤",
      title: "Letter Challenge!",
      question: "Which letter comes after 'M' in the alphabet?",
      options: ["L", "N", "O", "K"],
      answer: 1,
      points: 15,
    },
    {
      type: "quiz",
      emoji: "🔢",
      title: "Number Challenge!",
      question: "What is 7 + 5?",
      options: ["10", "11", "12", "13"],
      answer: 2,
      points: 15,
    },
    {
      type: "quiz",
      emoji: "🎨",
      title: "Color Challenge!",
      question: "What color do you get when you mix yellow and blue?",
      options: ["Red", "Green", "Purple", "Orange"],
      answer: 1,
      points: 20,
    },
    {
      type: "quiz",
      emoji: "🐾",
      title: "Animal Challenge!",
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Elephant", "Lion", "Bear"],
      answer: 2,
      points: 15,
    },
    {
      type: "quiz",
      emoji: "🔷",
      title: "Shape Challenge!",
      question: "How many sides does a hexagon have?",
      options: ["4", "5", "6", "7"],
      answer: 2,
      points: 20,
    },
    {
      type: "quiz",
      emoji: "🌍",
      title: "Science Challenge!",
      question: "What planet is closest to the Sun?",
      options: ["Earth", "Venus", "Mars", "Mercury"],
      answer: 3,
      points: 25,
    },
  ]

  const challengeIndex = seed % challenges.length
  return challenges[challengeIndex]
}

export default function DailyChallengePage() {
  const challenge = useMemo(() => getDailyChallenge(), [])
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  const msUntilTomorrow = tomorrow.getTime() - today.getTime()
  const hoursLeft = Math.floor(msUntilTomorrow / 3600000)
  const minutesLeft = Math.floor((msUntilTomorrow % 3600000) / 60000)

  const handleAnswer = (index: number) => {
    if (feedback || completed) return
    setSelected(index)
    setAttempts(a => a + 1)
    if (index === challenge.answer) {
      setFeedback("correct")
      setScore(challenge.points)
      playChime(600)
      setTimeout(() => playChime(800), 150)
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
      setTimeout(() => setCompleted(true), 1200)
    } else {
      setFeedback("wrong")
      playChime(200, "square")
      setTimeout(() => {
        setSelected(null)
        setFeedback(null)
      }, 800)
    }
  }

  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            📅
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Daily <span className="text-gradient-yellow">Challenge</span>
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 font-body text-sm text-gray">
            <Calendar className="h-4 w-4" /> {dateStr}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          {!completed ? (
            <div className="rounded-3xl bg-white p-8 shadow-card text-center">
              <motion.span className="text-6xl" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                {challenge.emoji}
              </motion.span>
              <h3 className="mt-4 font-display text-2xl font-bold text-dark">{challenge.title}</h3>
              <p className="mt-4 font-display text-xl font-bold text-dark">{challenge.question}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => {
                  let btnClass = "bg-cream hover:bg-yellow/20 border-2 border-transparent"
                  if (feedback === "correct" && i === challenge.answer) {
                    btnClass = "bg-green/10 border-green scale-105"
                  } else if (feedback === "wrong" && i === selected) {
                    btnClass = "bg-red/10 border-red"
                  } else if (feedback === "wrong" && i === challenge.answer) {
                    btnClass = "bg-green/10 border-green"
                  }
                  return (
                    <motion.button
                      key={i}
                      className={`rounded-2xl p-5 font-display text-lg font-bold text-dark transition-all ${btnClass}`}
                      onClick={() => handleAnswer(i)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={feedback !== null}
                    >
                      {opt}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray/60">
                <Zap className="h-4 w-4" />
                <span>Worth <strong className="text-yellow-dark">{challenge.points} points</strong></span>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="rounded-3xl bg-white p-8 shadow-card text-center"
            >
              <motion.span className="text-7xl" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
                🏆
              </motion.span>
              <h3 className="mt-4 font-display text-2xl font-bold text-dark">Challenge Complete!</h3>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow/20 px-6 py-3">
                <Star className="h-6 w-6 fill-yellow-dark text-yellow-dark" />
                <span className="font-display text-2xl font-bold text-yellow-dark">+{score} points</span>
              </div>
              <p className="mt-4 font-body text-sm text-gray">Attempts: {attempts}</p>

              <div className="mt-8 rounded-2xl bg-yellow/5 p-4">
                <p className="font-display text-sm font-bold text-dark">Next Challenge In</p>
                <p className="mt-1 font-display text-2xl font-bold text-yellow-dark">
                  {hoursLeft}h {minutesLeft}m
                </p>
              </div>

              <Button variant="yellow" className="mt-6" onClick={() => { setCompleted(false); setFeedback(null); setSelected(null); setAttempts(0) }}>
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-3xl bg-gradient-to-br from-yellow/5 to-white p-6 shadow-soft"
        >
          <h3 className="font-display text-lg font-bold text-dark">How Daily Challenges Work 🌟</h3>
          <ul className="mt-3 space-y-2 font-body text-sm text-gray">
            <li>🆕 A <strong>new challenge</strong> every day</li>
            <li>🎯 <strong>One shot</strong> — but you can retry until you get it right</li>
            <li>⭐ Earn <strong>points</strong> for each correct answer</li>
            <li>🔥 Come back <strong>tomorrow</strong> for a new challenge!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
