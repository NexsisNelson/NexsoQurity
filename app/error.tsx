"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/20">
        <div className="bg-red-500/20 p-4 flex items-center border-b border-white/10">
          <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
          <h2 className="text-lg font-semibold text-white">Something went wrong</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-4">
            We encountered an error while loading this page. Please try again or return to the homepage.
          </p>

          {error.message && process.env.NODE_ENV === "development" && (
            <div className="mb-4 p-3 bg-white/5 rounded-md border border-white/10">
              <p className="text-sm font-mono text-gray-300">{error.message}</p>
              {error.digest && <p className="text-xs text-gray-400 mt-1">Error ID: {error.digest}</p>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button onClick={reset} className="bg-teal-600 hover:bg-teal-700 text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>

            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
