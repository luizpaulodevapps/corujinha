'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { audioService } from '@/services/audio-service'
import { motion, AnimatePresence } from 'framer-motion'

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    setIsMuted(audioService.getMuteStatus())
  }, [])

  const handleToggle = () => {
    const newStatus = audioService.toggleMute()
    setIsMuted(newStatus)
    
    // Feedback tátil/visual suave
    if (!newStatus) {
      audioService.playEffect('button_click')
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`
        relative w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-300 shadow-sm
        ${isMuted ? 'bg-emerald-50 text-emerald-900/30 border-emerald-100' : 'bg-emerald-950 text-white border-emerald-900'}
        border-2
      `}
      aria-label={isMuted ? 'Ativar som' : 'Desativar som (Modo Quiet)'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isMuted ? 'muted' : 'unmuted'}
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
        >
          {isMuted ? <VolumeX size={20} strokeWidth={2.5} /> : <Volume2 size={20} strokeWidth={2.5} />}
        </motion.div>
      </AnimatePresence>
      
      {/* Tooltip Indicador */}
      {!isMuted && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-emerald-950 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
      )}
    </motion.button>
  )
}
