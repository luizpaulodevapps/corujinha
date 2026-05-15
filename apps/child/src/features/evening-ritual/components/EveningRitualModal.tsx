'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Star, Sparkles, ArrowRight, Heart } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useWorldState } from '@/stores/use-world-state'
import { useRelationshipStore } from '@/stores/use-relationship-store'
import { audioService } from '@/services/audio-service'

/**
 * 🌙 EveningRitualModal: O Ritual do Entardecer
 * 
 * Uma experiência de desaceleração emocional para preparar a criança para o sono.
 */

const STAGES = {
  invite: {
    title: 'A floresta sussurra...',
    text: 'As estrelas chegaram para iluminar nosso descanso. Vamos fechar o dia juntos?',
    audio: 'morning_greeting' // Usar como placeholder para vento/noite
  },
  reflect: {
    title: 'Coração quentinho',
    text: 'Você cuidou muito bem da clareira hoje. Sua luz brilhou forte!',
    audio: 'xp_gain'
  },
  anticipate: {
    title: 'Amanhã tem magia',
    text: 'O vento já trouxe novas aventuras. Descanse para encontrá-las!',
    audio: 'nest_evolution'
  },
  goodnight: {
    title: 'Boa noite, herói',
    text: 'Sonhe com as nuvens e a magia da floresta.',
    audio: 'reward_ceremony'
  }
}

export function EveningRitualModal() {
  const { vibe, isEveningRitualComplete, completeEveningRitual, setRitualActive } = useWorldState()
  const { getDominantMentor, recentMemories, recordMemory, addAffinity } = useRelationshipStore()
  
  const [isOpen, setIsOpen] = useState(false)
  const [stage, setStage] = useState<keyof typeof STAGES>('invite')
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const mentor = getDominantMentor()
  const recentMemory = recentMemories[0]

  // Ativar/Desativar estado de ritual no mundo
  useEffect(() => {
    if (isOpen) {
      setRitualActive(true)
    } else {
      setRitualActive(false)
    }
  }, [isOpen, setRitualActive])

  // Abrir o modal automaticamente se for noite e o ritual não estiver completo
  useEffect(() => {
    if ((vibe === 'dusk' || vibe === 'night') && !isEveningRitualComplete) {
      const timer = setTimeout(() => setIsOpen(true), 5000)
      return () => clearTimeout(timer)
    }
  }, [vibe, isEveningRitualComplete])

  const handleNext = useCallback(async () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    audioService.playEffect('button_click')
    
    // Pequena pausa para "respirar" entre estágios
    await new Promise(resolve => setTimeout(resolve, 600))

    if (stage === 'invite') setStage('reflect')
    else if (stage === 'reflect') setStage('anticipate')
    else if (stage === 'anticipate') setStage('goodnight')
    else {
      // Registrar o ritual como memória emocional
      recordMemory({
        id: `ritual-${Date.now()}`,
        type: 'night_ritual',
        mentor: mentor
      })
      addAffinity(mentor, 5)
      
      completeEveningRitual()
      setIsOpen(false)
    }
    
    setIsTransitioning(false)
  }, [stage, isTransitioning, mentor, recordMemory, addAffinity, completeEveningRitual])

  // Tocar áudio ao mudar de estágio
  useEffect(() => {
    if (isOpen) {
      audioService.playEffect(STAGES[stage].audio as any)
    }
  }, [stage, isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="relative w-full max-w-lg bg-indigo-950/30 border border-white/10 rounded-[3.5rem] p-10 text-center shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-2xl"
          >
            {/* Ambient Breathing Decor */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500/20 blur-[100px] rounded-full"
              />
            </div>

            <div className="relative z-10 space-y-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="space-y-8"
                >
                  {/* Stage Icon */}
                  <div className="flex justify-center">
                    {stage === 'invite' && (
                      <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-300 shadow-inner">
                        <Moon size={48} fill="currentColor" />
                      </div>
                    )}
                    {stage === 'reflect' && (
                      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 p-2 shadow-xl">
                        <img src={`/mentors/${mentor.toLowerCase()}.png`} alt={mentor} className="w-full h-full object-contain" />
                      </div>
                    )}
                    {stage === 'anticipate' && (
                      <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-300 shadow-inner">
                        <Sparkles size={48} />
                      </div>
                    )}
                    {stage === 'goodnight' && (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400 shadow-inner"
                      >
                        <Heart size={48} fill="currentColor" />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter">
                      {STAGES[stage].title}
                    </h2>
                    <p className="text-indigo-100/80 text-xl font-bold leading-relaxed max-w-[280px] mx-auto">
                      {stage === 'reflect' && recentMemory 
                        ? `Você cuidou muito bem da clareira com ${recentMemory.metadata?.title || 'suas tarefas'}.`
                        : STAGES[stage].text}
                    </p>
                  </div>

                  {stage === 'reflect' && (
                    <div className="flex justify-center gap-3">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                          transition={{ delay: i * 0.4, repeat: Infinity, duration: 3 }}
                          className="text-amber-400"
                        >
                          <Star size={18} fill="currentColor" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="pt-4 flex flex-col gap-4">
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="w-full h-16 bg-white text-indigo-950 rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isTransitioning ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      <Sparkles size={24} />
                    </motion.div>
                  ) : (
                    <>
                      {stage === 'goodnight' ? 'Dormir' : 'Próximo'}
                      <ArrowRight size={20} strokeWidth={3} />
                    </>
                  )}
                </button>
                
                {stage === 'invite' && (
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-indigo-300/40 hover:text-indigo-300 transition-colors font-bold uppercase text-[10px] tracking-[0.4em]"
                  >
                    Continuar acordado por agora
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
