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
    <PageContainer title="Troféus da Floresta" hideHeader hideAvatar>
      {/* Hero Section: Achievement Sanctuary */}
      <section className="relative px-6 pt-12 pb-20 rounded-b-[3rem] bg-emerald-950 overflow-hidden shadow-[var(--shadow-lg)]" aria-labelledby="achievements-title">
        {/* Background Texture & Ambient Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/textures/noise.svg)' }} />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/20 blur-[80px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 w-20 h-20 bg-brand-accent/10 border-2 border-brand-accent/20 rounded-[var(--radius-lg)] flex items-center justify-center text-brand-accent shadow-2xl backdrop-blur-md"
          >
            <Trophy size={42} strokeWidth={2.5} fill="currentColor" />
          </motion.div>
          
          <div className="space-y-3">
            <p className="text-loud text-emerald-100/40 !text-[10px] flex items-center justify-center gap-2">
              <Star size={14} fill="currentColor" className="text-brand-accent" />
              SANTUÁRIO DE CONQUISTAS
            </p>
            <h1 id="achievements-title" className="text-hero-title text-white">
              Grandes Conquistas
            </h1>
            <p className="text-poetic text-emerald-100/60 !text-[15px] max-w-md mx-auto">
              Cada medalha conta uma história de coragem e sabedoria. Veja sua coleção crescer conforme você evolui.
            </p>
          </div>

          <div className="mt-8 w-full max-w-sm space-y-3">
            <div className="flex items-center justify-between text-loud text-white/40 !text-[8px]">
              <span>PROGRESSO DA COLEÇÃO</span>
              <span className="text-white">{unlockedCount} / {totalCount}</span>
            </div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }} 
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-brand-accent shadow-[0_0_15px_rgba(251,191,36,0.5)]" 
              />
            </div>
            <p className="text-loud text-brand-accent !text-[9px] text-center">{progress}% COMPLETO</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="px-6 -mt-8 relative z-20 mb-12">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md p-1.5 rounded-[var(--radius-lg)] border border-emerald-50 shadow-lg flex gap-1">
          {([
            ['all', 'Todas'],
            ['unlocked', 'Conquistadas'],
            ['locked', 'Bloqueadas']
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              onClick={() => setFilter(value)}
              className={clsx(
                'flex-1 py-3 px-4 rounded-[var(--radius-md)] text-loud !text-[9px] transition-all duration-300',
                filter === value 
                  ? 'bg-emerald-950 text-white shadow-md' 
                  : 'text-emerald-950/40 hover:bg-emerald-50'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <section className="px-6 pb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Lista de conquistas">
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
              className={clsx(
                "relative text-left p-6 rounded-[var(--radius-card)] border-2 transition-all duration-300 flex flex-col gap-4 overflow-hidden group",
                !achievement.unlocked 
                  ? "bg-emerald-50/20 border-emerald-50/40 grayscale opacity-70" 
                  : "bg-white border-emerald-50 shadow-md hover:shadow-xl hover:border-emerald-100"
              )}
            >
              <div className="flex items-start justify-between">
                <div className={clsx(
                  "w-16 h-16 rounded-[var(--radius-lg)] flex items-center justify-center text-4xl shadow-inner border transition-transform group-hover:scale-110",
                  achievement.unlocked ? "bg-emerald-50 border-emerald-100" : "bg-emerald-100 border-emerald-200"
                )}>
                  {achievement.unlocked ? achievement.icon : <Lock size={28} className="text-emerald-300" />}
                </div>
                <span className="text-loud !text-[8px] px-3 py-1 rounded-full border" style={{ color: rarity.color, borderColor: `${rarity.color}40`, backgroundColor: `${rarity.color}10` }}>
                  {rarity.label}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-emerald-950 italic tracking-tight mb-1 truncate">
                  {achievement.title}
                </h3>
                <p className="text-poetic !text-[12px] !not-italic text-emerald-900/60 leading-tight line-clamp-2 mb-4">
                  {achievement.description}
                </p>

                {achievement.unlocked ? (
                  <div className="flex items-center gap-2 text-loud text-emerald-600 !text-[8px] mt-auto">
                    <CheckCircle2 size={12} strokeWidth={3} />
                    CONQUISTADO {achievement.unlockedAt?.toUpperCase()}
                  </div>
                ) : achievement.progress !== undefined && achievement.total !== undefined ? (
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center justify-between text-loud text-emerald-900/30 !text-[8px]">
                      <span>PROGRESSO</span>
                      <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                    <div className="h-2 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100 shadow-inner">
                      <div className="h-full bg-emerald-300 shadow-sm" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-loud text-emerald-300 !text-[8px] mt-auto">
                    <Lock size={12} />
                    BLOQUEADO
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </section>

      {/* Modal: Achievement Detail */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 24 }}
              className="relative w-full max-w-sm bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] overflow-hidden flex flex-col items-center text-center p-8 gap-6 pointer-events-auto"
              onClick={event => event.stopPropagation()}
            >
              <div className="w-24 h-24 rounded-[var(--radius-lg)] bg-emerald-50 flex items-center justify-center text-6xl shadow-inner border border-emerald-100">
                {selectedAchievement.icon}
              </div>
              
              <div className="space-y-2">
                <p className="text-loud !text-[9px]" style={{ color: rarityConfig[selectedAchievement.rarity as keyof typeof rarityConfig].color }}>
                  TROFÉU {rarityConfig[selectedAchievement.rarity as keyof typeof rarityConfig].label.toUpperCase()}
                </p>
                <h2 className="text-2xl font-black text-emerald-950 italic tracking-tight">{selectedAchievement.title}</h2>
                <p className="text-poetic !text-[14px] !not-italic text-emerald-900/60 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>

              {selectedAchievement.unlocked ? (
                <div className="w-full bg-emerald-50 rounded-[var(--radius-lg)] p-4 flex items-center justify-center gap-3 text-loud text-emerald-600 !text-[10px] border border-emerald-100">
                  <CheckCircle2 size={20} strokeWidth={3} />
                  Conquistado em {selectedAchievement.unlockedAt}
                </div>
              ) : selectedAchievement.progress !== undefined && selectedAchievement.total !== undefined ? (
                <div className="w-full bg-emerald-50 rounded-[var(--radius-lg)] p-4 flex items-center justify-center gap-3 text-loud text-emerald-900/40 !text-[10px] border border-emerald-100">
                  <Sparkles size={20} fill="currentColor" className="text-brand-accent" />
                  {selectedAchievement.progress} de {selectedAchievement.total} concluído
                </div>
              ) : (
                <div className="w-full bg-emerald-50 rounded-[var(--radius-lg)] p-4 flex items-center justify-center gap-3 text-loud text-emerald-950/20 !text-[10px] border border-emerald-100">
                  <Lock size={20} />
                  Ainda bloqueado
                </div>
              )}

              <button 
                className="w-full h-14 bg-emerald-950 text-white rounded-[var(--radius-lg)] text-loud !text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all border-0"
                onClick={() => setSelectedAchievement(null)}
              >
                CONTINUAR AVENTURA
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
