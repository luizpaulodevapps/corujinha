'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Coins, Flag, Sparkles, Target, Trophy } from 'lucide-react'
import { PageContainer } from '@/components/page-container'
import { useGoals } from '@/features/goals/hooks/use-goals'
import { GoalCard } from '@/features/goals/components/GoalCard'
import { GoalsBackground } from '@/features/goals/components/GoalsBackground'
import { useChildDashboard } from '@/features/dashboard/hooks/use-child-dashboard'

export default function MetasPage() {
  const [mounted, setMounted] = useState(false)
  const { goals } = useGoals()
  const { profile, fetchProfile } = useChildDashboard()

  useEffect(() => {
    setMounted(true)
    if (!profile) {
      fetchProfile('child-1')
    }
  }, [profile, fetchProfile])

  if (!mounted || !profile) return (
    <div className="min-h-screen bg-[#0A1A14] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
        <Target className="text-brand-primary" size={48} />
      </motion.div>
    </div>
  )

  const completedGoals = goals.filter(goal => goal.progress >= goal.total).length
  const totalReward = goals.reduce((sum, goal) => sum + (goal.reward.includes('moedas') ? Number.parseInt(goal.reward) || 0 : 0), 0)
  const averageProgress = goals.length
    ? Math.round(goals.reduce((sum, goal) => sum + Math.min(100, (goal.progress / goal.total) * 100), 0) / goals.length)
    : 0

  return (
    <PageContainer title="Trilha de Metas" hideHeader hideAvatar>
      <GoalsBackground />

      {/* Hero Section: Goals Sanctuary (ADS V3.2) */}
      <section className="relative px-8 pt-16 pb-20 rounded-b-[4rem] bg-emerald-950 overflow-hidden" aria-labelledby="goals-title">
        {/* Atmosphere Layers */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url(/textures/noise.svg)]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-brand-accent"
          >
            <Target size={32} strokeWidth={2.5} />
          </motion.div>
          
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.3em] text-brand-accent/60 uppercase">
              — Diário de Aventuras —
            </p>
            <h1 id="goals-title" className="text-hero-title text-white tracking-tight">
              Sua Trilha de Metas
            </h1>
            <p className="text-poetic text-emerald-100/60 !text-[16px] max-w-xs mx-auto !not-italic">
              Cada objetivo mostra o próximo passo da sua jornada mágica.
            </p>
          </div>
        </div>
      </section>

      {/* Summary Section: Stats (Warm Neutrals) */}
      <section className="px-6 -mt-10 mb-20 relative z-20" aria-label="Resumo das metas">
        <div className="max-w-xl mx-auto grid grid-cols-3 gap-3">
          {[
            { icon: Flag, label: 'METAS', value: goals.length },
            { icon: CheckCircle2, label: 'FEITAS', value: completedGoals },
            { icon: Trophy, label: 'STATUS', value: `${averageProgress}%` }
          ].map((item, i) => (
            <div key={i} className="bg-color-moon-cream rounded-[2rem] p-5 border border-emerald-100 shadow-sm flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50/50 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                <item.icon size={18} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[8px] font-bold tracking-widest text-emerald-950/30 block uppercase">{item.label}</span>
                <strong className="text-xl font-black text-emerald-950 tracking-tighter leading-none">{item.value}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goals List (Narrative Spacing) */}
      <section className="px-8 pb-16 max-w-2xl mx-auto" aria-labelledby="goals-list-title">
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="space-y-1">
            <p className="text-[9px] font-bold tracking-[0.2em] text-emerald-900/30 uppercase">Trilha Ativa</p>
            <h2 id="goals-list-title" className="text-2xl font-black text-emerald-950 italic tracking-tighter">Objetivos Atuais</h2>
          </div>
          <span className="bg-brand-accent/10 text-emerald-900 text-[10px] font-bold tracking-widest px-6 py-3 rounded-full flex items-center gap-2 border border-brand-accent/20">
            <Coins size={14} fill="currentColor" className="text-brand-accent" />
            {totalReward || goals.length} PRÊMIOS
          </span>
        </div>

        <div className="grid gap-8">
          {goals.map((goal, index) => (
            <GoalCard key={goal.id} goal={goal} index={index} />
          ))}
        </div>
      </section>

      {/* Mentor Wisdom: Integrated Design */}
      <aside className="px-8 pb-32 max-w-2xl mx-auto">
        <div className="bg-emerald-950/95 rounded-[3rem] p-10 flex flex-col sm:flex-row items-center gap-8 shadow-sm relative overflow-hidden text-center sm:text-left">
          <div className="absolute inset-0 opacity-[0.05] bg-[url(/textures/noise.svg)] pointer-events-none" />
          <div className="w-24 h-24 shrink-0 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
            <img src="/owl_mascot_new.png" alt="Corujinha" className="w-16 h-16 object-contain opacity-80" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-brand-accent/60 uppercase mb-2">Sussurro do Guardião</p>
            <p className="text-poetic text-white !text-[16px] !not-italic leading-relaxed italic opacity-90">
              "Cada passo na trilha te deixa mais perto de se tornar um grande guardião do ninho."
            </p>
          </div>
        </div>
      </aside>
    </PageContainer>
  )
}
