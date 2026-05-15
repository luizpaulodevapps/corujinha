'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Coins, Zap, Sparkles } from 'lucide-react'
import { Mission } from '@/types'
import clsx from 'clsx'

/**
 * 🃏 MissionCard: Sistema de Raridade Visual
 * 
 * Transforma uma tarefa em um item colecionável com hierarquia emocional através de cores e brilhos.
 */

interface MissionCardProps {
  mission: Mission
  index: number
  onClick: () => void
}

export function MissionCard({ mission, index, onClick }: MissionCardProps) {
  // Mapeamento de Raridade baseado na dificuldade
  const getRarity = () => {
    const diff = mission.difficulty.toLowerCase()
    if (diff.includes('lend')) return { label: 'Lendária', theme: 'gold', icon: Sparkles }
    if (diff.includes('difícil')) return { label: 'Épica', theme: 'indigo', icon: Zap }
    if (diff.includes('médio')) return { label: 'Rara', theme: 'amber', icon: Coins }
    return { label: 'Comum', theme: 'emerald', icon: null }
  }

  const rarity = getRarity()

  const themes = {
    emerald: 'bg-[var(--rarity-common-bg)] border-[var(--rarity-common-border)] text-[var(--rarity-common-fg)]',
    amber: 'bg-[var(--rarity-rare-bg)] border-[var(--rarity-rare-border)] text-[var(--rarity-rare-fg)]',
    indigo: 'bg-[var(--rarity-epic-bg)] border-[var(--rarity-epic-border)] text-[var(--rarity-epic-fg)]',
    gold: 'bg-[var(--rarity-legendary-bg)] border-[var(--rarity-legendary-border)] text-[var(--rarity-legendary-fg)] shadow-[var(--rarity-legendary-glow)]'
  }

  const selectedTheme = themes[rarity.theme as keyof typeof themes]

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 24 }}
      onClick={onClick}
      disabled={mission.completed}
      className={clsx(
        'w-full p-5 rounded-[2rem] border-2 flex items-center gap-4 text-left transition-all active:scale-[0.98] relative overflow-hidden',
        mission.completed ? 'opacity-60 grayscale bg-gray-50 border-gray-100' : selectedTheme,
        rarity.theme === 'gold' && 'shadow-lg'
      )}
    >
      {/* Background Glow for high rarity */}
      {rarity.theme === 'gold' && (
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={48} className="text-amber-500" />
        </div>
      )}

      {/* Icon Area */}
      <div className={clsx(
        'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm',
        mission.completed ? 'bg-gray-200 text-gray-500' : 'bg-white'
      )}>
        {mission.completed ? <CheckCircle2 size={28} /> : mission.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={clsx(
            'text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full',
            mission.completed ? 'bg-gray-200 text-gray-400' : 
            rarity.theme === 'gold' ? 'bg-amber-200 text-amber-900' :
            rarity.theme === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
            rarity.theme === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-600'
          )}>
            {rarity.label}
          </span>
          <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{mission.category}</span>
        </div>
        <h3 className="text-lg font-black italic tracking-tight truncate leading-tight">
          {mission.title}
        </h3>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        {!mission.completed && (
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 text-amber-600 font-black text-xs">
                <Coins size={14} fill="currentColor" />
                +{mission.coins}
             </div>
             <div className="flex items-center gap-1 text-emerald-600 font-black text-xs">
                <Zap size={14} fill="currentColor" />
                +{mission.xp}
             </div>
          </div>
        )}
        {mission.completed ? (
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Concluída</span>
        ) : (
          <ChevronRight size={18} className="text-gray-300" strokeWidth={3} />
        )}
      </div>
    </motion.button>
  )
}
