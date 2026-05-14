'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Coins, Tag, Sparkles, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface CreateRewardModalProps {
  isOpen: boolean
  onClose: () => void
  familyId: string
}

const CATEGORIES = [
  { id: 'digital', label: 'Digital', emoji: '🎮' },
  { id: 'experience', label: 'Experiência', emoji: '🍕' },
  { id: 'privilege', label: 'Privilégio', emoji: '🌙' },
  { id: 'physical', label: 'Físico', emoji: '🎁' },
]

export function CreateRewardModal({ isOpen, onClose, familyId }: CreateRewardModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      cost: 50,
      category: 'digital',
      stock: ''
    }
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-slate-900 rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden"
      >
        <header className="bg-gradient-to-br from-amber-500 to-orange-600 p-10 text-white relative">
          <button onClick={onClose} className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all border border-white/10">
            <X size={20} />
          </button>
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl mb-4 border border-white/20 shadow-lg">🎁</div>
          <h2 className="text-4xl font-black tracking-tighter">Novo Tesouro</h2>
          <p className="text-white/60 font-medium text-sm">Crie recompensas mágicas para os pequenos.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Título do Tesouro</label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><Tag size={20} /></div>
              <input {...register('title', { required: true })} placeholder="Ex: Escolher o filme da noite" className="input-field pl-14 h-16 bg-slate-950/50" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <label key={cat.id} className="cursor-pointer group">
                  <input type="radio" {...register('category')} value={cat.id} className="peer sr-only" />
                  <div className="px-5 py-2.5 rounded-full border-2 border-card-border/5 bg-white/5 text-slate-500 font-black text-xs uppercase tracking-widest peer-checked:bg-amber-500 peer-checked:border-amber-500 peer-checked:text-white transition-all peer-checked:shadow-lg peer-checked:shadow-amber-500/20">
                    {cat.emoji} {cat.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Custo em Moedas</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500"><Coins size={20} /></div>
                <input type="number" {...register('cost', { valueAsNumber: true })} className="input-field pl-14 h-16 text-lg font-black bg-slate-950/50" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Limite/Estoque</label>
              <input {...register('stock')} placeholder="Ilimitado" className="input-field h-16 bg-slate-950/50" />
            </div>
          </div>

          <button disabled={isSubmitting} className="w-full btn-primary h-20 text-xl mt-6 bg-amber-500 hover:bg-amber-400 border-amber-600 shadow-amber-500/20">
            {isSubmitting ? <Loader2 className="animate-spin" /> : (
              <span className="flex items-center gap-3">
                Criar Recompensa <Sparkles size={24} />
              </span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
