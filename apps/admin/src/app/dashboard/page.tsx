'use client'

import { AdminShell } from '@/components/admin-shell'
import { 
  Users, 
  Sword, 
  TrendingUp, 
  Clock,
  Activity,
  Loader2
} from 'lucide-react'
import { useAdminData } from '@/hooks/use-admin-data'
import { StatCard } from '@/components/dashboard/stat-card'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ValidationQueue } from '@/components/dashboard/validation-queue'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const { families, children, tasks, pendingTasks, isLoading, approveTask, rejectTask } = useAdminData()

  if (isLoading) {
    return (
      <AdminShell>
        <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center space-y-4"
           >
              <div className="relative">
                <Loader2 className="animate-spin text-brand-primary mx-auto" size={40} />
              </div>
              <p className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Sincronizando Universo...</p>
           </motion.div>
        </div>
      </AdminShell>
    )
  }

  const stats = [
    { label: 'Famílias Ativas', value: families.length.toString(), change: '+12%', icon: Users, color: '#3B82F6', bgColor: '#EFF6FF' },
    { label: 'Pequenos Heróis', value: children.length.toString(), change: '+18%', icon: Activity, color: '#8B5CF6', bgColor: '#F5F3FF' },
    { label: 'Missões Ativas', value: tasks.filter(t => t.active).length.toString(), change: '+5%', icon: Sword, color: '#10B981', bgColor: '#ECFDF5' },
    { label: 'Validações', value: pendingTasks.length.toString(), change: 'Pendentes', icon: Clock, color: '#F59E0B', bgColor: '#FFFBEB', isPending: true },
  ]

  return (
    <AdminShell>
      <DashboardHeader 
        title="Dashboard Executivo" 
        subtitle="Bem-vindo ao Centro de Comando Estratégico da Corujinha." 
      />

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Dashboard Intelligence Area */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 gap-8"
      >
        <ValidationQueue 
          tasks={pendingTasks} 
          onApprove={approveTask} 
          onReject={rejectTask} 
        />
      </motion.div>
    </AdminShell>
  )
}
