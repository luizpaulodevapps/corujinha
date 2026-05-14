'use client'

import { useMemo } from 'react'
import { useChildStore } from '@/stores/use-child-store'
import { useMissionStore } from '@/stores/use-mission-store'
import { useNotificationStore } from '@/stores/use-notification-store'
import { useDashboardModals } from '@/stores/use-dashboard-modals'
import { MissionService } from '@/services/mission-service'

export function useChildDashboard() {
  const { profile, transactions, updateAvatar } = useChildStore()
  const { missions } = useMissionStore()
  const { notifications, markAsRead, clearAll } = useNotificationStore()
  const modals = useDashboardModals()

  const selectedMission = useMemo(() => 
    missions.find(m => m.id === modals.selectedMissionId) || null
  , [missions, modals.selectedMissionId])

  const lastCompletedMission = useMemo(() => {
    const completed = missions.filter(m => m.completed)
    return completed.length > 0 ? completed[completed.length - 1] : null
  }, [missions])

  const unreadNotificationsCount = useMemo(() => 
    notifications.filter(n => !n.read).length
  , [notifications])

  const handleCompleteMission = (missionId: string, photo: string | null) => {
    const mission = missions.find(m => m.id === missionId)
    if (mission && MissionService.validate(mission, photo)) {
      MissionService.complete(mission, photo)
    }
  }

  return {
    profile,
    missions,
    transactions,
    notifications,
    unreadNotificationsCount,
    modals,
    selectedMission,
    lastCompletedMission,
    updateAvatar,
    markAsRead,
    clearAll,
    handleCompleteMission
  }
}
