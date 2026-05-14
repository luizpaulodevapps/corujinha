export interface Goal {
  id: string
  title: string
  description: string
  progress: number
  total: number
  reward: string
  icon: string
  color: string
}

export interface GoalProgress {
  totalGoals: number
  completedGoals: number
  percentage: number
}
