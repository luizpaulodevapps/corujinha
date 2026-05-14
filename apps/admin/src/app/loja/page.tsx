'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatCard } from '@/components/dashboard/stat-card'
import {
   ShoppingBag,
   Plus,
   Search,
   Tag,
   DollarSign,
   Star,
   Zap,
   Coins,
   Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminData } from '@/hooks/use-admin-data'

export default function LojaPage() {
   const { rewards, isLoading } = useAdminData()
   const [searchTerm, setSearchTerm] = useState('')

   if (isLoading) {
      return (
         <AdminShell>
            <div className="flex-1 flex items-center justify-center min-h-[50vh]">
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="text-brand-primary">
                  <ShoppingBag size={32} />
               </motion.div>
            </div>
         </AdminShell>
      )
   }

   const stats = [
      { label: 'Recompensas Ativas', value: rewards.length.toString(), change: 'Catálogo completo', icon: Zap, color: '#F59E0B', bgColor: '#FFFBEB' },
      { label: 'Custo Médio', value: `${Math.round(rewards.reduce((acc, r) => acc + (r.costCoins || 0), 0) / (rewards.length || 1))} moedas`, change: 'Equilíbrio econômico', icon: DollarSign, color: '#10B981', bgColor: '#ECFDF5' },
      { label: 'Recompensa Top', value: rewards[0]?.title || '---', change: 'Mais desejada', icon: Star, color: '#3B82F6', bgColor: '#EFF6FF' },
      { label: 'Categorias', value: '8', change: 'Diversidade', icon: Tag, color: '#8B5CF6', bgColor: '#F5F3FF' }
   ]

   const filteredRewards = rewards.filter(r =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.category || '').toLowerCase().includes(searchTerm.toLowerCase())
   )

   return (
      <AdminShell>
         <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <DashboardHeader
               title="Loja de Recompensas"
               subtitle="Configure os itens que as crianças podem trocar por suas moedas e XP."
            />
            <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
               <Plus size={18} strokeWidth={3} /> Novo Item
            </button>
         </div>

         {/* Reward Metrics */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
               <StatCard key={i} {...stat} />
            ))}
         </div>

         {/* Control Bar */}
         <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={18} />
               <input
                  type="text"
                  placeholder="Filtrar recompensas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-brand-primary transition-all shadow-sm"
               />
            </div>
         </div>

         {/* Reward Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
               {filteredRewards.map((product) => (
                  <motion.div
                     key={product.id}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     whileHover={{ y: -4 }}
                     className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-4 group cursor-pointer"
                  >
                     <div className="flex justify-between items-start">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl border border-slate-50 group-hover:bg-brand-bg transition-colors group-hover:scale-105 duration-500">
                           {product.iconEmoji || '🎁'}
                        </div>
                        <div className="text-right">
                           <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-500`}>
                              ATIVO
                           </span>
                        </div>
                     </div>

                     <div>
                        <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] opacity-60 mb-1 block">{product.category || 'Recompensa'}</span>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4">{product.title}</h3>

                        <div className="flex items-center gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100 group-hover:bg-amber-50 transition-colors">
                           <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                              <Coins size={18} strokeWidth={3} />
                           </div>
                           <span className="text-xl font-black text-amber-600 italic tracking-tighter">
                              {product.costCoins} <span className="text-[10px] uppercase tracking-widest not-italic ml-1">Moedas</span>
                           </span>
                        </div>
                     </div>

                     <div className="flex gap-2">
                        <button className="flex-1 py-3 rounded-lg border border-slate-100 bg-white text-slate-400 font-black text-[9px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                           Editar
                        </button>
                        <button className="flex-2 py-3 px-4 rounded-lg bg-slate-100 text-slate-600 font-black text-[9px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2">
                           Visualizar <Sparkles size={12} />
                        </button>
                     </div>
                  </motion.div>
               ))}

               {/* Add New Reward Placeholder */}
               <motion.button
                  layout
                  whileHover={{ scale: 0.98 }}
                  className="rounded-[2rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center gap-4 p-8 group hover:border-brand-primary/20 hover:bg-brand-bg transition-all min-h-[300px]"
               >
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-all shadow-sm">
                     <Plus size={24} strokeWidth={3} />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-primary transition-colors">Nova Recompensa</p>
               </motion.button>
            </AnimatePresence>
         </div>
      </AdminShell>
   )
}