"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Coins,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Calendar,
  PieChart,
  BarChart3,
  Calculator,
  Download,
  ExternalLink,
} from "lucide-react"
import { FaCoins, FaChartPie, FaRocket, FaLock, FaExchangeAlt } from "react-icons/fa"
import AnimatedSection from "@/components/animated-section"
import TokenDistributionChart from "@/components/token-distribution-chart"

export default function TokenPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y")

  const tokenMetrics = {
    totalSupply: "100,000,000",
    circulatingSupply: "25,000,000",
    marketCap: "TBD",
    holders: "2,847",
    price: "TBD",
    volume24h: "TBD",
  }

  const vestingSchedule = [
    {
      category: "Community & Ecosystem",
      percentage: 40,
      color: "bg-teal-500",
      vesting: "10% at TGE, 24 months linear",
    },
    {
      category: "Team & Advisors",
      percentage: 20,
      color: "bg-fuchsia-600",
      vesting: "6 months cliff, 36 months linear",
    },
    { category: "Treasury", percentage: 15, color: "bg-amber-500", vesting: "12 months cliff, 24 months linear" },
    { category: "Liquidity", percentage: 15, color: "bg-purple-500", vesting: "50% at TGE, 12 months linear" },
    { category: "Marketing", percentage: 10, color: "bg-blue-500", vesting: "6 months cliff, 18 months linear" },
  ]

  const roadmapMilestones = [
    {
      quarter: "Q1 2024",
      title: "Testnet Launch",
      status: "completed",
      description: "Beta testing with early adopters",
    },
    {
      quarter: "Q2 2024",
      title: "Security Audits",
      status: "completed",
      description: "Comprehensive smart contract audits",
    },
    {
      quarter: "Q3 2024",
      title: "Token Generation",
      status: "in-progress",
      description: "TGE and initial distribution",
    },
    { quarter: "Q4 2024", title: "Mainnet Launch", status: "upcoming", description: "Full platform deployment" },
    { quarter: "Q1 2025", title: "Mobile App", status: "upcoming", description: "iOS and Android applications" },
    { quarter: "Q2 2025", title: "DeFi Integration", status: "upcoming", description: "Cross-chain compatibility" },
  ]

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <FaCoins className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">$NEXQ Token</h1>
              <p className="text-sm sm:text-base text-gray-400">The utility token powering NexsoQurity ecosystem</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Token Metrics */}
        <AnimatedSection animation="fade-up" delay={0.1} className="mb-6 sm:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Object.entries(tokenMetrics).map(([key, value], index) => (
              <Card key={key} className="bg-black/40 border-gray-800 text-center">
                <CardContent className="p-3 sm:p-4">
                  <div className="text-lg sm:text-xl font-bold text-white break-words">{value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 capitalize break-words">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="distribution" className="text-xs sm:text-sm">
              Distribution
            </TabsTrigger>
            <TabsTrigger value="utility" className="text-xs sm:text-sm">
              Utility
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="text-xs sm:text-sm">
              Roadmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Token Information */}
              <AnimatedSection animation="slide-in-left" delay={0.2}>
                <Card className="bg-black/40 border-gray-800 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-teal-400" />
                      Token Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
                        <div className="text-sm text-gray-400">Token Standard</div>
                        <div className="text-lg font-semibold text-white">ERC-20</div>
                      </div>
                      <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
                        <div className="text-sm text-gray-400">Blockchain</div>
                        <div className="text-lg font-semibold text-white">Polygon</div>
                      </div>
                      <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
                        <div className="text-sm text-gray-400">Decimals</div>
                        <div className="text-lg font-semibold text-white">18</div>
                      </div>
                      <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
                        <div className="text-sm text-gray-400">Launch Date</div>
                        <div className="text-lg font-semibold text-white">Q4 2024</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h4 className="text-white font-medium mb-3">Contract Address</h4>
                      <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
                        <div className="text-xs font-mono text-gray-300 break-all">
                          0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View on Explorer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Price Chart Placeholder */}
              <AnimatedSection animation="slide-in-right" delay={0.2}>
                <Card className="bg-black/40 border-gray-800 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-teal-400" />
                        Price Chart
                      </CardTitle>
                      <div className="flex gap-1">
                        {["1D", "1W", "1M", "1Y"].map((period) => (
                          <Button
                            key={period}
                            size="sm"
                            variant={selectedTimeframe === period ? "default" : "outline"}
                            onClick={() => setSelectedTimeframe(period)}
                            className="text-xs px-2 py-1"
                          >
                            {period}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gray-900/30 rounded-lg border border-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">Price chart will be available after TGE</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Token Economics */}
            <AnimatedSection animation="fade-up" delay={0.3}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-teal-400" />
                    Token Economics
                  </CardTitle>
                  <CardDescription>Understanding the economic model behind $NEXQ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-teal-400" />
                        <h4 className="font-medium text-white">Deflationary Model</h4>
                      </div>
                      <p className="text-sm text-gray-300">
                        Token burns through platform fees reduce total supply over time
                      </p>
                    </div>
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-teal-400" />
                        <h4 className="font-medium text-white">Staking Rewards</h4>
                      </div>
                      <p className="text-sm text-gray-300">
                        Earn additional tokens by staking and securing the network
                      </p>
                    </div>
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800 md:col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-teal-400" />
                        <h4 className="font-medium text-white">Governance Rights</h4>
                      </div>
                      <p className="text-sm text-gray-300">Vote on protocol upgrades and ecosystem development</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribution Chart */}
              <AnimatedSection animation="slide-in-left" delay={0.2}>
                <Card className="bg-black/40 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaChartPie className="h-5 w-5 text-fuchsia-400" />
                      Token Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TokenDistributionChart />
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Vesting Schedule */}
              <AnimatedSection animation="slide-in-right" delay={0.2}>
                <Card className="bg-black/40 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-teal-400" />
                      Vesting Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {vestingSchedule.map((item, index) => (
                      <div key={index} className="border border-gray-800 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm font-medium text-white break-words">{item.category}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.percentage}%
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 break-words">{item.vesting}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </TabsContent>

          <TabsContent value="utility" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Utilities */}
              <AnimatedSection animation="fade-up" delay={0.1}>
                <Card className="bg-black/40 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaLock className="h-5 w-5 text-teal-400" />
                      Primary Utilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                        <Shield className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Security Services</h4>
                          <p className="text-sm text-gray-300">Access premium AI-powered security features</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                        <Users className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Governance Voting</h4>
                          <p className="text-sm text-gray-300">Participate in protocol decision making</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                        <Zap className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Transaction Fees</h4>
                          <p className="text-sm text-gray-300">Pay for platform transactions and services</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Secondary Utilities */}
              <AnimatedSection animation="fade-up" delay={0.2}>
                <Card className="bg-black/40 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaRocket className="h-5 w-5 text-fuchsia-400" />
                      Secondary Utilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                        <TrendingUp className="h-5 w-5 text-fuchsia-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Staking Rewards</h4>
                          <p className="text-sm text-gray-300">Earn yield by staking tokens</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                        <FaExchangeAlt className="h-5 w-5 text-fuchsia-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Liquidity Mining</h4>
                          <p className="text-sm text-gray-300">Provide liquidity and earn rewards</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                        <Calculator className="h-5 w-5 text-fuchsia-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Fee Discounts</h4>
                          <p className="text-sm text-gray-300">Reduced fees for token holders</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Token Calculator */}
            <AnimatedSection animation="fade-up" delay={0.3}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-teal-400" />
                    Token Calculator
                  </CardTitle>
                  <CardDescription>Calculate potential returns and utility costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6 text-center">
                    <Calculator className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Interactive Calculator</h3>
                    <p className="text-gray-400 mb-4">Calculate staking rewards, governance power, and utility costs</p>
                    <Button className="bg-gradient-to-r from-teal-500 to-fuchsia-600">Coming Soon</Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <AnimatedSection animation="fade-up" delay={0.1}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FaRocket className="h-5 w-5 text-teal-400" />
                    Development Roadmap
                  </CardTitle>
                  <CardDescription>Key milestones in our token and platform development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roadmapMilestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-lg border border-gray-800"
                      >
                        <div className="flex-shrink-0">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              milestone.status === "completed"
                                ? "bg-green-500"
                                : milestone.status === "in-progress"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                            }`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h4 className="font-medium text-white break-words">{milestone.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  milestone.status === "completed"
                                    ? "border-green-500 text-green-400"
                                    : milestone.status === "in-progress"
                                      ? "border-yellow-500 text-yellow-400"
                                      : "border-gray-500 text-gray-400"
                                }`}
                              >
                                {milestone.status.replace("-", " ")}
                              </Badge>
                              <span className="text-sm text-gray-400">{milestone.quarter}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 break-words">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <AnimatedSection animation="fade-up" delay={0.4} className="mt-8">
          <Card className="bg-gradient-to-r from-teal-900/30 to-fuchsia-900/30 border-teal-800/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h3>
              <p className="text-gray-300 mb-4">Join our community and start earning $NEXQ tokens today</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-to-r from-teal-500 to-fuchsia-600">Start Earning Tokens</Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Whitepaper
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
