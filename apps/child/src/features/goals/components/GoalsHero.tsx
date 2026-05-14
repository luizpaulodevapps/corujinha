'use client'

import { motion } from 'framer-motion'
import { Map, Compass, Sparkles, Star } from 'lucide-react'

export function GoalsHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="game-card !p-12 relative overflow-hidden bg-gradient-to-br from-brand-primary to-brand-secondary text-white mb-12 shadow-2xl shadow-brand-primary/20"
    >
      {/* Decorative background patterns */}
      <div className="absolute inset-0 bg-[url('/forest_pattern.png')] opacity-[0.05] mix-blend-overlay" />
      <div className="absolute right-[-10%] top-[-20%] opacity-10 rotate-[15deg] group-hover:rotate-[20deg] transition-transform duration-700">
        <Map size={320} />
      </div>
      
      {/* Floating particles */}
      <motion.div 
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-[40%] text-brand-accent"
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-[30%] text-brand-warm"
      >
        <Star size={20} fill="currentColor" />
      </motion.div>

      <div className="relative z-10 max-w-sm">
        <div className="flex items-center gap-3 mb-6 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20">
          <Compass size={18} className="text-brand-accent" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Diário de Aventuras</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-black italic mb-6 leading-[1] tracking-tight">
          Conclua Metas,<br />
          <span className="text-brand-accent text-5xl sm:text-6xl">Vire Lenda!</span>
        </h2>
        
        <p className="text-base font-bold opacity-80 leading-relaxed max-w-[320px]">
          Cada missão completada desbloqueia troféus mágicos e traz tesouros incríveis para o seu ninho.
        </p>
      </div>
    </motion.section>
  )
}
