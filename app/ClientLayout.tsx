"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import AnimatedBackground from "@/components/animated-background"
import { AuthProvider } from "@/components/auth-provider"
import { useAuth } from "@/components/auth-provider"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { Menu, X } from "lucide-react"
import useIntersectionObserver from "@/hooks/use-intersection-observer"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

// Navigation links component
function NavigationLinks() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Helper function for active link styling
  const isActive = (path: string) => {
    return pathname === path ? "text-white border-b-2 border-teal-500" : "text-gray-400 hover:text-white"
  }

  return (
    <>
      <Link href="/" className={`text-sm font-medium ${isActive("/")}`}>
        Home
      </Link>

      {user ? (
        // Links for authenticated users
        <>
          <Link href="/dashboard" className={`text-sm font-medium ${isActive("/dashboard")}`}>
            Dashboard
          </Link>
          <Link href="/earn" className={`text-sm font-medium ${isActive("/earn")}`}>
            Earn
          </Link>
          <Link href="/transactions" className={`text-sm font-medium ${isActive("/transactions")}`}>
            Transactions
          </Link>
          <Link href="/security" className={`text-sm font-medium ${isActive("/security")}`}>
            Security
          </Link>
          <Link href="/profile" className={`text-sm font-medium ${isActive("/profile")}`}>
            Profile
          </Link>
          <Link href="/leaderboards" className={`text-sm font-medium ${isActive("/leaderboards")}`}>
            Leaderboards
          </Link>
          <Button variant="ghost" onClick={logout} className="text-sm font-medium text-gray-400 hover:text-white">
            Logout
          </Button>
        </>
      ) : (
        // Links for unauthenticated users
        <>
          <Link href="/about" className={`text-sm font-medium ${isActive("/about")}`}>
            About
          </Link>
          <Link href="/token" className={`text-sm font-medium ${isActive("/token")}`}>
            Token
          </Link>
          <Link href="/team" className={`text-sm font-medium ${isActive("/team")}`}>
            Team
          </Link>
          <Link href="/roadmap" className={`text-sm font-medium ${isActive("/roadmap")}`}>
            Roadmap
          </Link>
          <Link href="/login" className={`text-sm font-medium ${isActive("/login")}`}>
            Login
          </Link>
          <Link href="/signup" className={`text-sm font-medium ${isActive("/signup")}`}>
            Sign Up
          </Link>
        </>
      )}
    </>
  )
}

// Mobile menu component with improved responsive design
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-menu]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div data-mobile-menu className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-800/50 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />}

      {/* Mobile menu content */}
      <div
        className={`fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            <NavigationLinks />
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the main navigation to be more responsive
function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-60px 0px 0px 0px",
  })

  const pathname = usePathname()
  const [showFooter, setShowFooter] = useState(true)

  // Determine if footer should be shown
  useEffect(() => {
    const hideFooterPaths = ["/login", "/signup"]
    setShowFooter(!hideFooterPaths.includes(pathname))
  }, [pathname])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <AnimatedBackground />

      <nav
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset-top ${
          isIntersecting ? "bg-transparent" : "bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-800/50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Logo size="small" />
              <span className="text-base sm:text-lg font-bold text-teal-400 truncate">NexsoQurity</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <NavigationLinks />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 pt-16 safe-area-inset-bottom">{children}</div>

      {showFooter && <Footer />}
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <RootLayoutContent>{children}</RootLayoutContent>
      </AuthProvider>
    </ThemeProvider>
  )
}
