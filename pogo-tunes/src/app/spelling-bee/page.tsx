"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, Volume2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameTimer, useGameScore, triggerConfetti, playChime } from "@/hooks/use-game"

const WORDS = [
  { word: "cat", hint: "🐱 A furry pet", level: 1 },
  { word: "dog", hint: "🐶 A barking friend", level: 1 },
  { word: "sun", hint: "☀️ It shines in the sky", level: 1 },
  { word: "red", hint: "🔴 The color of an apple", level: 1 },
  { word: "big", hint: "🐘 Not small", level: 1 },
  { word: "fish", hint: "🐟 It swims in water", level: 2 },
  { word: "bird", hint: "🐦 It has wings", level: 2 },
  { word: "moon", hint: "🌙 You see it at night", level: 2 },
  { word: "star", hint: "⭐ It twinkles", level: 2 },
  { word: "tree", hint: "🌳 It has leaves", level: 2 },
  { word: "apple", hint: "🍎 A red fruit", level: 3 },
  { word: "happy", hint: "😊 Feeling good", level: 3 },
  { word: "water", hint: "💧 You drink it", level: 3 },
  { word: "music", hint: "🎵 You sing it", level: 3 },
  { word: "house", hint: "🏠 You live in it", level: 3 },
  { word: "garden", hint: "🌸 Flowers grow here", level: 4 },
  { word: "planet", hint: "🌍 Earth is one", level: 4 },
  { word: "school", hint: "📚 You learn here", level: 4 },
  { word: "animal", hint: "🐾 A living creature", level: 4 },
  { word: "rainbow", hint: "🌈 Colorful arc in the sky", level: 5 },
]

export default function SpellingBeePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [hintRevealed, setHintRevealed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timer = useGameTimer(180)
  const score = useGameScore()

  const currentWord = WORDS[currentIndex]

  const startGame = useCallback(() => {
    setCurrentIndex(0)
    setInput("")
    setFeedback(null)
    setCompleted(false)
    setHintRevealed(false)
    score.reset()
    timer.reset(180)
    timer.start()
    setStarted(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [score, timer])

  const speakWord = useCallback(() => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(currentWord.word)
      utter.rate = 0.5
      utter.pitch = 1.1
      speechSynthesis.cancel()
      speechSynthesis.speak(utter)
      setTimeout(() => {
        const slow = new SpeechSynthesisUtterance(currentWord.word.split("").join("... "))
        slow.rate = 0.4
        slow.pitch = 1.2
        speechSynthesis.speak(slow)
      }, 800)
    }
  }, [currentWord])

  const checkAnswer = useCallback(() => {
    if (feedback || !input.trim()) return
    if (input.trim().toLowerCase() === currentWord.word) {
      setFeedback("correct")
      score.addPoints(currentWord.level * 5)
      playChime(600)
      setTimeout(() => playChime(800), 150)
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
      setTimeout(() => {
        if (currentIndex >= WORDS.length - 1) {
          timer.stop()
          score.complete()
          setCompleted(true)
        } else {
          setCurrentIndex(i => i + 1)
          setInput("")
          setFeedback(null)
          setHintRevealed(false)
          setTimeout(() => inputRef.current?.focus(), 100)
        }
      }, 1200)
    } else {
      setFeedback("wrong")
      score.incrementMoves()
      playChime(200, "square")
      setTimeout(() => {
        setFeedback(null)
        setInput("")
        setHintRevealed(true)
        inputRef.current?.focus()
      }, 1000)
    }
  }, [feedback, input, currentWord, currentIndex, score, timer])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") checkAnswer()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            🐝
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Spelling <span className="text-gradient-green">Bee</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Listen to the word and spell it correctly!</p>
        </div>

        {!started ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 text-center">
            <p className="font-display text-lg font-bold text-dark">Spell {WORDS.length} words to win! 🏆</p>
            <p className="mt-2 font-body text-sm text-gray/60">5 difficulty levels — from easy 3-letter words to challenging ones!</p>
            <Button variant="green" size="lg" className="mt-8" onClick={startGame}>
              Start Spelling!
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-cream/50 p-4">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-green-dark">
                <Star className="h-4 w-4 fill-current" /> {score.score.score}
              </span>
              <span className="font-display text-sm font-bold text-sky">⏱ {timer.timeLeft}s</span>
              <span className="font-display text-sm font-bold text-gray">
                Word {currentIndex + 1}/{WORDS.length}
                <span className="ml-2 text-xs text-gray/60">Level {currentWord.level}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={startGame}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-8 shadow-card text-center">
              <motion.div
                key={currentWord.word}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <button
                  onClick={speakWord}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green to-green-dark text-white shadow-lg hover:scale-110 transition-all"
                >
                  <Volume2 className="h-8 w-8" />
                </button>
                <p className="mt-3 font-display text-sm font-bold text-green">Tap to hear the word</p>
              </motion.div>

              {hintRevealed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 font-display text-lg text-gray"
                >
                  Hint: {currentWord.hint}
                </motion.p>
              )}

              <div className="mt-8">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type the word here..."
                  className={`w-full rounded-2xl border-2 bg-white px-6 py-4 text-center font-display text-3xl font-bold text-dark outline-none transition-all ${
                    feedback === "correct" ? "border-green bg-green/5" :
                    feedback === "wrong" ? "border-coral bg-coral/5" :
                    "border-cream-dark focus:border-green focus:shadow-glow-green"
                  }`}
                  disabled={feedback !== null}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {currentWord.word.split("").map((_, i) => {
                  const letter = input[i] || ""
                  const correct = currentWord.word[i]
                  const isFilled = input.length > i
                  return (
                    <div
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold transition-all ${
                        feedback === "correct" ? "bg-green/20 text-green-dark" :
                        feedback === "wrong" && isFilled && letter !== correct ? "bg-coral/20 text-coral" :
                        isFilled ? "bg-purple/20 text-purple-dark" : "bg-cream text-gray/40"
                      }`}
                    >
                      {isFilled ? letter : "_"}
                    </div>
                  )
                })}
              </div>

              <Button
                variant="green"
                size="lg"
                className="mt-6"
                onClick={checkAnswer}
                disabled={!input.trim() || feedback !== null}
              >
                {feedback === "correct" ? "✓ Correct!" : feedback === "wrong" ? "Try Again" : "Check Spelling"}
                {!feedback && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {(timer.timeLeft <= 0 || completed) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-2xl bg-white p-8 text-center shadow-card">
                  <motion.span className="text-6xl" animate={completed ? { rotate: 360 } : {}} transition={{ repeat: completed ? Infinity : 0, duration: 3, ease: "linear" }}>
                    {completed ? "🏆" : "⏰"}
                  </motion.span>
                  <h4 className="mt-4 font-display text-2xl font-bold text-dark">
                    {completed ? "Spelling Champion!" : "Time's Up!"}
                  </h4>
                  <p className="mt-2 font-body text-lg text-gray">Score: {score.score.score}</p>
                  <p className="font-body text-sm text-gray/60">Words: {currentIndex}/{WORDS.length}</p>
                  <Button variant="green" className="mt-6" onClick={startGame}>
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
