import { create } from 'zustand'
import { ChildProfile, Transaction } from '../types'

interface ChildState {
  profile: ChildProfile | null
  transactions: Transaction[]
  isLoading: boolean
  setProfile: (profile: ChildProfile) => void
  fetchProfile: (childId: string) => Promise<void>
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
  profile: null,
  transactions: [],
  isLoading: false,

  setProfile: (profile) => set({ profile }),

  fetchProfile: async (childId) => {
    set({ isLoading: true })
    try {
      // Aqui integraremos com o Firestore futuramente
      // const doc = await getDoc(doc(db, 'children', childId))
      // set({ profile: doc.data(), isLoading: false })

      // Simulação de carregamento de dados reais
      setTimeout(() => {
        set({
          profile: {
            name: 'Aventureiro',
            level: 1,
            xp: 0,
            nextLevelXp: 100,
            coins: 0,
            streak: 0,
            avatar: '/owl_mascot_new.png',
          },
          isLoading: false
        })
      }, 1000)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      set({ isLoading: false })
    }
  },

  addXp: (amount) => set((state) => {
    if (!state.profile) return state
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

  addCoins: (amount) => set((state) => {
    if (!state.profile) return state
    return {
      profile: { ...state.profile, coins: state.profile.coins + amount }
    }
  }),

  spendCoins: (amount, title) => set((state) => {
    if (!state.profile) return state
    return {
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
    }
  }),

  updateAvatar: (src) => set((state) => {
    if (!state.profile) return state
    return {
      profile: { ...state.profile, avatar: src }
    }
  }),
}))
