"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: any[]
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)

    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  componentDidUpdate(prevProps: Props): void {
    // If any of the resetKeys changed, reset the error boundary
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      this.props.resetKeys.some((key, index) => key !== prevProps.resetKeys?.[index])
    ) {
      this.reset()
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <Card className="w-full max-w-md mx-auto my-8 border-purple-200 shadow-lg">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center text-purple-900">
              <AlertCircle className="mr-2 h-5 w-5 text-purple-600" />
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded overflow-auto max-h-32">
              {this.state.error?.stack?.split("\n").slice(0, 3).join("\n")}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end bg-gray-50">
            <Button
              onClick={this.reset}
              variant="outline"
              className="mr-2 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Try again
            </Button>
            <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700 text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload page
            </Button>
          </CardFooter>
        </Card>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
