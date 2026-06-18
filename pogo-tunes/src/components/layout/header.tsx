"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, ChevronDown, Sparkles, Home, BookOpen, Gamepad2, Brain, Palette, Music, PenTool, GraduationCap, Trophy, Award, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNav } from "@/data/content"

const navIcons: Record<string, React.ReactNode> = {
  Home: <Home className="h-3.5 w-3.5" />,
  Videos: <BookOpen className="h-3.5 w-3.5" />,
  Shorts: <Sparkles className="h-3.5 w-3.5" />,
  Games: <Gamepad2 className="h-3.5 w-3.5" />,
  Quiz: <Brain className="h-3.5 w-3.5" />,
  Math: <Calculator className="h-3.5 w-3.5" />,
  Music: <Music className="h-3.5 w-3.5" />,
  Coloring: <Palette className="h-3.5 w-3.5" />,
  Tracing: <PenTool className="h-3.5 w-3.5" />,
  Words: <BookOpen className="h-3.5 w-3.5" />,
  Spelling: <GraduationCap className="h-3.5 w-3.5" />,
  Opposites: <Award className="h-3.5 w-3.5" />,
  Clock: <Trophy className="h-3.5 w-3.5" />,
  Challenge: <Sparkles className="h-3.5 w-3.5" />,
  Progress: <Trophy className="h-3.5 w-3.5" />,
  Worksheets: <PenTool className="h-3.5 w-3.5" />,
  Blog: <BookOpen className="h-3.5 w-3.5" />,
}

const searchTerms = ["ABC Song", "Counting", "Animals", "Colors", "Phonics", "Games", "Shapes", "Numbers"]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsSearchOpen(false); setIsMobileOpen(false) }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen || isSearchOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen, isSearchOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/80 shadow-[0_1px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-2xl border-b border-white/20"
            : "bg-gradient-to-b from-white/60 to-transparent backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20">
          <Link href="/" className="group flex items-center gap-2.5">
            <motion.div
              className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-purple shadow-glow-coral"
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-lg font-bold text-white drop-shadow-sm">P</span>
              <div className="absolute -top-1 -right-1 h-3 w-3">
                <motion.span
                  className="absolute inset-0 text-[8px]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                >
                  ⭐
                </motion.span>
              </div>
            </motion.div>
            <span className="font-display text-xl font-bold tracking-tight md:text-2xl">
              <span className="bg-gradient-to-r from-coral to-coral-dark bg-clip-text text-transparent">Pogo</span>{" "}
              <span className="bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">Tunes</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-2xl px-3.5 py-2 font-display text-sm font-semibold transition-all duration-200",
                    pathname === item.href
                      ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark shadow-sm"
                      : "text-gray/80 hover:bg-white/60 hover:text-dark hover:shadow-sm",
                  )}
                >
                  {navIcons[item.label]}
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        openDropdown === item.label && "rotate-180",
                      )}
                    />
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-1/2 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/50 bg-white/90 p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                  >
                    <div className="mb-2 px-3 py-1.5">
                      <p className="font-display text-[10px] font-bold uppercase tracking-widest text-gray/40">Learning Topics</p>
                    </div>
                    {item.children.map((child, i) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-semibold transition-all duration-200",
                          pathname === child.href
                            ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark"
                            : "text-gray hover:bg-cream/80 hover:text-dark",
                        )}
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs shadow-soft transition-transform group-hover:scale-110">
                          {["🔤", "🕉️", "🔢", "🎨", "🐾", "🔷", "🔊"][i] || "📚"}
                        </span>
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray/60 transition-all hover:bg-white/80 hover:text-dark hover:shadow-soft md:h-10 md:w-10"
              aria-label="Open search"
            >
              <Search className="h-[18px] w-[18px]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray/60 transition-all hover:bg-white/80 hover:text-dark hover:shadow-soft md:hidden"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed right-0 top-0 bottom-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-coral/5 via-white to-purple/5 px-6 pb-6 pt-20">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-coral/10 to-purple/10 blur-3xl" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl font-bold tracking-tight">
                      <span className="bg-gradient-to-r from-coral to-coral-dark bg-clip-text text-transparent">Pogo</span>{" "}
                      <span className="bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">Tunes</span>
                    </span>
                    <p className="mt-1 font-body text-xs text-gray/60">Learn & Play!</p>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray shadow-soft"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-0.5">
                  {mainNav.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => !item.children && setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-4 py-3 font-display text-base font-semibold transition-all",
                          pathname === item.href
                            ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark"
                            : "text-gray hover:bg-cream/80 hover:text-dark",
                        )}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm shadow-soft">
                          {navIcons[item.label] || "📚"}
                        </span>
                        {item.label}
                        {item.children && (
                          <ChevronDown
                            className={cn("ml-auto h-4 w-4 text-gray/40 transition-transform", openDropdown === item.label && "rotate-180")}
                          />
                        )}
                      </Link>
                      {item.children && (
                        <div className="ml-5 mt-0.5 space-y-0.5 border-l-2 border-cream pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={cn(
                                "flex items-center gap-2 rounded-xl px-4 py-2.5 font-display text-sm font-semibold transition-all",
                                pathname === child.href
                                  ? "bg-gradient-to-r from-coral/5 to-purple/5 text-dark"
                                  : "text-gray hover:bg-cream/60",
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-br from-yellow/5 to-cream p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-dark" />
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-yellow-dark">Daily Challenge</span>
                  </div>
                  <p className="mt-1 font-body text-xs text-gray">New challenge every day!</p>
                  <Link
                    href="/daily-challenge"
                    onClick={() => setIsMobileOpen(false)}
                    className="mt-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow to-yellow-dark px-4 py-1.5 font-display text-xs font-bold text-white"
                  >
                    Play Now →
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-xl pt-28"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: -30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl px-4"
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)]">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray/40" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search songs, ABCs, numbers, games..."
                    className="w-full border-b border-cream bg-transparent py-5 pl-14 pr-14 font-body text-lg text-dark outline-none placeholder:text-gray/30"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchInputRef.current?.value.trim()) {
                        router.push(`/search?q=${encodeURIComponent(searchInputRef.current.value.trim())}`)
                        setIsSearchOpen(false)
                      }
                    }}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl bg-cream/50 text-gray/40 hover:bg-coral/10 hover:text-coral transition-all"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-5">
                  <p className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-gray/40">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {searchTerms.map((term) => (
                      <Link
                        key={term}
                        href={`/search?q=${encodeURIComponent(term)}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="rounded-full bg-cream/60 px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-gradient-to-r hover:from-coral hover:to-purple hover:text-white hover:shadow-md"
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
