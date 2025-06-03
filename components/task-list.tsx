"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FaTwitter, FaDiscord, FaUserFriends } from "react-icons/fa"
import { MdSecurity, MdAccountCircle } from "react-icons/md"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  icon: React.ReactNode
  action: string
  difficulty: "easy" | "medium" | "hard"
  estimatedTime: string
}

export default function TaskList() {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "create-account",
      title: "Create an Account",
      description: "Sign up and verify your email address",
      reward: 50,
      completed: true,
      icon: (
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <MdAccountCircle className="h-6 w-6 text-white" />
        </div>
      ),
      action: "Completed",
      difficulty: "easy",
      estimatedTime: "2 min",
    },
    {
      id: "follow-twitter",
      title: "Follow on Twitter",
      description: "Follow NexsoQurity on Twitter for updates",
      reward: 75,
      completed: false,
      icon: (
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
          <FaTwitter className="h-5 w-5 text-white" />
        </div>
      ),
      action: "Follow",
      difficulty: "easy",
      estimatedTime: "1 min",
    },
    {
      id: "join-discord",
      title: "Join Discord Community",
      description: "Join our Discord server and introduce yourself",
      reward: 100,
      completed: false,
      icon: (
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
          <FaDiscord className="h-5 w-5 text-white" />
        </div>
      ),
      action: "Join",
      difficulty: "easy",
      estimatedTime: "5 min",
    },
    {
      id: "security-quiz",
      title: "Complete Security Quiz",
      description: "Test your knowledge about wallet security",
      reward: 150,
      completed: false,
      icon: (
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
          <MdSecurity className="h-6 w-6 text-white" />
        </div>
      ),
      action: "Start Quiz",
      difficulty: "medium",
      estimatedTime: "10 min",
    },
    {
      id: "refer-friend",
      title: "Refer a Friend",
      description: "Invite a friend to join NexsoQurity",
      reward: 200,
      completed: false,
      icon: (
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <FaUserFriends className="h-5 w-5 text-white" />
        </div>
      ),
      action: "Invite",
      difficulty: "medium",
      estimatedTime: "5 min",
    },
  ])

  const completeTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))

    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      toast({
        title: "Task Completed!",
        description: `You earned ${task.reward} $NEXQ tokens`,
      })
    }
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = (completedTasksCount / totalTasks) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "hard":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-400">
          {completedTasksCount} of {totalTasks} tasks completed
        </div>
        <div className="text-sm font-medium text-teal-400">
          {completedTasksCount === totalTasks ? "All tasks completed!" : `${Math.round(progressPercentage)}% complete`}
        </div>
      </div>

      <Progress
        value={progressPercentage}
        className="h-2 bg-gray-800"
        indicatorClassName="bg-gradient-to-r from-teal-500 to-fuchsia-600"
      />

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-5 rounded-lg border ${
              task.completed
                ? "bg-black/20 border-teal-500/30"
                : "bg-black/40 backdrop-blur-sm border-gray-800 hover:border-gray-700"
            } 
              transition-all duration-200`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {task.icon}

                <div>
                  <h3 className="text-lg font-medium text-white flex items-center">
                    {task.title}
                    {task.completed && <CheckCircle className="ml-2 h-4 w-4 text-teal-500" />}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{task.description}</p>

                  <div className="flex items-center mt-2 gap-4">
                    <div className={`text-xs flex items-center ${getDifficultyColor(task.difficulty)}`}>
                      <span className="w-2 h-2 rounded-full bg-current mr-1"></span>
                      {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                    </div>

                    <div className="text-xs flex items-center text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.estimatedTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Reward</div>
                  <div className="font-bold text-white">
                    {task.reward} <span className="text-sm text-teal-400">$NEXQ</span>
                  </div>
                </div>

                <Button
                  variant={task.completed ? "outline" : "default"}
                  size="sm"
                  disabled={task.completed}
                  onClick={() => !task.completed && completeTask(task.id)}
                  className={
                    task.completed
                      ? "border-teal-500/30 text-teal-400"
                      : "bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700"
                  }
                >
                  {task.completed ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-1 h-4 w-4" /> Completed
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {task.action} {task.action !== "Completed" && <ExternalLink className="ml-1 h-3 w-3" />}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
