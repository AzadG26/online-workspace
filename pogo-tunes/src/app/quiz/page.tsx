"use client"

import { motion } from "framer-motion"
import { QuizEngine } from "@/components/quiz-engine"
import { Sparkles } from "lucide-react"

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/5 via-cream to-white pt-24">
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            Fun <span className="text-gradient-coral">Quiz</span>
            <Sparkles className="ml-2 inline h-8 w-8 text-yellow" />
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray">
            Answer questions and earn points!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-3xl bg-white p-6 shadow-card md:p-10"
        >
          <QuizEngine />
        </motion.div>
      </div>
    </div>
  )
}
