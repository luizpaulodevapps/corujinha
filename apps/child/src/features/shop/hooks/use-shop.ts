import { useState, useMemo } from 'react'
import { Reward, RewardCategory } from '../types'
import { MOCK_REWARDS } from '../data/mock-rewards'
import { useChildStore } from '@/stores/use-child-store'

export function useShop() {
  const [filter, setFilter] = useState<RewardCategory>('Todos')
  const { profile, spendCoins } = useChildStore()
  
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const filteredRewards = useMemo(() => {
    if (filter === 'Todos') return MOCK_REWARDS
    return MOCK_REWARDS.filter(r => r.category === filter)
  }, [filter])

  const handlePurchaseClick = (reward: Reward) => {
    if (profile.coins >= reward.cost) {
      setSelectedReward(reward)
      setIsConfirmOpen(true)
    }
  }

  const confirmPurchase = () => {
    if (selectedReward) {
      spendCoins(selectedReward.cost, `Resgate: ${selectedReward.title}`)
      setIsConfirmOpen(false)
      setIsSuccessOpen(true)
    }
  }

  return {
    filter,
    setFilter,
    filteredRewards,
    selectedReward,
    isConfirmOpen,
    isSuccessOpen,
    setIsConfirmOpen,
    setIsSuccessOpen,
    handlePurchaseClick,
    confirmPurchase,
    childCoins: profile.coins
  }
}
