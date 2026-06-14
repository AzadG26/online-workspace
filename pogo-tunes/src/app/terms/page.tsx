"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <section className="bg-gradient-to-b from-cream to-white pt-24 pb-16 md:pt-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-dark md:text-5xl"
        >
          Terms of <span className="text-gradient-purple">Use</span>
        </motion.h1>
        <div className="mt-8 space-y-6 font-body text-gray leading-relaxed">
          <p>Welcome to Pogo Tunes. By using our website, you agree to these terms of use.</p>
          <h2 className="font-display text-xl font-bold text-dark">Free Access</h2>
          <p>All content on Pogo Tunes is provided free of charge. No registration or payment is required.</p>
          <h2 className="font-display text-xl font-bold text-dark">Educational Purpose</h2>
          <p>Our content is intended for educational purposes. Parents and teachers should supervise children&apos;s use of the platform.</p>
          <h2 className="font-display text-xl font-bold text-dark">Content Use</h2>
          <p>You may use our content for personal, non-commercial educational purposes. Redistribution or commercial use requires our permission.</p>
        </div>
      </div>
    </section>
  )
}
