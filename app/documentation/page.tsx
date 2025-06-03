"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Book,
  Search,
  FileText,
  Code,
  Shield,
  Zap,
  Download,
  ExternalLink,
  ChevronRight,
  Play,
  GitBranch,
  Terminal,
  Smartphone,
} from "lucide-react"
import { FaGithub, FaDiscord, FaTelegram } from "react-icons/fa"
import AnimatedSection from "@/components/animated-section"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const documentationSections = [
    {
      title: "Getting Started",
      icon: <Play className="h-5 w-5" />,
      description: "Quick start guide and basic setup",
      articles: [
        { title: "Introduction to NexsoQurity", type: "guide", readTime: "5 min" },
        { title: "Creating Your First Wallet", type: "tutorial", readTime: "10 min" },
        { title: "Understanding Security Features", type: "guide", readTime: "8 min" },
        { title: "Token Basics", type: "guide", readTime: "6 min" },
      ],
    },
    {
      title: "Security Features",
      icon: <Shield className="h-5 w-5" />,
      description: "Comprehensive security documentation",
      articles: [
        { title: "AI-Powered Threat Detection", type: "technical", readTime: "15 min" },
        { title: "Quantum-Resistant Encryption", type: "technical", readTime: "12 min" },
        { title: "Multi-Factor Authentication", type: "guide", readTime: "7 min" },
        { title: "Security Best Practices", type: "guide", readTime: "10 min" },
      ],
    },
    {
      title: "API Reference",
      icon: <Code className="h-5 w-5" />,
      description: "Complete API documentation",
      articles: [
        { title: "Authentication API", type: "api", readTime: "8 min" },
        { title: "Wallet Management API", type: "api", readTime: "12 min" },
        { title: "Transaction API", type: "api", readTime: "10 min" },
        { title: "Security API", type: "api", readTime: "15 min" },
      ],
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Mobile app development guides",
      articles: [
        { title: "iOS SDK Integration", type: "tutorial", readTime: "20 min" },
        { title: "Android SDK Integration", type: "tutorial", readTime: "20 min" },
        { title: "React Native Plugin", type: "tutorial", readTime: "15 min" },
        { title: "Mobile Security Guidelines", type: "guide", readTime: "12 min" },
      ],
    },
  ]

  const quickLinks = [
    { title: "API Keys Setup", icon: <Code className="h-4 w-4" />, type: "tutorial" },
    { title: "Webhook Configuration", icon: <Zap className="h-4 w-4" />, type: "guide" },
    { title: "Error Handling", icon: <FileText className="h-4 w-4" />, type: "reference" },
    { title: "Rate Limiting", icon: <Terminal className="h-4 w-4" />, type: "reference" },
    { title: "SDK Examples", icon: <GitBranch className="h-4 w-4" />, type: "tutorial" },
    { title: "Troubleshooting", icon: <Shield className="h-4 w-4" />, type: "guide" },
  ]

  const resources = [
    {
      title: "Developer Portal",
      description: "Access developer tools and resources",
      icon: <Code className="h-6 w-6 text-teal-400" />,
      link: "#",
      type: "external",
    },
    {
      title: "GitHub Repository",
      description: "View source code and contribute",
      icon: <FaGithub className="h-6 w-6 text-gray-400" />,
      link: "#",
      type: "external",
    },
    {
      title: "Community Discord",
      description: "Join our developer community",
      icon: <FaDiscord className="h-6 w-6 text-blue-400" />,
      link: "#",
      type: "external",
    },
    {
      title: "Telegram Channel",
      description: "Get updates and announcements",
      icon: <FaTelegram className="h-6 w-6 text-blue-500" />,
      link: "#",
      type: "external",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-green-500/20 text-green-400"
      case "tutorial":
        return "bg-blue-500/20 text-blue-400"
      case "api":
        return "bg-purple-500/20 text-purple-400"
      case "technical":
        return "bg-orange-500/20 text-orange-400"
      case "reference":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredSections = documentationSections
    .map((section) => ({
      ...section,
      articles: section.articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((section) => section.articles.length > 0 || searchQuery === "")

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <Book className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">Documentation</h1>
              <p className="text-sm sm:text-base text-gray-400">Comprehensive guides and API reference</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection animation="fade-up" delay={0.1} className="mb-6 sm:mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-gray-700 text-gray-100"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Links */}
        <AnimatedSection animation="fade-up" delay={0.2} className="mb-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-teal-400" />
                Quick Links
              </CardTitle>
              <CardDescription>Popular documentation topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center gap-2 border-gray-700 hover:border-teal-500/50"
                  >
                    {link.icon}
                    <span className="text-xs text-center break-words">{link.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Main Documentation */}
        <Tabs defaultValue="guides" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="guides" className="text-xs sm:text-sm">
              Guides
            </TabsTrigger>
            <TabsTrigger value="api" className="text-xs sm:text-sm">
              API Reference
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="text-xs sm:text-sm">
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="examples" className="text-xs sm:text-sm">
              Examples
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSections.map((section, index) => (
                <AnimatedSection key={section.title} animation="fade-up" delay={0.1 * (index + 1)}>
                  <Card className="bg-black/40 border-gray-800 hover:border-teal-500/30 transition-all duration-200 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                          {section.icon}
                        </div>
                        <span className="break-words">{section.title}</span>
                      </CardTitle>
                      <CardDescription className="break-words">{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {section.articles.map((article, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-medium text-white break-words">{article.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`text-xs ${getTypeColor(article.type)}`}>{article.type}</Badge>
                                  <span className="text-xs text-gray-400">{article.readTime}</span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <AnimatedSection animation="fade-up" delay={0.1}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-400" />
                    API Reference
                  </CardTitle>
                  <CardDescription>Complete API documentation and endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Authentication</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                          <code className="text-sm text-green-400">POST /auth/login</code>
                          <p className="text-xs text-gray-400 mt-1">User authentication</p>
                        </div>
                        <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                          <code className="text-sm text-green-400">POST /auth/refresh</code>
                          <p className="text-xs text-gray-400 mt-1">Refresh access token</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Wallet Management</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                          <code className="text-sm text-blue-400">GET /wallet/balance</code>
                          <p className="text-xs text-gray-400 mt-1">Get wallet balance</p>
                        </div>
                        <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                          <code className="text-sm text-yellow-400">POST /wallet/transfer</code>
                          <p className="text-xs text-gray-400 mt-1">Transfer tokens</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <AnimatedSection animation="fade-up" delay={0.1}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-blue-400" />
                    Step-by-Step Tutorials
                  </CardTitle>
                  <CardDescription>Learn by building real applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Building Your First DApp", difficulty: "Beginner", time: "30 min" },
                      { title: "Implementing Security Features", difficulty: "Intermediate", time: "45 min" },
                      { title: "Advanced AI Integration", difficulty: "Advanced", time: "60 min" },
                      { title: "Mobile App Development", difficulty: "Intermediate", time: "90 min" },
                    ].map((tutorial, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Play className="h-4 w-4 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white break-words">{tutorial.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {tutorial.difficulty}
                              </Badge>
                              <span className="text-xs text-gray-400">{tutorial.time}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <AnimatedSection animation="fade-up" delay={0.1}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-green-400" />
                    Code Examples
                  </CardTitle>
                  <CardDescription>Ready-to-use code snippets and examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "React Integration", language: "JavaScript", stars: 45 },
                      { title: "Python SDK", language: "Python", stars: 32 },
                      { title: "Node.js Backend", language: "JavaScript", stars: 28 },
                      { title: "Flutter Mobile", language: "Dart", stars: 19 },
                    ].map((example, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white break-words">{example.title}</h4>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <span className="text-xs">{example.stars}</span>
                            <span className="text-xs">★</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {example.language}
                          </Badge>
                          <Button size="sm" variant="ghost" className="text-teal-400 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
        </Tabs>

        {/* Resources */}
        <AnimatedSection animation="fade-up" delay={0.3}>
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-teal-400" />
                Developer Resources
              </CardTitle>
              <CardDescription>Additional tools and community resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer text-center"
                  >
                    <div className="flex justify-center mb-3">{resource.icon}</div>
                    <h4 className="font-medium text-white mb-2 break-words">{resource.title}</h4>
                    <p className="text-xs text-gray-400 break-words">{resource.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Download Section */}
        <AnimatedSection animation="fade-up" delay={0.4} className="mt-8">
          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Need Offline Access?</h3>
              <p className="text-gray-300 mb-4">Download our documentation for offline reading</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
