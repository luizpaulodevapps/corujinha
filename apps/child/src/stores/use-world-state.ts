'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 🌍 World State Store
 * 
 * Orquestra o tempo e a "Vibe" global do ecossistema Corujinha.
 */

export type WorldVibe = 'dawn' | 'day' | 'golden_hour' | 'dusk' | 'night'

interface WorldState {
  vibe: WorldVibe
  isEveningRitualComplete: boolean
  isRitualActive: boolean
  lastRitualDate: string | null
  
  updateVibe: () => void
  completeEveningRitual: () => void
  setRitualActive: (active: boolean) => void
}

export const useWorldState = create<WorldState>()(
  persist(
    (set, get) => ({
      vibe: 'day',
      isEveningRitualComplete: false,
      isRitualActive: false,
      lastRitualDate: null,

      updateVibe: () => {
        const hours = new Date().getHours()
        let newVibe: WorldVibe = 'day'

        if (hours >= 5 && hours < 8) newVibe = 'dawn'
        else if (hours >= 8 && hours < 17) newVibe = 'day'
        else if (hours >= 17 && hours < 19) newVibe = 'golden_hour'
        else if (hours >= 19 && hours < 22) newVibe = 'dusk'
        else newVibe = 'night'

        // Resetar ritual se for um novo dia
        const today = new Date().toLocaleDateString()
        if (get().lastRitualDate !== today) {
          set({ vibe: newVibe, isEveningRitualComplete: false })
        } else {
          set({ vibe: newVibe })
        }
      },

      completeEveningRitual: () => {
        set({ 
          isEveningRitualComplete: true, 
          isRitualActive: false,
          lastRitualDate: new Date().toLocaleDateString() 
        })
      },

      setRitualActive: (active) => set({ isRitualActive: active })
    }),
    {
      name: 'cj-world-state'
    }
  )
)
