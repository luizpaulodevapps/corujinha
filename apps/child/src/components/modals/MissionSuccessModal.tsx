'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface MissionSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  reward: {
    coins: number
    xp: number
  } | null
}

export function MissionSuccessModal({ isOpen, onClose, reward }: MissionSuccessModalProps) {
  if (!reward) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 !z-[10000] flex items-center justify-center p-4 bg-emerald-950/30 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Confetti Explosion System */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  scale: 0,
                  rotate: 0 
                }}
                animate={{ 
                  x: `${50 + (Math.random() - 0.5) * 120}%`, 
                  y: `${50 + (Math.random() - 0.5) * 120}%`,
                  scale: [0, 1.2, 0.8],
                  rotate: [0, 360 * Math.random()] 
                }}
                transition={{ 
                  duration: 2 + Math.random(), 
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
                className={`absolute w-4 h-4 rounded-sm ${
                  ['bg-yellow-400', 'bg-emerald-400', 'bg-pink-400', 'bg-blue-400'][i % 4]
                } shadow-sm`}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.7, y: 100, rotate: -5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.7, y: 100, rotate: 5 }}
            className="w-full max-w-[440px] !p-0 text-center bg-[#F8FFF9] relative shadow-[0_40px_100px_rgba(6,31,21,0.4)] rounded-[3rem] border-4 border-white overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Victory Ring Effect */}
            <motion.div 
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-[20%] left-1/2 -translate-x-1/2 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl -z-10"
            />

            <div className="p-12 relative z-10">
              <div className="relative mb-10">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.25, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    scale: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="text-[12rem] leading-none inline-block filter drop-shadow-2xl"
                >
                  🎉
                </motion.div>
              </div>

              <h2 className="text-5xl font-black text-emerald-900 mb-2 italic tracking-tighter leading-none">
                MISSAO CUMPRIDA!
              </h2>
              <p className="text-sm font-black text-emerald-600/60 uppercase tracking-[0.4em] mb-10">
                Você é um explorador incrível!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-12">
                {/* Pulsing Reward Capsules */}
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
                  className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-[2.5rem] border-2 border-amber-200/50 flex flex-col items-center shadow-sm"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-4xl font-black text-amber-600">+{reward.coins}</p>
                    <p className="text-[10px] font-black text-amber-700/50 uppercase tracking-widest">Moedas</p>
                  </motion.div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6, delay: 0.3 }}
                  className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-[2.5rem] border-2 border-emerald-200/50 flex flex-col items-center shadow-sm"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <p className="text-4xl font-black text-emerald-600">+{reward.xp}</p>
                    <p className="text-[10px] font-black text-emerald-700/50 uppercase tracking-widest">Experiência</p>
                  </motion.div>
                </motion.div>
              </div>

              <button 
                onClick={onClose} 
                className="w-full h-24 rounded-[2.5rem] bg-emerald-600 text-white font-black text-3xl italic shadow-[0_12px_0_0_#064e3b] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-4 hover:brightness-110 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700" />
                Continuar!
                <Sparkles size={32} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
