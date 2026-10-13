import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "@/components/Layout"
import Home from "@/pages/Home"
import About from "@/pages/About"
import NotFound from "@/pages/NotFound"
import { Projects, ProjectDetail } from "@/pages/Projects"
import { Blog, Post } from "@/pages/Blog"

// Three.js is heavy, so the gallery loads on demand.
const Gallery = lazy(() => import("@/pages/Gallery"))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route
          path="gallery"
          element={
            <Suspense
              fallback={
                <p className="px-4 py-24 text-center text-muted-foreground">
                  Loading gallery…
                </p>
              }
            >
              <Gallery />
            </Suspense>
          }
        />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<Post />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
