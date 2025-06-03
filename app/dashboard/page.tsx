"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Clock, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react"
import {
  FaWallet,
  FaShieldAlt,
  FaUsers,
  FaExchangeAlt,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaLock,
  FaBolt,
  FaChartBar,
  FaUserShield,
} from "react-icons/fa"
import { MdNotifications } from "react-icons/md"
import AnimatedSection from "@/components/animated-section"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [securityScore, setSecurityScore] = useState(85)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="relative z-20 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-black/40">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Dashboard Header */}
        <AnimatedSection animation="fade-up" className="mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-words">
                Welcome, <span className="text-teal-400 break-words">{user.name}</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 break-words">Your security dashboard overview</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button size="sm" variant="outline" className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                  <MdNotifications size={10} className="text-white sm:text-xs" />
                </div>
                <span className="text-xs sm:text-sm">Notifications</span>
              </Button>
              <Button size="sm" className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <FaShieldAlt size={10} className="text-white sm:text-xs" />
                </div>
                <span className="text-xs sm:text-sm">Security Scan</span>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Wallet Balance */}
          <AnimatedSection animation="fade-up" delay={0.1} className="col-span-1">
            <Card className="bg-black/40 border-gray-800 hover:border-teal-500/30 transition-all duration-200 h-full">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <FaWallet size={12} className="text-white sm:text-sm" />
                  </div>
                  <span>Wallet Balance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-white break-all">{user.tokenBalance}</span>
                  <span className="text-xs sm:text-sm text-teal-400 flex-shrink-0">$NEXQ</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center text-xs text-gray-400">
                    <FaChartLine size={12} className="mr-1 text-green-400 flex-shrink-0" />
                    <span className="break-words">+50 last week</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-400 p-0 h-auto text-xs self-start sm:self-auto"
                    asChild
                  >
                    <Link href="/transactions" className="flex items-center gap-1">
                      <span>View History</span>
                      <ChevronRight size={12} className="flex-shrink-0" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Security Score */}
          <AnimatedSection animation="fade-up" delay={0.2} className="col-span-1">
            <Card className="bg-black/40 border-gray-800 hover:border-teal-500/30 transition-all duration-200 h-full">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt size={12} className="text-white sm:text-sm" />
                  </div>
                  <span>Security Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white">{securityScore}%</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                    Protected
                  </span>
                </div>
                <Progress value={securityScore} className="h-2 bg-gray-800 mb-3 sm:mb-4" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock size={12} className="mr-1 flex-shrink-0" />
                    <span className="break-words">Last scan: 2 hours ago</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-400 p-0 h-auto text-xs self-start sm:self-auto"
                    asChild
                  >
                    <Link href="/security" className="flex items-center gap-1">
                      <span>View Details</span>
                      <ChevronRight size={12} className="flex-shrink-0" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Referrals */}
          <AnimatedSection animation="fade-up" delay={0.3} className="col-span-1 md:col-span-2 xl:col-span-1">
            <Card className="bg-black/40 border-gray-800 hover:border-teal-500/30 transition-all duration-200 h-full">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <FaUsers size={12} className="text-white sm:text-sm" />
                  </div>
                  <span>Referral Program</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-white">2</span>
                  <span className="text-xs sm:text-sm text-gray-400 break-words">Invites Sent</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center text-xs text-gray-400">
                    <FaChartLine size={12} className="mr-1 text-teal-400 flex-shrink-0" />
                    <span className="break-words">200 $NEXQ earned</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-400 p-0 h-auto text-xs self-start sm:self-auto"
                    asChild
                  >
                    <Link href="/referrals" className="flex items-center gap-1">
                      <span>Invite Friends</span>
                      <ChevronRight size={12} className="flex-shrink-0" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Activity Section - Takes 2/3 of the width on large screens */}
          <AnimatedSection animation="fade-up" delay={0.4} className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Activity Tabs */}
            <Card className="bg-black/40 border-gray-800">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaChartBar size={12} className="text-white sm:text-sm" />
                  </div>
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription className="break-words">Your latest transactions and security events</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="transactions" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="transactions" className="text-xs sm:text-sm">
                      Transactions
                    </TabsTrigger>
                    <TabsTrigger value="security" className="text-xs sm:text-sm">
                      Security Events
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="transactions" className="space-y-3 sm:space-y-4">
                    {/* Transaction items */}
                    <AnimatedSection animation="fade-up" delay={0.1}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-full bg-red-500/20 text-red-400 flex-shrink-0">
                            <FaArrowUp size={12} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white break-words">Sent $NEXQ</div>
                            <div className="text-xs text-gray-400 break-all">To: 0x8A5e...62CB</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-medium text-red-400">-50 $NEXQ</div>
                          <div className="text-xs text-gray-400">1 hour ago</div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={0.2}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                            <FaArrowDown size={12} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white break-words">Received $NEXQ</div>
                            <div className="text-xs text-gray-400 break-all">From: 0x3F5e...62CB</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-medium text-green-400">+250 $NEXQ</div>
                          <div className="text-xs text-gray-400">1 day ago</div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={0.3}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-400 flex-shrink-0">
                            <Clock size={12} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white break-words">Pending Transfer</div>
                            <div className="text-xs text-gray-400 break-all">To: 0x9B5e...62CB</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-medium text-yellow-400">-25 $NEXQ</div>
                          <div className="text-xs text-gray-400">Just now</div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-gray-700 text-gray-300 hover:text-white text-xs sm:text-sm"
                      asChild
                    >
                      <Link href="/transactions">View All Transactions</Link>
                    </Button>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-3 sm:space-y-4">
                    {/* Security events */}
                    <AnimatedSection animation="fade-up" delay={0.1}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                            <CheckCircle size={12} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white break-words">Security Scan Completed</div>
                            <div className="text-xs text-gray-400 break-words">No threats detected</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-gray-400">2 hours ago</div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={0.2}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-400 flex-shrink-0">
                            <AlertTriangle size={12} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white break-words">Login Attempt</div>
                            <div className="text-xs text-gray-400 break-words">New location detected</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-gray-400">Yesterday</div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={0.3}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                            <FaShieldAlt size={12} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white break-words">AI Protection Updated</div>
                            <div className="text-xs text-gray-400 break-words">Latest security protocols applied</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-gray-400">3 days ago</div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-gray-700 text-gray-300 hover:text-white text-xs sm:text-sm"
                      asChild
                    >
                      <Link href="/security">View Security Center</Link>
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Security Features Overview */}
            <AnimatedSection animation="fade-up" delay={0.5}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt size={12} className="text-white sm:text-sm" />
                    </div>
                    <span>Security Features</span>
                  </CardTitle>
                  <CardDescription className="break-words">Your active protection measures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                    {/* Feature cards */}
                    <AnimatedSection
                      animation="fade-up"
                      delay={0.1}
                      className="bg-gray-900/30 rounded-lg p-3 sm:p-4 border border-gray-800"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-full bg-teal-500/20 text-teal-400 flex-shrink-0">
                          <FaUserShield size={14} />
                        </div>
                        <h3 className="text-sm font-medium text-white break-words">AI Protection</h3>
                      </div>
                      <p className="text-xs text-gray-300 break-words mb-2">
                        Actively monitoring for suspicious activities and adapting to new threats.
                      </p>
                      <div className="flex items-center">
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          Active
                        </span>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection
                      animation="fade-up"
                      delay={0.2}
                      className="bg-gray-900/30 rounded-lg p-3 sm:p-4 border border-gray-800"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-full bg-teal-500/20 text-teal-400 flex-shrink-0">
                          <FaBolt size={14} />
                        </div>
                        <h3 className="text-sm font-medium text-white break-words">Real-time Alerts</h3>
                      </div>
                      <p className="text-xs text-gray-300 break-words mb-2">
                        Instant notifications about potential security threats to your wallet.
                      </p>
                      <div className="flex items-center">
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          Active
                        </span>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection
                      animation="fade-up"
                      delay={0.3}
                      className="bg-gray-900/30 rounded-lg p-3 sm:p-4 border border-gray-800 md:col-span-2 xl:col-span-1"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-full bg-teal-500/20 text-teal-400 flex-shrink-0">
                          <FaLock size={14} />
                        </div>
                        <h3 className="text-sm font-medium text-white break-words">Quantum Security</h3>
                      </div>
                      <p className="text-xs text-gray-300 break-words mb-2">
                        Future-proof encryption that can withstand attacks from quantum computers.
                      </p>
                      <div className="flex items-center">
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          Active
                        </span>
                      </div>
                    </AnimatedSection>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </AnimatedSection>

          {/* Right Sidebar - Takes 1/3 of the width on large screens */}
          <AnimatedSection animation="fade-up" delay={0.6} className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card className="bg-black/40 border-gray-800">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <FaBolt size={12} className="text-white sm:text-sm" />
                  </div>
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <Button variant="outline" className="w-full justify-start text-left h-auto py-2 sm:py-3" asChild>
                  <Link href="/transactions" className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <FaExchangeAlt size={8} className="text-white sm:text-xs" />
                    </div>
                    <span className="text-xs sm:text-sm break-words">Send/Receive Tokens</span>
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left h-auto py-2 sm:py-3" asChild>
                  <Link href="/security" className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt size={8} className="text-white sm:text-xs" />
                    </div>
                    <span className="text-xs sm:text-sm break-words">Run Security Scan</span>
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left h-auto py-2 sm:py-3" asChild>
                  <Link href="/earn" className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                      <FaChartLine size={8} className="text-white sm:text-xs" />
                    </div>
                    <span className="text-xs sm:text-sm break-words">Earn $NEXQ Tokens</span>
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left h-auto py-2 sm:py-3" asChild>
                  <Link href="/referrals" className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <FaUsers size={8} className="text-white sm:text-xs" />
                    </div>
                    <span className="text-xs sm:text-sm break-words">Invite Friends</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Security Recommendations */}
            <AnimatedSection animation="fade-up" delay={0.7}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt size={12} className="text-white sm:text-sm" />
                    </div>
                    <span>Security Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-white break-words">Enable Two-Factor Authentication</h4>
                      <p className="text-xs text-gray-400 mt-1 break-words">
                        Add an extra layer of security to your account with 2FA.
                      </p>
                      <Button size="sm" className="mt-2 h-7 sm:h-8 text-xs">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/30 border border-gray-800">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-white break-words">Strong Password</h4>
                      <p className="text-xs text-gray-400 mt-1 break-words">
                        Your password meets our security requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/30 border border-gray-800">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-white break-words">Email Verified</h4>
                      <p className="text-xs text-gray-400 mt-1 break-words">Your email address has been verified.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Token Activity Chart */}
            <AnimatedSection animation="fade-up" delay={0.8}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <FaChartBar size={12} className="text-white sm:text-sm" />
                    </div>
                    <span>Token Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 sm:h-40 flex items-end justify-between gap-1">
                    {[35, 28, 45, 65, 53, 80, 70].map((height, i) => (
                      <div key={i} className="relative group flex-1">
                        <div
                          className="bg-gradient-to-t from-teal-500/50 to-teal-500/80 rounded-t-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {height}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                  <div className="mt-3 sm:mt-4 text-center">
                    <p className="text-xs text-gray-400 break-words">Weekly token activity</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
