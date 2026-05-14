'use client'

import { motion } from 'framer-motion'
import { Coins, Lock, ShoppingBag } from 'lucide-react'
import clsx from 'clsx'
import { Reward } from '../types'

interface RewardCardProps {
  reward: Reward
  index: number
  canAfford: boolean
  onClick: () => void
}

export function RewardCard({ reward, index, canAfford, onClick }: RewardCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 24 }}
      onClick={onClick}
      disabled={!canAfford}
      className={clsx('cs-card', !canAfford && 'is-locked')}
    >
      <div className="cs-card__media" style={{ background: reward.color }}>
        <span>{reward.icon}</span>
        {!canAfford && (
          <div className="cs-card__lock">
            <Lock size={24} />
          </div>
        )}
      </div>

      <div className="cs-card__body">
        <div className="cs-card__top">
          <h3>{reward.title}</h3>
          <span className="cs-price">
            <Coins size={15} fill="currentColor" />
            {reward.cost}
          </span>
        </div>
        <p>{reward.description}</p>
        <div className={clsx('cs-card__action', canAfford && 'can-buy')}>
          {canAfford ? <ShoppingBag size={18} /> : <Lock size={16} />}
          {canAfford ? 'Resgatar' : 'Faltam moedas'}
        </div>
      </div>
    </motion.button>
  )
}
