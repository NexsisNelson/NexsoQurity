"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Users, Globe, FileText, Calendar, Mail, AlertTriangle } from "lucide-react"
import AnimatedSection from "@/components/animated-section"

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 1, 2024"

  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5 text-blue-400" />,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Email address and name when you create an account",
            "Wallet addresses you connect to our platform",
            "Transaction history and token balances",
            "Communication preferences and settings",
          ],
        },
        {
          subtitle: "Technical Information",
          items: [
            "IP address and device information",
            "Browser type and operating system",
            "Usage patterns and feature interactions",
            "Error logs and performance metrics",
          ],
        },
        {
          subtitle: "Security Data",
          items: [
            "Security scan results and threat assessments",
            "Authentication logs and access patterns",
            "Risk scores and security recommendations",
            "Incident reports and security events",
          ],
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <Users className="h-5 w-5 text-green-400" />,
      content: [
        {
          subtitle: "Service Provision",
          items: [
            "Provide and maintain our security services",
            "Process transactions and manage your wallet",
            "Deliver AI-powered threat detection",
            "Send important security alerts and notifications",
          ],
        },
        {
          subtitle: "Platform Improvement",
          items: [
            "Analyze usage patterns to improve our services",
            "Develop new security features and capabilities",
            "Conduct research on emerging threats",
            "Optimize platform performance and reliability",
          ],
        },
        {
          subtitle: "Communication",
          items: [
            "Send service updates and security alerts",
            "Provide customer support and assistance",
            "Share educational content about security",
            "Notify you about platform changes and updates",
          ],
        },
      ],
    },
    {
      title: "Information Sharing",
      icon: <Globe className="h-5 w-5 text-yellow-400" />,
      content: [
        {
          subtitle: "We Do Not Sell Your Data",
          items: [
            "We never sell your personal information to third parties",
            "We do not share your data for marketing purposes",
            "Your wallet information remains private and secure",
            "We maintain strict confidentiality of your activities",
          ],
        },
        {
          subtitle: "Limited Sharing Scenarios",
          items: [
            "With service providers who help us operate our platform",
            "When required by law or legal process",
            "To protect our rights and prevent fraud",
            "In case of business transfer or acquisition",
          ],
        },
        {
          subtitle: "Anonymized Data",
          items: [
            "We may share aggregated, anonymized statistics",
            "Threat intelligence data without personal identifiers",
            "Research data that cannot be traced back to individuals",
            "Industry reports based on anonymized trends",
          ],
        },
      ],
    },
    {
      title: "Data Security",
      icon: <Lock className="h-5 w-5 text-red-400" />,
      content: [
        {
          subtitle: "Encryption and Protection",
          items: [
            "All data is encrypted in transit and at rest",
            "We use industry-standard security protocols",
            "Regular security audits and penetration testing",
            "Multi-factor authentication for all accounts",
          ],
        },
        {
          subtitle: "Access Controls",
          items: [
            "Strict employee access controls and monitoring",
            "Role-based permissions for data access",
            "Regular access reviews and updates",
            "Comprehensive audit logs for all data access",
          ],
        },
        {
          subtitle: "Infrastructure Security",
          items: [
            "Secure cloud infrastructure with redundancy",
            "Regular backups and disaster recovery procedures",
            "Network security monitoring and intrusion detection",
            "Physical security controls for data centers",
          ],
        },
      ],
    },
    {
      title: "Your Rights and Choices",
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      content: [
        {
          subtitle: "Data Access and Control",
          items: [
            "Request access to your personal information",
            "Update or correct your account information",
            "Delete your account and associated data",
            "Export your data in a portable format",
          ],
        },
        {
          subtitle: "Privacy Settings",
          items: [
            "Control what information is collected",
            "Manage communication preferences",
            "Opt out of non-essential data processing",
            "Configure security and privacy settings",
          ],
        },
        {
          subtitle: "Legal Rights",
          items: [
            "Right to be informed about data processing",
            "Right to rectification of inaccurate data",
            "Right to erasure (right to be forgotten)",
            "Right to data portability and access",
          ],
        },
      ],
    },
  ]

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl w-full">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">Privacy Policy</h1>
              <p className="text-sm sm:text-base text-gray-400">How we protect and handle your information</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Last updated: {lastUpdated}</span>
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
                At NexsoQurity, we are committed to protecting your privacy and ensuring the security of your personal
                information. This Privacy Policy explains how we collect, use, share, and protect your information when
                you use our AI-powered wallet security platform.
              </p>
              <p className="text-gray-300 break-words">
                We believe in transparency and want you to understand exactly how your data is handled. This policy
                applies to all users of our platform, including our website, mobile applications, and API services.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-400 mb-1">Important Note</h4>
                    <p className="text-sm text-gray-300 break-words">
                      By using NexsoQurity services, you agree to the collection and use of information in accordance
                      with this policy.
                    </p>
                  </div>
                </div>
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
                  <div className="space-y-6">
                    {section.content.map((subsection, i) => (
                      <div key={i}>
                        <h4 className="font-medium text-white mb-3 break-words">{subsection.subtitle}</h4>
                        <ul className="space-y-2">
                          {subsection.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-300 break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Data Retention */}
        <AnimatedSection animation="fade-up" delay={0.6} className="mt-8">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-400" />
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 break-words">
                We retain your personal information only for as long as necessary to provide our services and fulfill
                the purposes outlined in this privacy policy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                  <h4 className="font-medium text-white mb-2">Account Data</h4>
                  <p className="text-sm text-gray-300 break-words">
                    Retained while your account is active and for 30 days after deletion
                  </p>
                </div>
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                  <h4 className="font-medium text-white mb-2">Transaction History</h4>
                  <p className="text-sm text-gray-300 break-words">
                    Kept for 7 years for regulatory compliance and audit purposes
                  </p>
                </div>
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                  <h4 className="font-medium text-white mb-2">Security Logs</h4>
                  <p className="text-sm text-gray-300 break-words">
                    Maintained for 2 years for security analysis and threat detection
                  </p>
                </div>
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                  <h4 className="font-medium text-white mb-2">Analytics Data</h4>
                  <p className="text-sm text-gray-300 break-words">
                    Anonymized data may be retained indefinitely for research
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Contact Information */}
        <AnimatedSection animation="fade-up" delay={0.7} className="mt-8">
          <Card className="bg-gradient-to-r from-teal-900/30 to-blue-900/30 border-teal-800/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Questions About Privacy?</h3>
              <p className="text-gray-300 mb-6 break-words">
                If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to
                contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-teal-400" />
                  <span className="text-sm text-gray-300">privacy@nexsoqurity.com</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Response within 48 hours
                </Badge>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
