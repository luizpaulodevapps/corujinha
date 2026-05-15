'use client'

import { useRelationshipStore } from '@/stores/use-relationship-store'
import { useChildStore } from '@/stores/use-child-store'
import { useMemo } from 'react'
import { mentorDialogueService } from '@/features/mentor-engine/mentor-dialogue.service'

/**
 * 🦉 Hook: useMentorGreeting (Refactored)
 * 
 * Agora atua apenas como uma ponte entre o estado (UI) e o MentorDialogueService (Domínio).
 */

export function useMentorGreeting() {
  const { getDominantMentor, recentMemories } = useRelationshipStore()
  const { profile } = useChildStore()
  
  const greeting = useMemo(() => {
    if (!profile) return "Carregando aventura..."

    const mentor = getDominantMentor()
    const hours = new Date().getHours()
    
    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' = 'afternoon'
    if (hours >= 5 && hours < 12) timeOfDay = 'morning'
    else if (hours >= 12 && hours < 18) timeOfDay = 'afternoon'
    else if (hours >= 18 && hours < 22) timeOfDay = 'evening'
    else timeOfDay = 'night'

    const state = mentorDialogueService.getEmotionalState(timeOfDay, profile.streak)

    return mentorDialogueService.getGreeting({
      mentor,
      state,
      streak: profile.streak,
      timeOfDay,
      recentMemories
    })

  }, [profile, getDominantMentor, recentMemories])

  return {
    greeting,
    mentor: getDominantMentor()
  }
}
