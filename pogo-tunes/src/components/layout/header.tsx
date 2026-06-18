"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNav } from "@/data/content"

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
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
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
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        setIsMobileOpen(false)
      }
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/85 shadow-soft backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="font-display text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-coral">Pogo</span>{" "}
              <span className="text-purple">Tunes</span>
            </motion.span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
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
                    "flex items-center gap-1 rounded-full px-4 py-2 font-display text-sm font-semibold transition-all duration-200",
                    pathname === item.href
                      ? "bg-coral/10 text-coral"
                      : "text-gray hover:bg-cream hover:text-dark",
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openDropdown === item.label && "rotate-180",
                      )}
                    />
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 w-48 overflow-hidden rounded-2xl bg-white p-2 shadow-card"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 font-display text-sm font-semibold text-gray transition-all hover:bg-cream hover:text-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray transition-colors hover:bg-cream hover:text-dark"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray transition-colors hover:bg-cream hover:text-dark md:hidden"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed right-0 top-0 bottom-0 w-72 max-w-full bg-white p-6 shadow-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl font-bold">
                  <span className="text-coral">Pogo</span>{" "}
                  <span className="text-purple">Tunes</span>
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1">
                {mainNav.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => !item.children && setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 font-display text-base font-semibold transition-all",
                        pathname === item.href
                          ? "bg-coral/10 text-coral"
                          : "text-gray hover:bg-cream hover:text-dark",
                      )}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openDropdown === item.label && "rotate-180",
                          )}
                        />
                      )}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-cream pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block rounded-xl px-4 py-2 font-display text-sm text-gray transition-all hover:bg-cream hover:text-dark"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
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
            className="fixed inset-0 z-50 flex items-start justify-center bg-cream/95 backdrop-blur-xl pt-24"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl px-4"
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search songs, ABCs, numbers..."
                  className="w-full rounded-2xl border-2 border-cream-dark bg-white py-4 pl-14 pr-14 font-body text-lg text-dark outline-none transition-all focus:border-coral focus:shadow-glow-coral"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchInputRef.current?.value.trim()) {
                      router.push(`/search?q=${encodeURIComponent(searchInputRef.current.value.trim())}`)
                      setIsSearchOpen(false)
                    }
                  }}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray hover:text-dark"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8">
                <p className="mb-4 font-display text-sm font-semibold text-gray">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {["ABC Song", "Counting", "Animals", "Colors", "Phonics"].map((term) => (
                    <Link
                      key={term}
                      href={`/search?q=${encodeURIComponent(term)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-gray shadow-soft transition-all hover:bg-coral hover:text-white"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
