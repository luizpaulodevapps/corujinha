'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  Handshake, 
  Plus, 
  Mail, 
  MoreVertical, 
  ExternalLink,
  TrendingUp,
  MapPin,
  Search,
  ShieldCheck,
  X,
  Check,
  Briefcase
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminData } from '@/hooks/use-admin-data'

export default function ParceirosPage() {
  const { partners: realPartners, isLoading } = useAdminData()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <AdminShell>
         <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-brand-primary">
               <Handshake size={32} />
            </motion.div>
         </div>
      </AdminShell>
    )
  }

  const filteredPartners = realPartners.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuccess(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsSuccess(false)
    }, 2000)
  }

  const stats = [
    { label: 'Rede de Parceiros', value: realPartners.length.toString(), change: 'Total de alianças', icon: Handshake, color: '#10B981', bgColor: '#ECFDF5' },
    { label: 'Famílias Impactadas', value: realPartners.reduce((acc, p) => acc + (p.activeFamilies || 0), 0).toString(), change: 'Alcance B2B', icon: TrendingUp, color: '#3B82F6', bgColor: '#EFF6FF' },
    { label: 'Comissão Média', value: '14.5%', change: 'Receita recorrente', icon: Briefcase, color: '#8B5CF6', bgColor: '#F5F3FF' }
  ]

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <DashboardHeader 
          title="Rede de Parceiros B2B" 
          subtitle="Gerencie as alianças estratégicas e serviços integrados." 
        />
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} strokeWidth={3} /> Nova Parceria
        </button>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
         ))}
      </div>

      {/* Control Bar */}
      <div className="flex gap-4 mb-8">
         <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar parceiros..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-brand-primary transition-all shadow-sm"
            />
         </div>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
         <AnimatePresence>
            {filteredPartners.map((partner) => (
               <motion.div 
                 key={partner.id}
                 layout
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-6 group relative"
               >
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl border border-slate-50 group-hover:bg-brand-bg transition-colors duration-500">
                           {partner.logo || '🤝'}
                        </div>
                        <div>
                           <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">{partner.name}</h3>
                           <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-500 text-[9px] font-black uppercase tracking-widest rounded-lg border border-emerald-100/50">
                                 {partner.category || 'Geral'}
                              </span>
                              <ShieldCheck size={14} className="text-brand-primary" />
                           </div>
                        </div>
                     </div>
                     
                     <div className="relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === partner.id ? null : partner.id)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                            ${openMenuId === partner.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-300 hover:text-slate-600'}`}
                        >
                           <MoreVertical size={18} />
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Comissão</p>
                        <p className="text-lg font-black text-brand-primary italic">{partner.commission || '10%'}</p>
                     </div>
                     <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Impacto</p>
                        <p className="text-lg font-black text-brand-primary italic">{partner.activeFamilies || 0} fam.</p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                     <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <MapPin size={14} className="text-brand-accent" /> {partner.location || 'Brasil'}
                     </div>
                     <div className="flex gap-2">
                        <a 
                          href={`mailto:contato@${partner.name.toLowerCase().replace(/ /g, '')}.com.br`}
                          className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all"
                        >
                           <Mail size={16} />
                        </a>
                        <button 
                          onClick={() => partner.url && window.open(partner.url, '_blank')}
                          className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all"
                        >
                           <ExternalLink size={16} />
                        </button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Modal Nova Parceria */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
             >
                {isSuccess ? (
                  <div className="p-16 text-center">
                     <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <Check size={32} strokeWidth={3} />
                     </div>
                     <h2 className="text-2xl font-black text-slate-900 mb-1 italic">Parceria Selada!</h2>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registrando contrato digital...</p>
                  </div>
                ) : (
                  <>
                    <header className="p-6 border-b border-slate-50 flex justify-between items-center">
                       <h2 className="text-xl font-black text-slate-900 italic tracking-tight">Nova Aliança B2B</h2>
                       <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors">
                          <X size={18} />
                       </button>
                    </header>
                    <form onSubmit={handleCreatePartner} className="p-6 space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Empresa</label>
                             <input required type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:border-brand-primary transition-all text-sm" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Cupom</label>
                             <input type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:border-brand-primary transition-all text-sm" />
                          </div>
                       </div>
                       <button type="submit" className="w-full py-4 bg-brand-primary text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                          Finalizar Acordo
                       </button>
                    </form>
                  </>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}
