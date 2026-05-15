'use client'

import { useState } from 'react'
import { 
  Plus,
  Star, 
  Baby,
  Sparkles,
  Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/auth.store'
import { dashboardService } from '@/services/dashboard.service'
import { CreateTaskModal } from '@/components/dashboard/create-task-modal'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// Novos Componentes Modularizados
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { GuardianCard, ChildCard, PendingTaskCard } from '@/components/dashboard/dashboard-cards'

export default function DashboardPage() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId
  const queryClient = useQueryClient()

  // ─── Queries ───────────────────────────────────────────────────────────
  const { data: family, isLoading: isLoadingFamily } = useQuery<any>({
    queryKey: ['family', familyId],
    queryFn: () => dashboardService.getFamily(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  const { data: dbChildren = [], isLoading: isLoadingChildren } = useQuery<any[]>({
    queryKey: ['children', familyId],
    queryFn: () => dashboardService.getChildren(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  const { data: pendingTasks = [], isLoading: isLoadingTasks } = useQuery<any[]>({
    queryKey: ['pending-tasks', familyId],
    queryFn: () => dashboardService.getPendingApprovals(familyId!),
    enabled: !!familyId
  })

  // ─── Mutations ──────────────────────────────────────────────────────────
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
    <div className="min-h-screen bg-bg-main pb-24 lg:pb-12 pt-safe relative overflow-x-hidden">
      {/* Background Leaves Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <DashboardHeader 
          familyName={family?.familyName || 'Nosso Ninho'} 
          childrenCount={dbChildren.length}
        />

        {/* FAB for Mobile PWA */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsTaskModalOpen(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-2xl lg:hidden z-40 border-4 border-emerald-900/50 active:translate-y-1"
        >
          <Plus size={32} strokeWidth={3} />
        </motion.button>

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
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🦉</div>
            </div>
            <p className="text-brand-secondary font-black text-2xl animate-pulse tracking-tight italic">Sincronizando o Ninho...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Coluna Esquerda: Guardiões */}
            <div className="lg:col-span-5 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-warm/10 rounded-xl flex items-center justify-center border-2 border-brand-warm/20">
                    <Star size={20} className="text-brand-warm fill-brand-warm" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Guardiões Sábios</h2>
                </div>

                <div className="space-y-4">
                  <GuardianCard 
                    name={user?.displayName || 'Guardião'} 
                    role="MENTOR PRINCIPAL" 
                    avatar={user?.photoURL || '🦉'} 
                    isHost
                  />
                  
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
                </motion.div>
              )}
            </div>

            {/* Coluna Direita: Filhos & Missões */}
            <div className="lg:col-span-7 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                    <Baby size={20} className="text-brand-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Pequenos Corujinhas</h2>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                    {dbChildren.map((child: any, index: number) => (
                      <ChildCard key={child.id || index} child={child} index={index} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>

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
                    <div className="bg-card-bg/55 p-16 rounded-[3rem] border-4 border-dashed border-brand-primary/10 text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-6xl mb-4">🌟</div>
                        <p className="text-brand-primary/60 font-black text-xl italic">Tudo em paz na floresta!</p>
                        <p className="text-brand-secondary/40 font-bold text-sm mt-2">Nenhuma missão para validar no momento</p>
                      </div>
                    </div>
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
        children={dbChildren}
      />
    </div>
  )
}
