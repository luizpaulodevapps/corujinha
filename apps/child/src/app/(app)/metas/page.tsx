'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Coins, Flag, Sparkles, Target, Trophy } from 'lucide-react'
import { PageContainer } from '@/components/page-container'
import { useGoals } from '@/features/goals/hooks/use-goals'
import { GoalCard } from '@/features/goals/components/GoalCard'
import { GoalsBackground } from '@/features/goals/components/GoalsBackground'

export default function MetasPage() {
  const [mounted, setMounted] = useState(false)
  const { goals } = useGoals()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const completedGoals = goals.filter(goal => goal.progress >= goal.total).length
  const totalReward = goals.reduce((sum, goal) => sum + (goal.reward.includes('moedas') ? Number.parseInt(goal.reward) || 0 : 0), 0)
  const averageProgress = goals.length
    ? Math.round(goals.reduce((sum, goal) => sum + Math.min(100, (goal.progress / goal.total) * 100), 0) / goals.length)
    : 0

  return (
    <PageContainer title="Trilha de Metas" hideHeader hideAvatar>
      <GoalsBackground />

      <section className="cg-hero" aria-labelledby="goals-title">
        <div className="cg-hero__badge">
          <Target size={38} strokeWidth={2.6} />
        </div>
        <div className="cg-hero__copy">
          <p className="cg-kicker">
            <Sparkles size={15} />
            Diario de aventuras
          </p>
          <h1 id="goals-title">Conclua metas, vire lenda</h1>
          <p>Cada objetivo mostra o proximo passo da sua jornada e a recompensa que espera no final.</p>
        </div>
      </section>

      <section className="cg-summary" aria-label="Resumo das metas">
        <div className="cg-summary__item">
          <Flag size={18} />
          <span>Metas</span>
          <strong>{goals.length}</strong>
        </div>
        <div className="cg-summary__item">
          <CheckCircle2 size={18} />
          <span>Completas</span>
          <strong>{completedGoals}</strong>
        </div>
        <div className="cg-summary__item">
          <Trophy size={18} />
          <span>Progresso</span>
          <strong>{averageProgress}%</strong>
        </div>
      </section>

      <section className="cg-goals" aria-labelledby="goals-list-title">
        <div className="cg-section-head">
          <div>
            <p className="cg-eyebrow">Trilha ativa</p>
            <h2 id="goals-list-title">Objetivos atuais</h2>
          </div>
          <span className="cg-reward-pill">
            <Coins size={15} fill="currentColor" />
            {totalReward || goals.length} premios
          </span>
        </div>

        <div className="cg-list">
          {goals.map((goal, index) => (
            <GoalCard key={goal.id} goal={goal} index={index} />
          ))}
        </div>
      </section>

      <aside className="cg-tip">
        <img src="/owl_mascot_new.png" alt="Corujinha" />
        <div>
          <p>Dica de mestre</p>
          <strong>Cada passo na trilha te deixa mais perto de se tornar um grande guardiao do ninho.</strong>
        </div>
      </aside>
    </PageContainer>
  )
}
