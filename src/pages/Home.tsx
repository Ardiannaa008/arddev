import { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { PostCard, SectionHeading } from "@/components/Cards"
import {
  CountUp,
  GlowCard,
  Marquee,
  Reveal,
  RotatingWords,
  TiltCard,
} from "@/components/fx"
import {
  experience,
  process,
  profile,
  projects,
  roles,
  skills,
  stats,
} from "@/data/profile"
import { posts } from "@/lib/posts"

const ShaderAnimation = lazy(() =>
  import("@/components/ui/shader-lines").then((m) => ({
    default: m.ShaderAnimation,
  }))
)

const ProjectGallery = lazy(() => import("@/pages/Gallery"))

const cabinet = [
  {
    to: "/projects",
    tab: "Work",
    title: "Selected projects",
    sub: "Projects",
    count: projects.length,
    note: "Web apps, tools & games",
    color: "var(--folder-a)",
    text: "text-white",
    offset: 0,
  },
  {
    to: "/about",
    tab: "About",
    title: "About me",
    sub: "Skills & journey",
    count: Object.values(skills).flat().length,
    note: "Frontend with backend curiosity",
    color: "var(--folder-b)",
    text: "text-white",
    offset: 28,
  },
  {
    to: "/blog",
    tab: "Writing",
    title: "Notes & posts",
    sub: "Blog",
    count: posts.length,
    note: "What I'm learning",
    color: "var(--folder-c)",
    text: "text-white",
    offset: 10,
  },
  {
    to: "/about#contact",
    tab: "Contact",
    title: "Say hello",
    sub: "Links",
    count: profile.socials.length,
    note: "Open to work",
    color: "var(--folder-d)",
    text: "text-[var(--navy)]",
    offset: 38,
  },
]

const gradientButton =
  "border-0 bg-[var(--brand)] text-white hover:brightness-110"

export default function Home() {
  const allSkills = Object.values(skills).flat()

  return (
    <>
      {/* ---------- Folder-tab cover ---------- */}
      <section className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden bg-background text-foreground">
        <div className="absolute inset-0 opacity-80 mix-blend-multiply [filter:invert(1)] dark:opacity-100 dark:mix-blend-normal dark:[filter:none]">
          <Suspense fallback={null}>
            <ShaderAnimation />
          </Suspense>
        </div>
        <div className="hero-tint absolute inset-0" aria-hidden="true" />
        <div className="hero-dim absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-16 pb-36 text-center">
          <p className="animate-in fade-in slide-in-from-bottom-2 text-sm tracking-widest text-muted-foreground uppercase duration-700">
            {profile.role}
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tighter sm:text-7xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            Hi, I'm {profile.name}.
          </h1>
          <p className="mt-4 text-xl text-foreground/90 sm:text-2xl">
            I craft <RotatingWords words={roles} />
          </p>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/projects"
              className={buttonVariants({
                size: "lg",
                className: gradientButton + " h-10 px-5",
              })}
            >
              View projects
            </Link>
            <Link
              to="/about#contact"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className:
                  "h-10 px-5 backdrop-blur",
              })}
            >
              <Mail /> Get in touch
            </Link>
          </div>
        </div>

      </section>

      {/* ---------- Folder cabinet: overlapping folders ---------- */}
      <nav
        aria-label="Sections"
        className="relative z-10 mx-auto -mt-44 max-w-5xl px-4 pt-10 pb-4"
      >
        <ul className="flex flex-col md:min-h-[17rem] md:flex-row md:items-start">
          {cabinet.map((f, i) => (
            <li
              key={f.to}
              className="relative -mt-14 first:mt-0 md:mt-0 md:-ml-10 md:w-[calc((100%+7.5rem)/4)] md:first:ml-0"
              style={{ zIndex: i + 1 }}
            >
              <Link
                to={f.to}
                className="group relative block pt-8 outline-none transition-transform duration-300 ease-out hover:z-50 hover:-translate-y-3 focus-visible:-translate-y-3 md:[margin-top:var(--off)]"
                style={{ ["--off" as string]: `${f.offset}px` }}
              >
                <span
                  className={`absolute top-0 left-4 flex h-9 items-center gap-2 rounded-t-xl px-3 text-xs font-bold tracking-wide uppercase ${f.text}`}
                  style={{ background: f.color }}
                >
                  {f.tab}
                  <span className="rounded-full border border-current/50 px-1.5 py-px text-[10px] leading-none">
                    {String(f.count).padStart(2, "0")}
                  </span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
                <div
                  className={`flex h-48 flex-col rounded-2xl rounded-tl-lg p-5 shadow-[0_-6px_20px_-8px_rgba(0,0,0,0.5)] ring-offset-2 ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring ${f.text}`}
                  style={{ background: f.color }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl leading-tight font-bold">
                      {f.title}
                    </h3>
                    <span className="text-lg font-light opacity-70">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold tracking-wider uppercase opacity-75">
                    {f.sub} · {f.count} {f.count === 1 ? "item" : "items"}
                  </p>
                  <p className="mt-auto text-sm opacity-80">{f.note}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-5xl space-y-24 px-4 py-20">
        {/* ---------- Stats ---------- */}
        <section aria-label="Stats">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <GlowCard className="rounded-xl border bg-card p-5 text-center backdrop-blur-md">
                  <p className="gradient-text text-4xl font-bold">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.label}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- About (tilting card + timeline) ---------- */}
        <section className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading title="About me" />
            <div className="space-y-3 text-muted-foreground">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link
              to="/about"
              className={buttonVariants({
                size: "lg",
                className: gradientButton + " mt-6 h-10 px-5",
              })}
            >
              More about me
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <TiltCard className="rounded-2xl border bg-card p-6 shadow-2xl shadow-black/10 backdrop-blur-md">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Timeline
              </p>
              <ol className="mt-4 space-y-5 border-l border-primary/40 pl-5">
                {experience.map((e) => (
                  <li key={e.role} className="relative">
                    <span className="absolute top-1.5 -left-[26px] size-2.5 rounded-full bg-[var(--brand)] ring-4 ring-background" />
                    <p className="text-xs text-muted-foreground">{e.period}</p>
                    <p className="font-semibold">{e.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.company}
                    </p>
                  </li>
                ))}
              </ol>
            </TiltCard>
          </Reveal>
        </section>

        {/* ---------- Skills ticker ---------- */}
        <section aria-label="Skills">
          <Marquee items={allSkills} />
        </section>

        {/* ---------- Work cabinet ---------- */}
        <section>
          <SectionHeading
            title="Selected work"
            subtitle="A floating gallery of my projects — click any card for details."
            action={{ to: "/projects", label: "All projects" }}
          />
          <Reveal>
            <Suspense
              fallback={
                <div className="flex h-[600px] items-center justify-center rounded-3xl border bg-card text-muted-foreground">
                  Loading gallery…
                </div>
              }
            >
              <ProjectGallery embedded />
            </Suspense>
          </Reveal>
        </section>

        {/* ---------- Process ---------- */}
        <section>
          <SectionHeading title="How I work" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <GlowCard className="h-full rounded-xl border bg-card p-5 backdrop-blur-md">
                  <span className="gradient-text text-3xl font-bold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.text}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------- Writing ---------- */}
        <section>
          <SectionHeading
            title="Latest writing"
            action={{ to: "/blog", label: "All posts" }}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- Contact CTA ---------- */}
        <Reveal>
          {/* A folder, to match the cover: tab on top, big type, link rows */}
          <section aria-label="Contact" className="relative pt-9">
            <span className="absolute top-0 left-6 flex h-9 items-center rounded-t-xl bg-[var(--folder-d)] px-4 text-xs font-bold tracking-wide text-[var(--navy)] uppercase">
              04 · Contact
            </span>
            <div className="grid overflow-hidden rounded-2xl rounded-tl-lg bg-[var(--folder-d)] text-[var(--navy)] md:grid-cols-[1.1fr_1fr]">
              <div className="flex flex-col justify-between gap-12 p-8 sm:p-10">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/25 px-3 py-1 text-xs font-semibold">
                  <span className="size-2 rounded-full bg-emerald-700" />
                  Open to work
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase opacity-70">
                    A project, a question, or just a hi
                  </p>
                  <h2 className="mt-2 text-6xl leading-[0.9] font-black tracking-tighter sm:text-8xl">
                    Say
                    <br />
                    hello.
                  </h2>
                </div>
              </div>
              <ul className="border-t border-black/15 md:border-t-0 md:border-l">
                {[...profile.socials]
                  .sort(
                    (a, b) =>
                      Number(b.label === "LinkedIn") -
                      Number(a.label === "LinkedIn")
                  )
                  .map((s) => (
                    <li key={s.label} className="border-b border-black/15 last:border-b-0">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between px-8 py-5 text-lg font-semibold transition-colors hover:bg-[var(--navy)] hover:text-white"
                      >
                        {s.label}
                        <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  )
}
