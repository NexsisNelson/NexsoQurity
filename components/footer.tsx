"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Send,
  Shield,
  Coins,
  Users,
  FileText,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  Globe,
  Heart,
} from "lucide-react"
import Logo from "@/components/logo"

/**
 * Footer Component
 *
 * A comprehensive footer component that includes:
 * - Company branding and social media links
 * - Navigation sections for different parts of the platform
 * - Newsletter subscription functionality
 * - Contact information
 * - Legal links and copyright information
 *
 * Features:
 * - Fully responsive design
 * - Accessible navigation
 * - Interactive elements with hover effects
 * - Newsletter subscription form
 * - Social media integration
 */
const Footer = React.memo(() => {
  // State for newsletter subscription
  const [email, setEmail] = React.useState("")
  const [isSubscribing, setIsSubscribing] = React.useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = React.useState<"idle" | "success" | "error">("idle")

  /**
   * Handle newsletter subscription form submission
   * @param e - Form event
   */
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email || !email.includes("@")) {
      setSubscriptionStatus("error")
      return
    }

    setIsSubscribing(true)

    try {
      // Simulate API call for newsletter subscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Newsletter subscription:", email)
      setEmail("")
      setSubscriptionStatus("success")

      // Reset status after 3 seconds
      setTimeout(() => setSubscriptionStatus("idle"), 3000)
    } catch (error) {
      setSubscriptionStatus("error")
    } finally {
      setIsSubscribing(false)
    }
  }

  /**
   * Navigation sections configuration
   * Organized by category for easy maintenance
   */
  const navigationSections = [
    {
      title: "Platform",
      icon: Shield,
      links: [
        { name: "Dashboard", href: "/dashboard", icon: Shield },
        { name: "Earn Tokens", href: "/earn", icon: Coins },
        { name: "Security Center", href: "/security", icon: Shield },
        { name: "Leaderboards", href: "/leaderboards", icon: Users },
        { name: "Transactions", href: "/transactions", icon: ExternalLink },
        { name: "Profile", href: "/profile", icon: Users },
      ],
    },
    {
      title: "Company",
      icon: Globe,
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Roadmap", href: "/roadmap" },
        { name: "Tokenomics", href: "/token" },
        { name: "Careers", href: "/careers" },
        { name: "Press Kit", href: "/press" },
      ],
    },
    {
      title: "Resources",
      icon: FileText,
      links: [
        { name: "Documentation", href: "/documentation", icon: FileText },
        { name: "API Reference", href: "/documentation/api", icon: FileText },
        { name: "Tutorials", href: "/documentation/tutorials", icon: FileText },
        { name: "FAQ", href: "/faq", icon: HelpCircle },
        { name: "Blog", href: "/blog" },
        { name: "Community", href: "/community" },
      ],
    },
  ]

  /**
   * Social media links configuration
   */
  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/nexsoqurity", color: "hover:text-blue-400" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/nexsoqurity", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/nexsoqurity", color: "hover:text-pink-400" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/nexsoqurity",
      color: "hover:text-blue-500",
    },
    { name: "GitHub", icon: Github, href: "https://github.com/nexsoqurity", color: "hover:text-gray-300" },
  ]

  /**
   * Contact information configuration
   */
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@nexsoqurity.com",
      href: "mailto:support@nexsoqurity.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "San Francisco, CA",
      href: "https://maps.google.com",
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Company branding section - full width on mobile, 2 cols on large */}
            <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6 text-center sm:text-left">
              {/* Logo and company name */}
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Logo size="medium" />
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  NexsoQurity
                </span>
              </div>

              {/* Company description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto sm:mx-0">
                Revolutionizing blockchain security with AI-powered solutions. We protect your digital assets with
                cutting-edge technology, innovative security protocols, and community-driven rewards.
              </p>

              {/* Social media links */}
              <div className="flex justify-center sm:justify-start space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center sm:justify-start space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3 text-red-400" />
                  <span className="hidden sm:inline">Trusted by 10K+ users</span>
                  <span className="sm:hidden">10K+ users</span>
                </div>
              </div>
            </div>

            {/* Navigation sections - responsive grid */}
            {navigationSections.map((section) => (
              <div key={section.title} className="space-y-3 sm:space-y-4 text-center sm:text-left">
                {/* Section header with icon */}
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center justify-center sm:justify-start space-x-2">
                  <section.icon className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />
                  <span>{section.title}</span>
                </h3>

                {/* Navigation links */}
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center justify-center sm:justify-start space-x-2 group py-1"
                      >
                        {link.icon && (
                          <link.icon className="h-3 w-3 sm:h-4 sm:w-4 opacity-70 group-hover:opacity-100" />
                        )}
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter subscription section - more mobile friendly */}
          <div className="bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 border border-teal-500/20">
            <div className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Stay in the Loop</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Get the latest updates on security features, token rewards, and platform announcements.
              </p>

              {/* Newsletter form - stack on mobile */}
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-teal-400 h-12"
                  required
                  disabled={isSubscribing}
                />
                <Button
                  type="submit"
                  disabled={isSubscribing || !email}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 disabled:opacity-50 h-12"
                >
                  {isSubscribing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Subscribe</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Subscription status messages */}
              {subscriptionStatus === "success" && (
                <p className="text-green-400 text-sm">✓ Successfully subscribed to our newsletter!</p>
              )}
              {subscriptionStatus === "error" && (
                <p className="text-red-400 text-sm">✗ Please enter a valid email address.</p>
              )}
            </div>
          </div>

          {/* Contact information section - responsive grid */}
          <div className="border-t border-white/10 pt-6 sm:pt-8 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 text-center">Get in Touch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {contactInfo.map((contact) => (
                <Link
                  key={contact.title}
                  href={contact.href}
                  className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <contact.icon className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{contact.title}</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 truncate">{contact.value}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal section - responsive */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
              {/* Copyright and legal links */}
              <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-6 text-center md:text-left">
                <p className="text-sm text-gray-400">© {new Date().getFullYear()} NexsoQurity. All rights reserved.</p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-of-service"
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    Contact
                  </Link>
                </div>
              </div>

              {/* Technology badge */}
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <span className="text-sm text-gray-400">Powered by</span>
                <span className="text-sm font-medium bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  Blockchain Technology
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

// Set display name for debugging
Footer.displayName = "Footer"

export default Footer
