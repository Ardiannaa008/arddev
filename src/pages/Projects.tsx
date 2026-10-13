import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Code, ExternalLink } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { ProjectCard, SectionHeading, folderColor } from "@/components/Cards"
import { projects } from "@/data/profile"
import NotFound from "@/pages/NotFound"

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

export function Projects() {
  const [active, setActive] = useState("All")
  const shown = projects.filter((p) => active === "All" || p.category === active)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <SectionHeading
        title="Projects"
        subtitle="Things I've built and shipped. Filter the cabinet by folder."
      />
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {categories.map((c) => {
          const on = c === active
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                on
                  ? "border-transparent text-white shadow-md shadow-violet-500/30"
                  : "bg-card text-muted-foreground hover:border-ring hover:text-foreground"
              }`}
              style={on ? { background: folderColor[c] ?? "var(--folder-a)" } : undefined}
            >
              {c}
            </button>
          )
        })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <div
            key={p.slug + active}
            className="animate-in fade-in zoom-in-95 slide-in-from-bottom-3 fill-mode-both duration-500"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <NotFound />

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>
      <span
        className="inline-block rounded-md px-3 py-1 text-xs font-semibold text-white"
        style={{ background: folderColor[project.category] }}
      >
        {project.category}
      </span>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <li key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-8 leading-7">{project.description}</p>
      <div className="mt-8 flex gap-3">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "lg",
              className:
                "h-10 border-0 bg-[var(--brand)] px-5 text-white hover:brightness-110",
            })}
          >
            <ExternalLink /> Live site
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline", className: "h-10 px-5" })}
          >
            <Code /> Source
          </a>
        )}
      </div>
    </article>
  )
}
