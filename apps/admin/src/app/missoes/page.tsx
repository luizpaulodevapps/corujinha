'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { 
  Sword, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Coins,
  Loader2,
  Trophy,
  Target,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { useAdminData } from '@/hooks/use-admin-data'
import { MissionModal } from '@/components/mission-modal'
import { motion } from 'framer-motion'

export default function MissoesPage() {
  const { tasks, isLoading } = useAdminData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) {
    return (
      <AdminShell>
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-brand-primary" size={48} />
        </div>
      </AdminShell>
    )
  }

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { label: 'Missões Ativas', value: tasks.filter(t => t.active).length, icon: Target, color: '#10B981', bgColor: '#ECFDF5' },
    { label: 'Total de Modelos', value: tasks.length, icon: Sword, color: '#3B82F6', bgColor: '#EFF6FF' },
    { label: 'Categorias Mágicas', value: new Set(tasks.map(t => t.category)).size, icon: Trophy, color: '#F59E0B', bgColor: '#FFFBEB' }
  ]

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <DashboardHeader 
          title="Gestão de Missões" 
          subtitle="Crie, edite e monitore as tarefas épicas que guiam os pequenos heróis." 
        />
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-brand-primary text-brand-primary rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all group"
          >
            <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" /> Nova Missão
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-emerald-400 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles size={18} strokeWidth={3} className="animate-pulse" /> Criar com IA
          </button>
        </div>
      </div>

      {/* Tactical Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 shadow-sm group hover:shadow-xl transition-all">
             <div 
               className="w-12 h-12 rounded-xl flex items-center justify-center border border-white"
               style={{ backgroundColor: stat.bgColor, color: stat.color }}
             >
                <stat.icon size={22} />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 leading-none tracking-tight italic">{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      {/* Global Missions Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex gap-4">
          <div className="flex-1 relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Buscar missões pelo título ou categoria..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-16 pr-8 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-brand-primary transition-all"
             />
          </div>
          <button className="px-6 bg-white border border-slate-100 rounded-2xl flex items-center gap-2 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
            <Filter size={18} /> Filtros
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Missão & Detalhes</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Dificuldade</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Recompensa</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Origem</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Global</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-10 py-24 text-center text-slate-400">Nenhuma missão encontrada no universo atual.</td>
                </tr>
              ) : filteredTasks.map((mission) => (
                <tr key={mission.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-primary">
                          <Sword size={20} />
                       </div>
                       <div>
                          <p className="font-black text-slate-900 mb-0.5">{mission.title}</p>
                          <p className="text-[11px] text-slate-400 max-w-[280px] truncate font-bold">{mission.description}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                      {mission.category}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full 
                          ${mission.difficulty === 'easy' ? 'bg-emerald-500 shadow-[0_0_8px_#10B98160]' : mission.difficulty === 'medium' ? 'bg-amber-500 shadow-[0_0_8px_#F59E0B60]' : 'bg-red-500 shadow-[0_0_8px_#EF444460]'}`} 
                        />
                        <span className="text-sm font-black italic">
                          {mission.difficulty === 'easy' ? 'Iniciante' : mission.difficulty === 'medium' ? 'Intermediária' : 'Avançada'}
                        </span>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                       <span className="font-black text-amber-600 flex items-center gap-2 text-lg">
                         <Coins size={18} className="text-amber-500" /> {mission.rewardCoins}
                       </span>
                       <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">+ {mission.rewardXp} XP</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    {/* @ts-ignore */}
                    {mission.isCustom ? (
                       <span className="px-3 py-1 rounded-lg bg-violet-50 text-violet-500 text-[10px] font-black uppercase tracking-widest">Personalizada</span>
                    ) : (
                       <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-widest">Global</span>
                    )}
                  </td>
                  <td className="px-10 py-8">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest
                      ${mission.active ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}
                    >
                       {mission.active ? <CheckCircle2 size={14} strokeWidth={3} /> : <Clock size={14} strokeWidth={3} />}
                       {mission.active ? 'Ativa' : 'Inativa'}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-all">
                       <MoreVertical size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AdminShell>
  )
}
