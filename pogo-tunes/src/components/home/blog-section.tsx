"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/content"

export function BlogSection() {
  return (
    <Section
      title={<span>Learning <span className="bg-gradient-to-r from-green to-sky bg-clip-text text-transparent">Tips & Resources</span></span>}
      subtitle="Helpful articles for parents and teachers from the Pogo Tunes team."
      className="bg-gradient-to-b from-white to-cream"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post, i) => (
          <Link key={post.id} href={post.href}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative overflow-hidden rounded-2xl bg-white/70 shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-card border border-white/50"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
                <div className="flex h-full items-center justify-center">
                  <span className="text-5xl opacity-30">📖</span>
                </div>
              </div>
              <div className="p-4">
                <Badge variant={
                  post.category === "Learning Tips" ? "coral" :
                  post.category === "Child Development" ? "purple" :
                  post.category === "Parenting" ? "sky" : "green"
                }>
                  {post.category}
                </Badge>
                <h3 className="mt-3 font-display text-sm font-bold text-dark line-clamp-2 transition-colors group-hover:text-coral">
                  {post.title}
                </h3>
                <p className="mt-2 font-body text-xs text-gray line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center gap-2 font-body text-xs text-gray">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green to-sky px-6 py-3 font-display text-sm font-bold text-white shadow-soft transition-all duration-300 hover:shadow-glow-green hover:scale-105"
        >
          Read All Articles <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
