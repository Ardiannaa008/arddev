// Content sourced from Ardiana's GitHub (Ardiannaa008) and previous portfolio
// (arddevportfolio.netlify.app). Edit freely.

export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  tags: string[]
  github?: string
  live?: string
  /** Screenshot used by the 3D gallery (in /public/previews). */
  preview?: string
  category: "Web" | "Backend" | "Experiment"
  featured?: boolean
}

export type Experience = {
  role: string
  company: string
  period: string
  summary: string
}

const gh = "https://github.com/Ardiannaa008"

export const profile = {
  name: "Ardiana",
  fullName: "Ardiana Ajdari",
  role: "Frontend Developer",
  tagline: "Frontend dev with backend curiosity.",
  location: "",
  contactHref: "https://www.linkedin.com/in/ardiana-dev/",
  contactLabel: "Message me on LinkedIn",
  about: [
    "I'm a frontend developer focused on building clean, fast, responsive and user-friendly web interfaces.",
    "HTML, CSS and JavaScript are my core stack. I'm currently leveling up my React and exploring backend development — always learning something new.",
    "Open to work.",
  ],
  socials: [
    { label: "GitHub", href: gh },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ardiana-dev/" },
    { label: "DEV", href: "https://dev.to/ardiana_ajdari_f4907846ee" },
    { label: "X", href: "https://x.com/ardiana008" },
    { label: "itch.io", href: "https://gummysnarl.itch.io" },
    { label: "Instagram", href: "https://instagram.com/ardianaajdarii" },
  ],
}

export const skills: Record<string, string[]> = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
  "Also exploring": ["Backend", "GDScript", "Game dev"],
  Tools: ["Vite", "Git", "GitHub", "Netlify"],
}

// Journey, based on the previous portfolio's "about" text.
export const experience: Experience[] = [
  {
    role: "Core stack: HTML, CSS & JavaScript",
    company: "Foundation",
    period: "Foundation",
    summary: "Clean, fast, user-friendly web experiences.",
  },
  {
    role: "Leveling up React",
    company: "In progress",
    period: "Now",
    summary: "Building component-driven apps and this portfolio.",
  },
  {
    role: "Exploring backend development",
    company: "Curious",
    period: "Next",
    summary: "Growing from frontend toward full-stack.",
  },
]

export const projects: Project[] = [
  {
    slug: "sitevssite",
    live: "https://sitevssite.vercel.app/",
    preview: "/previews/sitevssite.png",
    category: "Web",
    title: "SITEvsSITE",
    summary: "AI-powered website comparator with a declared winner.",
    description:
      "Enter two URLs and get a side-by-side analysis with scores and a declared winner. Powered by Groq AI.",
    tags: ["HTML", "CSS", "JavaScript", "Groq AI"],
  },
  {
    slug: "devpulse",
    live: "https://devgithubpulse.netlify.app/",
    preview: "/previews/devpulse.png",
    category: "Web",
    title: "DevPulse",
    summary: "A dashboard of data about any GitHub account.",
    description:
      "DevPulse turns a GitHub account into a dashboard: followers, repositories, stars and more, all at a glance.",
    tags: ["JavaScript", "GitHub API"],
  },
  {
    slug: "cutoutfree",
    live: "https://cutoutfree.vercel.app",
    preview: "/previews/cutoutfree.png",
    category: "Web",
    title: "CutOutFree",
    summary: "Free background remover — no signup, no watermarks.",
    description:
      "CutOutFree removes image backgrounds right in the browser. No account, no watermark, no fuss. Built as a free, local-only alternative after Remove.bg announced it was shutting down (see my DEV post).",
    tags: ["JavaScript"],
    github: `${gh}/CutOutFree`,
    featured: true,
  },
  {
    slug: "podwave",
    category: "Web",
    title: "Podwave",
    summary: "AI podcast generator.",
    description: "Podwave is an AI-powered podcast generator built with JavaScript.",
    tags: ["JavaScript", "AI"],
    github: `${gh}/podwave`,
    featured: true,
  },
  {
    slug: "planwyn",
    live: "https://ardiannaa008.github.io/Planwyn/",
    preview: "/previews/planwyn.png",
    category: "Web",
    title: "Planwyn",
    summary: "Organize your tasks, boost productivity and plan your day.",
    description:
      "Planwyn helps you organize your tasks, boost your productivity, and plan your day with ease.",
    tags: ["CSS", "JavaScript"],
    github: `${gh}/Planwyn`,
    featured: true,
  },
  {
    slug: "guessapp",
    live: "https://gummysnarl.itch.io/guessapp",
    category: "Experiment",
    title: "GuessApp",
    summary: "Guess the app by its UI — blurred screenshots, fast rounds.",
    description:
      "A fun, fast-paced game: guess the app by its UI from blurred app screenshots.",
    tags: ["JavaScript", "Game"],
    github: `${gh}/GuessApp`,
  },
  {
    slug: "truth-or-dare",
    live: "https://ardiannaa008.github.io/TruthOrDare/",
    preview: "/previews/truth-or-dare.png",
    category: "Experiment",
    title: "Truth or Dare",
    summary: "Classic Truth or Dare, made digital.",
    description:
      "A simple game where a group of people can play Truth or Dare on one device. There's a GDScript (Godot) version and a JavaScript web version.",
    tags: ["GDScript", "JavaScript", "Game"],
    github: `${gh}/TruthOrDareGame`,
  },
  {
    slug: "starcatcher",
    live: "https://ardiannaa008.github.io/starCatcher/",
    preview: "/previews/starcatcher.png",
    category: "Experiment",
    title: "Star Catcher",
    summary: "A simple game where you catch stars.",
    description: "A small browser game where you catch falling stars.",
    tags: ["JavaScript", "Game"],
    github: `${gh}/starCatcher`,
  },
  {
    slug: "splitsmart",
    live: "https://split-smart0.vercel.app",
    category: "Web",
    title: "SplitSmart",
    summary: "Expense sharing and bill splitting.",
    description: "An expense-sharing application for splitting bills between people.",
    tags: ["JavaScript"],
    github: `${gh}/SplitSmart0`,
  },
  {
    slug: "ai-portfolio-generator",
    live: "https://ardiportfoliogenerator.netlify.app",
    preview: "/previews/ai-portfolio-generator.png",
    category: "Web",
    title: "AI Portfolio Generator",
    summary: "Generate a portfolio website from your GitHub profile.",
    description:
      "A website that generates a stunning portfolio website from your GitHub profile.",
    tags: ["CSS", "JavaScript"],
    github: `${gh}/AIPortofolioGenerator`,
  },
  {
    slug: "m-student-portfolio",
    live: "https://m-student-portfolio.vercel.app",
    preview: "/previews/m-student-portfolio.png",
    category: "Web",
    title: "M-Student Portfolio",
    summary: "Build a mini portfolio and discover other students.",
    description:
      "A place where students can build a mini portfolio and discover others.",
    tags: ["HTML", "CSS"],
    github: `${gh}/M-StudentPortfolio`,
  },
  {
    slug: "unigerma",
    live: "https://ardiannaa008.github.io/Unigerma/",
    preview: "/previews/unigerma.png",
    category: "Web",
    title: "Unigerma",
    summary: "Website for a German language school's courses.",
    description:
      "Official website showcasing German language courses offered by a trusted language school.",
    tags: ["HTML", "CSS"],
    github: `${gh}/Unigerma`,
  },
  {
    slug: "nexatech",
    live: "https://ardinexatech.netlify.app/",
    preview: "/previews/nexatech.png",
    category: "Web",
    title: "NEXATech",
    summary: "A technology company website.",
    description: "A technology website built with HTML and CSS.",
    tags: ["HTML", "CSS"],
    github: `${gh}/NEXATech`,
  },
]
export const roles = [
  "clean interfaces",
  "responsive web apps",
  "small games",
  "useful tools",
]

// Public GitHub numbers at time of writing.
export const stats = [
  { value: 25, suffix: "", label: "GitHub repositories" },
  { value: 37, suffix: "", label: "GitHub followers" },
  { value: 13, suffix: "", label: "Projects showcased" },
  { value: 2, suffix: "", label: "DEV posts" },
]

export const process = [
  { title: "Understand", text: "Get clear on the goal and who it's for." },
  { title: "Design", text: "Sketch a simple, clean layout first." },
  { title: "Build", text: "Write responsive, accessible code." },
  { title: "Refine", text: "Test, polish and keep improving." },
]
