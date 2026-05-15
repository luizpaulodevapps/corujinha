import { create } from 'zustand'
import { Mission } from '../types'

interface MissionState {
  missions: Mission[]
  completeMission: (missionId: string, photo?: string | null) => void
}



export const useMissionStore = create<MissionState>((set) => ({
  missions: [],
  
  completeMission: (missionId, photo) => set((state) => ({
    missions: state.missions.map(m => 
      m.id === missionId ? { ...m, completed: true, photo: photo ?? null } : m
    )
  })),
}))
