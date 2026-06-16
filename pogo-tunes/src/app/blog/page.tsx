"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

export default function BlogPage() {
  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Pogo Tunes Blog", "Learning tips, parenting guides, and educational resources for parents and teachers.", "/blog", blogPosts.length),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-purple/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            Pogo Tunes <span className="text-gradient-purple">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Learning tips, parenting guides, and educational resources.
          </motion.p>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8">
            {blogPosts.map((post, i) => (
              <Link key={post.id} href={post.href}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-card md:flex-row"
                >
                  <div className="flex h-48 w-full shrink-0 items-center justify-center bg-gradient-to-br from-coral/10 to-purple/10 md:h-auto md:w-72">
                    <span className="text-6xl opacity-30">📖</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <Badge variant={
                      post.category === "Learning Tips" ? "coral" :
                      post.category === "Child Development" ? "purple" :
                      post.category === "Parenting" ? "sky" : "green"
                    }>
                      {post.category}
                    </Badge>
                    <h2 className="mt-3 font-display text-xl font-bold text-dark group-hover:text-coral transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 font-body text-sm text-gray">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-2 font-body text-xs text-gray">
                        <Calendar className="h-3.5 w-3.5" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1 font-display text-sm font-bold text-coral transition-all group-hover:gap-2">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
