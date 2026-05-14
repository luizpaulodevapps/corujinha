'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Coins, Zap, Bell, Leaf } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

interface ChildHeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
  backHref?: string
  coins?: number
  xp?: number
  avatarUrl?: string
  unreadCount?: number
  onCoinsClick?: () => void
  onXpClick?: () => void
  onAvatarClick?: () => void
  onNotificationsClick?: () => void
  rightElement?: React.ReactNode
  hideAvatar?: boolean
}

export function ChildHeader({ 
  title, 
  subtitle, 
  showBack = true, 
  backHref = '/dashboard',
  coins = 0,
  xp = 0,
  avatarUrl,
  unreadCount = 0,
  onCoinsClick,
  onXpClick,
  onAvatarClick,
  onNotificationsClick,
  rightElement,
  hideAvatar = false
}: ChildHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-24 px-4 select-none pointer-events-none">
      {/* 1. COZY HUD STRIP (Forest Deep Surface) */}
      <div className="max-w-[720px] mx-auto absolute inset-x-4 top-2 h-20 -z-10 bg-[#0A2F1F] rounded-[2.5rem] shadow-[0_12px_24px_rgba(6,31,21,0.4)] border border-white/10 pointer-events-auto overflow-hidden">
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      </div>

      {/* 2. HUD CONTENT */}
      <div className="max-w-[720px] mx-auto h-20 flex items-center justify-between px-6 pointer-events-auto mt-2">
        
        {/* Left: Identity Section */}
        <div className="flex items-center gap-4">
          {showBack && (
            <Link 
              href={backHref} 
              className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/20 rounded-[1.25rem] shadow-sm hover:bg-white/15 active:translate-y-1 transition-all"
            >
              <ArrowLeft size={22} className="text-white" strokeWidth={3} />
            </Link>
          )}

          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-white italic tracking-tighter leading-none m-0 drop-shadow-md">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[10px] font-black text-emerald-400/80 uppercase tracking-[0.35em] mt-1.5 drop-shadow-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Magic HUD (3D Game Style) */}
        <div className="flex items-center gap-3">
          {/* Amulets Group */}
          <div className="hidden md:flex items-center gap-2">
            {/* Coins Amulet */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, y: 4 }}
              onClick={onCoinsClick}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-[1.5rem] bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 shadow-[0_6px_0_0_#92400e] border-t border-white/40"
            >
              <Coins size={20} fill="currentColor" />
              <span className="text-xl font-black italic tabular-nums leading-none">{coins}</span>
            </motion.button>

            {/* XP Amulet */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, y: 4 }}
              onClick={onXpClick}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-[1.5rem] bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-[0_6px_0_0_#064e3b] border-t border-white/40"
            >
              <Zap size={20} fill="currentColor" />
              <span className="text-xl font-black italic tabular-nums leading-none">{xp}</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Crystal */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.9, y: 2 }}
              onClick={onNotificationsClick}
              className="relative w-11 h-11 flex items-center justify-center bg-white/10 border border-white/10 rounded-[1.25rem] text-white shadow-md hover:bg-white/15 transition-colors"
            >
              <Bell size={22} strokeWidth={2.5} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0A2F1F] shadow-sm animate-pulse" />
              )}
            </motion.button>
            
            {/* Hero Portrait (Avatar Medallion) */}
            {!hideAvatar && avatarUrl && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9, y: 4 }}
                onClick={onAvatarClick}
                className="w-14 h-14 rounded-full bg-emerald-800/30 border-2 border-white/30 shadow-[0_8px_16px_rgba(0,0,0,0.3)] overflow-hidden relative group p-1"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-transparent" />
                <img 
                  src={avatarUrl} 
                  alt="Herói" 
                  className="w-full h-full object-contain relative z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform"
                />
              </motion.button>
            )}

            {/* Quick Settings (Theme Artifact) */}
            <div className="hidden sm:flex w-11 h-11 items-center justify-center bg-white/5 border border-white/5 rounded-[1.25rem] opacity-30 hover:opacity-100 transition-opacity">
              <div className="scale-75">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
