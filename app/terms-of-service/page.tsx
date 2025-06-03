"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, AlertTriangle, Shield, Users, Gavel, Calendar, Mail, ExternalLink } from "lucide-react"
import AnimatedSection from "@/components/animated-section"

export default function TermsOfServicePage() {
  const lastUpdated = "December 1, 2024"
  const effectiveDate = "December 1, 2024"

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <Scale className="h-5 w-5 text-blue-400" />,
      content: [
        "By accessing or using NexsoQurity services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any part of these terms, you may not use our services.",
        "These terms apply to all users, including visitors, registered users, and premium subscribers.",
        "We reserve the right to update these terms at any time, and continued use constitutes acceptance of any changes.",
      ],
    },
    {
      title: "Service Description",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      content: [
        "NexsoQurity provides AI-powered wallet security services including threat detection, risk assessment, and protection recommendations.",
        "Our platform offers both free and premium tiers with varying levels of security features and capabilities.",
        "We provide educational content, security tools, and community features to help users protect their digital assets.",
        "Services are provided 'as is' and we continuously work to improve and expand our offerings.",
      ],
    },
    {
      title: "User Responsibilities",
      icon: <Users className="h-5 w-5 text-yellow-400" />,
      content: [
        "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.",
        "You must provide accurate and complete information when creating an account and keep it updated.",
        "You agree not to use our services for any illegal, harmful, or unauthorized purposes.",
        "You are solely responsible for your wallet security decisions and any consequences of your actions.",
      ],
    },
    {
      title: "Prohibited Activities",
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      content: [
        "Attempting to gain unauthorized access to our systems, other user accounts, or computer networks.",
        "Using our services to facilitate money laundering, terrorism financing, or other illegal activities.",
        "Reverse engineering, decompiling, or attempting to extract source code from our platform.",
        "Interfering with or disrupting the integrity or performance of our services or data contained therein.",
      ],
    },
    {
      title: "Intellectual Property",
      icon: <FileText className="h-5 w-5 text-purple-400" />,
      content: [
        "All content, features, and functionality of NexsoQurity are owned by us and protected by copyright, trademark, and other intellectual property laws.",
        "You may not reproduce, distribute, modify, or create derivative works of our content without explicit written permission.",
        "User-generated content remains your property, but you grant us a license to use it in connection with our services.",
        "We respect intellectual property rights and expect users to do the same.",
      ],
    },
    {
      title: "Disclaimers and Limitations",
      icon: <Gavel className="h-5 w-5 text-orange-400" />,
      content: [
        "Our services are provided 'as is' without warranties of any kind, either express or implied.",
        "We do not guarantee that our services will be uninterrupted, error-free, or completely secure.",
        "You acknowledge that cryptocurrency and blockchain technologies involve inherent risks.",
        "Our liability is limited to the maximum extent permitted by applicable law.",
      ],
    },
  ]

  const importantNotices = [
    {
      title: "Beta Services",
      description: "Some features may be in beta and subject to changes or discontinuation.",
      type: "warning",
    },
    {
      title: "Regulatory Compliance",
      description: "Users must comply with all applicable laws and regulations in their jurisdiction.",
      type: "info",
    },
    {
      title: "Service Availability",
      description: "We strive for 99.9% uptime but cannot guarantee uninterrupted service.",
      type: "info",
    },
    {
      title: "Data Security",
      description: "While we implement strong security measures, no system is 100% secure.",
      type: "warning",
    },
  ]

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl w-full">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">Terms of Service</h1>
              <p className="text-sm sm:text-base text-gray-400">Legal terms and conditions for using NexsoQurity</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Last updated: {lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Effective: {effectiveDate}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Introduction */}
        <AnimatedSection animation="fade-up" delay={0.1} className="mb-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 break-words">
                Welcome to NexsoQurity. These Terms of Service ("Terms") govern your use of our AI-powered wallet
                security platform and services. Please read these terms carefully before using our services.
              </p>
              <p className="text-gray-300 break-words">
                These Terms constitute a legally binding agreement between you and NexsoQurity. By accessing or using
                our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Important Notices */}
        <AnimatedSection animation="fade-up" delay={0.2} className="mb-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Important Notices
              </CardTitle>
              <CardDescription>Key points you should be aware of</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {importantNotices.map((notice, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      notice.type === "warning"
                        ? "bg-yellow-500/10 border-yellow-500/30"
                        : "bg-blue-500/10 border-blue-500/30"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-2 ${notice.type === "warning" ? "text-yellow-400" : "text-blue-400"}`}
                    >
                      {notice.title}
                    </h4>
                    <p className="text-sm text-gray-300 break-words">{notice.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <AnimatedSection key={section.title} animation="fade-up" delay={0.1 * (index + 1)}>
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    {section.icon}
                    <span className="break-words">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-300 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Account Termination */}
        <AnimatedSection animation="fade-up" delay={0.7} className="mt-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                Account Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 break-words">
                Either party may terminate this agreement at any time. You may delete your account through your account
                settings or by contacting our support team.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                  <h4 className="font-medium text-white mb-2">User-Initiated Termination</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Delete account anytime through settings</li>
                    <li>• Data deletion within 30 days</li>
                    <li>• No penalties for termination</li>
                  </ul>
                </div>
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                  <h4 className="font-medium text-white mb-2">Service-Initiated Termination</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Violation of terms or policies</li>
                    <li>• Illegal or harmful activities</li>
                    <li>• 30-day notice when possible</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Governing Law */}
        <AnimatedSection animation="fade-up" delay={0.8} className="mt-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-purple-400" />
                Governing Law and Disputes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 break-words">
                These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict
                of law principles.
              </p>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h4 className="font-medium text-white mb-2">Dispute Resolution</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span>First, contact our support team to resolve issues informally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span>Binding arbitration for disputes that cannot be resolved informally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span>Class action lawsuits are waived in favor of individual arbitration</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Contact Information */}
        <AnimatedSection animation="fade-up" delay={0.9} className="mt-8">
          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Questions About These Terms?</h3>
              <p className="text-gray-300 mb-6 break-words">
                If you have any questions about these Terms of Service, please contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">legal@nexsoqurity.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Legal Documentation</span>
                </div>
              </div>
              <div className="mt-4">
                <Badge variant="outline" className="text-xs">
                  Response within 5 business days
                </Badge>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
