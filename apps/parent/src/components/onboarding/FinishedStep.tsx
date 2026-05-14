'use client'

import { motion } from 'framer-motion'
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface FinishedStepProps {
  onFinish: () => void
  isSubmitting: boolean
}

export function FinishedStep({ onFinish, isSubmitting }: FinishedStepProps) {
  return (
    <motion.div
      key="finished" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6"
    >
      <div className="relative inline-block mb-12">
        <div className="absolute inset-0 bg-brand-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="relative w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl border-4 border-card-border animate-float">✨</div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-4 -right-4 text-brand-accent">
          <Sparkles size={40} />
        </motion.div>
      </div>

      <h1 className="text-5xl font-black text-brand-primary mb-6 tracking-tight italic">O Ninho está Pronto!</h1>
      <p className="text-text-muted mb-12 text-xl font-bold leading-relaxed max-w-md mx-auto">
        A aventura começa agora. Prepare as primeiras missões e veja a mágica acontecer.
      </p>

      <div className="bg-brand-success/10 text-brand-success p-8 rounded-[2.5rem] border-4 border-brand-success/20 flex items-center gap-6 text-sm font-black mb-14 text-left shadow-inner">
        <div className="w-14 h-14 bg-brand-success text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-success/20">
          <ShieldCheck size={32} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="uppercase tracking-widest text-[10px] opacity-60">Segurança Garantida</span>
          <span className="text-lg leading-tight">Seus dados estão protegidos sob o olhar atento da Corujinha.</span>
        </div>
      </div>

      <button
        onClick={onFinish}
        disabled={isSubmitting}
        className="btn-primary w-full h-20 text-2xl !rounded-[2rem] shadow-[0_12px_0_0_#1B4332] disabled:opacity-70 group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10 flex items-center justify-center gap-4">
          {isSubmitting ? 'Salvando Missão...' : (
            <>Entrar no Dashboard <CheckCircle2 size={32} /></>
          )}
        </span>
      </button>
    </motion.div>
  )
}
