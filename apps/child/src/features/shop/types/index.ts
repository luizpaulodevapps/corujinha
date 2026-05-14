export interface Reward {
  id: string
  title: string
  description: string
  cost: number
  icon: string
  color: string
  category: RewardCategory
}

export type RewardCategory = 'Todos' | 'Tecnologia' | 'Comida' | 'Lazer' | 'Aventura'
