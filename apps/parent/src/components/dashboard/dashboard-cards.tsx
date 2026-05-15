'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Settings, Trophy, ArrowRight, Clock, Coins, CheckCircle2 } from 'lucide-react'

export function GuardianCard({ name, role, avatar, isHost }: { name: string, role: string, avatar: string, isHost?: boolean }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-card-bg rounded-[2.5rem] p-6 shadow-sm border-4 border-card-border flex items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-16 h-16 bg-brand-warm/5 rounded-2xl flex items-center justify-center text-4xl border-2 border-brand-warm/10 transition-transform"
        >
          {avatar.length > 2 ? <img src={avatar} alt={name} className="w-full h-full object-cover rounded-2xl" /> : avatar}
        </motion.div>
        <div>
          <h3 className="font-black text-xl text-brand-primary leading-tight tracking-tight">{name}</h3>
          <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-[0.2em] mt-1">{role}</p>
        </div>
      </div>
      {isHost ? (
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="bg-brand-primary/5 text-brand-primary text-[10px] font-black px-3 py-1 rounded-full border border-brand-primary/10 uppercase tracking-widest shadow-sm"
        >
          Anfitrião
        </motion.span>
      ) : (
        <motion.div
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={20} className="text-brand-secondary/20 hover:text-brand-primary cursor-pointer transition-colors" />
        </motion.div>
      )}
    </motion.div>
  )
}

export function ChildCard({ child, index }: { child: any, index: number }) {
  const age = child.age || 0
  const level = child.level || 1
  const avatar = child.gender === 'girl' ? '🐰' : '🦊'

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 10, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="bg-card-bg rounded-[3rem] p-8 shadow-sm border-4 border-card-border flex items-center gap-8 relative group cursor-pointer"
    >
      <motion.div 
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="w-24 h-24 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-6xl border-4 border-brand-primary/10 transition-transform shadow-inner"
      >
        {child.avatar || avatar}
      </motion.div>
      
      <div className="flex-1">
        <h3 className="font-black text-3xl text-brand-primary leading-tight mb-1">{child.displayName}</h3>
        <p className="text-brand-secondary/60 font-black text-lg italic">
          {age} anos de aventura · <span className="text-brand-warm">Nível {level}</span>
        </p>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex flex-col gap-1">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="flex items-center gap-2 text-brand-primary"
             >
                <Trophy size={18} className="text-brand-warm" />
                <span className="text-sm font-black tracking-tight">{child.achievements?.length || 0} Conquistas</span>
             </motion.div>
             <p className="text-[10px] font-black text-brand-secondary/30 uppercase tracking-widest">
               Membro desde {child.createdAt ? new Date(child.createdAt?.seconds * 1000).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Jan 2026'}
             </p>
          </div>
          
          <div className="flex-1 h-3 bg-brand-primary/5 rounded-full overflow-hidden border border-brand-primary/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full shadow-[0_0_10px_rgba(45,106,79,0.3)]"
            />
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link 
          href={`/children/${child.id}`}
          className="w-14 h-14 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center border-4 border-card-border shadow-sm hover:bg-brand-primary hover:text-white transition-all"
        >
          <ArrowRight size={28} />
        </Link>
      </motion.div>
    </motion.div>
  )
}

export function PendingTaskCard({ task, onApprove, onReject, isProcessing }: { task: any, onApprove: () => void, onReject: () => void, isProcessing?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="flex flex-col md:flex-row items-center justify-between p-6 bg-card-bg border-4 border-card-border rounded-[2.5rem] shadow-sm hover:border-brand-primary/20 transition-all group gap-6"
    >
      <div className="flex items-center gap-6 w-full md:w-auto">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.15 }}
          className="w-16 h-16 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-2 border-brand-secondary/20 transition-transform"
        >
          {task.taskEmoji || '📝'}
        </motion.div>
        <div>
          <p className="font-black text-brand-primary text-2xl mb-1">{task.taskTitle || 'Missão Misteriosa'}</p>
          <div className="flex flex-wrap items-center gap-3">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/5 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-tight cursor-default"
            >
              {task.childEmoji || '👤'} {task.childName || 'Explorador'}
            </motion.span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-brand-secondary/40">
              <Clock size={14} /> {task.completedAt || 'Recentemente'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-brand-primary/5">
        <div className="flex flex-col items-end px-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1.5 text-xl font-black text-amber-500"
          >
            <Coins size={18} className="fill-amber-500/20" /> +{task.coins || 0}
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1.5 text-xs font-black text-brand-secondary/40 uppercase tracking-[0.1em]"
          >
            <Trophy size={12} /> +{task.xp || 0} XP
          </motion.div>
        </div>

        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onReject}
            disabled={isProcessing}
            className="w-14 h-14 flex items-center justify-center rounded-2xl border-4 border-card-border bg-brand-primary/5 text-brand-primary hover:bg-brand-danger/10 hover:text-brand-danger transition-all font-black disabled:opacity-50 text-xl shadow-sm"
          >
            ✕
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onApprove}
            disabled={isProcessing}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-primary text-white hover:bg-brand-secondary transition-all shadow-[0_4px_0_0_#1B4332] active:translate-y-1 active:shadow-none disabled:opacity-50"
          >
            <CheckCircle2 size={32} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
