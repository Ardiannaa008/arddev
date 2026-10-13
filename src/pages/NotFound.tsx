import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Page not found</h1>
      <Link to="/" className={buttonVariants({ size: "lg", className: "mt-8" })}>
        Back home
      </Link>
    </div>
  )
}
