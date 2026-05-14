import { create } from 'zustand'
import { Mission } from '../types'

interface MissionState {
  missions: Mission[]
  completeMission: (missionId: string, photo?: string | null) => void
}

const MOCK_MISSIONS: Mission[] = [
  { id: '1', title: 'Escovar os Dentes', coins: 10, xp: 50, category: 'Saúde', icon: '🪥', difficulty: 'Fácil', completed: false },
  { id: '2', title: 'Arrumar a Cama', coins: 25, xp: 100, category: 'Organização', icon: '🛏️', difficulty: 'Média', completed: false },
  { id: '3', title: 'Ler 15 min', coins: 30, xp: 150, category: 'Sabedoria', icon: '📚', difficulty: 'Média', completed: false },
]

export const useMissionStore = create<MissionState>((set) => ({
  missions: MOCK_MISSIONS,
  
  completeMission: (missionId, photo) => set((state) => ({
    missions: state.missions.map(m => 
      m.id === missionId ? { ...m, completed: true, photo: photo ?? null } : m
    )
  })),
}))
