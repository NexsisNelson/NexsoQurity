"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2 } from "lucide-react"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-medium mb-4 text-gray-100">Join the waitlist</h3>

      {isSubmitted ? (
        <div className="bg-black/30 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4 text-center">
          <p className="text-teal-400">Thank you for joining our waitlist!</p>
          <p className="text-gray-300 text-sm mt-2">We'll notify you when we launch.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black/30 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-teal-500"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
