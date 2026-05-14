import { create } from 'zustand'
import { ChildProfile, Transaction } from '../types'

interface ChildState {
  profile: ChildProfile
  transactions: Transaction[]
  addXp: (amount: number) => void
  addCoins: (amount: number) => void
  spendCoins: (amount: number, title: string) => void
  updateAvatar: (src: string) => void
}

const MOCK_CHILD: ChildProfile = {
  name: 'Luca',
  level: 12,
  xp: 450,
  nextLevelXp: 1000,
  coins: 125,
  streak: 5,
  avatar: '/owl_mascot_new.png',
}

export const useChildStore = create<ChildState>((set) => ({
  profile: MOCK_CHILD,
  transactions: [
    { id: '1', title: 'Escovar os Dentes', value: 10, type: 'earn', date: 'Hoje, 08:30' },
    { id: '2', title: 'Arrumar a Cama', value: 15, type: 'earn', date: 'Hoje, 09:15' },
    { id: '3', title: 'Sorvete de Chocolate', value: -40, type: 'spend', date: 'Ontem, 16:20' },
  ],
  
  addXp: (amount) => set((state) => {
    let newXp = state.profile.xp + amount
    let newLevel = state.profile.level
    
    if (newXp >= state.profile.nextLevelXp) {
      newXp -= state.profile.nextLevelXp
      newLevel += 1
    }
    
    return {
      profile: { ...state.profile, xp: newXp, level: newLevel }
    }
  }),

  addCoins: (amount) => set((state) => ({
    profile: { ...state.profile, coins: state.profile.coins + amount }
  })),

  spendCoins: (amount, title) => set((state) => ({
    profile: { ...state.profile, coins: state.profile.coins - amount },
    transactions: [
      { 
        id: Math.random().toString(), 
        title, 
        value: -amount, 
        type: 'spend', 
        date: 'Agora' 
      },
      ...state.transactions
    ]
  })),

  updateAvatar: (src) => set((state) => ({
    profile: { ...state.profile, avatar: src }
  })),
}))
