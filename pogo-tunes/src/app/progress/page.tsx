"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Gamepad2, Brain, Flame, Star, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"
import { StructuredData } from "@/components/structured-data"
import { breadcrumbSchema } from "@/lib/structured-data"

const floatingIcons = ["🏆", "⭐", "🎯", "✨", "💫", "🌟"]

export default function ProgressPage() {
  const { progress, newAchievement, resetProgress } = useProgress()
  const [showReset, setShowReset] = useState(false)

  const uniqueGames = new Set(progress.gamesPlayed.map(g => g.gameId)).size
  const totalGames = progress.gamesPlayed.length
  const completedGames = progress.gamesPlayed.filter(g => g.completed).length
  const unlockedCount = progress.achievements.filter(a => a.unlockedAt).length
  const bestQuiz = progress.quizResults.reduce((best, q) => Math.max(best, q.total > 0 ? Math.round(q.score / q.total * 100) : 0), 0)

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toDateString()
  }).reverse()

  const dailyActivity = last7Days.map(day => ({
    day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
    active: progress.gamesPlayed.some(g => new Date(g.timestamp).toDateString() === day) || progress.quizResults.some(q => new Date(q.timestamp).toDateString() === day),
    count: progress.gamesPlayed.filter(g => new Date(g.timestamp).toDateString() === day).length + progress.quizResults.filter(q => new Date(q.timestamp).toDateString() === day).length,
  }))

  return (
    <>
      <StructuredData schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Progress", url: "/progress" }])]} />
      <AchievementPopup achievement={newAchievement} />
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow/10 via-cream to-white pt-24 pb-12 md:pt-32">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-15 pointer-events-none"
            style={{ top: `${15 + i * 10}%`, left: `${i % 2 === 0 ? 5 : 92}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            {icon}
          </motion.div>
        ))}
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 150, damping: 20 }} className="font-display text-4xl font-bold text-dark md:text-5xl">
            Your{" "}
            <span className="bg-gradient-to-r from-yellow to-yellow-dark bg-clip-text text-transparent">Progress</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 20 }} className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray">
            Track your learning journey! All stats are saved on this device.
          </motion.p>
        </div>
      </section>

      <Section className="bg-gradient-to-b from-white to-cream">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Star, label: "Total Score", value: progress.totalScore, color: "text-yellow-dark", bg: "bg-yellow/10" },
            { icon: Gamepad2, label: "Games Played", value: totalGames, color: "text-coral", bg: "bg-coral/10" },
            { icon: Brain, label: "Quiz Avg", value: bestQuiz > 0 ? `${bestQuiz}%` : "—", color: "text-purple", bg: "bg-purple/10" },
            { icon: Flame, label: "Day Streak", value: `${progress.streak} days`, color: "text-coral", bg: "bg-coral/5" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.08 }}
              className="group rounded-2xl bg-white/70 p-6 shadow-soft backdrop-blur-xl border border-white/50 transition-all duration-300 hover:shadow-card"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} transition-transform group-hover:scale-110`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-dark">{stat.value}</p>
              <p className="mt-1 font-body text-sm text-gray">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Weekly Activity" subtitle="Your learning this week" className="bg-cream/30">
        <div className="flex items-end justify-center gap-3">
          {dailyActivity.map((d) => (
            <div key={d.day} className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: Math.max(d.count * 20 + 8, 8) }}
                viewport={{ once: true }}
                className={`w-10 rounded-lg transition-all ${
                  d.active ? "bg-gradient-to-t from-yellow to-yellow-dark shadow-glow-yellow" : "bg-gray/20"
                }`}
              />
              <span className="font-display text-xs font-semibold text-gray">{d.day}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={`Achievements (${unlockedCount}/${progress.achievements.length})`} subtitle="Complete tasks to unlock badges" className="bg-white">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {progress.achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.03 }}
              className={`rounded-2xl p-4 text-center transition-all duration-300 ${
                a.unlockedAt
                  ? "bg-white/70 shadow-soft backdrop-blur-xl border border-yellow/30 hover:shadow-card"
                  : "bg-white/30 opacity-40 border border-white/20"
              }`}
            >
              <motion.span
                className="inline-block text-3xl"
                animate={a.unlockedAt ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: a.unlockedAt ? Infinity : 0, duration: 2 }}
              >
                {a.emoji}
              </motion.span>
              <p className="mt-2 font-display text-sm font-bold text-dark">{a.title}</p>
              <p className="font-body text-xs text-gray">{a.description}</p>
              {a.unlockedAt && (
                <p className="mt-1 font-display text-[10px] font-semibold text-yellow-dark">
                  {new Date(a.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Recent Games" subtitle="Your latest activity" className="bg-cream/30">
        {progress.gamesPlayed.length === 0 ? (
          <div className="rounded-2xl bg-white/70 p-8 text-center shadow-soft backdrop-blur-xl border border-white/50">
            <Gamepad2 className="mx-auto h-8 w-8 text-gray/40" />
            <p className="mt-3 font-display text-base font-bold text-gray">No games played yet</p>
            <p className="mt-1 font-body text-sm text-gray/60">Go play some games to see your progress!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...progress.gamesPlayed].reverse().slice(0, 10).map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between rounded-xl bg-white/70 border border-white/50 px-5 py-3 shadow-soft backdrop-blur-xl transition-all hover:shadow-card"
              >
                <div>
                  <p className="font-display text-sm font-bold text-dark">{g.gameTitle}</p>
                  <p className="font-body text-xs text-gray">{new Date(g.timestamp).toLocaleDateString()} {new Date(g.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-coral">+{g.score}</span>
                  {g.completed && <span className="rounded-full bg-green/20 backdrop-blur-sm px-2 py-0.5 font-display text-[10px] font-bold text-green-dark">Done</span>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      <Section className="text-center">
        {!showReset ? (
          <Button variant="outline" onClick={() => setShowReset(true)}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Progress
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="font-display text-sm font-bold text-coral">This will erase all your progress!</p>
            <div className="flex justify-center gap-3">
              <Button variant="coral" onClick={() => { resetProgress(); setShowReset(false) }}>Yes, Reset</Button>
              <Button variant="outline" onClick={() => setShowReset(false)}>Cancel</Button>
            </div>
          </div>
        )}
        <p className="mt-4 font-body text-xs text-gray/40">All data is stored locally on this device using localStorage.</p>
      </Section>
    </>
  )
}
