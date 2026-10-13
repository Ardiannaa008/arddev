import { Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { SectionHeading } from "@/components/Cards"
import { experience, profile, skills } from "@/data/profile"

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-14 px-4 py-12">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">About me</h1>
        <div className="mt-6 space-y-4 text-muted-foreground">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Skills" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold">{group}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <li key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Experience" />
        <ol className="space-y-6 border-l pl-6">
          {experience.map((e) => (
            <li key={e.role + e.company} className="relative">
              <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-primary" aria-hidden="true" />
              <p className="text-xs text-muted-foreground">{e.period}</p>
              <h3 className="font-semibold">
                {e.role} · {e.company}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact">
        <SectionHeading title="Contact" subtitle="Want to work together or just say hi?" />
        <a href={profile.contactHref} target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg" })}>
          <Mail /> {profile.contactLabel}
        </a>
        <ul className="mt-6 flex gap-4 text-sm text-muted-foreground">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
