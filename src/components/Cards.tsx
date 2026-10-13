import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/data/profile"
import { formatDate, type Post } from "@/lib/posts"
import { GlowCard, Reveal } from "@/components/fx"

export const folderColor: Record<string, string> = {
  Web: "var(--folder-a)",
  Backend: "var(--folder-b)",
  Experiment: "var(--folder-c)",
}

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: { to: string; label: string }
}) {
  return (
    <Reveal className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-2 h-1 w-12 rounded-full bg-[var(--brand)]" />
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {action.label} →
        </Link>
      )}
    </Reveal>
  )
}

/** A manila-folder style card: coloured tab on top, glass body below. */
export function ProjectCard({ project }: { project: Project }) {
  const color = folderColor[project.category] ?? "var(--folder-d)"
  return (
    <Link to={`/projects/${project.slug}`} className="group block pt-7">
      <div className="relative transition-transform duration-300 group-hover:-translate-y-1.5">
        <span
          className="absolute -top-7 left-0 flex h-7 items-center rounded-t-xl px-4 text-xs font-semibold text-white"
          style={{ background: color }}
        >
          {project.category}
        </span>
        <GlowCard className="flex min-h-44 flex-col rounded-xl rounded-tl-none border bg-card p-5 backdrop-blur-md transition-shadow group-hover:shadow-xl group-hover:shadow-violet-500/20">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{project.title}</h3>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            {project.summary}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </GlowCard>
      </div>
    </Link>
  )
}

export function PostCard({ post }: { post: Post }) {
  const className = "group block"
  const Wrapper = ({ children }: { children: ReactNode }) =>
    post.url ? (
      <a href={post.url} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    ) : (
      <Link to={`/blog/${post.slug}`} className={className}>
        {children}
      </Link>
    )
  return (
    <Wrapper>
      <GlowCard className="rounded-xl border bg-card p-5 backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:border-ring">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <time>{formatDate(post.date)}</time>
          {post.url && <span>Read on DEV ↗</span>}
        </div>
        <h3 className="mt-1 font-semibold transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{post.summary}</p>
      </GlowCard>
    </Wrapper>
  )
}
