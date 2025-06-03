import TokenBalance from "@/components/token-balance"
import TaskList from "@/components/task-list"
import { Sparkles } from "lucide-react"

export default function EarnPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-black via-black to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-conic from-teal-500/30 via-fuchsia-600/30 to-teal-500/30 z-0 opacity-70 blur-[80px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_30%,transparent_100%)] z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-16 flex flex-col items-center w-full max-w-7xl">
        <div className="w-full max-w-4xl">
          <header className="mb-6 sm:mb-8 text-center px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-fuchsia-500 mb-3 sm:mb-4 break-words">
              Earn $NEXQ Tokens
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed px-2">
              Complete tasks to earn $NEXQ test tokens and help us improve NexsoQurity while preparing for our mainnet
              launch.
            </p>
          </header>

          <div className="w-full mb-6 sm:mb-8">
            <TokenBalance />
          </div>

          <div className="mt-6 sm:mt-8 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center justify-center sm:justify-start">
              <div className="mr-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="break-words">Available Tasks</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">New tasks added weekly</div>
          </div>

          <div className="w-full mb-8 sm:mb-12">
            <TaskList />
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-800 mx-2 sm:mx-0">
            <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3 break-words">
              About $NEXQ Test Tokens
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed break-words">
              $NEXQ test tokens are used exclusively for testing the NexsoQurity platform. These tokens have no monetary
              value and cannot be traded on exchanges. By earning and using test tokens, you're helping us refine our
              security protocols and user experience before our official launch.
            </p>
          </div>
        </div>
      </div>

      <footer className="relative z-20 w-full py-4 sm:py-6 text-center text-gray-400 text-xs sm:text-sm px-4">
        <p className="break-words">© {new Date().getFullYear()} NexsoQurity. All rights reserved.</p>
      </footer>
    </main>
  )
}
