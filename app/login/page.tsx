"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, loginWithGoogle, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
    } catch (err) {
      setError("Google login failed. Please try again.")
    }
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-black/40 rounded-lg border border-gray-800 shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-400">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Log in to access your NexsoQurity account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/30 border-gray-700 text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-teal-400 hover:text-teal-300">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/30 border-gray-700 text-gray-100"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-black text-gray-400">or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-black/30 border-gray-700 text-gray-100"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FcGoogle className="h-5 w-5 mr-2" />}
            Sign in with Google
          </Button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-teal-400 hover:text-teal-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
