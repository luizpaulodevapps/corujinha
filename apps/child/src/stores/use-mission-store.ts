import { create } from 'zustand'
import { Mission } from '../types'

interface MissionState {
  missions: Mission[]
  completeMission: (missionId: string, photo?: string | null) => void
}



const MOCK_MISSIONS: Mission[] = [
  {
    id: '1',
    title: 'Arrumar a Cama',
    coins: 10,
    xp: 20,
    category: 'Organização',
    icon: '🛏️',
    difficulty: 'Fácil',
    completed: false
  },
  {
    id: '2',
    title: 'Escovar os Dentes',
    coins: 5,
    xp: 10,
    category: 'Saúde',
    icon: '🪥',
    difficulty: 'Fácil',
    completed: false
  },
  {
    id: '3',
    title: 'Ajudar no Jantar',
    coins: 20,
    xp: 40,
    category: 'Outros',
    icon: '🍽️',
    difficulty: 'Média',
    completed: false
  }
]

export const useMissionStore = create<MissionState>((set) => ({
  missions: MOCK_MISSIONS,
  
  completeMission: (missionId, photo) => {
    console.log('Completing mission:', missionId)
    set((state) => ({
      missions: state.missions.map(m => 
        m.id === missionId ? { ...m, completed: true, photo: photo ?? null } : m
      )
    }))
  },
}))
