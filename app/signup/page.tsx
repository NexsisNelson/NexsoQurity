"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Loader2, Check, X } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { signup, loginWithGoogle, isLoading } = useAuth()

  // Password validation
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const passwordsMatch = password === confirmPassword && password !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!hasMinLength || !hasUpperCase || !hasNumber) {
      setError("Please ensure your password meets all requirements.")
      return
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.")
      return
    }

    try {
      await signup(email, password, name)
    } catch (err) {
      setError("Failed to create account. Please try again.")
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle()
    } catch (err) {
      setError("Google signup failed. Please try again.")
    }
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-fuchsia-500">
              Create Account
            </h1>
            <p className="text-gray-400 mt-2">Join NexsoQurity and secure your digital assets</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-black/30 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/30 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/30 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-teal-500"
              />

              <div className="mt-2 space-y-2 text-xs">
                <div className="flex items-center">
                  {hasMinLength ? (
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <X className="h-3 w-3 text-red-500 mr-2" />
                  )}
                  <span className={hasMinLength ? "text-green-500" : "text-gray-400"}>At least 8 characters</span>
                </div>
                <div className="flex items-center">
                  {hasUpperCase ? (
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <X className="h-3 w-3 text-red-500 mr-2" />
                  )}
                  <span className={hasUpperCase ? "text-green-500" : "text-gray-400"}>
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {hasNumber ? (
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <X className="h-3 w-3 text-red-500 mr-2" />
                  )}
                  <span className={hasNumber ? "text-green-500" : "text-gray-400"}>At least one number</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-black/30 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-teal-500"
              />
              {confirmPassword && (
                <div className="flex items-center mt-1 text-xs">
                  {passwordsMatch ? (
                    <Check className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <X className="h-3 w-3 text-red-500 mr-2" />
                  )}
                  <span className={passwordsMatch ? "text-green-500" : "text-red-500"}>
                    Passwords {passwordsMatch ? "match" : "do not match"}
                  </span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 text-white"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Account
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
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full bg-black/30 border-gray-700 text-gray-100 hover:bg-gray-800/50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FcGoogle className="h-5 w-5 mr-2" />}
            Sign up with Google
          </Button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-400 hover:text-teal-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
