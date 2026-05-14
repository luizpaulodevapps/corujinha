'use client'

import { use, useState } from 'react'
import {
  ArrowLeft,
  Trophy,
  Coins,
  Zap,
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Shield,
  Sparkles,
  TrendingUp,
  Target,
  QrCode,
  Grid3X3,
  RefreshCcw,
  Heart
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { dashboardService } from '@/services/dashboard.service'
import { section } from 'framer-motion/client'

export default function ChildDossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId

  // Fetch Child Data
  const { data: child, isLoading: isLoadingChild } = useQuery<any>({
    queryKey: ['child', familyId, id],
    queryFn: () => dashboardService.getChild(familyId!, id),
    enabled: !!familyId && !!id
  })

  // Fetch Child Tasks
  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery<any[]>({
    queryKey: ['child-tasks', id],
    queryFn: () => dashboardService.getChildTasks(id),
    enabled: !!id
  })

  const isLoading = isLoadingChild || isLoadingTasks

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-bg-main">
        <div className="w-20 h-20 border-8 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
        <p className="text-brand-secondary font-black text-2xl animate-pulse">Lendo o Dossiê...</p>
      </div>
    )
  }

  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-bg-main">
        <div className="text-8xl">🦉❓</div>
        <h2 className="text-3xl font-black text-brand-primary">Explorador não encontrado</h2>
        <Link href="/dashboard" className="btn-primary px-8 py-4 !rounded-2xl bg-brand-primary text-white font-black">
          Voltar ao Ninho
        </Link>
      </div>
    )
  }

  const avatar = child.gender === 'girl' ? '🐰' : '🦊'
  const level = child.level || 1
  const xp = child.xp || 0
  const coins = child.coins || 0
  const nextLevelXp = level * 1000

  return (
    <div className="pb-20 lg:pb-12 min-h-screen bg-bg-main relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />

      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">

        {/* Navigation Header */}
        <header className="flex items-center justify-between mb-12">
          <Link href="/dashboard" className="flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest text-sm hover:gap-5 transition-all group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border-2 border-brand-primary/5 group-hover:border-brand-primary/20">
              <ArrowLeft size={20} />
            </div>
            Voltar ao Ninho
          </Link>

          <div className="flex gap-4">
            <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border-2 border-brand-primary/5 text-brand-primary hover:bg-brand-primary/5 transition-colors">
              <Target size={22} />
            </button>
            <button className="btn-primary px-6 py-3 !rounded-xl bg-brand-primary text-white font-black text-sm shadow-[0_4px_0_0_#1B4332] active:translate-y-1 active:shadow-none">
              Editar Perfil
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Side: Profile Hero & Stats */}
          <div className="lg:col-span-4 space-y-10">

            {/* Child Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[4rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border-8 border-white text-center relative group"
            >
              <div className="absolute top-8 right-8">
                <div className="w-12 h-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center text-brand-accent animate-pulse">
                  <Shield size={24} />
                </div>
              </div>

              <div className="w-48 h-48 bg-brand-primary/5 rounded-[3.5rem] flex items-center justify-center text-9xl mx-auto mb-8 border-8 border-brand-primary/10 shadow-inner group-hover:rotate-6 transition-transform duration-500">
                {child.avatar || avatar}
              </div>

              <h1 className="text-5xl font-black text-brand-primary tracking-tight mb-2 italic">
                {child.displayName}
              </h1>
              <p className="text-brand-secondary/40 font-black text-xl uppercase tracking-widest mb-8">
                {child.age} Anos de Aventura
              </p>

              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center px-4">
                  <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Nível {level}</span>
                  <span className="text-xs font-bold text-brand-secondary/40">{xp} / {nextLevelXp} XP</span>
                </div>
                <div className="h-4 bg-brand-primary/5 rounded-full overflow-hidden border-2 border-brand-primary/10 p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp / nextLevelXp) * 100}%` }}
                    className="h-full bg-brand-primary rounded-full shadow-[0_0_15px_rgba(45,106,79,0.4)]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <StatItem
                icon={<Coins className="text-amber-500" />}
                value={coins}
                label="Moedas"
                bgColor="bg-amber-50"
              />
              <StatItem
                icon={<Trophy className="text-brand-warm" />}
                value={child.achievements?.length || 0}
                label="Conquistas"
                bgColor="bg-brand-warm/5"
              />
              <StatItem
                icon={<Zap className="text-brand-accent" />}
                value={tasks.filter(t => t.status === 'approved').length}
                label="Missões OK"
                bgColor="bg-brand-accent/5"
              />
              <StatItem
                icon={<Heart className="text-brand-danger" />}
                value={child.streak || 0}
                label="Dias Seguidos"
                bgColor="bg-brand-danger/5"
              />
            </div>
          </div>

          {/* Right Side: Missions & Timeline */}
          <div className="lg:col-span-8 space-y-12">

            {/* Section: Active Missions */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                    <Sparkles size={20} className="text-brand-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Missões de Hoje</h2>
                </div>
                <button className="text-sm font-black text-brand-primary uppercase tracking-widest hover:underline underline-offset-8">
                  Ver Todas →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.filter(t => t.status === 'todo' || t.status === 'pending_approval').length > 0 ? (
                  tasks.filter(t => t.status === 'todo' || t.status === 'pending_approval').map((task, i) => (
                    <MissionCard key={task.id} task={task} index={i} />
                  ))
                ) : (
                  <div className="col-span-full py-16 bg-white/50 rounded-[3rem] border-4 border-dashed border-brand-primary/10 text-center">
                    <p className="text-brand-secondary/40 font-black text-xl italic">Nenhuma missão ativa no momento.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Section: Magic Access (QR & PIN) */}
            <section className="bg-brand-primary text-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(26,67,50,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Shield size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border-2 border-white/20">
                    <Grid3X3 size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-black italic">Acesso Mágico</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <p className="text-white/60 font-bold text-sm mb-6">Use estes dados para que {child.displayName} entre no aplicativo em outro dispositivo.</p>

                    <div className="space-y-6">
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Username do Explorador</span>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-black">@{child.username || child.displayName.toLowerCase().replace(' ', '_')}</span>
                          <button className="text-brand-accent font-black text-xs uppercase tracking-widest">Alterar</button>
                        </div>
                      </div>

                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">PIN de 4 Dígitos</span>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black tracking-[12px]">{child.pinCode || '****'}</span>
                          <button className="text-brand-accent font-black text-xs uppercase tracking-widest">Redefinir</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-white p-8 rounded-[2.5rem] text-brand-primary text-center">
                    <div className="w-40 h-40 bg-brand-primary/5 rounded-3xl border-4 border-dashed border-brand-primary/10 flex items-center justify-center mb-6 relative group">
                      <QrCode size={100} strokeWidth={1.5} />
                      <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                        <button className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg">
                          <RefreshCcw size={20} />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-black text-lg mb-1">Entrar via QR Code</h4>
                    <p className="text-xs text-brand-secondary/40 font-bold">Aponte a câmera do dispositivo da criança para este código.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Timeline / Progress History */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center border-2 border-brand-secondary/20">
                  <Clock size={20} className="text-brand-secondary" />
                </div>
                <h2 className="text-2xl font-black text-brand-primary italic">Linha do Tempo de Crescimento</h2>
              </div>

              <div className="space-y-6">
                {tasks.filter(t => t.status === 'approved').length > 0 ? (
                  tasks.filter(t => t.status === 'approved').slice(0, 5).map((task, i) => (
                    <TimelineItem key={task.id} task={task} />
                  ))
                ) : (
                  <div className="py-12 bg-white/40 rounded-[2.5rem] text-center border-4 border-white/60">
                    <p className="text-brand-secondary/30 font-bold">A jornada épica está apenas começando!</p>
                  </div>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  )
}

function StatItem({ icon, value, label, bgColor }: { icon: React.ReactNode, value: number | string, label: string, bgColor: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-8 rounded-[2.5rem] ${bgColor} border-4 border-white shadow-sm flex flex-col items-center text-center`}
    >
      <div className="mb-3 transform scale-125">{icon}</div>
      <div className="text-3xl font-black text-brand-primary leading-none">{value}</div>
      <div className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest mt-2">{label}</div>
    </motion.div>
  )
}

function MissionCard({ task, index }: { task: any, index: number }) {
  const isPending = task.status === 'pending_approval'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-[2.5rem] p-8 border-4 ${isPending ? 'border-brand-warm/30' : 'border-white'} shadow-sm relative overflow-hidden group`}
    >
      {isPending && (
        <div className="absolute top-0 right-0 bg-brand-warm text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
          Aguardando Validação
        </div>
      )}

      <div className="flex items-center gap-6 mb-6">
        <div className="w-16 h-16 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500">
          {task.taskEmoji || '📝'}
        </div>
        <div>
          <h4 className="text-2xl font-black text-brand-primary leading-tight">{task.taskTitle}</h4>
          <p className="text-xs font-bold text-brand-secondary/40 mt-1">{task.recurrenceType === 'daily' ? 'Missão Diária' : 'Missão Única'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-brand-primary/5">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-amber-600 font-black">
            <Coins size={16} /> +{task.rewardCoins || 0}
          </div>
          <div className="flex items-center gap-1.5 text-brand-primary font-black">
            <Zap size={16} /> +{task.rewardXp || 0} XP
          </div>
        </div>
        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
          <ArrowLeft size={18} className="rotate-180" />
        </div>
      </div>
    </motion.div>
  )
}

function TimelineItem({ task }: { task: any }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border-4 border-white group-hover:bg-brand-primary/5 transition-colors">
          <CheckCircle2 size={24} className="text-brand-success" />
        </div>
        <div className="w-1 h-full bg-brand-primary/5 rounded-full mt-2" />
      </div>

      <div className="flex-1 bg-white p-6 rounded-[2rem] shadow-sm border-4 border-white hover:border-brand-primary/10 transition-all">
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-black text-brand-primary text-xl tracking-tight">{task.taskTitle}</h5>
          <span className="text-[10px] font-bold text-brand-secondary/30 uppercase tracking-widest">
            {task.approvedAt ? new Date(task.approvedAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Recentemente'}
          </span>
        </div>
        <p className="text-brand-secondary/60 font-bold text-sm">Missão concluída com perfeição! Ganhou recompensas mágicas.</p>
        <div className="flex gap-4 mt-4">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-tighter">+{task.rewardCoins} Moedas</span>
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-tighter">+{task.rewardXp} XP</span>
        </div>
      </div>
    </div>
  )
}
