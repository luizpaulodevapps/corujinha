'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Lock, Sparkles, Star, Trophy, Unlock } from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'

const mockAchievements = [
  { id: '1', title: 'Primeira Missao', description: 'Complete sua primeira missao', icon: '🎯', rarity: 'common', unlocked: true, unlockedAt: '2 dias atras' },
  { id: '2', title: 'Explorador Dedicado', description: 'Complete 10 missoes', icon: '🗺️', rarity: 'common', unlocked: true, unlockedAt: '1 dia atras' },
  { id: '3', title: 'Mestre da Limpeza', description: 'Complete 5 missoes de casa', icon: '🧹', rarity: 'rare', unlocked: true, unlockedAt: 'Hoje' },
  { id: '4', title: 'Sabio Leitor', description: 'Complete 7 missoes de estudo', icon: '📚', rarity: 'rare', unlocked: false, progress: 5, total: 7 },
  { id: '5', title: 'Guardiao da Saude', description: 'Complete 10 missoes de saude', icon: '🦷', rarity: 'rare', unlocked: false, progress: 3, total: 10 },
  { id: '6', title: 'Lendario', description: 'Complete 50 missoes no total', icon: '👑', rarity: 'legendary', unlocked: false, progress: 12, total: 50 },
  { id: '7', title: 'Sequencia Perfeita', description: 'Complete missoes por 7 dias seguidos', icon: '🔥', rarity: 'epic', unlocked: false, progress: 5, total: 7 },
  { id: '8', title: 'Colecionador', description: 'Ganhe 500 moedas', icon: '💰', rarity: 'common', unlocked: true, unlockedAt: '3 dias atras' },
  { id: '9', title: 'Primeira Compra', description: 'Faca sua primeira compra na loja', icon: '🛒', rarity: 'common', unlocked: false },
  { id: '10', title: 'Heroi do Dia', description: 'Complete 5 missoes em um unico dia', icon: '⚡', rarity: 'epic', unlocked: false, progress: 3, total: 5 },
]

const rarityConfig = {
  common: { label: 'Comum', color: '#64748b' },
  rare: { label: 'Raro', color: '#2563eb' },
  epic: { label: 'Epico', color: '#a855f7' },
  legendary: { label: 'Lendario', color: '#f59e0b' },
}

type Achievement = typeof mockAchievements[number]
type AchievementFilter = 'all' | 'unlocked' | 'locked'

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [filter, setFilter] = useState<AchievementFilter>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const unlockedCount = mockAchievements.filter(achievement => achievement.unlocked).length
  const totalCount = mockAchievements.length
  const progress = Math.round((unlockedCount / totalCount) * 100)
  const filteredAchievements = filter === 'all'
    ? mockAchievements
    : filter === 'unlocked'
      ? mockAchievements.filter(achievement => achievement.unlocked)
      : mockAchievements.filter(achievement => !achievement.unlocked)

  return (
    <PageContainer title="Trofeus da Floresta" hideHeader hideAvatar>
      <section className="ca-hero" aria-labelledby="achievements-title">
        <div className="ca-hero__badge">
          <Trophy size={40} fill="currentColor" />
        </div>
        <div className="ca-hero__copy">
          <p className="ca-kicker">
            <Star size={15} fill="currentColor" />
            Colecao de trofeus
          </p>
          <h1 id="achievements-title">Grandes conquistas</h1>
          <p>Veja o que voce ja desbloqueou e quais desafios ainda faltam para completar a colecao.</p>
        </div>
      </section>

      <section className="ca-progress" aria-label="Progresso da colecao">
        <div className="ca-progress__top">
          <span>Progresso da colecao</span>
          <strong>{unlockedCount}/{totalCount}</strong>
        </div>
        <div className="ca-progress__bar">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
        </div>
        <p>{progress}% completo</p>
      </section>

      <div className="ca-filter" role="tablist" aria-label="Filtrar conquistas">
        {([
          ['all', 'Todas'],
          ['unlocked', 'Conseguidas'],
          ['locked', 'Faltam']
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={filter === value}
            onClick={() => setFilter(value)}
            className={clsx('ca-filter__button', filter === value && 'is-active')}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="ca-grid" aria-label="Lista de conquistas">
        {filteredAchievements.map((achievement, index) => {
          const rarity = rarityConfig[achievement.rarity as keyof typeof rarityConfig]
          const pct = achievement.progress && achievement.total ? Math.round((achievement.progress / achievement.total) * 100) : 0

          return (
            <motion.button
              key={achievement.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, type: 'spring', stiffness: 260, damping: 24 }}
              onClick={() => setSelectedAchievement(achievement)}
              className={clsx('ca-card', !achievement.unlocked && 'is-locked')}
              style={{ borderColor: achievement.unlocked ? rarity.color : undefined }}
            >
              <div className="ca-card__icon">{achievement.icon}</div>
              <span className="ca-card__rarity" style={{ color: rarity.color }}>{rarity.label}</span>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              {achievement.unlocked ? (
                <span className="ca-card__status">
                  <Unlock size={14} />
                  {achievement.unlockedAt}
                </span>
              ) : achievement.progress !== undefined && achievement.total !== undefined ? (
                <div className="ca-card__progress">
                  <div>
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  <strong>{achievement.progress}/{achievement.total}</strong>
                </div>
              ) : (
                <span className="ca-card__status">
                  <Lock size={14} />
                  Bloqueado
                </span>
              )}
            </motion.button>
          )
        })}
      </section>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div className="ca-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedAchievement(null)}>
            <motion.div
              initial={{ scale: 0.96, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 24 }}
              className="ca-modal__panel"
              onClick={event => event.stopPropagation()}
            >
              <div className="ca-modal__icon">{selectedAchievement.icon}</div>
              <p className="ca-kicker">Trofeu {rarityConfig[selectedAchievement.rarity as keyof typeof rarityConfig].label}</p>
              <h2>{selectedAchievement.title}</h2>
              <p>{selectedAchievement.description}</p>

              {selectedAchievement.unlocked ? (
                <div className="ca-modal__state is-unlocked">
                  <CheckCircle2 size={22} />
                  Conquistado em {selectedAchievement.unlockedAt}
                </div>
              ) : selectedAchievement.progress !== undefined && selectedAchievement.total !== undefined ? (
                <div className="ca-modal__state">
                  <Sparkles size={22} />
                  {selectedAchievement.progress} de {selectedAchievement.total} concluido
                </div>
              ) : (
                <div className="ca-modal__state">
                  <Lock size={22} />
                  Ainda bloqueado
                </div>
              )}

              <button onClick={() => setSelectedAchievement(null)}>Continuar aventura</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
