"use client"

import { motion } from "framer-motion"

export default function DisclaimerPage() {
  return (
    <section className="bg-gradient-to-b from-cream to-white pt-24 pb-16 md:pt-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-dark md:text-5xl"
        >
          <span className="text-gradient-purple">Disclaimer</span>
        </motion.h1>
        <div className="mt-8 space-y-6 font-body text-gray leading-relaxed">
          <p>The information provided on Pogo Tunes is for general educational purposes only.</p>
          <h2 className="font-display text-xl font-bold text-dark">Educational Content</h2>
          <p>Our content is designed to supplement, not replace, formal education. Parents and teachers should use their judgment in selecting appropriate content for their children.</p>
          <h2 className="font-display text-xl font-bold text-dark">No Professional Advice</h2>
          <p>Pogo Tunes does not provide professional educational, medical, or psychological advice. Consult qualified professionals for specific concerns.</p>
          <h2 className="font-display text-xl font-bold text-dark">External Links</h2>
          <p>Our site may link to external websites. We are not responsible for the content or practices of third-party sites.</p>
          <h2 className="font-display text-xl font-bold text-dark">Accuracy</h2>
          <p>While we strive for accuracy, we make no warranties about the completeness or reliability of our content.</p>
        </div>
      </div>
    </section>
  )
}
