export interface ChildProfile {
  id: string
  familyId: string
  name: string
  username?: string
  level: number
  xp: number
  nextLevelXp: number
  coins: number
  streak: number
  avatar: string
}

export type MissionCategory = 'Saúde' | 'Organização' | 'Sabedoria' | 'Esporte' | 'Outros'
export type MissionDifficulty = 'Fácil' | 'Média' | 'Difícil'

export interface Mission {
  id: string
  title: string
  coins: number
  xp: number
  category: MissionCategory
  icon: string
  difficulty: MissionDifficulty
  completed: boolean
  photo?: string | null
}

export interface Reward {
  id: string
  title: string
  cost: number
  icon: string
  color: string
  category: string
}

export interface Notification {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  type: 'message' | 'success' | 'alert'
}

export interface Transaction {
  id: string
  title: string
  value: number
  type: 'earn' | 'spend'
  date: string
}
