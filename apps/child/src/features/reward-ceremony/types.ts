/**
 * 🎓 Ceremony Types
 */

export enum CeremonyStage {
  IDLE = 'IDLE',
  ENTER = 'ENTER',
  MENTOR_APPEAR = 'MENTOR_APPEAR',
  REWARD_REVEAL = 'REWARD_REVEAL',
  NEST_EVOLUTION = 'NEST_EVOLUTION',
  CTA = 'CTA'
}

export type CelebrationType = 'common' | 'rare' | 'epic' | 'legendary' | 'level_up'

export interface MentorCelebrationConfig {
  name: string
  color: string
  bg: string
  image: string
  phrases: {
    morning: string[]
    night: string[]
    streak: string[]
    generic: string[]
  }
}
