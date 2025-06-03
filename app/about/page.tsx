import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Zap, Lock } from "lucide-react"
import AnimatedSection from "@/components/animated-section"

export default function AboutPage() {
  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Page header */}
        <AnimatedSection animation="fade-up" className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-teal-400 mb-4">About NexsoQurity</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Pioneering the future of digital asset security with AI-powered protection
          </p>
        </AnimatedSection>

        {/* Mission statement section */}
        <AnimatedSection animation="fade-up" delay={0.1} className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At NexsoQurity, we're on a mission to revolutionize digital asset security. In a world where cyber
                threats are constantly evolving, we believe that everyone deserves access to cutting-edge protection for
                their digital investments.
              </p>
              <p className="text-gray-300">
                Our platform combines the power of artificial intelligence with quantum-resistant encryption to create a
                security solution that's not just effective today, but future-proofed for tomorrow's challenges.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Features section */}
        <AnimatedSection animation="fade-up" delay={0.2} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose NexsoQurity?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Advanced Protection */}
            <AnimatedSection animation="fade-up" delay={0.3} className="h-full">
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced Protection</h3>
                  <p className="text-gray-300">
                    Our AI-powered security system continuously monitors for threats and adapts to new attack vectors.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Feature 2: Lightning Fast */}
            <AnimatedSection animation="fade-up" delay={0.4} className="h-full">
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-300">
                    Experience seamless security that doesn't slow you down, with real-time threat detection and
                    response.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Feature 3: Quantum-Resistant */}
            <AnimatedSection animation="fade-up" delay={0.5} className="h-full">
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Quantum-Resistant</h3>
                  <p className="text-gray-300">
                    Future-proof your assets with encryption designed to withstand the computational power of quantum
                    computers.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Call to action */}
        <AnimatedSection animation="fade-up" delay={0.6} className="text-center">
          <Button asChild size="lg">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </AnimatedSection>
      </div>
    </div>
  )
}
