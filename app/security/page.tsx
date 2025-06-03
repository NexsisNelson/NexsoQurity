"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, RefreshCw, AlertTriangle, Loader2, Eye } from "lucide-react"
import { FaShieldAlt, FaBell } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import Logo from "@/components/logo"
import AnimatedSection from "@/components/animated-section"

interface SecurityCheckProps {
  title: string
  description: string
  status: "success" | "warning" | "error"
}

const SecurityCheck: React.FC<SecurityCheckProps> = ({ title, description, status }) => {
  let icon
  let color

  switch (status) {
    case "success":
      icon = <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
      color = "text-green-500"
      break
    case "warning":
      icon = <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
      color = "text-yellow-500"
      break
    case "error":
      icon = <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
      color = "text-red-500"
      break
    default:
      icon = null
      color = "text-gray-500"
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium break-words">{title}</div>
        <div className="text-xs text-gray-400 break-words">{description}</div>
      </div>
      <div className={`${color} flex-shrink-0`}>{icon}</div>
    </div>
  )
}

export default function SecurityPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [securityScore, setSecurityScore] = useState(75)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/security")
    }
  }, [user, isLoading, router])

  const handleToggle2FA = async () => {
    setIs2FAEnabled(!is2FAEnabled)

    toast({
      title: is2FAEnabled ? "2FA Disabled" : "2FA Enabled",
      description: is2FAEnabled
        ? "Two-factor authentication has been turned off"
        : "Two-factor authentication has been successfully enabled",
    })

    // Update security score
    if (!is2FAEnabled) {
      setSecurityScore(90)
    } else {
      setSecurityScore(75)
    }
  }

  const startSecurityScan = async () => {
    setIsScanning(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Security Scan Complete",
        description: "No threats detected. Your wallet is secure.",
      })
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "There was an error during the security scan",
        variant: "destructive",
      })
    } finally {
      setIsScanning(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreIndicatorColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-teal-500"
    if (score >= 60) return "bg-gradient-to-r from-yellow-500 to-amber-500"
    return "bg-gradient-to-r from-red-500 to-pink-500"
  }

  if (isLoading || !user) {
    return (
      <div className="relative z-20 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl w-full">
        <AnimatedSection animation="fade-up" className="mb-4 sm:mb-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2 break-words">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                <FaShieldAlt size={12} className="text-white sm:text-sm" />
              </div>
              <span>Wallet Security</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 break-words">
              Manage security settings and protect your digital assets
            </p>
          </div>
          <div className="flex-shrink-0 self-center lg:self-auto">
            <Logo size="medium" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <AnimatedSection animation="fade-up" delay={0.2} className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-md border-gray-800 h-full">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Eye size={12} className="text-white sm:text-sm" />
                      </div>
                      <span>Security Score</span>
                    </CardTitle>
                    <CardDescription className="break-words">Overall protection level of your wallet</CardDescription>
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-bold ${getScoreColor(securityScore)} flex-shrink-0 self-center sm:self-auto`}
                  >
                    {securityScore}%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress
                  value={securityScore}
                  className="h-2 bg-gray-800 w-full"
                  indicatorClassName={`${getScoreIndicatorColor(securityScore)}`}
                />

                <div className="space-y-3 sm:space-y-4">
                  <AnimatedSection animation="fade-up" delay={0.1}>
                    <SecurityCheck title="Password Strength" description="Your password is strong" status="success" />
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={0.2}>
                    <SecurityCheck
                      title="Two-Factor Authentication (2FA)"
                      description={is2FAEnabled ? "2FA is enabled" : "Not enabled - recommended"}
                      status={is2FAEnabled ? "success" : "warning"}
                    />
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={0.3}>
                    <SecurityCheck
                      title="Recent Login Alerts"
                      description="Enabled for suspicious activities"
                      status="success"
                    />
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={0.4}>
                    <SecurityCheck
                      title="AI Protection"
                      description="Active and monitoring your wallet"
                      status="success"
                    />
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={0.5}>
                    <SecurityCheck
                      title="Recovery Email"
                      description="Not verified - secure your account"
                      status="error"
                    />
                  </AnimatedSection>
                </div>
              </CardContent>
              <CardFooter className="pt-3 sm:pt-4">
                <Button
                  onClick={startSecurityScan}
                  disabled={isScanning}
                  size="sm"
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 text-white text-xs sm:text-sm h-9 sm:h-10"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin mr-2 flex-shrink-0" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span>Run Security Scan</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.3} className="space-y-4">
            <Card className="bg-black/40 backdrop-blur-md border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 break-words">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt size={12} className="text-white sm:text-sm" />
                  </div>
                  <span>Quantum Protection</span>
                </CardTitle>
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 w-fit text-xs">Active</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-fuchsia-600/20 flex items-center justify-center flex-shrink-0">
                    <FaBell className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-300 break-words">
                      NexsoQurity's AI-powered protection is actively securing your wallet against quantum computing
                      threats.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 break-words">Last scan: 5 minutes ago</div>
              </CardContent>
            </Card>

            <AnimatedSection animation="fade-up" delay={0.4}>
              <Alert className="bg-yellow-100 border-yellow-200 text-yellow-900">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <AlertTitle className="break-words">Important</AlertTitle>
                <AlertDescription className="break-words">
                  Enable two-factor authentication for enhanced security.
                </AlertDescription>
              </Alert>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
