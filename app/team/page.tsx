"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MapPin, Award, ExternalLink, Mail, Briefcase, GraduationCap, Star } from "lucide-react"
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import AnimatedSection from "@/components/animated-section"

export default function TeamPage() {
  const coreTeam = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former security engineer at Google with 10+ years in cybersecurity and blockchain technology.",
      image: "/placeholder.svg?height=200&width=200",
      location: "San Francisco, CA",
      experience: "10+ years",
      education: "MIT Computer Science",
      achievements: ["Forbes 30 Under 30", "DEF CON Speaker", "Published Security Researcher"],
      social: {
        twitter: "https://twitter.com/alexchen",
        linkedin: "https://linkedin.com/in/alexchen",
        github: "https://github.com/alexchen",
      },
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Co-Founder",
      bio: "AI/ML expert with experience at OpenAI and Tesla. PhD in Machine Learning from Stanford.",
      image: "/placeholder.svg?height=200&width=200",
      location: "Austin, TX",
      experience: "8+ years",
      education: "Stanford PhD ML",
      achievements: ["AI Research Pioneer", "Tesla Autopilot Team", "20+ Patents"],
      social: {
        twitter: "https://twitter.com/sarahrodriguez",
        linkedin: "https://linkedin.com/in/sarahrodriguez",
      },
    },
    {
      name: "Marcus Johnson",
      role: "Head of Security",
      bio: "Cybersecurity veteran with experience at NSA and leading fintech companies.",
      image: "/placeholder.svg?height=200&width=200",
      location: "Washington, DC",
      experience: "12+ years",
      education: "Carnegie Mellon Cybersecurity",
      achievements: ["NSA Veteran", "CISSP Certified", "Security Conference Speaker"],
      social: {
        linkedin: "https://linkedin.com/in/marcusjohnson",
      },
    },
    {
      name: "Emily Zhang",
      role: "Head of Product",
      bio: "Product management expert from Apple and Coinbase, specializing in user experience design.",
      image: "/placeholder.svg?height=200&width=200",
      location: "Cupertino, CA",
      experience: "7+ years",
      education: "UC Berkeley Business",
      achievements: ["Apple Design Award", "Product Hunt #1", "UX Innovation Leader"],
      social: {
        twitter: "https://twitter.com/emilyzhang",
        linkedin: "https://linkedin.com/in/emilyzhang",
      },
    },
    {
      name: "David Kim",
      role: "Lead Blockchain Developer",
      bio: "Smart contract specialist with contributions to major DeFi protocols and security audits.",
      image: "/placeholder.svg?height=200&width=200",
      location: "Seoul, South Korea",
      experience: "6+ years",
      education: "KAIST Computer Science",
      achievements: ["DeFi Protocol Contributor", "Smart Contract Auditor", "Ethereum Foundation Grant"],
      social: {
        github: "https://github.com/davidkim",
        linkedin: "https://linkedin.com/in/davidkim",
      },
    },
    {
      name: "Lisa Thompson",
      role: "Head of Marketing",
      bio: "Growth marketing expert from Stripe and Binance, specializing in crypto and fintech marketing.",
      image: "/placeholder.svg?height=200&width=200",
      location: "London, UK",
      experience: "9+ years",
      education: "Oxford Marketing",
      achievements: ["Stripe Growth Team", "Crypto Marketing Pioneer", "Marketing Week Award"],
      social: {
        twitter: "https://twitter.com/lisathompson",
        linkedin: "https://linkedin.com/in/lisathompson",
      },
    },
  ]

  const advisors = [
    {
      name: "Dr. Robert Williams",
      role: "Security Advisor",
      bio: "Former CISO at JPMorgan Chase, cybersecurity thought leader with 20+ years experience.",
      image: "/placeholder.svg?height=150&width=150",
      achievements: ["Fortune 500 CISO", "Cybersecurity Hall of Fame", "Industry Keynote Speaker"],
      social: {
        linkedin: "https://linkedin.com/in/robertwilliams",
      },
    },
    {
      name: "Jennifer Lee",
      role: "Blockchain Advisor",
      bio: "Co-founder of leading DeFi protocol, early Bitcoin adopter and blockchain evangelist.",
      image: "/placeholder.svg?height=150&width=150",
      achievements: ["DeFi Pioneer", "Blockchain Investor", "Crypto Thought Leader"],
      social: {
        twitter: "https://twitter.com/jenniferlee",
        linkedin: "https://linkedin.com/in/jenniferlee",
      },
    },
    {
      name: "Michael Brown",
      role: "Business Advisor",
      bio: "Former VP at Goldman Sachs, fintech investor with expertise in scaling technology companies.",
      image: "/placeholder.svg?height=150&width=150",
      achievements: ["Goldman Sachs VP", "Fintech Investor", "Startup Mentor"],
      social: {
        linkedin: "https://linkedin.com/in/michaelbrown",
      },
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const SocialLinks = ({ social }: { social: any }) => (
    <div className="flex gap-2">
      {social.twitter && (
        <Button size="sm" variant="outline" className="p-2">
          <FaTwitter className="h-3 w-3" />
        </Button>
      )}
      {social.linkedin && (
        <Button size="sm" variant="outline" className="p-2">
          <FaLinkedin className="h-3 w-3" />
        </Button>
      )}
      {social.github && (
        <Button size="sm" variant="outline" className="p-2">
          <FaGithub className="h-3 w-3" />
        </Button>
      )}
    </div>
  )

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">Our Team</h1>
              <p className="text-sm sm:text-base text-gray-400">
                Meet the experts building the future of wallet security
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Team Stats */}
        <AnimatedSection animation="fade-up" delay={0.1} className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-black/40 border-gray-800 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-teal-400">15+</div>
                <div className="text-sm text-gray-400">Team Members</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-gray-800 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-teal-400">50+</div>
                <div className="text-sm text-gray-400">Years Combined Experience</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-gray-800 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-teal-400">8</div>
                <div className="text-sm text-gray-400">Countries</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-gray-800 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-teal-400">3</div>
                <div className="text-sm text-gray-400">Industry Advisors</div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Core Team */}
        <AnimatedSection animation="fade-up" delay={0.2} className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Star className="h-6 w-6 text-teal-400" />
              Core Team
            </h2>
            <p className="text-gray-400">The founding members and key leaders driving NexsoQurity forward</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.map((member, index) => (
              <AnimatedSection key={member.name} animation="fade-up" delay={0.1 * (index + 1)}>
                <Card className="bg-black/40 border-gray-800 hover:border-teal-500/30 transition-all duration-200 h-full">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-teal-500 to-fuchsia-600">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg break-words">{member.name}</CardTitle>
                    <CardDescription className="text-teal-400 font-medium break-words">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300 break-words">{member.bio}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="break-words">{member.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Briefcase className="h-3 w-3 flex-shrink-0" />
                        <span className="break-words">{member.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <GraduationCap className="h-3 w-3 flex-shrink-0" />
                        <span className="break-words">{member.education}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Key Achievements</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.achievements.map((achievement, i) => (
                          <Badge key={i} variant="outline" className="text-xs break-words">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <SocialLinks social={member.social} />
                      <Button size="sm" variant="ghost" className="text-teal-400 p-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Advisors */}
        <AnimatedSection animation="fade-up" delay={0.3} className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Award className="h-6 w-6 text-fuchsia-400" />
              Advisors
            </h2>
            <p className="text-gray-400">Industry experts guiding our strategic direction</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <AnimatedSection key={advisor.name} animation="fade-up" delay={0.1 * (index + 1)}>
                <Card className="bg-black/40 border-gray-800 hover:border-fuchsia-500/30 transition-all duration-200 h-full">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={advisor.image || "/placeholder.svg"} alt={advisor.name} />
                      <AvatarFallback className="bg-gradient-to-br from-fuchsia-500 to-purple-600">
                        {getInitials(advisor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg break-words">{advisor.name}</CardTitle>
                    <CardDescription className="text-fuchsia-400 font-medium break-words">
                      {advisor.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300 break-words">{advisor.bio}</p>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {advisor.achievements.map((achievement, i) => (
                          <Badge key={i} variant="outline" className="text-xs break-words">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center pt-2">
                      <SocialLinks social={advisor.social} />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Join Our Team */}
        <AnimatedSection animation="fade-up" delay={0.4}>
          <Card className="bg-gradient-to-r from-teal-900/30 to-fuchsia-900/30 border-teal-800/30">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Join Our Team</h3>
                <p className="text-gray-300 mb-6 break-words">
                  We're always looking for talented individuals who share our passion for security and innovation. Join
                  us in building the future of digital asset protection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-teal-500 to-fuchsia-600">View Open Positions</Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Company Culture
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
