'use client'

import { useState } from 'react'
import { 
  History, 
  Search, 
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  ArrowRight,
  Calendar,
  Baby,
  Trophy
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import { useAuthStore } from '@/store/auth.store'

export default function HistoryPage() {
  const [filter, setFilter] = useState<'all' | 'approved' | 'rejected'>('all')
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId

  const { data: history = [], isLoading } = useQuery<any[]>({
    queryKey: ['history', familyId],
    queryFn: () => dashboardService.getHistory(familyId!),
    enabled: !!familyId
  })

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true
    return item.status === filter
  })

  return (
    <div className="pb-20 lg:pb-0 min-h-screen bg-bg-main relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />
      
      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-[1.5rem] flex items-center justify-center border-4 border-card-border shadow-sm">
              <History size={32} className="text-brand-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-brand-primary leading-none italic">
                Diário da Floresta
              </h1>
              <p className="text-brand-secondary/60 font-bold text-lg mt-1 italic">Histórico de todas as missões e conquistas do ninho.</p>
            </div>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard 
            icon={<CheckCircle2 className="text-brand-success" />} 
            label="Missões Cumpridas" 
            value={history.filter(h => h.status === 'approved').length} 
            color="bg-brand-success/10" 
          />
          <StatCard 
            icon={<Trophy className="text-brand-warm" />} 
            label="Total de XP" 
            value={history.reduce((acc, h) => acc + (h.rewardXp || 0), 0).toLocaleString('pt-BR')} 
            color="bg-brand-warm/10" 
          />
          <StatCard 
            icon={<Baby className="text-brand-primary" />} 
            label="Última Atividade" 
            value={history[0]?.childName || '---'} 
            color="bg-brand-primary/10" 
          />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border-4 border-card-border">
            {(['all', 'approved', 'rejected'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-secondary/40 hover:text-brand-primary'}`}
              >
                {f === 'all' ? 'Tudo' : f === 'approved' ? 'Aprovadas' : 'Rejeitadas'}
              </button>
            ))}
          </div>

          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-secondary/30" size={20} />
            <input 
              type="text" 
              placeholder="Buscar no diário..." 
              className="w-full h-14 pl-14 pr-6 bg-white rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary placeholder:text-brand-secondary/30 focus:outline-none focus:border-brand-primary/20 transition-all"
            />
          </div>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-primary" size={48} />
            </div>
          ) : filteredHistory.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredHistory.map((item, i) => (
                <HistoryItem key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          ) : (
            <div className="py-20 text-center bg-card-bg/55 rounded-[3rem] border-4 border-dashed border-brand-primary/10">
              <p className="text-brand-secondary/40 font-black text-xl italic">Nenhum registro encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Loader2({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  )
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-4 border-card-border flex items-center gap-6">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-brand-secondary/70 uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-black text-brand-primary leading-tight">{value}</p>
      </div>
    </div>
  )
}

function HistoryItem({ item, index }: any) {
  const date = item.updatedAt?.seconds 
    ? new Date(item.updatedAt.seconds * 1000).toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    : 'Recentemente'

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-[2rem] p-6 shadow-sm border-4 border-card-border flex flex-col md:flex-row md:items-center justify-between gap-6 group"
    >
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-brand-primary/5 rounded-xl flex items-center justify-center text-3xl border-2 border-brand-primary/10 group-hover:rotate-6 transition-transform">
          {item.taskEmoji || '📝'}
        </div>
        <div>
          <h3 className="font-black text-xl text-brand-primary leading-tight">{item.taskTitle || 'Missão Sem Título'}</h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-black text-brand-secondary/40 italic">{item.childName || 'Explorador'}</span>
            <span className="w-1.5 h-1.5 bg-brand-secondary/10 rounded-full" />
            <span className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={12} /> {date}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 pt-4 md:pt-0">
        <div className="flex items-center gap-2">
          {item.status === 'approved' ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-success/10 text-brand-success rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-brand-success/10">
              <CheckCircle2 size={14} /> Missão Aprovada
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-danger/10 text-brand-danger rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-brand-danger/10">
              <XCircle size={14} /> Missão Rejeitada
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-widest">Recompensa</p>
            <p className="font-black text-amber-500">+{item.rewardCoins || 0} Moedas</p>
          </div>
          <button className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded-xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
