'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { 
  Users, 
  Search, 
  Filter, 
  ExternalLink, 
  Mail, 
  UserPlus,
  Coins,
  MoreVertical,
  DollarSign,
  ShieldAlert,
  Trash2
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminData } from '@/hooks/use-admin-data'

export default function FamiliasPage() {
  const { families, isLoading } = useAdminData()
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) {
    return (
       <AdminShell>
          <div className="flex-1 flex items-center justify-center min-h-[60vh]">
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="text-brand-primary">
                <Users size={48} />
             </motion.div>
          </div>
       </AdminShell>
    )
  }

  const filteredFamilies = families.filter(f => 
    (f.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    ((f as any).email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <DashboardHeader 
          title="Gestão de Famílias" 
          subtitle="Gerencie os guardiões e aventureiros cadastrados no ecossistema." 
        />
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
          <UserPlus size={18} strokeWidth={3} /> Convidar Família
        </button>
      </div>

      {/* Search and Filters Bar - Refined */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-accent transition-colors duration-300" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por sobrenome da família ou e-mail..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-100 rounded-[1.5rem] font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-brand-accent focus:shadow-xl focus:shadow-brand-accent/5 transition-all duration-300"
          />
        </div>
        <button className="px-8 bg-white border-2 border-slate-100 rounded-[1.5rem] flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95">
          <Filter size={18} strokeWidth={3} /> Filtros
        </button>
      </div>

      {/* High-Fidelity Data Table - Evolution */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Família & Identidade</th>
              <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Membros</th>
              <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Tesouro</th>
              <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Cadastro</th>
              <th className="px-8 py-5 text-right text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
            <AnimatePresence>
              {filteredFamilies.map((family) => (
                <motion.tr 
                  layout
                  key={family.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-2xl shadow-inner border-2 border-white group-hover:scale-110 transition-transform duration-500">
                        🏠
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-base mb-0.5 tracking-tight italic group-hover:text-brand-primary transition-colors">{family.name || 'Família'}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1.5 uppercase tracking-wider font-black">
                          <Mail size={12} className="text-brand-accent" strokeWidth={3} /> {family.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       <Users size={14} strokeWidth={3} /> {family.childIds?.length || 0}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B98180] animate-pulse" />
                      <span className="text-xs font-black italic text-slate-900">Ativa</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-amber-600 font-black text-lg italic tracking-tighter">
                       <Coins size={18} className="text-amber-500" /> 0
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-black text-slate-400">
                    {family.createdAt ? new Date((family.createdAt as any).seconds * 1000).toLocaleDateString('pt-BR') : '12/05/2026'}
                  </td>
                  <td className="px-8 py-6 text-right relative">
                    <div className="flex justify-end gap-2">
                      <div className="group/menu relative">
                        <button className="w-10 h-10 rounded-xl border-2 border-slate-100 bg-white text-slate-400 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                           <MoreVertical size={18} strokeWidth={2.5} />
                        </button>
                        
                        {/* Dropdown Menu - High Fidelity */}
                        <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-900/10 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 z-50 p-2 space-y-1">
                           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                              <ExternalLink size={16} className="text-brand-primary" /> Ver Detalhes
                           </button>
                           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                              <Mail size={16} className="text-blue-500" /> Enviar Mensagem
                           </button>
                           <div className="h-px bg-slate-50 mx-2" />
                           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-primary hover:bg-brand-bg transition-colors">
                              <DollarSign size={16} /> Gerar Cobrança
                           </button>
                           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-amber-600 hover:bg-amber-50 transition-colors">
                              <ShieldAlert size={16} /> Inativar Família
                           </button>
                           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-colors">
                              <Trash2 size={16} /> Excluir Registro
                           </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer Statistics */}
      <footer className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm font-bold text-slate-400">
          Exibindo o controle de <b className="text-slate-900">{filteredFamilies.length}</b> famílias ativas
        </p>
        <div className="flex gap-3">
          <button disabled className="px-6 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 font-black text-[10px] uppercase tracking-widest cursor-not-allowed">Anterior</button>
          <button className="px-6 py-3 rounded-xl border border-slate-100 bg-white text-brand-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 shadow-sm active:translate-y-1 transition-all">Próxima Página</button>
        </div>
      </footer>
    </AdminShell>
  )
}
