'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { 
  Sparkles, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Star,
  Trash2,
  Palette,
  Loader2,
  Zap,
  Shield
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { collection, query, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore'
import type { Mascot } from '@corujinha/domain'
import { motion, AnimatePresence } from 'framer-motion'

import { useAdminData } from '@/hooks/use-admin-data'

export default function MascotesPage() {
  const { mascots, isLoading } = useAdminData()
  const db = getFirebaseFirestore()

  const toggleDefault = async (id: string, currentlyDefault: boolean) => {
    if (currentlyDefault) return 

    for (const m of mascots) {
       if (m.isDefault) {
         await updateDoc(doc(db, 'mascots', m.id), { isDefault: false })
       }
    }
    
    await updateDoc(doc(db, 'mascots', id), { isDefault: true, active: true })
  }

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <DashboardHeader 
          title="Laboratório de Mascotes" 
          subtitle="Crie e gerencie os guardiões mágicos que acompanham os pequenos aventureiros." 
        />
        <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} strokeWidth={3} /> Incubar Novo Mascote
        </button>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-4">
           <div className="relative">
              <Loader2 size={64} className="animate-spin text-brand-primary/20" strokeWidth={1} />
              <Zap size={32} className="absolute inset-0 m-auto text-brand-primary animate-pulse" />
           </div>
           <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Sintonizando frequências mágicas...</p>
        </div>
      ) : mascots.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-32 px-10 bg-white rounded-[3rem] border-4 border-dashed border-slate-100"
        >
           <div className="w-24 h-24 bg-brand-bg text-brand-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Sparkles size={48} className="animate-pulse" />
           </div>
           <h3 className="text-3xl font-black text-slate-900 mb-3 italic">O Ninho está Vazio!</h3>
           <p className="text-slate-500 font-bold max-w-md mx-auto mb-10">Comece incubando o primeiro guardião mágico do Universo Corujinha para guiar as famílias aventureiras.</p>
           <button className="px-10 py-5 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all">
              Invocar Primeiro Guardião
           </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {mascots.map((mascot) => (
              <motion.div 
                key={mascot.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/20 group flex flex-col"
              >
                 <div className="h-[280px] bg-slate-50 relative flex items-center justify-center overflow-hidden group-hover:bg-brand-bg transition-colors duration-500">
                    {mascot.isDefault && (
                      <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-amber-100 flex items-center gap-2">
                        <Star size={16} className="text-amber-500" fill="currentColor" />
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Guardião Mestre</span>
                      </div>
                    )}
                    
                    <div className="absolute top-6 right-6 z-20">
                       <button className="w-10 h-10 bg-white/50 hover:bg-white rounded-xl flex items-center justify-center text-slate-400 transition-colors shadow-sm">
                          <MoreVertical size={20} />
                       </button>
                    </div>

                    <div className="relative z-10 w-full h-full p-10 flex items-center justify-center">
                      {mascot.imageUrl ? (
                        <img 
                          src={mascot.imageUrl} 
                          alt={mascot.name} 
                          className="max-h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-32 h-32 bg-slate-200/50 rounded-[2rem] flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                           <Palette size={48} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 m-auto w-48 h-48 border-4 border-white/30 rounded-full scale-150 group-hover:scale-100 transition-transform duration-1000" />
                 </div>

                 <div className="p-10 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight italic group-hover:text-brand-primary transition-colors">{mascot.name}</h3>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8 flex-1">{mascot.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-10">
                       {mascot.traits?.map((trait: string, i: number) => (
                         <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100/50">
                            {trait}
                         </span>
                       ))}
                    </div>

                    <div className="flex gap-4">
                       <button 
                         onClick={() => toggleDefault(mascot.id, mascot.isDefault)}
                         disabled={mascot.isDefault}
                         className={`flex-1 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3
                           ${mascot.isDefault 
                             ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 cursor-default' 
                             : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 hover:border-slate-200'}`}
                       >
                         {mascot.isDefault ? <Shield size={18} strokeWidth={3} /> : <Star size={18} />}
                         {mascot.isDefault ? 'Guardião Oficial' : 'Tornar Mestre'}
                       </button>
                       <button className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                          <Trash2 size={20} />
                       </button>
                    </div>
                 </div>
              </motion.div>
            ))}

            {/* Incubator Slot Placeholder */}
            <motion.button 
              whileHover={{ scale: 0.98 }}
              className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center gap-6 p-12 group hover:border-brand-primary/20 hover:bg-brand-bg transition-all min-h-[500px]"
            >
               <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-all shadow-sm">
                  <Plus size={40} strokeWidth={3} />
               </div>
               <div className="text-center">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover:text-brand-primary transition-colors">Incubadora Vazia</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Clique para Gestar</p>
               </div>
            </motion.button>
          </AnimatePresence>
        </div>
      )}
    </AdminShell>
  )
}
