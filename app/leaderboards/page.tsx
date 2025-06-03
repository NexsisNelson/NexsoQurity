"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Trophy, Users, Shield, Coins, Search, Star, Zap, Crown, Medal, Award } from "lucide-react"

interface User {
  id: number
  name: string
  username: string
  avatar?: string
  rank: number
  level: number
  badge: string
  tokens?: number
  change?: string
  streak?: number
  securityScore?: number
  completedTasks?: number
  referrals?: number
  earnings?: number
  weeklyTokens?: number
  tasksCompleted?: number
}

const topEarners: User[] = [
  {
    id: 1,
    name: "Alex Chen",
    username: "@alexc",
    tokens: 15420,
    rank: 1,
    change: "+12%",
    badge: "Elite Earner",
    level: 25,
    streak: 45,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "@sarahj",
    tokens: 14850,
    rank: 2,
    change: "+8%",
    badge: "Top Performer",
    level: 23,
    streak: 38,
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    username: "@miker",
    tokens: 13920,
    rank: 3,
    change: "+15%",
    badge: "Rising Star",
    level: 22,
    streak: 29,
  },
]

const securityChampions: User[] = [
  {
    id: 1,
    name: "Lisa Zhang",
    username: "@lisaz",
    securityScore: 98.5,
    rank: 1,
    completedTasks: 156,
    badge: "Security Expert",
    level: 28,
  },
  {
    id: 2,
    name: "James Brown",
    username: "@jamesb",
    securityScore: 97.2,
    rank: 2,
    completedTasks: 142,
    badge: "Guardian",
    level: 26,
  },
  {
    id: 3,
    name: "Maria Garcia",
    username: "@mariag",
    securityScore: 96.8,
    rank: 3,
    completedTasks: 138,
    badge: "Defender",
    level: 25,
  },
]

const referralLeaders: User[] = [
  {
    id: 1,
    name: "Tom Anderson",
    username: "@toma",
    referrals: 89,
    rank: 1,
    earnings: 4450,
    badge: "Ambassador",
    level: 24,
  },
  {
    id: 2,
    name: "Nina Patel",
    username: "@ninap",
    referrals: 76,
    rank: 2,
    earnings: 3800,
    badge: "Influencer",
    level: 22,
  },
  {
    id: 3,
    name: "Carlos Silva",
    username: "@carloss",
    referrals: 68,
    rank: 3,
    earnings: 3400,
    badge: "Networker",
    level: 21,
  },
]

const weeklyTop: User[] = [
  {
    id: 1,
    name: "Ryan Cooper",
    username: "@ryanc",
    weeklyTokens: 2840,
    rank: 1,
    tasksCompleted: 28,
    badge: "Weekly Champion",
    level: 19,
  },
  {
    id: 2,
    name: "Sophie Lee",
    username: "@sophiel",
    weeklyTokens: 2650,
    rank: 2,
    tasksCompleted: 25,
    badge: "Week Warrior",
    level: 18,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    username: "@marcusj",
    weeklyTokens: 2420,
    rank: 3,
    tasksCompleted: 22,
    badge: "Active Player",
    level: 17,
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
    case 2:
      return <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
    case 3:
      return <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
    default:
      return <span className="text-xs sm:text-sm font-bold text-gray-400">#{rank}</span>
  }
}

function UserCard({ user, type }: { user: User; type: string }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="bg-black/40 border-gray-800 hover:border-teal-500/50 transition-all duration-300">
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Rank */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-[40px] sm:min-w-[50px]">{getRankIcon(user.rank)}</div>

          {/* Avatar */}
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 border-teal-500/30">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-teal-500/20 text-teal-400 font-semibold text-xs sm:text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h3 className="font-semibold text-white text-sm sm:text-base truncate">{user.name}</h3>
              <Badge variant="secondary" className="text-xs bg-teal-500/20 text-teal-400 border-teal-500/30 w-fit">
                Lv.{user.level}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 truncate">{user.username}</p>
          </div>

          {/* Metrics */}
          <div className="text-right">
            {type === "tokens" && (
              <>
                <div className="text-sm sm:text-lg font-bold text-teal-400">{user.tokens?.toLocaleString()} NSQ</div>
                <div className="text-xs sm:text-sm text-green-400">{user.change}</div>
              </>
            )}
            {type === "security" && (
              <>
                <div className="text-sm sm:text-lg font-bold text-purple-400">{user.securityScore}%</div>
                <div className="text-xs sm:text-sm text-gray-400">{user.completedTasks} tasks</div>
              </>
            )}
            {type === "referrals" && (
              <>
                <div className="text-sm sm:text-lg font-bold text-blue-400">{user.referrals} refs</div>
                <div className="text-xs sm:text-sm text-green-400">{user.earnings} NSQ</div>
              </>
            )}
            {type === "weekly" && (
              <>
                <div className="text-sm sm:text-lg font-bold text-yellow-400">{user.weeklyTokens} NSQ</div>
                <div className="text-xs sm:text-sm text-gray-400">{user.tasksCompleted} tasks</div>
              </>
            )}
          </div>
        </div>

        {/* Badge */}
        <div className="mt-2 sm:mt-3">
          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 bg-gray-800/50">
            {user.badge}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LeaderboardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("earners")

  const filteredUsers = useMemo(() => {
    let users: User[] = []
    switch (activeTab) {
      case "earners":
        users = topEarners
        break
      case "security":
        users = securityChampions
        break
      case "referrals":
        users = referralLeaders
        break
      case "weekly":
        users = weeklyTop
        break
    }

    if (!searchTerm) return users

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [activeTab, searchTerm])

  const stats = [
    { title: "Total Users", value: "12,847", icon: Users, color: "text-blue-400" },
    { title: "Tokens Distributed", value: "2.4M", icon: Coins, color: "text-teal-400" },
    { title: "Security Tasks", value: "45,892", icon: Shield, color: "text-purple-400" },
    { title: "Active Streaks", value: "3,567", icon: Zap, color: "text-yellow-400" },
  ]

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
              Leaderboards
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Compete with the community and climb the ranks. Earn tokens, complete security tasks, and build your
            reputation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-black/40 border-gray-800">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} mx-auto sm:mx-0`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-black/40 border border-gray-800">
            <TabsTrigger value="earners" className="data-[state=active]:bg-teal-500 text-xs sm:text-sm">
              <Coins className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Top Earners</span>
              <span className="sm:hidden">Earners</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-500 text-xs sm:text-sm">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Security</span>
              <span className="sm:hidden">Security</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:bg-blue-500 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Referrals</span>
              <span className="sm:hidden">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-yellow-500 text-xs sm:text-sm">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Weekly</span>
              <span className="sm:hidden">Weekly</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="earners">
            <Card className="bg-black/40 border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-teal-400 text-lg sm:text-xl">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                  Top Token Earners
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Users who have earned the most NSQ tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} type="tokens" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-black/40 border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-purple-400 text-lg sm:text-xl">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  Security Champions
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">Top performers in security tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} type="security" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals">
            <Card className="bg-black/40 border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-blue-400 text-lg sm:text-xl">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  Referral Leaders
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Community builders with most referrals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} type="referrals" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card className="bg-black/40 border-gray-800">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-yellow-400 text-lg sm:text-xl">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  Weekly Champions
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">Top performers this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} type="weekly" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="mt-8 sm:mt-12">
          <Card className="bg-gradient-to-r from-teal-500/10 to-purple-500/10 border-teal-500/30">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4">
                Want to see your name here?
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Join thousands of users earning tokens and building their reputation in the NexsoQurity ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base">
                  Start Earning Tokens
                </Button>
                <Button variant="outline" className="border-purple-500 text-purple-400 text-sm sm:text-base">
                  Invite Friends
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
