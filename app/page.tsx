"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Lock, ChevronRight, Coins } from "lucide-react"
import Logo from "@/components/logo"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import SignupForm from "@/components/signup-form"
import { FaCoins, FaExchangeAlt, FaChartPie, FaLock, FaRocket } from "react-icons/fa"
import AnimatedSection from "@/components/animated-section"

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative z-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <AnimatedSection
              animation="fade-in"
              delay={0.1}
              className="flex flex-col space-y-4 sm:space-y-6 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Logo size="medium" />
                <h2 className="text-lg sm:text-xl font-bold text-teal-400">NexsoQurity</h2>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Secure Your <span className="text-teal-400 break-words">Digital Assets</span> With AI
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0">
                Next-generation wallet protection powered by artificial intelligence and quantum-resistant encryption.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button size="lg" className="w-full sm:w-auto min-w-[140px] text-sm sm:text-base">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {isClient && !user && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base"
                    onClick={() => router.push("/login")}
                  >
                    Log In
                  </Button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-teal-400 flex-shrink-0" />
                  <span>AI Protection</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-1 text-teal-400 flex-shrink-0" />
                  <span>Quantum-Secure</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Column - Signup Form */}
            <AnimatedSection
              animation="fade-in"
              delay={0.3}
              className="w-full max-w-md mx-auto lg:max-w-none bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8"
            >
              <SignupForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-20 bg-black/60 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why Choose NexsoQurity</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Our platform offers cutting-edge security features to keep your digital assets safe.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <AnimatedSection
              animation="fade-up"
              delay={0.1}
              className="bg-black/40 border border-gray-800 rounded-xl p-4 sm:p-6 transition-all hover:border-teal-500/50 h-full"
            >
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Shield className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center md:text-left">
                AI Protection
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base text-center md:text-left">
                Our AI continuously monitors for suspicious activities and adapts to new threats.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href="/about" className="text-teal-400 flex items-center text-sm hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Feature 2 */}
            <AnimatedSection
              animation="fade-up"
              delay={0.2}
              className="bg-black/40 border border-gray-800 rounded-xl p-4 sm:p-6 transition-all hover:border-teal-500/50 h-full"
            >
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Zap className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center md:text-left">
                Real-time Alerts
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base text-center md:text-left">
                Get instant notifications about potential security threats to your wallet.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href="/about" className="text-teal-400 flex items-center text-sm hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Feature 3 */}
            <AnimatedSection
              animation="fade-up"
              delay={0.3}
              className="bg-black/40 border border-gray-800 rounded-xl p-4 sm:p-6 transition-all hover:border-teal-500/50 h-full md:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Lock className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center md:text-left">
                Quantum Security
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base text-center md:text-left">
                Future-proof encryption that can withstand attacks from quantum computers.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href="/about" className="text-teal-400 flex items-center text-sm hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="relative z-20 py-12 sm:py-16 bg-black/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">About NexsoQurity</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-fuchsia-600 mx-auto"></div>
            </AnimatedSection>

            <AnimatedSection
              animation="fade-up"
              delay={0.2}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8"
            >
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-4">Our Mission</h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base">
                  NexsoQurity is dedicated to revolutionizing digital asset security through cutting-edge AI technology
                  and quantum-resistant encryption. In an increasingly vulnerable digital landscape, we provide
                  unparalleled protection for your cryptocurrency investments and blockchain assets.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-4">The Technology</h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base">
                  Our proprietary security system combines artificial intelligence with advanced cryptographic
                  techniques to create a dynamic defense mechanism that evolves with emerging threats. Unlike
                  traditional security solutions, NexsoQurity's AI continuously learns from global attack patterns to
                  preemptively protect your assets.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-4">Join the Revolution</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  By becoming part of the NexsoQurity ecosystem, you're not just securing your digital assets – you're
                  joining a community committed to shaping the future of blockchain security. Our early adopters program
                  rewards participants with exclusive benefits and the opportunity to influence our development roadmap.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Token Economics Section */}
      <section className="relative z-20 py-12 sm:py-16 bg-gradient-to-b from-black/60 to-black/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">$NEXQ Token Economics</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-fuchsia-600 mx-auto mb-4"></div>
              <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
                Understanding the utility, distribution, and value of our native token
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Token Info */}
              <AnimatedSection
                animation="slide-in-left"
                delay={0.2}
                className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 order-2 lg:order-1"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-6 flex items-center justify-center lg:justify-start">
                  <FaCoins className="mr-3 h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span>Token Utility</span>
                </h3>

                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-500/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <FaLock className="h-3 w-3 text-teal-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Security Services</h4>
                      <p className="text-xs sm:text-sm text-gray-300 break-words">
                        Access premium security features including AI-powered threat detection and quantum-resistant
                        encryption protocols.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-500/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <FaExchangeAlt className="h-3 w-3 text-teal-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Platform Governance</h4>
                      <p className="text-xs sm:text-sm text-gray-300 break-words">
                        Participate in decision-making processes regarding platform development, feature prioritization,
                        and security protocol updates.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-500/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <FaRocket className="h-3 w-3 text-teal-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Ecosystem Rewards</h4>
                      <p className="text-xs sm:text-sm text-gray-300 break-words">
                        Earn tokens by participating in security testing, referring new users, and contributing to the
                        platform's growth.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 sm:mt-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-4 sm:mb-6 flex items-center justify-center lg:justify-start">
                    <Coins className="mr-3 h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span>Token Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-800 text-center">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Total Supply</p>
                      <p className="text-lg sm:text-xl font-bold text-white break-words">100,000,000</p>
                      <p className="text-xs text-teal-400">$NEXQ</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-800 text-center">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Initial Circulation</p>
                      <p className="text-lg sm:text-xl font-bold text-white break-words">25,000,000</p>
                      <p className="text-xs text-teal-400">$NEXQ</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-800 text-center">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Token Type</p>
                      <p className="text-base sm:text-lg font-bold text-white">ERC-20</p>
                      <p className="text-xs text-gray-400 break-words">Polygon Network</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-800 text-center">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Launch Date</p>
                      <p className="text-base sm:text-lg font-bold text-white">Q4 2025</p>
                      <p className="text-xs text-gray-400 break-words">Mainnet Release</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Token Distribution Chart */}
              <AnimatedSection
                animation="slide-in-right"
                delay={0.2}
                className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 order-1 lg:order-2"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-6 flex items-center justify-center lg:justify-start">
                  <FaChartPie className="mr-3 h-5 w-5 text-fuchsia-400 flex-shrink-0" />
                  <span>Token Distribution</span>
                </h3>

                <div className="relative mb-6 sm:mb-8">
                  {/* Simple visual representation of token distribution */}
                  <div className="aspect-square max-w-[250px] sm:max-w-[300px] mx-auto relative">
                    {/* Community & Ecosystem - 40% */}
                    <div className="absolute inset-0 bg-teal-500 rounded-full"></div>

                    {/* Team & Advisors - 20% */}
                    <div
                      className="absolute inset-0 bg-fuchsia-600 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 50%)" }}
                    ></div>

                    {/* Treasury - 15% */}
                    <div
                      className="absolute inset-0 bg-amber-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 75% 100%)" }}
                    ></div>

                    {/* Marketing - 10% */}
                    <div
                      className="absolute inset-0 bg-blue-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 75% 100%, 25% 100%)" }}
                    ></div>

                    {/* Liquidity - 15% */}
                    <div
                      className="absolute inset-0 bg-purple-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 25% 100%, 0 100%, 0 50%)" }}
                    ></div>

                    {/* Center circle */}
                    <div className="absolute inset-[30%] bg-black rounded-full border-4 border-gray-800 flex items-center justify-center">
                      <FaCoins className="text-amber-400 h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-6 sm:mt-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-teal-500 rounded-sm mr-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-300 break-words">Community & Ecosystem (40%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-fuchsia-600 rounded-sm mr-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-300 break-words">Team & Advisors (20%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-sm mr-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-300 break-words">Treasury (15%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-sm mr-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-300 break-words">Marketing (10%)</span>
                    </div>
                    <div className="flex items-center sm:col-span-2 sm:justify-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-sm mr-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-300 break-words">Liquidity (15%)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-800 mt-4 sm:mt-6">
                  <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Token Vesting Schedule</h4>
                  <p className="text-xs sm:text-sm text-gray-300 mb-3 break-words">
                    To ensure long-term project stability and prevent market volatility, tokens are released according
                    to the following schedule:
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      <span className="break-words">Community tokens: 10% at TGE, remaining vested over 24 months</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      <span className="break-words">Team tokens: 6-month cliff, then vested over 36 months</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      <span className="break-words">Ecosystem rewards: Released based on milestone achievements</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 sm:mt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 text-sm sm:text-base"
                    asChild
                    size="lg"
                  >
                    <Link href="/earn" className="flex items-center justify-center">
                      Start Earning $NEXQ
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection
            animation="fade-up"
            className="bg-gradient-to-r from-teal-900/30 to-black/60 border border-teal-800/30 rounded-xl p-6 sm:p-8 lg:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 break-words">
                Ready to secure your digital future?
              </h2>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base px-4">
                Join thousands of users who trust NexsoQurity to protect their digital assets.
              </p>
              <Button size="lg" className="w-full sm:w-auto min-w-[180px] text-sm sm:text-base">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-gray-800 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Logo size="small" />
              <span className="text-white font-bold text-sm sm:text-base">NexsoQurity</span>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
              <Link href="/about" className="text-gray-400 hover:text-teal-400 text-xs sm:text-sm">
                About
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-teal-400 text-xs sm:text-sm">
                Contact
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-teal-400 text-xs sm:text-sm">
                FAQ
              </Link>
            </div>

            <div className="text-center md:text-right text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} NexsoQurity. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
