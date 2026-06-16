"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Camera, Globe, PinIcon, ExternalLink, Globe2, BookOpen } from "lucide-react"
import { categories, characters } from "@/data/content"

const socialLinks = [
  { label: "YouTube", icon: Play, href: "https://www.youtube.com/@Pogotunes", color: "hover:text-coral" },
  { label: "Instagram", icon: Camera, href: "https://www.instagram.com/pogo.tunes/", color: "hover:text-purple" },
  { label: "Facebook", icon: Globe, href: "https://www.facebook.com/profile.php?id=61590129552207", color: "hover:text-sky" },
  { label: "Pinterest", icon: PinIcon, href: "https://in.pinterest.com/pogotunes/", color: "hover:text-coral" },
  { label: "Twitter", icon: ExternalLink, href: "https://x.com/pogotunes", color: "hover:text-dark" },
]

const platformLinks = [
  { label: "Main Site", href: "https://pogotunes.netlify.app", icon: Globe2 },
  { label: "Blogger Blog", href: "https://pogotunes.blogspot.com", icon: BookOpen },
]

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Games", href: "/games" },
  { label: "Worksheets", href: "/worksheets" },
  { label: "Flashcards", href: "/flashcards" },
]


const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "DMCA", href: "/dmca" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-cream to-white pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-yellow via-sky via-purple to-green" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-display text-2xl font-bold">
                <span className="text-coral">Pogo</span> <span className="text-purple">Tunes</span>
              </span>
            </Link>
            <p className="mt-4 font-body text-sm text-gray leading-relaxed">
              Making learning fun and accessible for every child. Free educational content for kids worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray shadow-soft transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-dark">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray transition-colors hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-dark">Our Platforms</h4>
            <ul className="mt-4 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-sm text-gray transition-colors hover:text-coral"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-dark">Learning Categories</h4>
            <ul className="mt-4 space-y-3">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.href}
                    className="flex items-center gap-2 font-body text-sm text-gray transition-colors hover:text-coral"
                  >
                    <span>{cat.emoji}</span>
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-dark">Meet Our Characters</h4>
            <ul className="mt-4 space-y-4">
              {characters.map((char) => (
                <li key={char.name} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-soft">
                    {char.emoji}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-dark">{char.name}</p>
                    <p className="font-body text-xs text-gray">{char.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream-dark">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-body text-sm text-gray">
              &copy; {new Date().getFullYear()} Pogo Tunes. All rights reserved. | Made with{" "}
              <span className="text-coral">❤️</span> for kids everywhere
            </p>
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-xs text-gray transition-colors hover:text-coral"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
