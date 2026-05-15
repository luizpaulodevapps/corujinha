'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Share2, ShieldCheck, Sparkles } from 'lucide-react'

interface InviteGuardianModalProps {
  isOpen: boolean
  onClose: () => void
  familyId: string
  familyName: string
}

export function InviteGuardianModal({ isOpen, onClose, familyId, familyName }: InviteGuardianModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(familyId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Junte-se ao Ninho ${familyName}`,
        text: `Olá! Use o código abaixo para se tornar um Guardião no nosso ninho do Corujinha:`,
        url: familyId
      })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-primary/20 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-white dark:bg-card-bg rounded-[3.5rem] border-8 border-card-border shadow-2xl relative overflow-hidden p-10"
          >
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-brand-primary/5 rounded-full blur-3xl" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-warm/10 rounded-2xl flex items-center justify-center border-4 border-card-border shadow-inner text-brand-warm">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-brand-primary italic">Novo Guardião</h2>
                  <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest">Expandindo a Sabedoria do Ninho</p>
                </div>
              </div>
              <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-brand-primary/5 rounded-2xl text-brand-primary hover:bg-brand-danger/10 hover:text-brand-danger transition-all border-4 border-card-border shadow-sm">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="bg-brand-primary/5 p-8 rounded-[2.5rem] border-4 border-dashed border-brand-primary/20 text-center space-y-4">
                <p className="text-xs font-black text-brand-secondary/60 uppercase tracking-widest">Código Sagrado do Ninho</p>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-2xl font-black text-brand-primary tracking-wider break-all select-all font-mono bg-white px-6 py-3 rounded-2xl shadow-inner border-2 border-card-border">
                    {familyId}
                  </span>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-2xl font-black text-sm shadow-[0_4px_0_0_#1B4332] active:translate-y-1 active:shadow-none transition-all"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? 'Copiado!' : 'Copiar Código'}
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex items-center justify-center w-12 h-12 bg-white text-brand-primary rounded-2xl border-4 border-brand-primary/10 hover:bg-brand-primary/5 transition-all"
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-brand-primary/5 p-6 rounded-3xl border-2 border-card-border">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-brand-primary" />
                  <h4 className="font-black text-brand-primary text-sm uppercase">Como convidar?</h4>
                </div>
                <ol className="text-sm font-medium text-brand-secondary/80 space-y-3 pl-2">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-brand-primary text-white rounded-lg text-[10px] font-black shrink-0">1</span>
                    <span>Copie o código acima e envie para o novo guardião (Pai, Mãe ou Responsável).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-brand-primary text-white rounded-lg text-[10px] font-black shrink-0">2</span>
                    <span>Peça para ele baixar o App e selecionar <b>"Entrar em um Ninho Existente"</b>.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-brand-primary text-white rounded-lg text-[10px] font-black shrink-0">3</span>
                    <span>Assim que ele colar o código, vocês estarão conectados!</span>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
