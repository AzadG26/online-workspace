"use client"

import { motion } from "framer-motion"

export default function DMCAPage() {
  return (
    <section className="bg-gradient-to-b from-cream to-white pt-24 pb-16 md:pt-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-dark md:text-5xl"
        >
          DMCA <span className="text-gradient-coral">Policy</span>
        </motion.h1>
        <div className="mt-8 space-y-6 font-body text-gray leading-relaxed">
          <p>Pogo Tunes respects the intellectual property rights of others and expects our users to do the same.</p>
          <h2 className="font-display text-xl font-bold text-dark">Copyright Infringement</h2>
          <p>If you believe that any content on our website infringes your copyright, please contact us with the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your contact information (name, address, email, phone)</li>
            <li>Description of the copyrighted work you claim has been infringed</li>
            <li>URL or location of the infringing material on our site</li>
            <li>A statement that you have a good faith belief the use is not authorized</li>
            <li>A statement under penalty of perjury that your notice is accurate</li>
            <li>Your physical or electronic signature</li>
          </ul>
          <h2 className="font-display text-xl font-bold text-dark">Contact</h2>
          <p>Send DMCA notices to: support@pogotunes.com</p>
          <p>We will respond to all valid DMCA notices and remove infringing content promptly.</p>
        </div>
      </div>
    </section>
  )
}
