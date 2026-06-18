"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Volume2, Sparkles } from "lucide-react"
import { playChime } from "@/hooks/use-game"

interface LearningPopupProps {
  isOpen: boolean
  onClose: () => void
  emoji: string
  label: string
  phrase: string
  description: string
  color?: string
}

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.85
  utterance.pitch = 1.1
  utterance.volume = 1
  const voices = window.speechSynthesis.getVoices()
  const kidVoice = voices.find((v) => v.name.includes("Google UK") || v.name.includes("Samantha") || v.name.includes("Female"))
  if (kidVoice) utterance.voice = kidVoice
  window.speechSynthesis.speak(utterance)
}

export function LearningPopup({ isOpen, onClose, emoji, label, phrase, description, color }: LearningPopupProps) {
  const handleSpeak = useCallback(() => {
    speak(`${label}! ${phrase}. ${description}`)
  }, [label, phrase, description])

  useEffect(() => {
    if (!isOpen) return
    playChime(523, "sine")
    setTimeout(() => playChime(659, "sine"), 100)
    setTimeout(() => playChime(784, "sine"), 200)
    const timer = setTimeout(() => handleSpeak(), 400)
    return () => { clearTimeout(timer); window.speechSynthesis?.cancel() }
  }, [isOpen, handleSpeak])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleSpeak() }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose, handleSpeak])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Learn about ${label}`}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div
              className="flex flex-col items-center px-8 pb-8 pt-12 text-center"
              style={{ background: color ? `linear-gradient(180deg, ${color}15, #FFF8E7 60%, #FFFFFF)` : undefined }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 250, delay: 0.1 }}
                className="mb-4 flex h-28 w-28 items-center justify-center rounded-3xl text-6xl shadow-float"
                style={{ background: color ? `linear-gradient(135deg, ${color}, ${color}aa)` : "linear-gradient(135deg, #FF6B6B, #FF8E8E)" }}
              >
                {emoji}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <h2 className="font-display text-4xl font-bold text-dark">
                  {label}
                </h2>
                <p className="font-display text-2xl font-bold" style={{ color: color || "var(--color-coral)" }}>
                  {phrase}
                </p>
                <p className="font-body text-base text-gray">
                  {description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex gap-3"
              >
                <button
                  onClick={handleSpeak}
                  className="flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold text-white transition-all hover:shadow-lg active:scale-95"
                  style={{ background: color || "var(--color-coral)" }}
                  aria-label={`Listen to ${label}`}
                >
                  <Volume2 className="h-4 w-4" />
                  Listen
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-display text-sm font-bold text-gray transition-all hover:bg-cream-dark active:scale-95"
                >
                  Close
                </button>
              </motion.div>

              <p className="mt-4 font-body text-xs text-gray/60">Press Space to repeat · Esc to close</p>
            </div>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray shadow-soft transition-all hover:bg-white hover:text-dark"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              className="pointer-events-none absolute -top-8 -right-8 text-4xl opacity-20"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
