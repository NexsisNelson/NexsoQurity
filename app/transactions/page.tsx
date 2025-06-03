"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle, Copy, CheckCircle2, RefreshCw } from "lucide-react"
import { FaWallet, FaArrowUp, FaArrowDown, FaExchangeAlt, FaDownload, FaPaperPlane } from "react-icons/fa"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Logo from "@/components/logo"
import AnimatedSection from "@/components/animated-section"

interface Transaction {
  id: string
  type: "send" | "receive"
  amount: number
  address: string
  timestamp: string
  status: "pending" | "completed" | "failed"
  memo?: string
}

export default function TransactionsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState(0)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/transactions")
    }
  }, [user, isLoading, router])

  // Load mock transaction data and balance
  useEffect(() => {
    if (user) {
      // Mock transaction data
      const mockTransactions: Transaction[] = [
        {
          id: "tx_1",
          type: "receive",
          amount: 250,
          address: "0x3F5eB5bB5cF88cfcEe9613368636f458800e62CB",
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: "completed",
        },
        {
          id: "tx_2",
          type: "send",
          amount: 50,
          address: "0x8A5eB5bB5cF88cfcEe9613368636f458800e62CB",
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          status: "completed",
          memo: "Test transaction",
        },
        {
          id: "tx_3",
          type: "send",
          amount: 25,
          address: "0x9B5eB5bB5cF88cfcEe9613368636f458800e62CB",
          timestamp: new Date().toISOString(),
          status: "pending",
        },
      ]

      setTransactions(mockTransactions)
      setBalance(user.tokenBalance || 250)
    }
  }, [user])

  const handleSendTokens = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate input
    if (!recipientAddress) {
      toast({
        title: "Error",
        description: "Please enter a recipient address",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(amount) > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough tokens for this transaction",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create new transaction
      const newTransaction: Transaction = {
        id: "tx_" + Math.random().toString(36).substr(2, 9),
        type: "send",
        amount: Number.parseFloat(amount),
        address: recipientAddress,
        timestamp: new Date().toISOString(),
        status: "completed",
        memo: memo || undefined,
      }

      // Update state
      setTransactions((prev) => [newTransaction, ...prev])
      setBalance((prev) => prev - Number.parseFloat(amount))

      // Reset form
      setRecipientAddress("")
      setAmount("")
      setMemo("")

      toast({
        title: "Transaction successful",
        description: `${amount} $NEXQ sent to ${recipientAddress.substring(0, 6)}...${recipientAddress.substring(recipientAddress.length - 4)}`,
      })
    } catch (error) {
      toast({
        title: "Transaction failed",
        description: "There was an error processing your transaction",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyWalletAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress)
      setAddressCopied(true)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
      setTimeout(() => setAddressCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-500 flex-shrink-0" />
      case "failed":
        return <XCircle className="h-3 w-3 text-red-500 flex-shrink-0" />
      default:
        return null
    }
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
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <FaExchangeAlt size={12} className="text-white sm:text-sm" />
              </div>
              <span>Transactions</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 break-words">Send and receive $NEXQ test tokens</p>
          </div>
          <div className="flex-shrink-0 self-center lg:self-auto">
            <Logo size="medium" />
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fade-up"
          delay={0.2}
          className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 shadow-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6"
        >
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 mr-3 flex-shrink-0">
                <FaWallet className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xs sm:text-sm text-gray-400">Your Balance</h2>
                <div className="text-lg sm:text-xl font-bold flex items-baseline gap-1">
                  <span className="text-white break-all">{balance.toLocaleString()}</span>
                  <span className="text-xs sm:text-sm text-teal-400 flex-shrink-0">$NEXQ</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="send" className="text-xs flex items-center gap-1 px-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
                  <FaPaperPlane size={6} className="text-white sm:text-xs" />
                </div>
                <span className="hidden sm:inline">Send</span>
                <span className="sm:hidden">Send</span>
              </TabsTrigger>
              <TabsTrigger value="receive" className="text-xs flex items-center gap-1 px-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                  <FaDownload size={6} className="text-white sm:text-xs" />
                </div>
                <span className="hidden sm:inline">Receive</span>
                <span className="sm:hidden">Receive</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="send">
              <AnimatedSection animation="fade-in" delay={0.1}>
                <form onSubmit={handleSendTokens} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="recipient" className="text-xs sm:text-sm">
                      Recipient Address
                    </Label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      className="bg-black/30 border-gray-700 text-gray-100 font-mono text-xs sm:text-sm w-full"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="amount" className="text-xs sm:text-sm">
                      Amount
                    </Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0"
                        min="0"
                        step="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-black/30 border-gray-700 text-gray-100 pr-12 sm:pr-16 text-xs sm:text-sm w-full"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                        <span className="text-xs text-teal-400">$NEXQ</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="memo" className="text-xs sm:text-sm">
                      Memo (Optional)
                    </Label>
                    <Input
                      id="memo"
                      placeholder="What's this for?"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      className="bg-black/30 border-gray-700 text-gray-100 text-xs sm:text-sm w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    size="sm"
                    className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 text-white mt-3 sm:mt-4 text-xs sm:text-sm h-9 sm:h-10"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-3 w-3 animate-spin mr-2 flex-shrink-0" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaArrowUp className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span>Send Tokens</span>
                      </>
                    )}
                  </Button>
                </form>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="receive">
              <AnimatedSection animation="fade-in" delay={0.1} className="space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="walletAddress" className="text-xs sm:text-sm">
                    Your Wallet Address
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="walletAddress"
                      value={user.walletAddress}
                      readOnly
                      className="bg-black/30 border-gray-700 text-gray-100 font-mono text-xs sm:text-sm flex-1 min-w-0"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={copyWalletAddress}
                      className="border-gray-700 text-gray-100 hover:bg-gray-800/50 flex-shrink-0 px-2 sm:px-3"
                    >
                      {addressCopied ? (
                        <CheckCircle2 className="h-3 w-3 text-teal-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 break-words">
                    Share this address to receive $NEXQ tokens from other users
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-black/20 border border-gray-800 text-center">
                  <div className="mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white">
                      <FaArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-white mb-2 break-words">Receive $NEXQ Tokens</h3>
                  <p className="text-xs text-gray-400 break-words">
                    Copy your wallet address above and share it with others to receive tokens
                  </p>
                </div>
              </AnimatedSection>
            </TabsContent>
          </Tabs>
        </AnimatedSection>

        <div className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 shadow-xl p-3 sm:p-4 md:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2 break-words">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
              <Clock size={10} className="text-white sm:text-xs" />
            </div>
            <span>Transaction History</span>
          </h2>

          {transactions.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400 text-sm">No transactions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2 px-2 sm:px-3 text-gray-400 font-medium text-xs">Type</th>
                      <th className="text-left py-2 px-2 sm:px-3 text-gray-400 font-medium text-xs">Address</th>
                      <th className="text-left py-2 px-2 sm:px-3 text-gray-400 font-medium text-xs hidden sm:table-cell">
                        Date
                      </th>
                      <th className="text-right py-2 px-2 sm:px-3 text-gray-400 font-medium text-xs">Amount</th>
                      <th className="text-right py-2 px-2 sm:px-3 text-gray-400 font-medium text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr
                        key={tx.id}
                        className="border-b border-gray-800 opacity-0 animate-fade-in-up"
                        style={{
                          animationDelay: `${0.1 * (index + 1)}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        <td className="py-2 px-2 sm:px-3">
                          <div className="flex items-center">
                            <div
                              className={`p-1 rounded-full mr-2 flex-shrink-0 ${
                                tx.type === "send"
                                  ? "bg-gradient-to-br from-red-400 to-red-600"
                                  : "bg-gradient-to-br from-green-400 to-green-600"
                              }`}
                            >
                              {tx.type === "send" ? (
                                <FaArrowUp className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                              ) : (
                                <FaArrowDown className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="text-white text-xs capitalize break-words">{tx.type}</span>
                              {tx.memo && <div className="text-xs text-gray-400 mt-1 break-words">{tx.memo}</div>}
                              <div className="text-xs text-gray-400 sm:hidden break-words">
                                {formatTimestamp(tx.timestamp)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-gray-300 font-mono text-xs break-all">
                          {formatAddress(tx.address)}
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-gray-300 text-xs hidden sm:table-cell break-words">
                          {formatTimestamp(tx.timestamp)}
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-right">
                          <div className="flex flex-col items-end">
                            <span
                              className={`font-medium text-xs ${tx.type === "send" ? "text-fuchsia-400" : "text-teal-400"} break-words`}
                            >
                              {tx.type === "send" ? "-" : "+"}
                              {tx.amount}
                            </span>
                            <span className="text-xs text-gray-400">$NEXQ</span>
                          </div>
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {getStatusIcon(tx.status)}
                            <span className="text-xs text-gray-300 capitalize break-words">{tx.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
