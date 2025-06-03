"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, Clock, Zap, Shield, Globe, Cpu, Users, TrendingUp, Rocket, Target } from "lucide-react"
import { FaRocket, FaShieldAlt, FaMobile, FaGlobe } from "react-icons/fa"
import AnimatedSection from "@/components/animated-section"

export default function RoadmapPage() {
  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Foundation & Security",
      period: "Q1 2024 - Q2 2024",
      status: "completed",
      progress: 100,
      icon: <FaShieldAlt className="h-6 w-6" />,
      color: "from-green-500 to-teal-500",
      milestones: [
        { title: "Core Security Framework", status: "completed", description: "Basic AI-powered threat detection" },
        {
          title: "Smart Contract Development",
          status: "completed",
          description: "ERC-20 token and governance contracts",
        },
        { title: "Security Audits", status: "completed", description: "Third-party security audits completed" },
        { title: "Testnet Launch", status: "completed", description: "Beta testing with early adopters" },
      ],
    },
    {
      phase: "Phase 2",
      title: "Platform Development",
      period: "Q3 2024 - Q4 2024",
      status: "in-progress",
      progress: 75,
      icon: <FaRocket className="h-6 w-6" />,
      color: "from-yellow-500 to-amber-500",
      milestones: [
        { title: "Advanced AI Models", status: "completed", description: "Enhanced threat detection algorithms" },
        { title: "User Interface Redesign", status: "completed", description: "Improved user experience and design" },
        {
          title: "Token Generation Event",
          status: "in-progress",
          description: "Official token launch and distribution",
        },
        { title: "Mainnet Deployment", status: "upcoming", description: "Full platform launch on mainnet" },
      ],
    },
    {
      phase: "Phase 3",
      title: "Mobile & Expansion",
      period: "Q1 2025 - Q2 2025",
      status: "upcoming",
      progress: 0,
      icon: <FaMobile className="h-6 w-6" />,
      color: "from-blue-500 to-purple-500",
      milestones: [
        { title: "Mobile Applications", status: "upcoming", description: "iOS and Android native apps" },
        { title: "Hardware Wallet Integration", status: "upcoming", description: "Support for major hardware wallets" },
        { title: "Multi-Chain Support", status: "upcoming", description: "Ethereum, BSC, and Polygon integration" },
        {
          title: "DeFi Protocol Integration",
          status: "upcoming",
          description: "Integration with major DeFi platforms",
        },
      ],
    },
    {
      phase: "Phase 4",
      title: "Global Adoption",
      period: "Q3 2025 - Q4 2025",
      status: "upcoming",
      progress: 0,
      icon: <FaGlobe className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      milestones: [
        { title: "Enterprise Solutions", status: "upcoming", description: "B2B security solutions for institutions" },
        {
          title: "Global Partnerships",
          status: "upcoming",
          description: "Strategic partnerships with major exchanges",
        },
        { title: "Advanced Analytics", status: "upcoming", description: "Comprehensive security analytics dashboard" },
        {
          title: "Quantum-Resistant Upgrade",
          status: "upcoming",
          description: "Next-generation quantum-safe encryption",
        },
      ],
    },
  ]

  const upcomingFeatures = [
    {
      title: "AI-Powered Risk Assessment",
      description: "Real-time risk scoring for transactions and wallet activities",
      eta: "Q4 2024",
      icon: <Cpu className="h-5 w-5 text-teal-400" />,
    },
    {
      title: "Social Recovery System",
      description: "Decentralized wallet recovery through trusted contacts",
      eta: "Q1 2025",
      icon: <Users className="h-5 w-5 text-teal-400" />,
    },
    {
      title: "Insurance Integration",
      description: "Built-in insurance coverage for protected wallets",
      eta: "Q2 2025",
      icon: <Shield className="h-5 w-5 text-teal-400" />,
    },
    {
      title: "Cross-Chain Bridge",
      description: "Secure asset transfers across multiple blockchains",
      eta: "Q3 2025",
      icon: <Globe className="h-5 w-5 text-teal-400" />,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "upcoming":
        return <Target className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500 text-green-400"
      case "in-progress":
        return "border-yellow-500 text-yellow-400"
      case "upcoming":
        return "border-gray-500 text-gray-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-teal-400 to-fuchsia-600 flex items-center justify-center">
              <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">Development Roadmap</h1>
              <p className="text-sm sm:text-base text-gray-400">Our journey to revolutionize wallet security</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Progress Overview */}
        <AnimatedSection animation="fade-up" delay={0.1} className="mb-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-teal-400" />
                Overall Progress
              </CardTitle>
              <CardDescription>Current development status across all phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Development Progress</span>
                  <span className="text-sm font-medium text-white">44%</span>
                </div>
                <Progress
                  value={44}
                  className="h-3 bg-gray-800"
                  indicatorClassName="bg-gradient-to-r from-teal-500 to-fuchsia-600"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">4</div>
                    <div className="text-xs text-gray-400">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">2</div>
                    <div className="text-xs text-gray-400">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-400">10</div>
                    <div className="text-xs text-gray-400">Upcoming</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-400">16</div>
                    <div className="text-xs text-gray-400">Total Milestones</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Roadmap Phases */}
        <div className="space-y-6 mb-8">
          {roadmapPhases.map((phase, index) => (
            <AnimatedSection key={phase.phase} animation="fade-up" delay={0.1 * (index + 1)}>
              <Card className="bg-black/40 border-gray-800 hover:border-teal-500/30 transition-all duration-200">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white`}
                      >
                        {phase.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl break-words">{phase.title}</CardTitle>
                        <CardDescription className="break-words">{phase.period}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getStatusColor(phase.status)}>
                        {phase.status.replace("-", " ")}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">{phase.progress}%</div>
                        <div className="text-xs text-gray-400">Complete</div>
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={phase.progress}
                    className="h-2 bg-gray-800 mt-4"
                    indicatorClassName={`bg-gradient-to-r ${phase.color}`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.milestones.map((milestone, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800"
                      >
                        <div className="flex-shrink-0 mt-0.5">{getStatusIcon(milestone.status)}</div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-white mb-1 break-words">{milestone.title}</h4>
                          <p className="text-sm text-gray-300 break-words">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Upcoming Features */}
        <AnimatedSection animation="fade-up" delay={0.5} className="mb-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-fuchsia-400" />
                Upcoming Features
              </CardTitle>
              <CardDescription>Exciting new capabilities coming to NexsoQurity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-900/30 rounded-lg border border-gray-800"
                  >
                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-medium text-white break-words">{feature.title}</h4>
                        <Badge variant="outline" className="text-xs w-fit">
                          {feature.eta}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 break-words">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Timeline Visualization */}
        <AnimatedSection animation="fade-up" delay={0.6}>
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-400" />
                Development Timeline
              </CardTitle>
              <CardDescription>Visual representation of our development journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-fuchsia-600"></div>

                <div className="space-y-6">
                  {roadmapPhases.map((phase, index) => (
                    <div key={index} className="relative flex items-start gap-4">
                      {/* Timeline dot */}
                      <div
                        className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white flex-shrink-0`}
                      >
                        {phase.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white break-words">{phase.title}</h3>
                          <Badge variant="outline" className={getStatusColor(phase.status)}>
                            {phase.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2 break-words">{phase.period}</p>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={phase.progress}
                            className="h-2 bg-gray-800 flex-1"
                            indicatorClassName={`bg-gradient-to-r ${phase.color}`}
                          />
                          <span className="text-sm text-gray-300 flex-shrink-0">{phase.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
