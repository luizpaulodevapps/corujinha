'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 🧡 Relationship Store: O Vínculo com os Mentores
 * 
 * Este store gerencia a "memória emocional" dos mentores.
 * Ele rastreia afinidades e eventos marcantes para personalizar a experiência.
 */

export type MentorType = 'Bubo' | 'Lumi' | 'Gaia' | 'Bolt'

interface Memory {
  id: string
  type: 'streak_reached' | 'category_mastered' | 'daily_first_open' | 'night_ritual'
  mentor: MentorType
  timestamp: number
  metadata?: any
}

interface RelationshipState {
  // Afinidade: 0 a 100 para cada mentor
  affinities: Record<MentorType, number>
  
  // Memórias recentes
  recentMemories: Memory[]
  
  // Última interação significativa
  lastSignificantInteraction: number
  
  // Métodos
  addAffinity: (mentor: MentorType, amount: number) => void
  recordMemory: (memory: Omit<Memory, 'timestamp'>) => void
  getDominantMentor: () => MentorType
}

export const useRelationshipStore = create<RelationshipState>()(
  persist(
    (set, get) => ({
      affinities: {
        Bubo: 50,
        Lumi: 50,
        Gaia: 50,
        Bolt: 50,
      },
      recentMemories: [],
      lastSignificantInteraction: Date.now(),

      addAffinity: (mentor, amount) => set((state) => ({
        affinities: {
          ...state.affinities,
          [mentor]: Math.min(100, state.affinities[mentor] + amount)
        }
      })),

      recordMemory: (memory) => set((state) => ({
        recentMemories: [
          { ...memory, timestamp: Date.now() },
          ...state.recentMemories
        ].slice(0, 10), // Mantemos apenas as 10 últimas memórias
        lastSignificantInteraction: Date.now()
      })),

      getDominantMentor: () => {
        const { affinities } = get()
        return (Object.keys(affinities) as MentorType[]).reduce((a, b) => 
          affinities[a] > affinities[b] ? a : b
        )
      }
    }),
    {
      name: 'cj-relationship-storage'
    }
  )
)
