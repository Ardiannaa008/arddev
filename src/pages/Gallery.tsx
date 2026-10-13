import { Suspense, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Html,
  OrbitControls,
  Stars,
  useCursor,
  useTexture,
} from "@react-three/drei"
import * as THREE from "three"
import { ExternalLink, Code, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { projects, type Project } from "@/data/profile"

type Placed = { project: Project; position: [number, number, number]; rotY: number }

/** Scatter the cards through a box of space with a golden-angle spiral. */
const FRONT: Record<string, { position: [number, number, number]; rotY: number }> = {
  devpulse: { position: [-3.6, -0.3, 7], rotY: 0.12 },
  cutoutfree: { position: [3.8, 0.7, 6.5], rotY: -0.12 },
}

function layout(items: Project[]): Placed[] {
  return items.map((project, i) => {
    const front = FRONT[project.slug]
    if (front) return { project, ...front }
    const angle = i * 2.399963
    const r = 3.2 + (i % 3) * 2.1 + i * 0.25
    return {
      project,
      position: [
        Math.cos(angle) * r * 1.5,
        Math.sin(angle) * r * 0.8,
        ((i * 37) % 7) - 3.5,
      ],
      rotY: -Math.cos(angle) * 0.35,
    }
  })
}

function Card({
  item,
  selected,
  onSelect,
}: {
  item: Placed
  selected: boolean
  onSelect: (p: Project) => void
}) {
  const { project, position, rotY } = item
  const texture = useTexture(project.preview!)
  texture.anisotropy = 8
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  // The canvas only renders on demand, so keep asking for frames while
  // the hover scale is still easing toward its target.
  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const s = hovered || selected ? 1.12 : 1
    g.scale.x = THREE.MathUtils.damp(g.scale.x, s, 8, dt)
    g.scale.y = g.scale.x
    g.scale.z = g.scale.x
    if (Math.abs(g.scale.x - s) > 0.002) state.invalidate()
  })

  return (
      <group
        ref={group}
        position={position}
        rotation={[0, rotY, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(project)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* frame */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[3.5, 2.3, 0.08]} />
          <meshStandardMaterial
            color={hovered || selected ? "#8b5cf6" : "#2a2060"}
            roughness={0.5}
          />
        </mesh>
        {/* screenshot */}
        {/* sits in front of the frame, not on it, so the two never z-fight */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.3, 2.06]} />
          <meshBasicMaterial map={texture} toneMapped={false} color="#c9c9d6" />
        </mesh>
        <Html
          position={[0, -1.55, 0]}
          center
          distanceFactor={9}
          style={{ pointerEvents: "none" }}
        >
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white backdrop-blur">
            {project.title}
          </span>
        </Html>
      </group>
  )
}

export default function Gallery({ embedded = false }: { embedded?: boolean }) {
  const items = useMemo(
    () => layout(projects.filter((p) => p.preview)),
    []
  )
  const [selected, setSelected] = useState<Project | null>(null)
  // When embedded in a scrolling page, only capture the wheel after a click.
  const [zoomOn, setZoomOn] = useState(!embedded)

  return (
    <div
      onPointerDown={() => embedded && setZoomOn(true)}
      onPointerLeave={() => embedded && setZoomOn(false)}
      className={`relative w-full overflow-hidden bg-[var(--navy)] text-white ${
        embedded
          ? "h-[600px] rounded-3xl border"
          : "h-[calc(100vh-4rem)] min-h-[520px]"
      }`}
    >
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 17], fov: 55, near: 1, far: 220 }}
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
        style={{ contain: "paint" }}
        onPointerMissed={() => setSelected(null)}
      >
        <color attach="background" args={["#0a0a1f"]} />
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={80} color="#a78bfa" />
        <Stars radius={70} depth={50} count={3500} factor={4} fade speed={0} />
        <Suspense fallback={null}>
          {items.map((item) => (
            <Card
              key={item.project.slug}
              item={item}
              selected={selected?.slug === item.project.slug}
              onSelect={setSelected}
            />
          ))}
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={5}
          maxDistance={32}
          enableZoom={zoomOn}
          rotateSpeed={0.6}
        />
      </Canvas>

      <div className="pointer-events-none absolute top-5 left-5 max-w-xs sm:left-8">
        {!embedded && (
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Project gallery
          </h1>
        )}
        <p className="mt-1 text-sm text-white/70">
          {embedded
            ? "Drag to look around · Click a card for details · Click, then scroll to zoom"
            : "Drag to look around · Scroll to zoom · Click a card for details"}
        </p>
      </div>

      {selected && (
        <aside
          aria-label={`${selected.title} details`}
          className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/15 bg-[#12122e]/90 p-5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 sm:left-auto sm:w-96"
        >
          <button
            type="button"
            aria-label="Close details"
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
          <span
            className="inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold"
            style={{ background: "var(--folder-a)" }}
          >
            {selected.category}
          </span>
          <h2 className="mt-2 text-xl font-bold">{selected.title}</h2>
          <p className="mt-1 text-sm text-white/75">{selected.summary}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {selected.tags.map((t) => (
              <li
                key={t}
                className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/80"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.live && (
              <a
                href={selected.live}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "h-9 border-0 bg-[var(--brand)] px-4 text-white hover:brightness-110",
                })}
              >
                <ExternalLink /> Live site
              </a>
            )}
            {selected.github && (
              <a
                href={selected.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "h-9 border-white/25 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white",
                })}
              >
                <Code /> Source
              </a>
            )}
            <Link
              to={`/projects/${selected.slug}`}
              className={buttonVariants({
                size: "lg",
                variant: "ghost",
                className: "h-9 px-4 text-white hover:bg-white/10 hover:text-white",
              })}
            >
              Details
            </Link>
          </div>
        </aside>
      )}
    </div>
  )
}
