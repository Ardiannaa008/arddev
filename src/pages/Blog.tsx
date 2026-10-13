import { Link, useParams } from "react-router-dom"
import Markdown from "react-markdown"
import { ArrowLeft } from "lucide-react"
import { PostCard, SectionHeading } from "@/components/Cards"
import { formatDate, posts } from "@/lib/posts"
import NotFound from "@/pages/NotFound"

export function Blog() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <SectionHeading title="Blog" subtitle="Notes on code and things I learn." />
      <div className="space-y-4">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  )
}

export function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All posts
      </Link>
      <time className="block text-sm text-muted-foreground">
        {formatDate(post.date)}
      </time>
      <h1 className="mt-1 text-4xl font-bold tracking-tight">{post.title}</h1>
      <div className="prose-lite mt-8">
        <Markdown>{post.body}</Markdown>
      </div>
    </article>
  )
}
