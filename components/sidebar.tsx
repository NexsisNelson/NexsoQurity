"use client"

import type React from "react"
import { useState, useEffect, useRef, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Shield,
  Coins,
  User,
  BarChart2,
  FileText,
  Users,
  Award,
  HelpCircle,
  Mail,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOptimizedAnimations } from "@/lib/performance-utils"

interface SidebarProps {
  className?: string
}

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  subItems?: { name: string; href: string }[]
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Earn", href: "/earn", icon: Coins },
  { name: "Security", href: "/security", icon: Shield },
  { name: "Transactions", href: "/transactions", icon: BarChart2 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Leaderboards", href: "/leaderboards", icon: Award },
  {
    name: "Documentation",
    href: "/documentation",
    icon: FileText,
    subItems: [
      { name: "Getting Started", href: "/documentation/getting-started" },
      { name: "API Reference", href: "/documentation/api" },
      { name: "Tutorials", href: "/documentation/tutorials" },
    ],
  },
  { name: "Team", href: "/team", icon: Users },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Contact", href: "/contact", icon: Mail },
]

const Sidebar = ({ className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useOptimizedAnimations()

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Toggle expanded state for items with subitems
  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  // Check if a nav item is active
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40 md:hidden" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6 text-purple-800" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" aria-hidden="true" />}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform",
          shouldReduceMotion ? "" : "duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:sticky md:top-0 md:h-screen md:w-64 md:flex-shrink-0",
          className,
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-purple-800">NexsoQurity</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className={cn(
                          "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                          isActive(item.href)
                            ? "bg-purple-100 text-purple-900"
                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-900",
                        )}
                      >
                        <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="flex-1 truncate">{item.name}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems[item.name] ? "transform rotate-180" : "",
                          )}
                        />
                      </button>

                      {expandedItems[item.name] && (
                        <ul className="pl-10 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                                  isActive(subItem.href)
                                    ? "bg-purple-100 text-purple-900"
                                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-900",
                                )}
                              >
                                <ChevronRight className="h-3 w-3 mr-2 flex-shrink-0" />
                                <span className="truncate">{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-purple-100 text-purple-900"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-900",
                      )}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">User Account</p>
                <p className="text-xs text-gray-500 truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Sidebar)
