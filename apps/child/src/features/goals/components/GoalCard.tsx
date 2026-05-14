'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Coins, Sparkles, Trophy } from 'lucide-react'
import { Goal } from '../types'

interface GoalCardProps {
  goal: Goal
  index: number
}

export function GoalCard({ goal, index }: GoalCardProps) {
  const pct = Math.min(100, Math.round((goal.progress / goal.total) * 100))
  const isDone = goal.progress >= goal.total

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 260, damping: 24 }}
      className={`cg-card ${isDone ? 'is-done' : ''}`}
    >
      <div className="cg-card__node">
        {isDone ? <Trophy size={32} fill="currentColor" /> : <span>{goal.icon}</span>}
      </div>

      <div className="cg-card__body">
        <div className="cg-card__top">
          <div>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
          </div>
          <span className="cg-card__pct">{pct}%</span>
        </div>

        <div className="cg-card__progress" aria-label={`${pct}% completo`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ background: goal.color }}
          />
        </div>

        <div className="cg-card__bottom">
          <span className="cg-card__status">
            {isDone ? <CheckCircle2 size={16} /> : <Sparkles size={16} fill="currentColor" />}
            {goal.progress}/{goal.total}
          </span>
          <span className="cg-card__reward">
            <Coins size={16} fill="currentColor" />
            {goal.reward}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
