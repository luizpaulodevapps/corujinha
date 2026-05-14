'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { 
  Plus, 
  Play, 
  Music, 
  MoreVertical, 
  ExternalLink,
  Eye,
  Heart,
  Sparkles,
  Search,
  Filter,
  Layers,
  Youtube,
  ArrowUpRight
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useAdminData } from '@/hooks/use-admin-data'

export default function TvPage() {
  const { media, isLoading } = useAdminData()
  const [activeCategory, setActiveCategory] = useState('Todos')
  const categories = ['Todos', 'Vídeos', 'Músicas', 'Livros Narrados', 'Premium']

  if (isLoading) {
    return (
      <AdminShell>
         <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-brand-primary">
               <Youtube size={48} />
            </motion.div>
         </div>
      </AdminShell>
    )
  }

  const filteredMedia = media.filter(m => {
    if (activeCategory === 'Todos') return true
    if (activeCategory === 'Vídeos') return m.type === 'video'
    if (activeCategory === 'Músicas') return m.type === 'audio'
    if (activeCategory === 'Premium') return m.premium
    return true
  })

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <DashboardHeader 
          title="Corujinha TV & Music" 
          subtitle="Gerencie o império de mídia: vídeos, músicas e histórias originais." 
        />
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
          <Plus size={18} strokeWidth={3} /> Novo Conteúdo
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
         {categories.map((cat) => (
           <button 
             key={cat} 
             onClick={() => setActiveCategory(cat)}
             className={`px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all border-2
               ${activeCategory === cat 
                 ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                 : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         <AnimatePresence mode="popLayout">
           {filteredMedia.map((item) => (
             <motion.div 
               layout
               key={item.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all cursor-pointer"
             >
                {/* Thumbnail Area */}
                <div className="h-48 relative overflow-hidden">
                   <img 
                     src={item.thumb || item.thumbnail} 
                     alt={item.title} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                   />
                   <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                         {item.type === 'video' ? <Play size={24} fill="currentColor" /> : <Music size={24} />}
                      </div>
                   </div>
                   
                   <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                      {item.premium && (
                        <div className="bg-amber-400 text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                           <Sparkles size={10} strokeWidth={3} /> PREMIUM
                        </div>
                      )}
                      <div className="bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ml-auto">
                        {item.duration || '00:00'}
                      </div>
                   </div>
                </div>
                
                {/* Info Area */}
                <div className="p-6 space-y-4">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-brand-primary/5 text-brand-primary rounded text-[8px] font-black uppercase tracking-widest border border-brand-primary/10">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 italic tracking-tight group-hover:text-brand-primary transition-colors leading-tight">{item.title}</h3>
                      </div>
                      <button className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                   </div>
                   
                   <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Eye size={14} className="text-brand-primary" /> {(item.views || 0).toLocaleString()}
                         </div>
                         <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Heart size={14} className="text-rose-500" /> {Math.floor((item.views || 0) * 0.1)}
                         </div>
                      </div>
                      <button className="flex items-center gap-1.5 text-[9px] font-black text-brand-primary uppercase tracking-widest hover:translate-x-1 transition-transform">
                         Configurar <ArrowUpRight size={12} strokeWidth={3} />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}

           {/* Add New Content Card */}
           <motion.button 
             whileHover={{ scale: 0.98 }}
             whileTap={{ scale: 0.95 }}
             className="h-[380px] rounded-[2rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-brand-primary/20 hover:bg-brand-primary/5 hover:text-brand-primary transition-all group"
           >
              <div className="w-16 h-16 rounded-[1.5rem] border-2 border-current flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                 <Plus size={32} strokeWidth={3} />
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-black uppercase tracking-[0.2em]">Adicionar Mídia</span>
                <p className="text-[9px] font-bold opacity-60">Vídeo, Áudio ou E-book</p>
              </div>
           </motion.button>
         </AnimatePresence>
      </div>
    </AdminShell>
  )
}
