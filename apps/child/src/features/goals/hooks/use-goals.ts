import { useState, useMemo } from 'react'
import { Goal, GoalProgress } from '../types'
import { MOCK_GOALS } from '../data/mock-goals'

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS)

  const progress: GoalProgress = useMemo(() => {
    const totalGoals = goals.length
    const completedGoals = goals.filter(g => g.progress >= g.total).length
    const percentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0
    
    return {
      totalGoals,
      completedGoals,
      percentage
    }
  }, [goals])

  return {
    goals,
    progress
  }
}
