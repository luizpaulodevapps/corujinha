export type MissionStatus = 'done' | 'pending'

export interface JourneyMission {
  id: string
  title: string
  status: MissionStatus
  xp: number
}

export type JourneyEventType = 'school' | 'sports' | 'family'
export type JourneyEventStatus = 'planned' | 'upcoming' | 'locked'

export interface JourneyEvent {
  id: string
  title: string
  type: JourneyEventType
  status: JourneyEventStatus
  emoji: string
  date: string
  time: string
  isUrgent: boolean
  color: string
  description: string
  missions: JourneyMission[]
}
