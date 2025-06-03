"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Save, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("Crypto enthusiast and early adopter of NexsoQurity.")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/profile")
    }

    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user, isLoading, router])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (isLoading || !user) {
    return (
      <div className="relative z-20 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl w-full">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 break-words">Profile Settings</h1>
          <p className="text-sm sm:text-base text-gray-400 break-words">
            Manage your account preferences and personal information
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSaveProfile}>
              <Card className="bg-black/40 backdrop-blur-md border-gray-800 h-full">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl break-words">Personal Information</CardTitle>
                  <CardDescription className="break-words">Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
                    <div className="flex flex-col items-center w-full lg:w-auto">
                      <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                        <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="text-lg sm:text-xl bg-gradient-to-br from-teal-500 to-fuchsia-600">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>

                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 border-gray-700 text-gray-100 hover:bg-gray-800/50 w-full lg:w-auto"
                      >
                        <ImageIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Change</span>
                      </Button>
                    </div>

                    <div className="space-y-3 sm:space-y-4 flex-1 w-full min-w-0">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="name" className="text-sm">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-black/30 border-gray-700 text-gray-100 w-full"
                        />
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="email" className="text-sm">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-black/30 border-gray-700 text-gray-100 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="bio" className="text-sm">
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 bg-black/30 border border-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
                    />
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-gray-800">
                    <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4 break-words">
                      Wallet Information
                    </h3>

                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="walletAddress" className="text-sm">
                        Wallet Address
                      </Label>
                      <Input
                        id="walletAddress"
                        value={user.walletAddress}
                        readOnly
                        className="bg-black/30 border-gray-700 text-gray-100 font-mono text-xs sm:text-sm w-full"
                      />
                      <p className="text-xs text-gray-400 break-words">This is your NexsoQurity wallet address</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2 flex-shrink-0" />
                        <span>Saving</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>

          {/* Notifications Card */}
          <div>
            <Card className="bg-black/40 backdrop-blur-md border-gray-800 h-full">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl break-words">Notifications</CardTitle>
                <CardDescription className="break-words">Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white break-words">Email Notifications</p>
                    <p className="text-xs text-gray-400 break-words">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    className="flex-shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white break-words">Security Alerts</p>
                    <p className="text-xs text-gray-400 break-words">Get notified about suspicious activities</p>
                  </div>
                  <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} className="flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white break-words">Transaction Updates</p>
                    <p className="text-xs text-gray-400 break-words">Receive updates on transfers and rewards</p>
                  </div>
                  <Switch defaultChecked className="flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white break-words">Marketing Emails</p>
                    <p className="text-xs text-gray-400 break-words">Receive news and promotions</p>
                  </div>
                  <Switch className="flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
