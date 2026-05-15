import { useChildStore } from '../stores/use-child-store'
import { useMissionStore } from '../stores/use-mission-store'
import { useDashboardModals } from '../stores/use-dashboard-modals'
import { Mission } from '../types'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const MissionService = {
  complete: (mission: Mission, photo: string | null) => {
    // 1. Get stores (we use them outside of hooks here by calling their state if needed, 
    // but better to pass actions as arguments or use the store's internal logic)
    const { addXp, addCoins } = useChildStore.getState()
    const { completeMission } = useMissionStore.getState()
    const { openReward, closeMission } = useDashboardModals.getState()

    // 2. Execute business logic
    completeMission(mission.id, photo)
    addXp(mission.xp)
    addCoins(mission.coins)
    
    // 3. Orchestrate UI
    closeMission()
    openReward()
    
    // 4. Send System Message to Family Chat
    const { profile } = useChildStore.getState()
    if (profile?.familyId) {
      const db = getFirebaseFirestore()
      const chatRef = collection(db, 'families', profile.familyId, 'family_messages')
      addDoc(chatRef, {
        text: `✨ ${profile.name} completou a missão: ${mission.title}! 🏆`,
        senderId: 'system',
        senderName: 'Corujinha',
        senderRole: 'system',
        type: 'action',
        metadata: {
          referenceId: mission.id,
          referenceType: 'task',
          actionType: 'milestone'
        },
        createdAt: serverTimestamp()
      }).catch(err => console.error('Erro ao enviar mensagem de sistema:', err))
    }

    // Return summary for celebration
    return {
      xpGained: mission.xp,
      coinsGained: mission.coins,
      title: mission.title
    }
  },
  
  validate: (mission: Mission, photo: string | null) => {
    if (mission.completed) return false
    // Example rule: All missions except 'Escovar os Dentes' require a photo
    if (!photo && mission.title !== 'Escovar os Dentes') return false
    return true
  }
}
