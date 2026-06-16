"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getBlogPost, getRelatedPosts } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { articleSchema, blogPostingSchema, breadcrumbSchema } from "@/lib/structured-data"

function BlogPostContent() {
  const params = useParams()
  const slug = params.slug as string
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <div className="flex flex-col items-center py-20">
        <span className="text-6xl">📖</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-dark">Post Not Found</h1>
        <p className="mt-2 font-body text-gray">This blog post doesn&apos;t exist.</p>
        <Link href="/blog" className="mt-6 font-display text-coral font-bold hover:underline">
          ← Back to Blog
        </Link>
      </div>
    )
  }

  const related = getRelatedPosts(post.relatedPosts)

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <StructuredData
        schema={[
          articleSchema(post),
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.id}` },
          ]),
        ]}
      />
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-gray hover:text-coral transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-coral/10 to-purple/10 p-8 md:p-12">
          <Badge variant="coral">{post.category}</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold text-dark md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-body text-sm text-gray">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" /> {post.author}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {post.content.map((paragraph, i) => {
            if (paragraph.startsWith("# ")) {
              return <h2 key={i} className="font-display text-2xl font-bold text-dark">{paragraph.replace("# ", "")}</h2>
            }
            if (paragraph.startsWith("- ")) {
              return <li key={i} className="ml-6 font-body text-gray list-disc">{paragraph.replace("- ", "")}</li>
            }
            if (/^\d+\./.test(paragraph)) {
              const [num, ...rest] = paragraph.split(". ")
              return (
                <div key={i} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/10 font-display text-sm font-bold text-coral">{num}</span>
                  <p className="font-body text-gray pt-1">{rest.join(". ")}</p>
                </div>
              )
            }
            return <p key={i} className="font-body text-lg leading-relaxed text-gray">{paragraph}</p>
          })}
        </div>
      </motion.article>

      {related.length > 0 && (
        <div className="mt-16 border-t border-cream pt-10">
          <h2 className="font-display text-2xl font-bold text-dark">Related Posts</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-cream p-6 shadow-soft transition-all hover:shadow-card"
                >
                  <Badge variant="coral">{r.category}</Badge>
                  <h3 className="mt-3 font-display text-lg font-bold text-dark">{r.title}</h3>
                  <p className="mt-2 font-body text-sm text-gray line-clamp-2">{r.content[0]}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple/5 via-cream to-white pt-24">
      <BlogPostContent />
    </div>
  )
}
