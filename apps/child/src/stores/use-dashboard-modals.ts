import { create } from 'zustand'

interface ModalState {
  showWallet: boolean
  showAvatar: boolean
  showNotifications: boolean
  showReward: boolean
  selectedMissionId: string | null
  
  openWallet: () => void
  closeWallet: () => void
  
  openAvatar: () => void
  closeAvatar: () => void
  
  openNotifications: () => void
  closeNotifications: () => void
  
  openReward: () => void
  closeReward: () => void
  
  openMission: (id: string) => void
  closeMission: () => void
}

export const useDashboardModals = create<ModalState>((set) => ({
  showWallet: false,
  showAvatar: false,
  showNotifications: false,
  showReward: false,
  selectedMissionId: null,
  
  openWallet: () => set({ showWallet: true }),
  closeWallet: () => set({ showWallet: false }),
  
  openAvatar: () => set({ showAvatar: true }),
  closeAvatar: () => set({ showAvatar: false }),
  
  openNotifications: () => set({ showNotifications: true }),
  closeNotifications: () => set({ showNotifications: false }),
  
  openReward: () => set({ showReward: true }),
  closeReward: () => set({ showReward: false }),
  
  openMission: (id) => set({ selectedMissionId: id }),
  closeMission: () => set({ selectedMissionId: null }),
}))
