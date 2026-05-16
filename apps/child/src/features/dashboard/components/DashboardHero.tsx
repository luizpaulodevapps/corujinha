'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Coins, Flame, Trophy } from 'lucide-react'
import clsx from 'clsx'
import Link from 'next/link'
import { MagicNest } from './MagicNest'
import { SoundToggle } from '@/components/SoundToggle'

interface DashboardHeroProps {
  profile: any
  vibe: string
  greeting: string
  dominantMentor: string
  onOpenWallet: () => void
}

export function DashboardHero({ 
  profile, 
  vibe, 
  greeting, 
  dominantMentor, 
  onOpenWallet 
}: DashboardHeroProps) {
  
  // Define mentor-based aura colors
  const mentorAuras = {
    BOLT: "shadow-[0_0_20px_rgba(251,191,36,0.4)] border-amber-400/40 bg-amber-500/10",
    LUMI: "shadow-[0_0_20px_rgba(143,109,220,0.4)] border-brand-magic/40 bg-brand-magic/10",
    GAIA: "shadow-[0_0_20px_rgba(75,156,122,0.4)] border-emerald-400/40 bg-emerald-500/10",
    BUBO: "shadow-[0_0_20px_rgba(252,225,138,0.4)] border-brand-accent/40 bg-brand-accent/10"
  }

  const currentAura = mentorAuras[dominantMentor.toUpperCase() as keyof typeof mentorAuras] || mentorAuras.BUBO

  const handleInteraction = () => {
    import('@/services/audio-service').then(({ audioService }) => {
      audioService.unlock()
    })
  }

  return (
    <section 
      onClick={handleInteraction}
      className={clsx(
      "relative z-30 pb-20 rounded-b-[0.5rem] overflow-hidden transition-all duration-1000 min-h-[460px] flex flex-col justify-between",
      "pt-[env(safe-area-inset-top,24px)]", // 📱 Safe Area Resilience
      vibe === 'night' || vibe === 'dusk' ? "bg-emerald-950/90" : "bg-emerald-950"
    )}>
      {/* Environmental Atmosphere Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_forest.png"
          alt=""
          className={clsx(
            "w-full h-full object-cover transition-all duration-1000 mix-blend-soft-light opacity-25 scale-105",
            (vibe === 'night' || vibe === 'dusk') && "brightness-50"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-transparent to-emerald-950" />
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/textures/noise.svg)' }} />
      </div>

      {/* 🚀 1. The Magic Status Bar: Sticky & Narrative */}
      <div className={clsx(
        "sticky top-0 z-[100] w-full transition-all duration-300",
        "pt-[env(safe-area-inset-top,24px)] pb-6", // 📱 Safe Area Resilience
        "bg-gradient-to-b from-emerald-950/90 to-transparent backdrop-blur-[4px]"
      )}>
        <div className="flex items-center justify-between px-6 w-full max-w-2xl mx-auto">
          {/* LEFT: Identity Anchor (Who am I?) */}
          <Link href="/profile" className="flex items-center gap-4 group cursor-pointer relative">
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Magic Nest as a Frame */}
              <div className="absolute inset-0 z-0 scale-125 opacity-80 group-hover:scale-150 transition-transform duration-700">
                 <MagicNest streak={profile.streak} level={profile.level} isSmall />
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  "w-11 h-11 rounded-full border-2 p-0.5 transition-all duration-500 overflow-hidden relative z-10 bg-emerald-900/40",
                  currentAura
                )}
              >
                <img src={profile.avatar} alt="Perfil" className="w-full h-full object-cover rounded-full" />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase leading-none mb-1.5">Grau {profile.level}</span>
              <span className="text-xl font-black text-white italic tracking-tighter leading-none group-hover:text-brand-accent transition-colors drop-shadow-md">{profile.name}</span>
            </div>
          </Link>

          {/* RIGHT: Utility & Stats (What do I have?) */}
          <div className="flex items-center gap-3">
            {/* Magic Stats Capsules: Now Interactive */}
            <motion.button 
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenWallet}
              className="flex items-center bg-white/5 hover:bg-white/10 backdrop-blur-2xl px-4 py-2.5 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all cursor-pointer group/stats"
            >
              <div className="flex items-center gap-2 pr-3 border-r border-white/10">
                <Coins size={14} className="text-brand-accent group-hover/stats:rotate-12 transition-transform" fill="currentColor" />
                <span className="text-sm font-black text-white tracking-tighter">{profile.coins}</span>
              </div>
              <div className="flex items-center gap-2 pl-3">
                <Flame size={14} className="text-orange-400 group-hover/stats:scale-110 transition-transform" fill="currentColor" />
                <span className="text-sm font-black text-white tracking-tighter">{profile.streak}</span>
              </div>
            </motion.button>

            <div className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full border border-white/10 shadow-lg transition-colors">
              <SoundToggle />
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 2. Central Narrative Hub (Cleaner now) */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center px-8 py-12">
        <div className="space-y-4">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[16px] text-emerald-100/80 max-w-[320px] mx-auto leading-relaxed italic font-medium"
          >
            "{greeting}"
          </motion.p>
        </div>
      </div>

      {/* 🏹 3. Bottom Quick Actions Bar */}
      <div className="relative z-20 px-6 w-full max-w-2xl mx-auto pt-4">
        <div className="flex items-center gap-3">
          <Link 
            href="/missions" 
            onClick={() => {
              import('@/services/audio-service').then(({ audioService }) => {
                audioService.playEffect('button_click')
              })
            }}
            style={{ backgroundColor: '#fbbf24' }}
            className="flex-1 h-14 rounded-[0.5rem] flex items-center justify-center gap-3 text-emerald-950 font-black text-[12px] tracking-widest active:scale-95 transition-transform group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            EXPLORAR JORNADA
            <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button 
            onClick={() => {
              import('@/services/audio-service').then(({ audioService }) => {
                audioService.playEffect('button_click')
              })
              onOpenWallet()
            }}
            className="w-14 h-14 bg-emerald-900/60 backdrop-blur-md rounded-[0.5rem] flex items-center justify-center border border-white/10 active:scale-95 transition-transform shadow-lg group"
          >
            <Trophy size={20} className="text-white group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
