'use client'

import {
  BarChart3,
  TrendingUp,
  Trophy,
  Star,
  Target,
  Baby,
  Activity,
  Loader2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { dashboardService } from '@/services/dashboard.service'

export default function ReportsPage() {
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId

  // Fetch Data for Aggregation
  const { data: children = [], isLoading: isLoadingChildren } = useQuery<any[]>({
    queryKey: ['children', familyId],
    queryFn: () => dashboardService.getChildren(familyId!),
    enabled: !!familyId
  })

  const { data: history = [], isLoading: isLoadingHistory } = useQuery<any[]>({
    queryKey: ['history', familyId],
    queryFn: () => dashboardService.getHistory(familyId!),
    enabled: !!familyId
  })

  const isLoading = isLoadingChildren || isLoadingHistory

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-bg-main">
        <Loader2 className="animate-spin text-brand-primary" size={60} />
        <p className="text-brand-secondary font-black text-2xl animate-pulse">Gerando Relatórios...</p>
      </div>
    )
  }

  // Aggregations
  const totalMissions = history.filter(h => h.status === 'approved').length
  const totalXp = history.reduce((acc, h) => acc + (h.rewardXp || 0), 0)
  const avgLevel = children.length > 0
    ? (children.reduce((acc: number, c: any) => acc + (c.level || 1), 0) / children.length).toFixed(1)
    : '1.0'

  return (
    <div className="pb-20 lg:pb-0 min-h-screen bg-bg-main relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />

      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-[1.5rem] flex items-center justify-center border-4 border-card-border shadow-sm">
              <BarChart3 size={32} className="text-brand-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-brand-primary leading-none italic">
                Observatório do Ninho
              </h1>
              <p className="text-brand-secondary/60 font-bold text-lg mt-1 italic">Analise o crescimento e a evolução dos seus exploradores.</p>
            </div>
          </div>

          <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border-4 border-card-border">
            {(['Geral'].map((p) => (
              <button
                key={p}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all bg-brand-primary text-white shadow-lg`}
              >
                {p}
              </button>
            )))}
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <ReportStatCard icon={<Target className="text-brand-primary" />} label="Total de Missões" value={totalMissions} trend="Real-time" />
          <ReportStatCard icon={<Trophy className="text-brand-warm" />} label="Total de XP" value={totalXp.toLocaleString('pt-BR')} trend="Global" />
          <ReportStatCard icon={<Activity className="text-brand-success" />} label="Exploradores" value={children.length} trend="Ativos" />
          <ReportStatCard icon={<Star className="text-brand-accent" />} label="Nível Médio" value={avgLevel} trend="Progresso" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Chart Section (Using real children names) */}
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border-4 border-card-border">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-brand-primary italic">Atividade dos Pequenos</h3>
                <div className="flex items-center gap-4 flex-wrap">
                  {children.map((child: any, i: number) => (
                    <div key={child.id} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-brand-primary' : i === 1 ? 'bg-brand-accent' : 'bg-brand-secondary'}`} />
                      <span className="text-[10px] font-black text-brand-secondary/70 uppercase tracking-widest">{child.displayName}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-64 flex items-end justify-between gap-4 px-4">
                {[40, 65, 30, 85, 50, 75, 90].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        className="w-1/3 bg-brand-primary rounded-t-xl group-hover:bg-brand-secondary transition-colors"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${val * 0.7}%` }}
                        className="w-1/3 bg-brand-accent rounded-t-xl group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <span className="text-[10px] font-black text-brand-secondary/30 uppercase tracking-widest">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[3rem] p-10 shadow-sm border-4 border-card-border">
                <h3 className="text-xl font-black text-brand-primary mb-8 italic">Engajamento Semanal</h3>
                <div className="space-y-6">
                  <CategoryProgress label="Missões Concluídas" percent={totalMissions > 10 ? 100 : totalMissions * 10} color="bg-brand-primary" />
                  <CategoryProgress label="Aprovação Parental" percent={100} color="bg-brand-success" />
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 shadow-sm border-4 border-card-border">
                <h3 className="text-xl font-black text-brand-primary mb-8 italic">Próximos Marcos</h3>
                <div className="space-y-6">
                  {children.slice(0, 2).map((child: any) => (
                    <div key={child.id} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 font-black">Lvl {(child.level || 1) + 1}</div>
                      <div>
                        <p className="font-black text-brand-primary leading-tight">{child.displayName}</p>
                        <p className="text-xs font-bold text-brand-secondary/40 italic">Faltam {(child.level || 1) * 1000 - (child.xp || 0)} XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side Info Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-brand-primary/5 border-4 border-brand-primary/10 rounded-[3rem] p-8">
              <h3 className="text-xl font-black text-brand-primary mb-6 flex items-center gap-2 italic">
                <TrendingUp size={24} /> Visão Geral
              </h3>
              <p className="text-brand-secondary font-bold leading-relaxed mb-8">
                O ninho está em pleno crescimento! Com {children.length} exploradores ativos, já completamos um total de {totalMissions} missões mágicas.
              </p>
              <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl border-2 border-brand-primary/10 flex justify-between items-center">
                  <span className="font-black text-brand-primary">Total XP</span>
                  <span className="font-black text-2xl text-brand-primary">{totalXp.toLocaleString('pt-BR')}</span>
                </div>
                <div className="p-5 bg-white rounded-2xl border-2 border-brand-primary/10 flex justify-between items-center">
                  <span className="font-black text-brand-primary">Moedas Geradas</span>
                  <span className="font-black text-2xl text-amber-500">{history.reduce((acc, h) => acc + (h.rewardCoins || 0), 0)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 shadow-sm border-4 border-card-border">
              <h3 className="text-xl font-black text-brand-primary mb-6 italic">Top Exploradores</h3>
              <div className="space-y-6">
                {children.sort((a: any, b: any) => (b.xp || 0) - (a.xp || 0)).map((child: any, i: number) => (
                  <ExplorerMiniCard key={child.id} name={child.displayName} xp={child.xp || 0} pos={i + 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReportStatCard({ icon, label, value, trend }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-4 border-card-border">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary">
          {icon}
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-brand-success/10 text-brand-success' : 'bg-brand-secondary/10 text-brand-secondary/40'}`}>
          {trend}
        </span>
      </div>
      <p className="text-[10px] font-black text-brand-secondary/70 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-brand-primary mt-1">{value}</p>
    </div>
  )
}

function CategoryProgress({ label, percent, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-black text-brand-primary uppercase tracking-widest">{label}</span>
        <span className="text-xs font-black text-brand-primary">{percent}%</span>
      </div>
      <div className="h-3 bg-brand-primary/5 rounded-full overflow-hidden border border-brand-primary/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className={`h-full ${color} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]`}
        />
      </div>
    </div>
  )
}

function ExplorerMiniCard({ name, xp, pos }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-primary/5 rounded-full flex items-center justify-center font-black text-brand-primary border-2 border-card-border shadow-sm">
          #{pos}
        </div>
        <p className="font-black text-brand-primary">{name}</p>
      </div>
      <span className="font-black text-brand-secondary/40">{xp} XP</span>
    </div>
  )
}
