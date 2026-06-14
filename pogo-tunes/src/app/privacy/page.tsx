"use client"

import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <section className="bg-gradient-to-b from-cream to-white pt-24 pb-16 md:pt-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-dark md:text-5xl"
        >
          Privacy <span className="text-gradient-coral">Policy</span>
        </motion.h1>
        <div className="mt-8 space-y-6 font-body text-gray leading-relaxed">
          <p>At Pogo Tunes, we take your privacy seriously. This policy describes how we collect, use, and protect your information.</p>
          <h2 className="font-display text-xl font-bold text-dark">Information We Collect</h2>
          <p>We do not collect any personal information from children. Our platform is designed to be used without creating an account or providing any personal data.</p>
          <h2 className="font-display text-xl font-bold text-dark">Cookies</h2>
          <p>We use minimal cookies necessary for the website to function properly. We do not use tracking cookies or third-party advertising cookies.</p>
          <h2 className="font-display text-xl font-bold text-dark">Third-Party Services</h2>
          <p>We may embed YouTube videos on our platform. YouTube may set cookies when you watch these videos. We encourage you to review YouTube&apos;s privacy policy.</p>
          <h2 className="font-display text-xl font-bold text-dark">Contact</h2>
          <p>If you have any questions about this privacy policy, please contact us at support@pogotunes.com.</p>
        </div>
      </div>
    </section>
  )
}
