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
        "pt-[env(safe-area-inset-top,24px)] pb-4", // 📱 Safe Area Resilience
        "bg-gradient-to-b from-emerald-950/80 to-transparent backdrop-blur-[2px]"
      )}>
        <div className="flex items-center justify-between px-6 w-full max-w-2xl mx-auto">
          {/* LEFT: Identity Anchor (Who am I?) */}
          <div className="flex items-center gap-4 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "w-12 h-12 rounded-full border-2 p-0.5 transition-all duration-500 overflow-hidden relative",
                currentAura
              )}
            >
              <img src={profile.avatar} alt="Perfil" className="w-full h-full object-cover rounded-full bg-emerald-900/40" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase leading-none mb-1">Grau {profile.level}</span>
              <span className="text-lg font-black text-white italic tracking-tighter leading-none">{profile.name}</span>
            </div>
          </div>

          {/* RIGHT: Utility & Stats (What do I have?) */}
          <div className="flex items-center gap-2">
            {/* Magic Stats Capsules */}
            <div className="flex items-center bg-black/40 backdrop-blur-xl px-3 py-2 rounded-full border border-white/5 shadow-2xl">
              <div className="flex items-center gap-1.5 pr-3 border-r border-white/5">
                <Coins size={14} className="text-brand-accent drop-shadow-[0_0_5px_rgba(252,225,138,0.5)]" fill="currentColor" />
                <span className="text-sm font-black text-white tracking-tighter">{profile.coins}</span>
              </div>
              <div className="flex items-center gap-1.5 pl-3">
                <Flame size={14} className="text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.5)]" fill="currentColor" />
                <span className="text-sm font-black text-white tracking-tighter">{profile.streak}</span>
              </div>
            </div>

            <div className="w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full border border-white/5 shadow-lg">
              <SoundToggle />
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 2. Central Narrative Hub */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center px-8 py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[150px] mb-2"
        >
          <MagicNest streak={profile.streak} level={profile.level} />
        </motion.div>

        <div className="space-y-2">
          <p className="text-[14px] text-emerald-100/70 max-w-[300px] mx-auto leading-tight italic font-medium">
            "{greeting}"
          </p>
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
            className="flex-1 h-14 bg-brand-accent rounded-[0.5rem] flex items-center justify-center gap-3 text-emerald-950 font-black text-[12px] tracking-widest shadow-[0_15px_35_rgba(252,225,138,0.3)] active:scale-95 transition-transform group overflow-hidden relative"
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
