'use client'

import { LucideIcon, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  color: string
  bgColor: string
  isPending?: boolean
}

export function StatCard({ 
  label, 
  value, 
  change, 
  icon: Icon, 
  color, 
  bgColor, 
  isPending 
}: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      className="admin-card group relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div 
        className="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-700"
        style={{ backgroundColor: color }}
      />
      
      <div className="flex justify-between items-start mb-8">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12 duration-500"
          style={{ backgroundColor: bgColor, color: color }}
        >
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div 
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
            ${isPending ? 'bg-amber-50 text-amber-500 border border-amber-100' : 'bg-emerald-50 text-emerald-500 border border-emerald-100'}`}
        >
          {!isPending && <ChevronUp size={14} strokeWidth={4} />}
          {change}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{label}</p>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic leading-none">{value}</h2>
      </div>
    </motion.div>
  )
}
