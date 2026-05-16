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
    title: 'O luar desperta...',
    text: 'A floresta começa a bocejar e as estrelas vieram nos guiar. Que tal encerrarmos o dia com calma?',
    audio: 'UI_CHIME_SOFT' 
  },
  reflect: {
    title: 'Brilho da Gratidão',
    text: 'Sua luz brilhou forte hoje! Cada pequena tarefa que você fez deixou nossa floresta mais feliz.',
    audio: 'XP_GAIN_MAGIC'
  },
  anticipate: {
    title: 'Sussurros de Amanhã',
    text: 'Novas aventuras já estão brotando sob o orvalho. Descanse agora para encontrá-las ao amanhecer.',
    audio: 'NEST_EVOLUTION_SOFT'
  },
  goodnight: {
    title: 'Sonhos de Algodão',
    text: 'Feche os olhinhos e deixe a magia te levar. Boa noite, pequeno herói da floresta.',
    audio: 'SACRED_AMBIANCE'
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
    let timer: NodeJS.Timeout | undefined;
    
    if ((vibe === 'dusk' || vibe === 'night') && !isEveningRitualComplete) {
      timer = setTimeout(() => setIsOpen(true), 5000)
    }

    return () => {
      if (timer) clearTimeout(timer)
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
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="relative w-full max-w-lg bg-indigo-950/80 border border-white/10 rounded-[0.5rem] px-5 sm:px-10 py-10 text-center shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-md"
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
            <div className="px-5 sm:px-8 py-10 space-y-12 relative z-10">
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

                  <div className="space-y-8 flex flex-col items-center w-full text-justify">
                    <h2 style={{ textAlign: 'center' }} className="text-4xl font-black text-white italic tracking-tighter w-full drop-shadow-xl">
                      {STAGES[stage].title}
                    </h2>
                    <p className="text-indigo-100/80 text-xl font-bold leading-relaxed max-w-[280px]">
                      {stage === 'reflect' && recentMemory 
                        ? `Você cuidou muito bem da clareira com ${recentMemory.metadata?.title || 'suas tarefas'}.`
                        : STAGES[stage].text}
                    </p>
                  </div>

                  {stage === 'reflect' && (
                    <div className="flex justify-center gap-3 mt-10">
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

              <div className="pt-10 flex flex-col gap-6 px-5 sm:px-8">
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  style={{ 
                    backgroundColor: '#FBBF24', 
                    color: '#000000',
                    boxShadow: '0 0 40px rgba(251, 191, 36, 0.4)'
                  }}
                  className="w-full h-16 rounded-[1rem] font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
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
                    className="text-white/80 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-[0.4em] py-2"
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
