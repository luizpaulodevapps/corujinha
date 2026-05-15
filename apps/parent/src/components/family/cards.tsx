'use client'

import { motion } from 'framer-motion'
import { Settings, Trophy, Shield, Trash2, Edit3, UserPlus } from 'lucide-react'

export function GuardianManagementCard({ name, role, avatar, isHost, onSettings }: { name: string, role: string, avatar: string, isHost?: boolean, onSettings?: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-card-bg rounded-[2.5rem] p-6 border-4 border-card-border shadow-sm flex items-center justify-between group relative overflow-hidden"
    >
      <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors" />
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-16 h-16 bg-brand-warm/5 rounded-2xl flex items-center justify-center text-4xl border-2 border-brand-warm/10">
          {avatar.length > 2 ? <img src={avatar} alt={name} className="w-full h-full object-cover rounded-2xl" /> : avatar}
        </div>
        <div>
          <h3 className="font-black text-lg text-brand-primary leading-tight">{name}</h3>
          <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-[0.2em] mt-1">{role}</p>
        </div>
      </div>
      
      {isHost ? (
        <span className="bg-brand-primary/5 text-brand-primary text-[10px] font-black px-3 py-1 rounded-full border border-brand-primary/10 uppercase tracking-widest relative z-10">
          Anfitrião
        </span>
      ) : (
        <div className="flex gap-2 relative z-10">
          <button 
            onClick={onSettings}
            className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded-xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"
          >
            <Settings size={18} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

export function ChildManagementCard({ child, index, onSettings }: { child: any, index: number, onSettings?: () => void }) {
  const avatar = child.gender === 'girl' ? '🐰' : '🦊'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-card-bg rounded-[3rem] p-6 border-4 border-card-border shadow-sm flex items-center gap-5 group relative"
    >
      <div className="w-20 h-20 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-5xl border-4 border-card-border shadow-inner shrink-0">
        {child.avatar || avatar}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-xl text-brand-primary truncate">{child.displayName}</h3>
        
        <div className="flex items-center gap-4 mt-2">
          <div className="bg-brand-primary text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
            Nível {child.level || 1}
          </div>
          <div className="flex items-center gap-1.5 text-brand-warm">
            <Trophy size={14} />
            <span className="text-xs font-black">{child.achievements?.length || 0}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button 
          onClick={onSettings}
          className="w-12 h-12 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all border-2 border-transparent hover:border-white shadow-sm"
        >
          <Settings size={22} />
        </button>
      </div>
    </motion.div>
  )
}
