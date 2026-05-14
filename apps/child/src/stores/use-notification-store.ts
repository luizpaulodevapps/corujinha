import { create } from 'zustand'
import { Notification } from '../types'

interface NotificationState {
  notifications: Notification[]
  markAsRead: (id: string) => void
  clearAll: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'time'>) => void
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Mensagem do Pai', body: 'Parabéns pela missão de ontem! Você foi incrível! 🏆', time: '5m atrás', read: false, type: 'message' },
  { id: '2', title: 'Missão Aprovada', body: 'Sua missão "Arrumar Brinquedos" foi validada. +10 moedas! 💰', time: '1h atrás', read: true, type: 'success' },
]

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  
  clearAll: () => set({ notifications: [] }),
  
  addNotification: (n) => set((state) => ({
    notifications: [
      { 
        ...n, 
        id: Math.random().toString(), 
        read: false, 
        time: 'Agora' 
      }, 
      ...state.notifications
    ]
  })),
}))
