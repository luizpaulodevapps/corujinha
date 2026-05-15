'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Coins, Star, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Mission } from '@/types'
import { audioService } from '@/services/audio-service'
import { useRelationshipStore } from '@/stores/use-relationship-store'
import { CeremonyStage } from '../types'
import { useCeremonyTimeline } from '../hooks/use-ceremony-timeline'
import { triggerCelebration } from '../utils/celebration-fx'
import { 
  modalPanelVariants, 
  mentorAvatarVariants, 
  rewardCardVariants, 
  phraseRevealVariants,
  floatTransition 
} from '../animations'

interface RewardCeremonyModalProps {
  isOpen: boolean
  mission: Mission | null | undefined
  mentor?: 'Bubo' | 'Lumi' | 'Gaia' | 'Bolt'
  onClose: () => void
}

const MENTOR_ASSETS = {
  Bubo: {
    name: 'Bubo',
    color: 'text-brand-primary',
    image: '/mentors/bubo.png',
    phrases: [
      'Pequenas asas voam grandes distâncias!',
      'Sua sabedoria cresce a cada desafio, herói!',
      'O conhecimento é o mapa da nossa floresta.'
    ]
  },
  Lumi: {
    name: 'Lumi',
    color: 'text-amber-500',
    image: '/mentors/lumi.png',
    phrases: [
      'Zapt! Sua luz brilhou forte nesta missão!',
      'Brilhante! Como uma estrela cadente na clareira!',
      'Sua energia é contagiante, pequeno vaga-lume!'
    ]
  },
  Gaia: {
    name: 'Gaia',
    color: 'text-emerald-700',
    image: '/mentors/gaia.png',
    phrases: [
      'Cada cristal conta para a harmonia do seu ninho.',
      'A natureza floresce com o seu cuidado.',
      'Sinta a paz de uma missão bem cumprida.'
    ]
  },
  Bolt: {
    name: 'Bolt',
    color: 'text-orange-500',
    image: '/mentors/bolt.png',
    phrases: [
      'Rápido e forte! Você é um verdadeiro herói!',
      'Vapt-vupt! Mais um recorde na clareira!',
      'Sua coragem não tem limites!'
    ]
  }
}

export function RewardCeremonyModal({ isOpen, mission, mentor = 'Bubo', onClose }: RewardCeremonyModalProps) {
  const stage = useCeremonyTimeline(isOpen)
  const currentMentor = MENTOR_ASSETS[mentor]
  const { addAffinity, recordMemory } = useRelationshipStore()

  // Seleção aleatória de frase para evitar repetição (Dynamic Phrases)
  const randomPhrase = useMemo(() => {
    const p = currentMentor.phrases
    return p[Math.floor(Math.random() * p.length)]
  }, [mentor, isOpen])

  useEffect(() => {
    if (isOpen && mission) {
      addAffinity(mentor, 5)
      recordMemory({
        id: `mission-${mission.id}`,
        type: 'category_mastered',
        mentor: mentor,
        metadata: { title: mission.title }
      })
    }
  }, [isOpen, mission, mentor])

  // Triggers de Áudio e FX baseados na Timeline
  useEffect(() => {
    if (stage === CeremonyStage.ENTER) {
      audioService.playEffect('reward_ceremony', mentor)
    }
    if (stage === CeremonyStage.MENTOR_APPEAR) {
      audioService.playEffect('mentor_appear', mentor)
      triggerCelebration(mission?.difficulty === 'Difícil' ? 'epic' : 'common')
    }
  }, [stage, mentor, mission])

  if (!mission) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />

          <motion.div
            variants={modalPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-[0_32px_0_0_#DCE2D5]"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary" />

            <div className="p-8 text-center space-y-8">
              {/* Mentor Celebration Area */}
              <div className="relative pt-8">
                <motion.div
                  variants={mentorAvatarVariants}
                  initial="hidden"
                  animate={stage !== CeremonyStage.ENTER ? "visible" : "hidden"}
                  className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center border-4 border-white shadow-xl relative"
                >
                  <motion.img 
                    animate={{ y: [0, -5, 0] }}
                    transition={floatTransition}
                    src={currentMentor.image} 
                    alt={currentMentor.name} 
                    className="w-32 h-32 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=Corujinha'
                    }}
                  />
                  
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-4 -right-4 text-brand-accent"
                  >
                    <Sparkles size={32} fill="currentColor" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={stage !== CeremonyStage.ENTER ? { opacity: 1, y: 0 } : {}}
                  className="mt-6"
                >
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">EU CONSEGUI!</h2>
                  <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{mission.title}</p>
                </motion.div>
              </div>

              {/* Reward Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  custom={0}
                  variants={rewardCardVariants}
                  initial="hidden"
                  animate={stage === CeremonyStage.REWARD_REVEAL || stage === CeremonyStage.NEST_EVOLUTION || stage === CeremonyStage.CTA ? "visible" : "hidden"}
                  className="bg-amber-50 rounded-3xl p-6 border-4 border-amber-100/50 flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                    <Coins size={24} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-black text-amber-600">+{mission.coins}</span>
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Moedas</span>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={rewardCardVariants}
                  initial="hidden"
                  animate={stage === CeremonyStage.REWARD_REVEAL || stage === CeremonyStage.NEST_EVOLUTION || stage === CeremonyStage.CTA ? "visible" : "hidden"}
                  className="bg-emerald-50 rounded-3xl p-6 border-4 border-emerald-100/50 flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-black text-emerald-600">+{mission.xp}</span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">XP Ganho</span>
                </motion.div>
              </div>

              {/* Mentor Phrase */}
              <motion.div
                variants={phraseRevealVariants}
                initial="hidden"
                animate={stage === CeremonyStage.NEST_EVOLUTION || stage === CeremonyStage.CTA ? "visible" : "hidden"}
                className="bg-slate-50 rounded-[2rem] p-6 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border-2 border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {currentMentor.name} diz:
                </div>
                <p className="text-slate-600 font-bold italic text-lg leading-tight">
                  "{randomPhrase}"
                </p>
              </motion.div>

              {/* Nest Evolution Teaser */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={stage === CeremonyStage.NEST_EVOLUTION || stage === CeremonyStage.CTA ? { opacity: 1 } : {}}
                className="flex items-center justify-center gap-3 text-brand-primary"
              >
                <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                   <Trophy size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">Ninho Mágico</p>
                  <p className="text-sm font-bold">Mais uma pena adicionada! 🪶</p>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={stage === CeremonyStage.CTA ? { opacity: 1, y: 0 } : {}}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full h-16 bg-brand-primary text-white rounded-3xl font-black text-lg uppercase tracking-widest shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 transition-all"
              >
                Continuar Jornada
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
