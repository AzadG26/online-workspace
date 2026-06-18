"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Heart, Gamepad2, BookOpen, Music, Palette, Brain, Calculator, PenTool, GraduationCap } from "lucide-react"
import { PogoFox, TuniRabbit, BoboBear } from "@/components/icons/characters"

const quickLinks = [
  { label: "ABC Songs", href: "/videos?category=abc-songs" },
  { label: "Counting", href: "/videos?category=counting-numbers" },
  { label: "Phonics", href: "/videos?category=phonics" },
  { label: "Colors", href: "/colors" },
  { label: "Animals", href: "/videos?category=animals" },
  { label: "Shapes", href: "/shapes" },
]

const playLinks = [
  { label: "Memory Match", href: "/games/memory-match" },
  { label: "Alphabet Puzzle", href: "/games/alphabet-puzzle" },
  { label: "Color Sort", href: "/games/color-sort" },
  { label: "Number Match", href: "/games/number-match" },
  { label: "Music Maker", href: "/music" },
  { label: "Math Practice", href: "/math" },
]

const learnLinks = [
  { label: "Tracing", href: "/tracing" },
  { label: "Spelling Bee", href: "/spelling-bee" },
  { label: "Tell Time", href: "/tell-time" },
  { label: "Word Builder", href: "/word-builder" },
  { label: "Opposites", href: "/opposites" },
  { label: "Daily Challenge", href: "/daily-challenge" },
]

const platforms = [
  { label: "YouTube", href: "https://youtube.com/@Pogotunes" },
  { label: "Instagram", href: "https://instagram.com/pogotunes" },
  { label: "Facebook", href: "https://facebook.com/pogotunes" },
  { label: "Twitter / X", href: "https://x.com/pogotunes" },
  { label: "Pinterest", href: "https://pinterest.com/pogotunes" },
  { label: "TikTok", href: "https://tiktok.com/@pogotunes" },
]

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "DMCA", href: "/dmca" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact Us", href: "/contact" },
]

const characters = [
  { icon: PogoFox, name: "Pogo", color: "from-coral to-coral-dark", bg: "bg-gradient-to-br from-coral/20 to-coral/5" },
  { icon: TuniRabbit, name: "Tuni", color: "from-purple to-purple-dark", bg: "bg-gradient-to-br from-purple/20 to-purple/5" },
  { icon: BoboBear, name: "Bobo", color: "from-yellow to-yellow-dark", bg: "bg-gradient-to-br from-yellow/20 to-yellow/5" },
]

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-dark to-dark/95">
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" className="h-full w-full" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#wave-grad)"
            initial={{ translateY: 0 }}
            animate={{ translateY: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#B28DFF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-8">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center justify-center gap-4"
          >
              {characters.map((char, i) => (
                <motion.div
                  key={char.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -6, scale: 1.1 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 shadow-lg backdrop-blur-sm"
                    animate={{ rotate: [0, -5, 5, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 0.5 * i, ease: "easeInOut" }}
                  >
                    <char.icon size={28} className="drop-shadow-lg" />
                  </motion.div>
                  <span className="font-display text-xs font-bold text-white/70">{char.name}</span>
                </motion.div>
              ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-lg font-body text-sm leading-relaxed text-white/50"
          >
            Pogo Tunes makes learning fun with educational songs, games, and activities for toddlers and preschoolers. Free and ad-free — learning through play!
          </motion.p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-coral">
              <Sparkles className="h-3.5 w-3.5" />
              Quick Videos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group font-body text-sm text-white/50 transition-all hover:text-white"
                  >
                    <span className="inline-block transition-transform group-hover:translate-x-1">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-yellow">
              <Gamepad2 className="h-3.5 w-3.5" />
              Play & Learn
            </h3>
            <ul className="space-y-2">
              {playLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group font-body text-sm text-white/50 transition-all hover:text-white"
                  >
                    <span className="inline-block transition-transform group-hover:translate-x-1">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-purple">
              <GraduationCap className="h-3.5 w-3.5" />
              Activities
            </h3>
            <ul className="space-y-2">
              {learnLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group font-body text-sm text-white/50 transition-all hover:text-white"
                  >
                    <span className="inline-block transition-transform group-hover:translate-x-1">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-green">
              <Music className="h-3.5 w-3.5" />
              Follow Us
            </h3>
            <ul className="space-y-2">
              {platforms.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-body text-sm text-white/50 transition-all hover:text-white"
                  >
                    <span className="inline-block transition-transform group-hover:translate-x-1">{link.label}</span>
                    <span className="ml-1.5 opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {legal.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 font-body text-[11px] text-white/30 transition-all hover:bg-white/5 hover:text-white/60"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col items-center gap-3 border-t border-white/5 pt-6 text-center"
        >
          <div className="flex items-center gap-2 text-sm text-white/30">
            <Heart className="h-3.5 w-3.5 text-coral" />
            <span className="font-body">
              Made with love for little learners worldwide
            </span>
            <Heart className="h-3.5 w-3.5 text-coral" />
          </div>
          <p className="font-body text-xs text-white/20">
            © {new Date().getFullYear()} Pogo Tunes. Free educational content for everyone.
          </p>
        </motion.div>
      </div>

      <div className="relative h-1.5 w-full overflow-hidden bg-dark">
        <motion.div
          className="absolute inset-y-0 left-0 w-1/4 rounded-full"
          style={{
            background: "linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCBFF, #B28DFF, #6EE7B7, #FF6B6B)",
            backgroundSize: "200% 100%",
          }}
          animate={{ left: ["-25%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </div>
    </footer>
  )
}
