import { MentorType } from '@/stores/use-relationship-store'

/**
 * 🧡 Mentor Engine Types
 */

export type EmotionalState = 
  | 'calm' 
  | 'energetic' 
  | 'cozy' 
  | 'celebratory' 
  | 'sleepy' 
  | 'focused'

export interface DialogueContext {
  mentor: MentorType
  state: EmotionalState
  streak: number
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  recentMemories: any[]
}

export interface MentorVoice {
  signature: string
  traits: string[]
  phrases: {
    morning: string[]
    night: string[]
    streak: string[]
    memory_recall: string[]
    generic: string[]
  }
}
