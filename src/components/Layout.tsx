import { useLayoutEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { ScrollProgress } from "@/components/fx"
import { profile } from "@/data/profile"

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative z-10 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
  }`

/** Desktop nav with a pill that slides to the active tab. */
function SlidingNav() {
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false })

  useLayoutEffect(() => {
    const active = navRef.current?.querySelector<HTMLElement>(
      '[aria-current="page"]'
    )
    setPill(
      active
        ? { left: active.offsetLeft, width: active.offsetWidth, visible: true }
        : (p) => ({ ...p, visible: false })
    )
  }, [pathname])

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative hidden items-center gap-1 rounded-full border bg-card/60 p-1 backdrop-blur md:flex"
    >
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-full bg-[var(--brand)] transition-all duration-300 ease-out"
        style={{
          left: pill.left,
          width: pill.width,
          opacity: pill.visible ? 1 : 0,
        }}
      />
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="font-semibold tracking-tight">
            <span className="gradient-text">ard</span>
            <span className="text-muted-foreground">dev</span>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <SlidingNav />
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav
            className="flex flex-col gap-1 border-t px-4 py-3 animate-in fade-in slide-in-from-top-2 md:hidden"
            aria-label="Mobile"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm ${
                    isActive
                      ? "bg-[var(--brand)] text-white"
                      : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main
        key={pathname}
        className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <Outlet />
      </main>

      <footer className="border-t bg-background/50 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}
