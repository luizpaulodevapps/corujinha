'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { 
  Lightbulb, 
  Plus, 
  Search, 
  Eye, 
  MoreVertical,
  TrendingUp,
  Brain,
  Sparkles,
  Calendar,
  BarChart3,
  ChevronRight,
  ArrowRight,
  Zap
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useAdminData } from '@/hooks/use-admin-data'

export default function DicasPage() {
  const { tips, isLoading } = useAdminData()
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) {
    return (
      <AdminShell>
         <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-brand-primary">
               <Lightbulb size={48} />
            </motion.div>
         </div>
      </AdminShell>
    )
  }

  const filteredTips = tips.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <DashboardHeader 
          title="Dicas da Corujinha" 
          subtitle="Gerencie as pílulas de conhecimento e o conteúdo educativo global." 
        />
        <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} strokeWidth={3} /> Nova Pílula Mágica
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
        {/* Content Management Area */}
        <div className="space-y-8">
           <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Buscar pílulas mágicas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-3xl font-bold text-slate-900 outline-none focus:ring-8 focus:ring-brand-primary/5 transition-all shadow-sm" 
              />
           </div>

           <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredTips.map((tip) => (
                   <motion.div 
                     layout
                     key={tip.id} 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-white rounded-[2rem] p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                   >
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                         {tip.category === 'Financeiro' ? <TrendingUp size={32} /> : tip.category === 'Comportamento' ? <Brain size={32} /> : <Sparkles size={32} />}
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{tip.category}</span>
                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg
                              ${tip.status === 'Ativa' ? 'bg-emerald-50 text-emerald-500' : tip.status === 'Agendada' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'}`}>
                               {tip.status || 'Rascunho'}
                            </span>
                         </div>
                         <h3 className="text-xl font-black text-slate-900 italic tracking-tight">{tip.title}</h3>
                      </div>

                      <div className="flex gap-8 items-center px-8 border-y md:border-y-0 md:border-x border-slate-50 py-4 md:py-0 w-full md:w-auto justify-around md:justify-start">
                         <div className="text-center">
                            <p className="text-lg font-black text-slate-900">{tip.views || 0}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Vistas</p>
                         </div>
                         <div className="text-center">
                            <p className="text-lg font-black text-slate-900">{tip.engagement || '0%'}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Engaj.</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                         <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-brand-primary/5 hover:text-brand-primary transition-all">
                            <Eye size={20} />
                         </button>
                         <button className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-slate-600 transition-colors">
                            <MoreVertical size={24} />
                         </button>
                      </div>
                   </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        {/* Performance Intelligence Sidebar */}
        <div className="space-y-8">
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/20">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                    <BarChart3 size={24} />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Top Performance</h3>
              </div>
              <div className="space-y-6">
                 {filteredTips.slice(0, 3).map((tip, i) => (
                    <button key={tip.id} className="w-full flex items-center gap-5 group text-left">
                       <div className="text-xl font-black text-slate-200 group-hover:text-brand-primary transition-colors italic w-8">0{i+1}</div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-900 truncate tracking-tight">{tip.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tip.engagement || '0%'} engajamento</p>
                       </div>
                       <ChevronRight size={16} className="text-slate-200 group-hover:translate-x-1 transition-all" />
                    </button>
                 ))}
              </div>
           </div>

           <div className="bg-brand-primary rounded-[2.5rem] p-10 text-white shadow-2xl shadow-brand-primary/30 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                 <Calendar size={28} />
              </div>
              <h3 className="text-2xl font-black italic tracking-tight mb-4">Calendário Editorial</h3>
              <p className="text-brand-primary-light font-bold text-sm mb-10 leading-relaxed uppercase tracking-wide">
                Você possui <span className="text-white">{filteredTips.filter(t => t.status === 'Agendada').length} pílulas mágicas</span> agendadas para os próximos 7 dias.
              </p>
              <button className="w-full py-5 bg-white text-brand-primary rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                Ver Agenda Completa <ArrowRight size={16} strokeWidth={3} />
              </button>
           </div>

           <div className="bg-amber-400 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-amber-400/20 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                 <Zap size={28} fill="currentColor" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black italic tracking-tight">Dica do Dia</h4>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Insight gerado por IA</p>
              </div>
              <p className="text-sm font-black leading-relaxed italic">"Dicas de comportamento sobre 'Calma' possuem 40% mais cliques nas manhãs de segunda-feira."</p>
           </div>
        </div>
      </div>
    </AdminShell>
  )
}
