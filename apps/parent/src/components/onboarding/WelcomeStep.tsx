'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      key="welcome" 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center text-center py-6"
    >
      <div className="relative group mb-12">
        <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-3xl group-hover:bg-brand-accent/40 transition-all" />
        <div className="relative w-32 h-32 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <Image src="/owl_mascot.png" alt="Corujinha" width={128} height={128} className="object-contain relative z-10 animate-sway" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-brand-primary mb-6 tracking-tight leading-[1.1] italic">
        Pequenas tarefas, <br /><span className="text-brand-warm">grandes conquistas.</span>
      </h1>
      <p className="text-text-muted mb-12 text-xl font-bold leading-relaxed max-w-md">
        Prepare seus filhos para o futuro através de missões divertidas e dopamina com propósito.
      </p>

      <button
        onClick={onNext}
        className="btn-primary w-full h-20 text-2xl !rounded-[2rem] bg-brand-warm shadow-[0_10px_0_0_#CC8514] hover:shadow-[0_8px_0_0_#CC8514] active:shadow-none group"
      >
        <span className="flex items-center justify-center gap-4">
          Começar Aventura
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            🚀
          </motion.span>
        </span>
      </button>
    </motion.div>
  )
}
