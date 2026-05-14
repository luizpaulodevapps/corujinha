'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Plus, 
  Search, 
  CheckCircle2,
  Clock,
  ArrowRight,
  Target,
  Coins,
  Trophy,
  Sparkles,
  Zap,
  Star,
  Activity,
  Flame,
  Filter,
  Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import { useAuthStore } from '@/store/auth.store'
import { CreateTaskModal } from '@/components/dashboard/create-task-modal'

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'daily' | 'one-time'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId

  // Fetch Real Data
  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery<any[]>({
    queryKey: ['tasks', familyId],
    queryFn: () => dashboardService.getTasks(familyId!),
    enabled: !!familyId
  })

  const { data: children = [], isLoading: isLoadingChildren } = useQuery<any[]>({
    queryKey: ['children', familyId],
    queryFn: () => dashboardService.getChildren(familyId!),
    enabled: !!familyId
  })

  const isLoading = isLoadingTasks || isLoadingChildren

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.recurrenceType === filter
    const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Stats Aggregation
  const stats = {
    active: tasks.filter(t => t.status === 'todo').length,
    pending: tasks.filter(t => t.status === 'pending_approval').length,
    completedToday: tasks.filter(t => t.status === 'approved' && t.updatedAt?.seconds > (Date.now() / 1000 - 86400)).length
  }

  return (
    <div className="pb-20 lg:pb-12 min-h-screen bg-bg-main relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />
      
      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">
        
        {/* Incredible Header Section */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="w-20 h-20 bg-brand-primary/10 rounded-[2rem] flex items-center justify-center border-4 border-card-border shadow-xl"
              >
                <Calendar size={40} className="text-brand-primary" />
              </motion.div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full">Gestão de Missões</span>
                  <div className="flex -space-x-2">
                    {children.slice(0, 3).map((child: any) => (
                      <div key={child.id} className="w-6 h-6 rounded-full border-2 border-card-border bg-white flex items-center justify-center text-[10px] shadow-sm">
                        {child.avatar || '🦊'}
                      </div>
                    ))}
                  </div>
                </div>
                <h1 className="text-6xl font-black text-brand-primary leading-none tracking-tighter italic">
                  Central de Missões
                </h1>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary group h-16 px-10 !rounded-[2rem] bg-brand-primary text-white font-black shadow-[0_8px_0_0_#1B4332] active:translate-y-1 active:shadow-none flex items-center gap-3 transition-all hover:pr-12"
            >
              <Plus size={24} className="group-hover:rotate-90 transition-transform" /> 
              Nova Missão Épica
            </button>
          </div>
        </header>

        {/* Stats row - The "Incredible" factor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <IncredibleStatCard 
            icon={<Zap size={24} className="text-amber-500" />} 
            label="Missões Ativas" 
            value={stats.active} 
            sublabel="Prontas para execução"
            bgColor="bg-amber-50"
          />
          <IncredibleStatCard 
            icon={<Clock size={24} className="text-brand-primary" />} 
            label="Aguardando Você" 
            value={stats.pending} 
            sublabel="Aprovações pendentes"
            bgColor="bg-brand-primary/5"
            highlight={stats.pending > 0}
          />
          <IncredibleStatCard 
            icon={<Flame size={24} className="text-brand-warm" />} 
            label="Feitas Hoje" 
            value={stats.completedToday} 
            sublabel="O ninho está voando!"
            bgColor="bg-brand-warm/5"
          />
        </div>

        {/* Filters & Tools */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex bg-white p-2 rounded-[2.5rem] shadow-xl border-4 border-card-border">
            {(['all', 'daily', 'one-time'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filter === f ? 'bg-brand-primary text-white shadow-2xl scale-105' : 'text-brand-secondary/60 hover:text-brand-primary'}`}
              >
                {f === 'all' ? 'Todas' : f === 'daily' ? 'Diárias' : 'Únicas'}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-brand-secondary/20 group-focus-within:text-brand-primary transition-colors" size={24} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Encontrar missão..." 
              className="w-full h-16 pl-16 pr-8 bg-white rounded-[2.5rem] border-4 border-card-border shadow-xl font-black text-brand-primary placeholder:text-brand-secondary/40 focus:outline-none focus:border-brand-primary/10 transition-all text-lg"
            />
          </div>
        </div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-6">
            <Loader2 className="animate-spin text-brand-primary/20" size={64} />
            <p className="font-black text-brand-primary/20 uppercase tracking-widest italic">Invocando missões...</p>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task, i) => (
                <PremiumTaskCard 
                  key={task.id} 
                  task={task} 
                  index={i} 
                  child={children.find((c: any) => c.id === task.childId)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 bg-card-bg/55 rounded-[4rem] border-8 border-dashed border-brand-primary/5 text-center px-10"
          >
            <div className="w-24 h-24 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">🦉</div>
            <h3 className="text-3xl font-black text-brand-primary mb-4 italic">O quadro de missões está vazio</h3>
            <p className="text-brand-secondary/40 font-bold max-w-md mx-auto mb-10">Lançar novas missões ajuda a manter o ninho organizado e os exploradores engajados!</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary px-10 py-5 !rounded-2xl"
            >
              Criar Primeira Missão
            </button>
          </motion.div>
        )}
      </div>

      <CreateTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        familyId={familyId || ''}
        children={children}
        userPlan={user?.plan ?? 'free'}
      />
    </div>
  )
}

function IncredibleStatCard({ icon, label, value, sublabel, bgColor, highlight = false }: any) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      className={`p-10 rounded-[3rem] ${bgColor} border-8 border-card-border shadow-2xl relative overflow-hidden group ${highlight ? 'ring-4 ring-brand-primary/20' : ''}`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
            {icon}
          </div>
          {highlight && <div className="w-3 h-3 bg-brand-danger rounded-full animate-ping" />}
        </div>
        <div>
          <div className="text-5xl font-black text-brand-primary leading-none tracking-tighter mb-2 italic">
            {value}
          </div>
          <p className="text-[10px] font-black text-brand-secondary/70 uppercase tracking-[0.3em] mb-1">{label}</p>
          <p className="text-[10px] font-bold text-brand-secondary/80 italic">{sublabel}</p>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 text-9xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity font-black italic select-none">
        {value}
      </div>
    </motion.div>
  )
}

function PremiumTaskCard({ task, index, child }: any) {
  const isPending = task.status === 'pending_approval'
  const isDaily = task.category === 'morning' || task.category === 'night' || task.recurrenceType === 'daily'

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -12 }}
      className="bg-white rounded-[4rem] p-10 shadow-[0_30px_100px_rgba(45,106,79,0.08)] border-8 border-card-border group relative overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="relative">
          <div className="w-20 h-20 bg-brand-primary/5 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-inner border-2 border-brand-primary/10 group-hover:rotate-12 transition-all duration-500">
            {task.taskEmoji || task.emoji || '📝'}
          </div>
          {isDaily && (
             <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-white border-4 border-card-border shadow-lg animate-pulse">
                <Flame size={14} />
             </div>
          )}
        </div>
        
        <div className="text-right">
           <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 mb-2 inline-block
            ${task.status === 'todo' ? 'bg-brand-success/10 text-brand-success border-brand-success/20' : 
              isPending ? 'bg-brand-warm/10 text-brand-warm border-brand-warm/20 animate-pulse' : 
              'bg-brand-secondary/10 text-brand-secondary/60 border-brand-secondary/20'}`}>
            {task.status === 'todo' ? 'Pronta' : isPending ? 'Pendente' : 'Pausada'}
          </div>
          <div className="text-[9px] font-black text-brand-secondary/20 uppercase tracking-[0.2em]">Ref: #{task.id.slice(-4)}</div>
        </div>
      </div>

      {/* Card Body */}
      <div className="mb-10">
        <h3 className="text-3xl font-black text-brand-primary mb-3 leading-[0.9] italic tracking-tight group-hover:text-brand-secondary transition-colors">
          {task.title}
        </h3>
        
        {/* Child Assignment Badge */}
        <div className="flex items-center gap-3 bg-brand-primary/5 p-3 pr-6 rounded-2xl w-fit border border-brand-primary/5">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
            {child?.avatar || '🦊'}
          </div>
          <div>
            <p className="text-[10px] font-black text-brand-secondary/70 uppercase tracking-widest leading-none mb-1">Explorador</p>
            <p className="font-black text-brand-primary text-sm">{child?.displayName || 'Sem Atribuição'}</p>
          </div>
        </div>
      </div>

      {/* Rewards & Action */}
      <div className="flex items-center justify-between pt-10 border-t-4 border-brand-primary/5">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.2em] mb-1">Ouro</span>
            <span className="text-2xl font-black text-amber-500 flex items-center gap-2">
              <Coins size={20} className="fill-amber-500/20" /> {task.coins || 0}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.2em] mb-1">Mágica</span>
            <span className="text-2xl font-black text-brand-primary flex items-center gap-2">
              <Sparkles size={20} className="text-brand-magic" /> {task.xp || 0}
            </span>
          </div>
        </div>

        <button className="w-16 h-16 bg-brand-primary text-white rounded-[2rem] flex items-center justify-center shadow-[0_8px_0_0_#1B4332] hover:shadow-none hover:translate-y-2 transition-all active:scale-90">
          <ArrowRight size={28} />
        </button>
      </div>

      {/* Category Decor */}
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}
