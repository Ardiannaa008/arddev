export type Post = {
  slug: string
  title: string
  date: string
  summary: string
  body: string
  /** If set, the post lives elsewhere (e.g. DEV) and the card links out. */
  url?: string
}

const files = import.meta.glob("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function parse(path: string, raw: string): Post {
  const slug = path.split("/").pop()!.replace(/\.md$/, "")
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const meta: Record<string, string> = {}
  let body = raw
  if (match) {
    body = match[2]
    for (const line of match[1].split(/\r?\n/)) {
      const i = line.indexOf(":")
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
    }
  }
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    summary: meta.summary ?? "",
    body,
    url: meta.url,
  }
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))

export function formatDate(date: string) {
  const d = new Date(date)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
}
