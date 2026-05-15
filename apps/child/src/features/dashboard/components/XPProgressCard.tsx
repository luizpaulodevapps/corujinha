'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Star, Trophy, Zap, Sparkles } from 'lucide-react'
import clsx from 'clsx'

interface XPProgressCardProps {
  xp: number
  nextLevelXp: number
  level: number
}

export function XPProgressCard({ xp, nextLevelXp, level }: XPProgressCardProps) {
  const xpPercentage = Math.min((xp / nextLevelXp) * 100, 100)
  const remainingXp = Math.max(nextLevelXp - xp, 0)

  return (
    <motion.section 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="relative mx-6 z-40 overflow-hidden"
    >
      {/* Magic Container */}
      <div className="bg-white rounded-[0.5rem] p-8 shadow-2xl border-2 border-emerald-100/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-br from-brand-accent to-orange-400 rounded-[0.5rem] flex items-center justify-center text-emerald-950 shadow-lg shadow-brand-accent/20 relative group"
            >
              <Trophy size={32} fill="currentColor" />
              <div className="absolute inset-0 bg-white/20 rounded-[0.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/40 mb-1">Evolução do Herói</p>
              <h2 className="text-3xl font-black text-emerald-950 italic tracking-tighter leading-none">Nível {level}</h2>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <strong className="text-4xl font-black text-emerald-950 tracking-tighter leading-none">{xp}</strong>
              <Sparkles size={16} className="text-brand-accent animate-pulse" />
            </div>
            <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">PONTOS XP</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-2 text-[12px] font-bold text-emerald-900/70">
              <Star size={16} fill="currentColor" className="text-brand-accent" />
              Faltam {remainingXp} XP para o próximo Grau
            </span>
            <div className="flex items-center gap-1 text-[12px] font-black text-emerald-950 bg-emerald-50 px-2 py-1 rounded-md">
              {Math.round(xpPercentage)}%
              <ArrowUpRight size={14} strokeWidth={3} className="text-brand-primary" />
            </div>
          </div>

          {/* XP Bar Container */}
          <div className="h-5 bg-emerald-50/80 rounded-full p-1 border border-emerald-100/50 shadow-inner relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-brand-primary via-brand-success to-emerald-400 rounded-full relative group overflow-hidden"
            >
              {/* Shine effect that travels across the bar */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 skew-x-12"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-emerald-50/50 p-4 rounded-[0.5rem] border border-emerald-100/30 flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-900/40 flex items-center gap-1.5">
              <Zap size={12} fill="currentColor" className="text-brand-accent" />
              Status Atual
            </span>
            <strong className="text-emerald-950 font-bold">Energia Alta</strong>
          </div>
          
          <div className="bg-emerald-50/50 p-4 rounded-[0.5rem] border border-emerald-100/30 flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-900/40">
              Próximo Marco
            </span>
            <strong className="text-emerald-950 font-bold">Nível {level + 1}</strong>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
