"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Zap, Users, Lock, Coins, ArrowRight, CheckCircle, Globe, Brain, Rocket } from "lucide-react"
import Link from "next/link"
import AnimatedSection from "@/components/animated-section"
import TokenDistributionChart from "@/components/token-distribution-chart"
import dynamic from "next/dynamic"

// Dynamically import the 3D component to avoid SSR issues
const CryptoSecurityAnimation = dynamic(() => import("@/components/crypto-security-animation"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gray-900/20 rounded-lg">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading 3D Security Visualization...</p>
      </div>
    </div>
  ),
})

/**
 * Animated counter component for statistics
 * Creates a smooth counting animation from 0 to the target value
 */
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

/**
 * Feature card component for displaying platform features
 * Includes hover effects and animations
 */
function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay?: number
}) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}

/**
 * Statistic card component for displaying key metrics
 * Features animated counters and icons
 */
function StatCard({
  value,
  label,
  icon: Icon,
  delay = 0,
}: {
  value: string | React.ReactNode
  label: string
  icon: React.ElementType
  delay?: number
}) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
            <Icon className="h-8 w-8 text-teal-400" />
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}

/**
 * Main Home Page Component
 *
 * Features:
 * - Hero section with animated 3D security visualization
 * - Platform statistics with animated counters
 * - Feature showcase with interactive cards
 * - How it works section with tabbed interface
 * - Token information and distribution
 * - Call-to-action sections
 */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("security")

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Animation */}
      <AnimatedSection>
        <section className="relative py-20 px-4 text-center">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 bg-teal-500/20 text-teal-300 border-teal-500/30">
                🚀 Pre-Launch Phase Active
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Secure Your Digital
                <br />
                <span className="bg-gradient-to-r from-teal-400 to-purple-600 bg-clip-text text-transparent">
                  Future with AI
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                NexsoQurity combines advanced artificial intelligence with blockchain security to protect your digital
                assets. Earn tokens while keeping your wallet safe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* 3D Security Animation */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Multi-Blockchain Security Protection</h2>
              <Suspense
                fallback={
                  <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gray-900/20 rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">Loading 3D Security Visualization...</p>
                    </div>
                  </div>
                }
              >
                <CryptoSecurityAnimation />
              </Suspense>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Watch as our AI-powered security system protects multiple blockchain networks including Bitcoin,
                Ethereum, Polygon, Solana, and Sui - all orbiting around our central security core.
              </p>
            </div>

            {/* Platform Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <StatCard
                value={<AnimatedCounter end={50000} suffix="+" />}
                label="Users Protected"
                icon={Users}
                delay={0.1}
              />
              <StatCard
                value={<AnimatedCounter end={1000000} suffix="+" />}
                label="Tokens Earned"
                icon={Coins}
                delay={0.2}
              />
              <StatCard
                value={<AnimatedCounter end={99} suffix="%" />}
                label="Security Rate"
                icon={Shield}
                delay={0.3}
              />
              <StatCard
                value={<AnimatedCounter end={24} suffix="/7" />}
                label="AI Monitoring"
                icon={Brain}
                delay={0.4}
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose <span className="text-teal-400">NexsoQurity</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform offers cutting-edge security features powered by artificial intelligence to keep your
                digital assets safe across multiple blockchain networks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Shield}
                title="AI-Powered Security"
                description="Advanced machine learning algorithms monitor your wallet 24/7 for suspicious activities and potential threats across all supported blockchains."
                delay={0.1}
              />
              <FeatureCard
                icon={Coins}
                title="Earn While Protected"
                description="Get rewarded with NXQ tokens for maintaining good security practices and completing security tasks on multiple networks."
                delay={0.2}
              />
              <FeatureCard
                icon={Zap}
                title="Real-time Monitoring"
                description="Instant alerts and notifications keep you informed about your wallet's security status across Bitcoin, Ethereum, Polygon, Solana, and Sui."
                delay={0.3}
              />
              <FeatureCard
                icon={Lock}
                title="Multi-layer Protection"
                description="Multiple security layers including encryption, biometric authentication, and smart contract auditing for comprehensive protection."
                delay={0.4}
              />
              <FeatureCard
                icon={Brain}
                title="Smart Analytics"
                description="Detailed insights and analytics help you understand and improve your digital security posture across all your blockchain assets."
                delay={0.5}
              />
              <FeatureCard
                icon={Globe}
                title="Cross-platform Support"
                description="Seamless protection across all your devices and blockchain networks with synchronized security settings and unified monitoring."
                delay={0.6}
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-white/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get started with NexsoQurity in three simple steps and begin earning tokens while staying secure across
                multiple blockchain networks.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 mb-8">
                <TabsTrigger value="security" className="data-[state=active]:bg-teal-600">
                  Security Setup
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="data-[state=active]:bg-teal-600">
                  AI Monitoring
                </TabsTrigger>
                <TabsTrigger value="earning" className="data-[state=active]:bg-teal-600">
                  Earn Tokens
                </TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-teal-400" />
                      Step 1: Security Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Connect your wallets from multiple blockchain networks and configure your security preferences.
                      Our AI will analyze your current security setup across all networks and provide personalized
                      recommendations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">Multi-Wallet Connection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">Cross-Chain Security Assessment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">Custom Preferences</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">AI Configuration</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-teal-400" />
                      Step 2: AI Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Our advanced AI continuously monitors your wallets across Bitcoin, Ethereum, Polygon, Solana, and
                      Sui for threats, suspicious activities, and security vulnerabilities. Get real-time alerts and
                      recommendations.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Threat Detection</span>
                        <Progress value={95} className="w-32" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Transaction Analysis</span>
                        <Progress value={88} className="w-32" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Behavioral Monitoring</span>
                        <Progress value={92} className="w-32" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Cross-Chain Security</span>
                        <Progress value={97} className="w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earning" className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Coins className="mr-2 h-5 w-5 text-teal-400" />
                      Step 3: Earn Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Complete security tasks, maintain good security practices, and participate in the community to
                      earn NXQ tokens across all supported blockchain networks. The more secure you are, the more you
                      earn!
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Daily Security Check</span>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                            +10 NXQ
                          </Badge>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Cross-Chain Security Task</span>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                            +25 NXQ
                          </Badge>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Referral Bonus</span>
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                            +50 NXQ
                          </Badge>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Community Participation</span>
                          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                            +15 NXQ
                          </Badge>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </AnimatedSection>

      {/* Token Section */}
      <AnimatedSection>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="text-teal-400">NXQ Token</span> Distribution
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Learn about our tokenomics and how NXQ tokens are distributed across the ecosystem to reward
                security-conscious users.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <TokenDistributionChart />
              </div>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Token Utility</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Governance voting rights</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Premium security features</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Staking rewards</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Cross-chain transaction fees</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Earning Opportunities</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Security Tasks</span>
                      <Badge variant="secondary" className="bg-teal-500/20 text-teal-300">
                        Up to 100 NXQ/day
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Referral Program</span>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        10% Commission
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Staking Rewards</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                        12% APY
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Cross-Chain Bonuses</span>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                        5% Extra
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/token">
                    Learn More About NXQ <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection>
        <section className="py-20 px-4 bg-gradient-to-r from-teal-600/20 to-purple-600/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Secure Your Digital Future?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust NexsoQurity to protect their digital assets across multiple blockchain
              networks while earning rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href="/signup">
                  Start Earning Today <Rocket className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
