'use client'

import { useState } from 'react'
import { 
  Users, 
  Baby, 
  Calendar, 
  Clock, 
  Coins, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Gift,
  Loader2,
  Trophy,
  Zap,
  Sparkles,
  Link,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/auth.store'
import { dashboardService } from '@/services/dashboard.service'
import { CreateTaskModal } from '@/components/dashboard/create-task-modal'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId

  // Fetch Family Data (including Guardians)
  const { data: family, isLoading: isLoadingFamily } = useQuery<any>({
    queryKey: ['family', familyId],
    queryFn: () => dashboardService.getFamily(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  // Fetch Children
  const { data: dbChildren = [], isLoading: isLoadingChildren } = useQuery<any[]>({
    queryKey: ['children', familyId],
    queryFn: () => dashboardService.getChildren(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  // Se estivermos em modo preview ou se o DB estiver vazio mas tivermos dados locais, use os locais
  const children = dbChildren.length > 0 ? dbChildren : (user?.previewChildren || [])

  // Fetch Pending Tasks
  const { data: pendingTasks = [], isLoading: isLoadingTasks } = useQuery<any[]>({
    queryKey: ['pending-tasks', familyId],
    queryFn: () => dashboardService.getPendingApprovals(familyId!),
    enabled: !!familyId
  })

  const queryClient = useQueryClient()

  const approveMutation = useMutation({
    mutationFn: (taskId: string) => dashboardService.approveTask(taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pending-tasks'] })
  })

  const rejectMutation = useMutation({
    mutationFn: (taskId: string) => dashboardService.rejectTask(taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pending-tasks'] })
  })

  const isLoading = isLoadingFamily || isLoadingChildren || isLoadingTasks

  return (
    <div className="pb-20 lg:pb-0 min-h-screen bg-bg-main relative overflow-hidden">
      {/* Background Leaves Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />
      
      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-[1.5rem] flex items-center justify-center border-4 border-card-border shadow-sm">
              <Users size={32} className="text-brand-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-brand-primary leading-none italic">
                {family?.familyName || 'Nosso Ninho'}
              </h1>
              <p className="text-brand-secondary/60 font-bold text-lg mt-1 italic">Guardiões e pequenos exploradores da floresta.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="btn-secondary px-8 py-4 !rounded-2xl border-4 border-brand-primary/10 bg-white text-brand-primary font-black hover:bg-brand-primary/5 shadow-sm">
              Convidar Guardião
            </button>
            <button 
              onClick={() => setIsTaskModalOpen(true)}
              className="btn-primary px-8 py-4 !rounded-2xl bg-brand-primary text-white font-black shadow-[0_6px_0_0_#1B4332] active:translate-y-1 active:shadow-none flex items-center gap-2"
            >
              <Plus size={24} /> Nova Missão
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-4 border-brand-primary/20 rounded-full"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full border-4 border-brand-primary rounded-full border-t-transparent"
                />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl"
                >
                  🦉
                </motion.div>
              </div>
            </div>
            <p className="text-brand-secondary font-black text-2xl animate-pulse tracking-tight">Sincronizando o Ninho...</p>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-2 h-2 bg-brand-primary rounded-full"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Guardians */}
            <div className="lg:col-span-5 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-warm/10 rounded-xl flex items-center justify-center border-2 border-brand-warm/20">
                    <Star size={20} className="text-brand-warm fill-brand-warm" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Guardiões Sábios</h2>
                </div>

                <div className="space-y-4">
                  {/* Primary Guardian (Current User) */}
                  <GuardianCard 
                    name={user?.displayName || 'Guardião'} 
                    role="MENTOR PRINCIPAL" 
                    avatar={user?.photoURL || '🦉'} 
                    isHost
                  />
                  
                  {/* Other Guardians from Family Data */}
                  {Object.entries(family?.guardians || {}).map(([id, g]: [string, any]) => {
                    if (id === user?.uid || id === 'partner') return null
                    return (
                      <GuardianCard 
                        key={id}
                        name={g.name} 
                        role={g.role === 'mentor' ? 'MENTOR DA FLORESTA' : g.role} 
                        avatar={g.avatar || '🦉'} 
                      />
                    )
                  })}
                </div>
              </section>

              {/* Pending Invite Card */}
              {family?.guardians?.partner && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-primary/5 border-4 border-brand-primary/10 rounded-[3rem] p-8 relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4 text-brand-secondary">
                    <Sparkles size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Convite em Voo</span>
                  </div>
                  <h4 className="text-xl font-black text-brand-primary mb-2">Você enviou um convite para</h4>
                  <p className="text-brand-primary font-bold underline mb-6">{family.guardians.partner.email}</p>
                  <button className="text-xs font-black text-brand-secondary hover:text-brand-primary transition-colors flex items-center gap-2">
                    Reenviar Coruja →
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right Column: Children & Tasks */}
            <div className="lg:col-span-7 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                    <Baby size={20} className="text-brand-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Pequenos Corujinhas</h2>
                </div>

                <div className="space-y-6">
                  {children.length > 0 ? children.map((child: any, index: number) => (
                    <ChildCard key={child.id || index} child={child} index={index} />
                  )) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center bg-card-bg/55 rounded-[3rem] border-4 border-dashed border-brand-primary/10 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <Baby size={120} className="text-brand-primary" />
                      </div>
                      <div className="relative z-10">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl mb-4"
                        >
                          🐣
                        </motion.div>
                        <p className="text-brand-secondary/60 font-black text-xl italic mb-2">Nenhum explorador no ninho ainda.</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary px-6 py-3 !rounded-2xl text-sm"
                        >
                          Adicionar Primeira Criança
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </section>

              {/* Tasks to Validate */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center border-2 border-brand-accent/20">
                    <Sparkles size={20} className="text-brand-accent" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Missões para Validar</h2>
                </div>
                <div className="space-y-6">
                  {pendingTasks.length > 0 ? pendingTasks.map((task: any) => (
                    <PendingTaskCard 
                      key={task.id} 
                      task={task} 
                      onApprove={() => approveMutation.mutate(task.id)}
                      onReject={() => rejectMutation.mutate(task.id)}
                      isProcessing={approveMutation.isPending || rejectMutation.isPending}
                    />
                  )) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card-bg/55 p-16 rounded-[3rem] border-4 border-dashed border-brand-primary/10 text-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <Sparkles size={120} className="text-brand-accent" />
                      </div>
                      <div className="relative z-10">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-6xl mb-4"
                        >
                          🌟
                        </motion.div>
                        <p className="text-brand-secondary/60 font-black text-xl italic">Tudo em paz na floresta!</p>
                        <p className="text-brand-secondary/30 font-bold text-sm mt-2">Nenhuma missão para validar no momento</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      <CreateTaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        familyId={familyId || ''}
        children={children}
      />
    </div>
  )
}

function GuardianCard({ name, role, avatar, isHost }: { name: string, role: string, avatar: string, isHost?: boolean }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-[2.5rem] p-6 shadow-sm border-4 border-card-border flex items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-16 h-16 bg-brand-warm/5 rounded-2xl flex items-center justify-center text-4xl border-2 border-brand-warm/10 transition-transform"
        >
          {avatar.length > 2 ? <img src={avatar} alt={name} className="w-full h-full object-cover rounded-2xl" /> : avatar}
        </motion.div>
        <div>
          <h3 className="font-black text-xl text-brand-primary leading-tight">{name}</h3>
          <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-[0.2em] mt-1">{role}</p>
        </div>
      </div>
      {isHost ? (
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="bg-brand-primary/5 text-brand-primary text-[10px] font-black px-3 py-1 rounded-full border border-brand-primary/10 uppercase tracking-widest"
        >
          Anfitrião
        </motion.span>
      ) : (
        <motion.div
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={20} className="text-brand-secondary/20 hover:text-brand-primary cursor-pointer transition-colors" />
        </motion.div>
      )}
    </motion.div>
  )
}

function ChildCard({ child, index }: { child: any, index: number }) {
  const age = child.age || 0
  const level = child.level || 1
  const avatar = child.gender === 'girl' ? '🐰' : '🦊'

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 10, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="bg-white rounded-[3rem] p-8 shadow-sm border-4 border-card-border flex items-center gap-8 relative group cursor-pointer"
    >
      <motion.div 
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="w-24 h-24 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-6xl border-4 border-brand-primary/10 transition-transform shadow-inner"
      >
        {child.avatar || avatar}
      </motion.div>
      
      <div className="flex-1">
        <h3 className="font-black text-3xl text-brand-primary leading-tight mb-1">{child.displayName}</h3>
        <p className="text-brand-secondary/60 font-black text-lg italic">
          {age} anos de aventura · <span className="text-brand-warm">Nível {level}</span>
        </p>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex flex-col gap-1">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="flex items-center gap-2 text-brand-primary"
             >
                <Trophy size={18} className="text-brand-warm" />
                <span className="text-sm font-black tracking-tight">{child.achievements?.length || 0} Conquistas</span>
             </motion.div>
             <p className="text-[10px] font-black text-brand-secondary/30 uppercase tracking-widest">
               Membro desde {child.createdAt ? new Date(child.createdAt?.seconds * 1000).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Jan 2026'}
             </p>
          </div>
          
          <div className="flex-1 h-3 bg-brand-primary/5 rounded-full overflow-hidden border border-brand-primary/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full shadow-[0_0_10px_rgba(45,106,79,0.3)]"
            />
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link 
          href={`/children/${child.id}`}
          className="w-14 h-14 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center border-4 border-card-border shadow-sm hover:bg-brand-primary hover:text-white transition-all"
        >
          <ArrowRight size={28} />
        </Link>
      </motion.div>
    </motion.div>
  )
}

function PendingTaskCard({ task, onApprove, onReject, isProcessing }: { task: any, onApprove: () => void, onReject: () => void, isProcessing?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border-4 border-card-border rounded-[2.5rem] shadow-sm hover:border-brand-primary/20 transition-all group gap-6"
    >
      <div className="flex items-center gap-6 w-full md:w-auto">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.15 }}
          className="w-16 h-16 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-2 border-brand-secondary/20 transition-transform"
        >
          {task.taskEmoji || '📝'}
        </motion.div>
        <div>
          <p className="font-black text-brand-primary text-2xl mb-1">{task.taskTitle || 'Missão Misteriosa'}</p>
          <div className="flex flex-wrap items-center gap-3">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/5 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-tight cursor-default"
            >
              {task.childEmoji || '👤'} {task.childName || 'Explorador'}
            </motion.span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-brand-secondary/40">
              <Clock size={14} /> {task.completedAt || 'Recentemente'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-brand-primary/5">
        <div className="flex flex-col items-end px-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1.5 text-xl font-black text-amber-500"
          >
            <Coins size={18} className="fill-amber-500/20" /> +{task.coins || 0}
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1.5 text-xs font-black text-brand-secondary/40 uppercase tracking-[0.1em]"
          >
            <Trophy size={12} /> +{task.xp || 0} XP
          </motion.div>
        </div>

        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onReject}
            disabled={isProcessing}
            className="w-14 h-14 flex items-center justify-center rounded-2xl border-4 border-card-border bg-brand-primary/5 text-brand-primary hover:bg-brand-danger/10 hover:text-brand-danger transition-all font-black disabled:opacity-50 text-xl shadow-sm"
          >
            ✕
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onApprove}
            disabled={isProcessing}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-primary text-white hover:bg-brand-secondary transition-all shadow-[0_4px_0_0_#1B4332] active:translate-y-1 active:shadow-none disabled:opacity-50"
          >
            <CheckCircle2 size={32} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
