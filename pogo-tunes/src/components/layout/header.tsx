"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, ChevronDown, Sparkles, Home, BookOpen, Gamepad2, Brain, Palette, Music, PenTool, GraduationCap, Trophy, Calculator } from "lucide-react"
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
  Progress: <Trophy className="h-3.5 w-3.5" />,
  Worksheets: <PenTool className="h-3.5 w-3.5" />,
  Blog: <BookOpen className="h-3.5 w-3.5" />,
}

const primaryNav = mainNav.filter(item => ["Home", "Videos", "Games"].includes(item.label))
const learnItem = mainNav.find(item => item.label === "Learn")
const extraNav = mainNav.filter(item => !["Home", "Videos", "Games", "Learn"].includes(item.label))

const searchTerms = ["ABC Song", "Counting", "Animals", "Colors", "Phonics", "Games", "Shapes"]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setOpenDropdown(null)
    setIsMoreOpen(false)
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
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 shadow-[0_1px_30px_-8px_rgba(0,0,0,0.08)] backdrop-blur-xl border-b border-white/20"
            : "bg-white/95 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-18">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-purple shadow-glow-coral">
              <span className="text-base font-bold text-white">P</span>
            </div>
            <span className="font-display text-lg font-bold tracking-tight md:text-xl">
              <span className="bg-gradient-to-r from-coral to-coral-dark bg-clip-text text-transparent">Pogo</span>{" "}
              <span className="bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">Tunes</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-2xl px-3.5 py-2 font-display text-sm font-semibold transition-all duration-200",
                  pathname === item.href
                    ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark"
                    : "text-gray/70 hover:bg-cream/80 hover:text-dark",
                )}
              >
                {navIcons[item.label]}
                {item.label}
              </Link>
            ))}

            {learnItem && (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("Learn")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 rounded-2xl px-3.5 py-2 font-display text-sm font-semibold transition-all duration-200",
                    pathname.startsWith("/abc") || pathname.startsWith("/hindi") || pathname.startsWith("/counting") || pathname.startsWith("/colors") || pathname.startsWith("/animals") || pathname.startsWith("/shapes") || pathname.startsWith("/phonics")
                      ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark"
                      : "text-gray/70 hover:bg-cream/80 hover:text-dark",
                  )}
                >
                  Learn
                  <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", openDropdown === "Learn" && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openDropdown === "Learn" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 mt-1.5 w-48 -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl"
                    >
                      {learnItem.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 rounded-xl px-3 py-2 font-display text-sm font-semibold transition-all duration-150",
                            pathname === child.href
                              ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark"
                              : "text-gray/70 hover:bg-cream/80 hover:text-dark",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 rounded-2xl px-3.5 py-2 font-display text-sm font-semibold text-gray/70 transition-all hover:bg-cream/80 hover:text-dark"
              >
                More
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isMoreOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1.5 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl"
                  >
                    {extraNav.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-xl px-3 py-2 font-display text-sm font-semibold transition-all duration-150",
                          pathname === item.href || (item.label === "Progress" && pathname === "/progress")
                            ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark"
                            : "text-gray/70 hover:bg-cream/80 hover:text-dark",
                        )}
                      >
                        {navIcons[item.label] && <span className="text-gray/50">{navIcons[item.label]}</span>}
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray/50 transition-all hover:bg-cream/80 hover:text-dark"
              aria-label="Open search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray/50 transition-all hover:bg-cream/80 hover:text-dark md:hidden"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed right-0 top-0 bottom-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <span className="font-display text-base font-bold text-dark">Menu</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-cream/50 text-gray/50"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-4">
                <div className="space-y-0.5">
                  {mainNav.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => !item.children && setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-2.5 font-display text-sm font-semibold transition-all",
                          pathname === item.href
                            ? "bg-gradient-to-r from-coral/10 to-purple/10 text-dark"
                            : "text-gray/70 hover:bg-cream/60 hover:text-dark",
                        )}
                      >
                        {navIcons[item.label] && <span className="text-gray/40">{navIcons[item.label]}</span>}
                        {item.label}
                        {item.children && (
                          <ChevronDown
                            className={cn("ml-auto h-3.5 w-3.5 text-gray/30 transition-transform", openDropdown === item.label && "rotate-180")}
                          />
                        )}
                      </Link>
                      {item.children && (
                        <div className="ml-5 mt-0.5 space-y-0.5 border-l border-cream pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={cn(
                                "flex items-center gap-2 rounded-xl px-3 py-2 font-display text-xs font-semibold transition-all",
                                pathname === child.href
                                  ? "bg-gradient-to-r from-coral/5 to-purple/5 text-dark"
                                  : "text-gray/60 hover:bg-cream/50",
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
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-md pt-24"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg px-4"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray/30" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search songs, ABCs, numbers, games..."
                    className="w-full border-b border-gray-50 bg-transparent py-4 pl-11 pr-11 font-body text-base text-dark outline-none placeholder:text-gray/30"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchInputRef.current?.value.trim()) {
                        router.push(`/search?q=${encodeURIComponent(searchInputRef.current.value.trim())}`)
                        setIsSearchOpen(false)
                      }
                    }}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-cream/50 text-gray/30 hover:bg-coral/10 hover:text-coral transition-all"
                    aria-label="Close search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="mb-2.5 font-display text-[11px] font-bold uppercase tracking-widest text-gray/40">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {searchTerms.map((term) => (
                      <Link
                        key={term}
                        href={`/search?q=${encodeURIComponent(term)}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="rounded-full bg-cream/50 px-3.5 py-1.5 font-display text-xs font-semibold text-gray/60 transition-all hover:bg-gradient-to-r hover:from-coral hover:to-purple hover:text-white"
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
