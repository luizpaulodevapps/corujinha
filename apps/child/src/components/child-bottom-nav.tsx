'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Map as MapIcon, 
  Shield, 
  Sword, 
  Target, 
  Trophy, 
  User, 
  MessageCircle, 
  Home, 
  Sparkles,
  X
} from 'lucide-react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { LAYERS } from '@/constants/layers'
import { bloomExpand, dockBreathing, magicIconRotate } from '@/features/animations/nav.animations'
import { MagicalParticles } from '@/features/effects/components/MagicalParticles'
import { useWorldState } from '@/stores/use-world-state'

/**
 * 🌿 ChildBottomNav: O Dock Mágico da Corujinha
 */

const MAIN_ITEMS = [
  { href: '/dashboard', label: 'Início', icon: Home, activeColor: 'text-emerald-400' },
  { href: '/missions', label: 'Missões', icon: Sword, activeColor: 'text-orange-400' },
  { href: '/jornada', label: 'Jornada', icon: MapIcon, activeColor: 'text-brand-magic' },
  { href: '/shop', label: 'Loja', icon: Shield, activeColor: 'text-brand-accent' },
] as const

const HIDDEN_ITEMS = [
  { href: '/metas', label: 'Metas', icon: Target },
  { href: '/achievements', label: 'Conquistas', icon: Trophy },
  { href: '/chat', label: 'Conversa', icon: MessageCircle },
  { href: '/profile', label: 'Perfil', icon: User },
] as const

const triggerHaptic = (intensity = 10) => {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(intensity)
  }
}

export function ChildBottomNav() {
  const pathname = usePathname()
  const { vibe, isRitualActive } = useWorldState()
  const [hash, setHash] = useState('')
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    setHash(window.location.hash)
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const isActive = (href: string) => {
    const [path, h] = href.split('#')
    const currentHash = hash || ''
    const targetHash = h ? `#${h}` : ''
    return pathname === path && currentHash === targetHash
  }

  const handleToggleMore = () => {
    setShowMore(!showMore)
    triggerHaptic(15)
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-[200] pb-6 px-4 flex justify-center pointer-events-none" 
      aria-label="Navegação infantil"
    >
      <motion.div 
        variants={dockBreathing}
        animate="animate"
        className="relative w-full max-w-[500px] pointer-events-auto"
      >
        <AnimatePresence>
          {showMore && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-emerald-950/30 backdrop-blur-sm"
                style={{ zIndex: LAYERS.OVERLAY }}
                onClick={() => setShowMore(false)}
              />
              
              <motion.div
                variants={bloomExpand}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute bottom-24 left-0 right-0 bg-emerald-950/98 border border-white/5 rounded-[0.5rem] p-8 shadow-2xl backdrop-blur-md overflow-hidden"
                style={{ zIndex: LAYERS.POPOVER }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none" />
                <MagicalParticles vibe={isRitualActive ? 'calm' : 'energetic'} />

                <div className="grid grid-cols-4 gap-4 relative z-10">
                  {HIDDEN_ITEMS.map(({ href, label, icon: Icon }) => {
                    const active = isActive(href)
                    return (
                      <Link 
                        key={href} 
                        href={href} 
                        className={clsx(
                          'flex flex-col items-center gap-3 transition-all duration-300', 
                          active ? 'scale-105' : 'opacity-60 hover:opacity-100'
                        )}
                        onClick={() => {
                          setShowMore(false)
                          triggerHaptic()
                        }}
                      >
                        <span className={clsx(
                          "w-14 h-14 rounded-[0.5rem] border flex items-center justify-center transition-all duration-500",
                          active ? "bg-color-moon-cream text-emerald-950 border-white shadow-lg" : "bg-white/5 border-white/10 text-white shadow-inner"
                        )}>
                          <Icon size={24} strokeWidth={2.5} />
                        </span>
                        <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">{label}</span>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Dock Bar: Optimized for Mobile Performance */}
        <div className={clsx(
          "flex items-center justify-between bg-emerald-950/90 backdrop-blur-md border border-white/5 p-2 rounded-[0.5rem] shadow-2xl will-change-transform",
          isRitualActive && "brightness-75 saturate-50"
        )}>
          {MAIN_ITEMS.map(({ href, label, icon: Icon, activeColor }) => {
            const active = isActive(href)

            return (
              <Link 
                key={href} 
                href={href} 
                onClick={() => triggerHaptic()}
                className={clsx(
                  'flex-1 flex flex-col items-center justify-center gap-1.5 h-14 rounded-[0.5rem] transition-all duration-500 relative group', 
                  active ? 'text-emerald-950 shadow-sm' : 'text-white/60 hover:text-white'
                )}
              >
                {/* Removed background div to fix flickering and contrast issues */}
                <Icon 
                  size={active ? 22 : 20} 
                  strokeWidth={active ? 3 : 2.5} 
                  className={clsx(
                    active ? activeColor : "text-current",
                    active && "filter drop-shadow-[0_0_8px_currentColor]"
                  )}
                  fill={active ? "currentColor" : "none"}
                  fillOpacity={active ? 0.2 : 0}
                />
                <span className={clsx(
                  "text-[8px] font-black uppercase tracking-widest",
                  active ? "text-white" : "text-white/60"
                )}>
                  {label}
                </span>
              </Link>
            )
          })}

          <button 
            onClick={handleToggleMore}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center gap-1.5 h-14 rounded-[0.5rem] transition-all duration-500 relative group', 
              showMore ? 'text-emerald-950 shadow-sm' : 'text-white/60 hover:text-white'
            )}
          >
            {/* Removed background div to fix flickering and contrast issues */}
            <motion.span 
              variants={magicIconRotate}
              animate={showMore ? 'active' : 'inactive'}
            >
              {showMore ? <X size={22} strokeWidth={3} /> : <Sparkles size={22} strokeWidth={2.5} className={clsx(!showMore && "text-brand-accent")} />}
            </motion.span>
            <span className={clsx(
              "text-[8px] font-black uppercase tracking-widest",
              showMore ? "text-white" : "text-white/60"
            )}>
              Mais
            </span>
          </button>
        </div>
      </motion.div>
    </nav>
  )
}
