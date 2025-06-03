"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, MessageSquare, Send } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible!",
      })

      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Page header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-teal-400 mb-4">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Have questions or need assistance? Reach out to our team.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="bg-black/40 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-teal-400" />
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-black/30 border-gray-700 text-gray-100"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/30 border-gray-700 text-gray-100"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-3 py-2 bg-black/30 border border-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your message here..."
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact information */}
          <div className="bg-black/40 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Mail className="mr-2 h-5 w-5 text-teal-400" />
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-1">Email</h3>
                <p className="text-gray-300">info@nexsoqurity.com</p>
                <p className="text-gray-300 mt-2">support@nexsoqurity.com</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-1">Address</h3>
                <p className="text-gray-300">
                  NexsoQurity Headquarters
                  <br />
                  123 Blockchain Avenue
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
