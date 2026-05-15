'use client'

import { RewardCeremonyModal } from '@/features/reward-ceremony/components/RewardCeremonyModal'
import { Mission } from '@/types'

interface MissionSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  reward: {
    coins: number
    xp: number
  } | null // Legacy reward prop
  mission?: Mission | null | undefined // New mission prop
}

export function MissionSuccessModal({ isOpen, onClose, reward, mission }: MissionSuccessModalProps) {
  // Se não temos a missão mas temos o reward (legado), criamos uma missão fake para o modal
  const displayMission = mission || (reward ? { 
    title: 'Missão Cumprida!', 
    coins: reward.coins, 
    xp: reward.xp,
    category: 'Sabedoria'
  } as Mission : null)

  if (!displayMission) return null

  // Lógica de Mentores baseada na categoria
  const getMentor = (category: string): 'Bubo' | 'Lumi' | 'Gaia' | 'Bolt' => {
    switch (category) {
      case 'Saúde': return 'Lumi'
      case 'Organização': return 'Gaia'
      case 'Natureza': return 'Bolt'
      case 'Sabedoria':
      case 'Deveres':
      default: return 'Bubo'
    }
  }

  return (
    <RewardCeremonyModal 
      isOpen={isOpen}
      mission={displayMission}
      mentor={getMentor(displayMission.category)}
      onClose={onClose}
    />
  )
}
