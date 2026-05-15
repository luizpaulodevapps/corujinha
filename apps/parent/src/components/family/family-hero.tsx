'use client'

import { motion } from 'framer-motion'
import { Edit2, Camera, Loader2, Check, X, Sparkles } from 'lucide-react'

interface FamilyHeroProps {
  family: any
  isEditingName: boolean
  setIsEditingName: (val: boolean) => void
  tempName: string
  setTempName: (val: string) => void
  onUpdateName: () => void
  isUploading: boolean
}

export function FamilyHero({
  family,
  isEditingName,
  setIsEditingName,
  tempName,
  setTempName,
  onUpdateName,
  isUploading
}: FamilyHeroProps) {
  return (
    <header className="flex flex-col items-center text-center mb-16 pt-8">
      <div className="flex flex-col items-center gap-2">
        {isEditingName ? (
          <div className="flex items-center gap-2">
            <input 
              autoFocus
              className="bg-white border-4 border-brand-primary/20 rounded-2xl px-6 py-2 text-3xl font-black text-brand-primary outline-none focus:border-brand-primary shadow-inner"
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onUpdateName()}
            />
            <button onClick={onUpdateName} className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all">
              <Check size={24} />
            </button>
            <button onClick={() => setIsEditingName(false)} className="w-12 h-12 bg-brand-danger/10 text-brand-danger rounded-2xl flex items-center justify-center hover:bg-brand-danger hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>
        ) : (
          <div className="relative group">
            <h1 className="text-4xl md:text-6xl font-black text-brand-primary italic flex items-center gap-4">
              {family?.familyName || 'Nosso Ninho'}
              <button onClick={() => { setTempName(family?.familyName || ''); setIsEditingName(true); }} className="p-2 text-brand-secondary/30 hover:text-brand-primary transition-colors opacity-0 group-hover:opacity-100">
                <Edit2 size={24} />
              </button>
            </h1>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-brand-secondary/20" />
          <p className="text-brand-secondary/60 font-black text-xs md:text-sm uppercase tracking-[0.4em] italic">Família Unida • Corujinha 1.0</p>
          <div className="h-[2px] w-8 bg-brand-secondary/20" />
        </div>
      </div>
    </header>
  )
}
