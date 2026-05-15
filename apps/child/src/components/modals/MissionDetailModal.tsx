'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, Sparkles, Lightbulb, Zap, Coins } from 'lucide-react'
import { TypewriterText } from '@/components/typewriter-text'
import { Mission } from '@/types'

interface MissionDetailModalProps {
  mission: Mission | null
  onClose: () => void
  onComplete: (missionId: string, photo: string | null) => void
}

export function MissionDetailModal({ mission, onClose, onComplete }: MissionDetailModalProps) {
  const [missionPhoto, setMissionPhoto] = useState<string | null>(null)

  if (!mission) return null

  const closeModal = () => {
    setMissionPhoto(null)
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-emerald-950/20 backdrop-blur-sm"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, rotate: 1 }}
          animate={{ scale: 1, y: 0, rotate: 0 }}
          exit={{ scale: 0.9, y: 50, rotate: -1 }}
          className="relative w-full max-w-[520px] overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#FCFFFD] to-[#F0F9F2] shadow-[0_40px_100px_rgba(6,31,21,0.3)] border-4 border-white"
          onClick={e => e.stopPropagation()}
        >
          {/* 1. ENVIRONMENT DECORATION (Top Section) */}
          <div className="absolute top-0 left-0 right-0 h-48 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/50 to-transparent" />
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('/textures/noise.svg')]" />
            
            {/* Foliage/Star Patterns */}
            <div className="absolute top-4 left-6 text-emerald-600/10 rotate-[-15deg]"><Sparkles size={48} fill="currentColor" /></div>
            <div className="absolute top-10 right-10 text-emerald-600/10 rotate-[20deg]"><Sparkles size={64} fill="currentColor" /></div>
          </div>

          <div className="p-10">
            {/* Header: Title & Magic Preview */}
            <div className="flex items-center gap-6 mb-10">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-24 h-24 rounded-[2.5rem] bg-emerald-600 rotate-6 flex items-center justify-center text-5xl shadow-[0_15px_30px_rgba(5,74,53,0.3)] border-4 border-white/20 relative"
              >
                <span className="-rotate-6 drop-shadow-md">{mission.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </motion.div>
              
              <div className="flex-1">
                <h2 className="text-4xl font-black text-emerald-950 italic m-0 leading-none mb-3 tracking-tighter drop-shadow-sm">
                  {mission.title}
                </h2>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm">
                      <Zap size={12} fill="currentColor" /> +{mission.xp} XP
                   </div>
                   <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm">
                      <Coins size={12} fill="currentColor" /> +{mission.coins}
                   </div>
                </div>
              </div>
            </div>

            {/* Mascot Tip with Cozy Speech Bubble */}
            <div className="flex flex-col gap-2 mb-10">
              <span className="text-[10px] font-black text-emerald-600/40 uppercase tracking-[0.3em] ml-24">Sua Mentora diz:</span>
              <div className="flex gap-6 items-end">
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 shrink-0"
                >
                  <img src="/owl_mascot_new.png" alt="Corujinha" className="w-full h-full object-contain filter drop-shadow-xl" />
                </motion.div>
                
                <div className="relative bg-white p-6 rounded-[2.5rem] flex-1 shadow-[0_10px_30px_rgba(6,31,21,0.05)] border-2 border-emerald-50">
                  <p className="text-[15px] font-bold text-emerald-900 m-0 leading-relaxed italic">
                    "<TypewriterText text={mission.title === 'Arrumar a Cama' ? 'Dobre os lençóis com carinho para o quarto ficar bem aconchegante! 🛏️' : 'Capriche na escovação para seu sorriso brilhar como uma estrela! ✨'} />"
                  </p>
                  {/* Bubble Tip */}
                  <div className="absolute bottom-6 -left-2 w-5 h-5 bg-white border-b-2 border-l-2 border-emerald-50 rotate-45 -z-10" />
                </div>
              </div>
            </div>

            {/* Evidence Slot (RPG Frame Style) */}
            <div className="mb-10">
              {missionPhoto ? (
                <div className="relative w-full h-64 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img src={missionPhoto} alt="Evidência" className="w-full h-full object-cover" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMissionPhoto(null)}
                    className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-red-500 text-white font-black shadow-lg flex items-center justify-center border-2 border-white"
                  >
                    <X size={24} strokeWidth={4} />
                  </motion.button>
                </div>
              ) : (
                <motion.label
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-52 rounded-[3rem] flex flex-col items-center justify-center gap-4 cursor-pointer bg-white border-2 border-dashed border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group relative overflow-hidden"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Camera size={32} strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-black text-emerald-900 italic block">Comprovar com Foto!</span>
                    <span className="text-[10px] font-bold text-emerald-600/40 uppercase tracking-[0.2em] mt-1">Opcional em algumas missões</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setMissionPhoto(URL.createObjectURL(file))
                    }}
                  />
                </motion.label>
              )}
            </div>

            {/* Actions (High Contrast 3D Style) */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-black hover:bg-emerald-200 transition-all uppercase tracking-widest text-xs border-b-4 border-emerald-200 active:translate-y-1 active:border-b-0"
                >
                  Voltar
                </button>
                <button
                  onClick={() => {
                    onComplete(mission.id, missionPhoto)
                    setMissionPhoto(null)
                  }}
                  className="flex-[1.8] h-16 rounded-2xl bg-emerald-600 font-black text-2xl italic text-white shadow-[0_10px_0_0_#064e3b] transition-all flex items-center justify-center gap-3 hover:brightness-110 active:translate-y-2 active:shadow-none"
                >
                  Concluir!
                  <Sparkles size={24} fill="currentColor" />
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-3 py-4 border-t-2 border-emerald-100/50">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] font-black text-emerald-700/60 uppercase tracking-[0.2em]">
                  Enviando para o seu <span className="text-emerald-600 underline">Guardião</span> aprovar no Ninho
                </p>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
          
          <button 
             onClick={closeModal}
             className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-emerald-800/20 hover:text-emerald-800 transition-colors"
          >
             <X size={24} strokeWidth={3} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
