"use client"

import { motion } from "framer-motion"

export default function CookiePolicyPage() {
  return (
    <section className="bg-gradient-to-b from-cream to-white pt-24 pb-16 md:pt-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-dark md:text-5xl"
        >
          Cookie <span className="text-gradient-yellow">Policy</span>
        </motion.h1>
        <div className="mt-8 space-y-6 font-body text-gray leading-relaxed">
          <p>Pogo Tunes uses minimal cookies to improve your browsing experience. This policy explains how we use cookies.</p>
          <h2 className="font-display text-xl font-bold text-dark">What Are Cookies</h2>
          <p>Cookies are small text files stored on your device. We only use essential cookies required for the website to function properly.</p>
          <h2 className="font-display text-xl font-bold text-dark">How We Use Cookies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <h2 className="font-display text-xl font-bold text-dark">No Tracking</h2>
          <p>We do not use tracking cookies, advertising cookies, or third-party analytics cookies. Your privacy is important to us.</p>
          <h2 className="font-display text-xl font-bold text-dark">Managing Cookies</h2>
          <p>You can disable cookies in your browser settings, though some site features may not work properly.</p>
        </div>
      </div>
    </section>
  )
}
