import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Fades + slides children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

/** Card that tilts toward the pointer in 3D with a moving glare. */
export function TiltCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 14}deg) rotateX(${(0.5 - py) * 14}deg) scale(1.02)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "relative overflow-hidden transition-transform duration-200 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  )
}

/** Wrapper that feeds the pointer position to the `.glow-card` spotlight. */
export function GlowCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  return (
    <div onPointerMove={onMove} className={cn("glow-card", className)}>
      {children}
    </div>
  )
}

/** Counts up to `value` once visible. */
export function CountUp({
  value,
  suffix = "",
}: {
  value: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setN(value)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1400, 1)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

/** Cycles through words with a small slide-in. */
export function RotatingWords({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <span
      key={i}
      className="gradient-text inline-block animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      {words[i]}
    </span>
  )
}

/** Infinite horizontal ticker. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="marquee-wrap overflow-hidden">
      <div className="marquee gap-3">
        {row.map((s, idx) => (
          <span
            key={idx}
            className="mr-3 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Thin violet progress bar tied to page scroll. */
export function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[var(--brand)]"
      style={{ transform: `scaleX(${p})` }}
    />
  )
}
