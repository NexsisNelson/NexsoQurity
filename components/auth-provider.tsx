"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// User interface with essential properties
interface User {
  id: string
  email: string
  name: string
  walletAddress: string
  tokenBalance: number
}

// Auth context type definition
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Protected routes that require authentication
  const protectedRoutes = ["/earn", "/dashboard", "/transactions", "/security", "/profile"]

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("nexsoqurity_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)

    // Redirect if trying to access protected route while not logged in
    if (protectedRoutes.includes(pathname) && !storedUser) {
      router.push("/login?redirect=" + encodeURIComponent(pathname))
    }
  }, [pathname, router])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        walletAddress: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
        tokenBalance: 250,
      }

      setUser(mockUser)
      localStorage.setItem("nexsoqurity_user", JSON.stringify(mockUser))

      // Redirect to the intended page or dashboard
      const redirectUrl = new URLSearchParams(window.location.search).get("redirect")
      router.push(redirectUrl || "/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Google login function
  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email: "user@gmail.com",
        name: "Google User",
        walletAddress: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
        tokenBalance: 250,
      }

      setUser(mockUser)
      localStorage.setItem("nexsoqurity_user", JSON.stringify(mockUser))

      // Redirect to the intended page or dashboard
      const redirectUrl = new URLSearchParams(window.location.search).get("redirect")
      router.push(redirectUrl || "/dashboard")
    } catch (error) {
      console.error("Google login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        walletAddress: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
        tokenBalance: 50, // New users start with 50 tokens
      }

      setUser(mockUser)
      localStorage.setItem("nexsoqurity_user", JSON.stringify(mockUser))

      router.push("/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("nexsoqurity_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
