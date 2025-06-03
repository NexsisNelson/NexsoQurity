"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FaCoins } from "react-icons/fa"

export default function TokenBalance() {
  const [balance, setBalance] = useState<number | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      // This would normally come from a wallet connection or API
      setBalance(250)
      setAddress("0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  return (
    <div className="w-full p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium text-gray-400 mb-1">Your Balance</h2>
          {balance === null ? (
            <div className="h-8 w-32 bg-gray-800/50 animate-pulse rounded" />
          ) : (
            <div className="flex items-center">
              <div className="mr-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <FaCoins className="h-4 w-4 text-white" />
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-white">{balance.toLocaleString()}</span>
                <span className="ml-2 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-fuchsia-500">
                  $NEXQ
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-400 mb-1">Wallet Address</h2>
          {address === null ? (
            <div className="h-8 w-48 bg-gray-800/50 animate-pulse rounded" />
          ) : (
            <div className="flex items-center">
              <span className="text-gray-300 font-mono">{formatAddress(address)}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 text-gray-400 hover:text-white hover:bg-gray-800/50"
                onClick={copyAddress}
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-teal-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
