'use client'

import { Users, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardHeaderProps {
  familyName: string
  childrenCount: number
}

export function DashboardHeader({ familyName, childrenCount }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pt-safe">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-[1.8rem] flex items-center justify-center border-4 border-card-border shadow-inner">
          <Users size={32} className="text-brand-primary" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-primary leading-tight italic tracking-tight">
            {familyName || 'Nosso Ninho'}
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-[11px] font-black text-brand-secondary/60 uppercase tracking-widest italic">
              {childrenCount} Exploradores Ativos
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <button className="whitespace-nowrap px-6 py-3 bg-white dark:bg-card-bg rounded-2xl border-4 border-card-border text-brand-primary font-black hover:bg-brand-primary/5 transition-all text-sm shadow-sm flex items-center gap-2">
          <UserPlus size={18} />
          Convidar Guardião
        </button>
      </div>
    </header>
  )
}
