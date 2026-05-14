'use client'

import { Calendar } from 'lucide-react'

interface DashboardHeaderProps {
  title: string
  subtitle: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 mb-2">
        <div className="px-5 py-2 glass-panel rounded-full flex items-center gap-2.5 text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] border border-brand-primary/10">
          <Calendar size={14} strokeWidth={3} />
          {currentDate}
        </div>
      </div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-tight">
        {title}
      </h1>
      <p className="text-slate-400 text-base font-bold max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  )
}
