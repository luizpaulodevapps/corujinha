import { create } from 'zustand'
import { Notification } from '../types'

interface NotificationState {
  notifications: Notification[]
  markAsRead: (id: string) => void
  clearAll: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'time'>) => void
}



export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  
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
