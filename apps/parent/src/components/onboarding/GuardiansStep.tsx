'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight } from 'lucide-react'

interface GuardiansStepProps {
  userName: string
  setUserName: (v: string) => void
  userEmail: string
  setUserEmail: (v: string) => void
  userAvatar: string
  setUserAvatar: (v: string) => void
  partnerName: string
  setPartnerName: (v: string) => void
  partnerEmail: string
  setPartnerEmail: (v: string) => void
  partnerAvatar: string
  setPartnerAvatar: (v: string) => void
  onNext: () => void
  onBack: () => void
}

export function GuardiansStep({
  userName, setUserName,
  userEmail, setUserEmail,
  userAvatar, setUserAvatar,
  partnerName, setPartnerName,
  partnerEmail, setPartnerEmail,
  partnerAvatar, setPartnerAvatar,
  onNext, onBack
}: GuardiansStepProps) {
  return (
    <motion.div
      key="guardians" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="text-left"
    >
      <div className="w-20 h-20 bg-brand-primary/5 rounded-3xl flex items-center justify-center text-brand-primary mx-auto mb-8 border-4 border-brand-primary/10">
        <ShieldCheck size={36} />
      </div>
      <h1 className="text-3xl font-black text-brand-primary mb-2 tracking-tight text-center italic">Guardiões do Ninho</h1>
      <p className="text-text-muted mb-10 text-lg font-bold text-center">Quem comanda a aventura?</p>

      <div className="space-y-10">
        {/* Primary User Section */}
        <div className="space-y-6 p-8 bg-bg-main rounded-[2.5rem] border-4 border-brand-primary/5 shadow-inner">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-brand-primary text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-brand-primary/20">1</div>
            <h3 className="font-black text-brand-primary uppercase tracking-[0.2em] text-[10px]">Seu Perfil de Mentor</h3>
          </div>

          <div className="flex items-center gap-8 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/20 rounded-3xl blur-lg animate-pulse" />
              <div className="relative w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-5xl shadow-xl border-4 border-card-border">
                {userAvatar}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {['🦉', '🦁', '🐘', '🦄', '🦒', '🐼'].map(a => (
                <button
                  key={a} onClick={() => setUserAvatar(a)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all border-4 ${userAvatar === a ? 'bg-brand-primary text-white border-brand-primary scale-110 shadow-lg shadow-brand-primary/30' : 'bg-white text-slate-400 border-transparent hover:bg-brand-primary/5'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">Nome</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu Nome"
                className="input-field h-14 font-bold !rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">E-mail</label>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                placeholder="Seu E-mail"
                className="input-field h-14 font-bold !rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Partner Section */}
        <div className="space-y-6 p-8 bg-brand-warm/5 rounded-[2.5rem] border-4 border-brand-warm/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-brand-warm text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-brand-warm/20">2</div>
            <h3 className="font-black text-brand-warm uppercase tracking-[0.2em] text-[10px]">Copiloto (Opcional)</h3>
          </div>

          <div className="flex items-center gap-8 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-warm/20 rounded-3xl blur-lg animate-pulse" />
              <div className="relative w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-5xl shadow-xl border-4 border-card-border">
                {partnerAvatar}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {['🐻', '🐯', '🐧', '🐨', '🦋', '🐝'].map(a => (
                <button
                  key={a} onClick={() => setPartnerAvatar(a)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all border-4 ${partnerAvatar === a ? 'bg-brand-warm text-white border-brand-warm scale-110 shadow-lg shadow-brand-warm/30' : 'bg-white text-slate-400 border-transparent hover:bg-brand-warm/5'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-warm/40 uppercase tracking-widest ml-4">Nome do Parceiro</label>
              <input
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Nome"
                className="input-field h-14 font-bold !rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-warm/40 uppercase tracking-widest ml-4">E-mail do Parceiro</label>
              <input
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                type="email"
                placeholder="E-mail"
                className="input-field h-14 font-bold !rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-12">
        <button type="button" onClick={onBack} className="px-8 py-4 font-black text-brand-secondary/60 hover:text-brand-primary transition-colors uppercase tracking-widest text-xs">Voltar</button>
        <button onClick={onNext} disabled={!userName || !userEmail} className="flex-1 btn-primary h-20 text-xl !rounded-[2rem] disabled:opacity-30 shadow-[0_10px_0_0_#1B4332]">
          Próximo Passo <ArrowRight size={24} />
        </button>
      </div>
    </motion.div>
  )
}
