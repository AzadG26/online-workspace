"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Play, RotateCcw, Music, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { playChime } from "@/hooks/use-game"

const NOTES = [
  { note: "C", freq: 261.63, color: "#FF6B6B", label: "Do" },
  { note: "D", freq: 293.66, color: "#FF9F43", label: "Re" },
  { note: "E", freq: 329.63, color: "#FFD93D", label: "Mi" },
  { note: "F", freq: 349.23, color: "#6EE7B7", label: "Fa" },
  { note: "G", freq: 392.00, color: "#6BCBFF", label: "So" },
  { note: "A", freq: 440.00, color: "#B28DFF", label: "La" },
  { note: "B", freq: 493.88, color: "#FF85A1", label: "Ti" },
  { note: "C2", freq: 523.25, color: "#F59E0B", label: "Do" },
]

const SONGS = [
  {
    name: "Twinkle Twinkle",
    notes: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0],
  },
  {
    name: "Happy Song",
    notes: [0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0],
  },
  {
    name: "Up & Down",
    notes: [0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0],
  },
]

export default function MusicMakerPage() {
  const [activeNote, setActiveNote] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const playRef = useRef(false)

  const playNote = useCallback((index: number) => {
    if (playRef.current) return
    playRef.current = true
    const note = NOTES[index]
    playChime(note.freq)
    playChime(note.freq * 1.005, "triangle")
    setActiveNote(index)
    setTimeout(() => {
      setActiveNote(null)
      playRef.current = false
    }, 300)
  }, [])

  const playSong = useCallback(async () => {
    if (isPlaying) return
    setIsPlaying(true)
    const song = SONGS[currentSong]
    for (let i = 0; i < song.notes.length; i++) {
      if (!playRef.current) break
      playNote(song.notes[i])
      await new Promise(r => setTimeout(r, 400))
    }
    setIsPlaying(false)
  }, [isPlaying, currentSong, playNote])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            🎵
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Music <span className="text-gradient-purple">Maker</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Tap the keys to make music! 🎹</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
            {NOTES.map((n, i) => {
              const isActive = activeNote === i
              const keyHeight = 120 + (i % 2 === 0 ? 20 : 0)
              return (
                <motion.button
                  key={n.note}
                  onClick={() => playNote(i)}
                  className="relative flex shrink-0 flex-col items-center justify-end rounded-2xl font-display font-bold text-white transition-all"
                  style={{
                    backgroundColor: n.color,
                    width: 72,
                    height: keyHeight,
                    boxShadow: isActive ? `0 0 30px ${n.color}80` : `0 6px 0 ${n.color}99, 0 8px 20px rgba(0,0,0,0.15)`,
                  }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ y: 4, scale: 0.95 }}
                  animate={isActive ? { y: 4, scale: 0.95 } : { y: 0, scale: 1 }}
                >
                  <motion.span
                    className={`text-lg drop-shadow-md ${isActive ? "scale-125" : ""}`}
                    initial={{ scale: 1 }}
                  >
                    {n.label}
                  </motion.span>
                  <span className="mb-3 text-xs font-bold opacity-60">{n.note}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <span className="font-display text-sm font-semibold text-gray">Play a Song:</span>
            {SONGS.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setCurrentSong(i)}
                className={`rounded-full px-4 py-2 font-display text-sm font-bold transition-all ${
                  currentSong === i ? "bg-purple text-white shadow-md" : "bg-cream text-gray hover:bg-purple/10"
                }`}
              >
                <Music className="mr-1.5 inline h-3.5 w-3.5" />
                {s.name}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <Button variant="purple" onClick={playSong} disabled={isPlaying}>
              {isPlaying ? <span className="animate-pulse">Playing... 🎶</span> : <span className="flex items-center gap-2"><Play className="h-4 w-4" /> Play Song</span>}
            </Button>
            <Button variant="outline" onClick={() => setIsPlaying(false)}>
              <RotateCcw className="mr-2 h-4 w-4" /> Stop
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-3xl bg-gradient-to-br from-purple/5 to-white p-6 shadow-soft"
        >
          <h3 className="font-display text-lg font-bold text-dark">How to Play 🎶</h3>
          <ul className="mt-3 space-y-2 font-body text-sm text-gray">
            <li>🎹 <strong>Tap</strong> any key to play a note</li>
            <li>🎵 Choose a <strong>song</strong> above and press &quot;Play Song&quot; to hear it</li>
            <li>🎼 Try making up your <strong>own melody</strong> by tapping different keys</li>
            <li>🔊 Each key has a different pitch — from low Do to high Do!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
