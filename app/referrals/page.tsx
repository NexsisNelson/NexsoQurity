"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, CheckCircle2, Share2, Users, TrendingUp, Award, LinkIcon } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Logo from "@/components/logo"

interface Referral {
  id: string
  name: string
  email: string
  date: string
  status: "pending" | "completed"
  reward: number
}

export default function ReferralsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [stats, setStats] = useState({
    totalReferrals: 0,
    pendingReferrals: 0,
    completedReferrals: 0,
    totalEarned: 0,
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/referrals")
    }
  }, [user, isLoading, router])

  // Load mock referral data
  useEffect(() => {
    if (user) {
      // Mock referral data
      const mockReferrals: Referral[] = [
        {
          id: "ref_1",
          name: "Alex Johnson",
          email: "alex@example.com",
          date: "2023-04-02",
          status: "completed",
          reward: 200,
        },
        {
          id: "ref_2",
          name: "Sarah Williams",
          email: "sarah@example.com",
          date: "2023-04-05",
          status: "pending",
          reward: 200,
        },
      ]

      setReferrals(mockReferrals)

      // Calculate stats
      const completed = mockReferrals.filter((r) => r.status === "completed")
      const pending = mockReferrals.filter((r) => r.status === "pending")

      setStats({
        totalReferrals: mockReferrals.length,
        pendingReferrals: pending.length,
        completedReferrals: completed.length,
        totalEarned: completed.reduce((sum, r) => sum + r.reward, 0),
      })
    }
  }, [user])

  const referralLink = `https://nexsoqurity.com/signup?ref=${user?.id}`

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "Referral link copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join NexsoQurity",
          text: "Check out NexsoQurity - AI-powered wallet security. Use my referral link:",
          url: referralLink,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      copyReferralLink()
    }
  }

  if (isLoading || !user) {
    return (
      <div className="relative z-20 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-6 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-6 flex flex-col md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Users size={20} className="text-teal-400" />
              Referral Program
            </h1>
            <p className="text-sm text-gray-400">Invite friends to join NexsoQurity and earn $NEXQ tokens</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto">
            <Logo size="medium" />
          </div>
        </header>

        <div className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 shadow-xl p-4 md:p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <LinkIcon size={16} className="text-gray-400" />
            Your Referral Link
          </h2>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              value={referralLink}
              readOnly
              className="bg-black/30 border-gray-700 text-gray-100 font-mono text-xs"
            />
            <div className="flex gap-2">
              <Button
                onClick={copyReferralLink}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-100 hover:bg-gray-800/50 text-xs"
              >
                {copied ? <CheckCircle2 className="h-3 w-3 mr-2 text-teal-500" /> : <Copy className="h-3 w-3 mr-2" />}
                Copy
              </Button>
              <Button
                onClick={shareReferralLink}
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 text-white text-xs"
              >
                <Share2 className="h-3 w-3 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Earn 200 $NEXQ tokens for each friend who signs up and completes verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 p-4">
            <div className="flex items-center mb-2">
              <div className="p-1.5 rounded-full bg-teal-500/20 text-teal-400 mr-3">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-medium text-white">Total Referrals</h3>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalReferrals}</p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 p-4">
            <div className="flex items-center mb-2">
              <div className="p-1.5 rounded-full bg-fuchsia-500/20 text-fuchsia-400 mr-3">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-medium text-white">Completed</h3>
            </div>
            <p className="text-2xl font-bold text-white">{stats.completedReferrals}</p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 p-4">
            <div className="flex items-center mb-2">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-fuchsia-500/20 text-teal-400 mr-3">
                <Award className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-medium text-white">Tokens Earned</h3>
            </div>
            <p className="text-2xl font-bold text-white">
              {stats.totalEarned} <span className="text-xs text-teal-400">$NEXQ</span>
            </p>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 shadow-xl p-4 md:p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            Your Referrals
          </h2>

          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">You haven't referred anyone yet</p>
              <p className="text-sm text-gray-500 mt-2">Share your referral link to start earning rewards</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-3 text-gray-400 font-medium text-xs">Name</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium text-xs">Email</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium text-xs">Date</th>
                    <th className="text-right py-2 px-3 text-gray-400 font-medium text-xs">Status</th>
                    <th className="text-right py-2 px-3 text-gray-400 font-medium text-xs">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="border-b border-gray-800">
                      <td className="py-3 px-3 text-white text-sm">{referral.name}</td>
                      <td className="py-3 px-3 text-gray-300 text-sm">{referral.email}</td>
                      <td className="py-3 px-3 text-gray-300 text-sm">{referral.date}</td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            referral.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {referral.status === "completed" ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-sm font-medium text-teal-400">{referral.reward}</span>
                        <span className="text-xs text-gray-400 ml-1">$NEXQ</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 p-4 rounded-lg bg-black/20 border border-gray-800">
            <h3 className="text-sm font-medium text-white mb-2">How it works</h3>
            <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
              <li>Share your unique referral link with friends</li>
              <li>They sign up using your link and verify their account</li>
              <li>You earn 200 $NEXQ tokens for each verified referral</li>
              <li>Your friends also receive 50 $NEXQ tokens as a welcome bonus</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
