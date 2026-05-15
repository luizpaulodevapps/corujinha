'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Camera, Loader2 } from 'lucide-react'

const FAMILY_AVATARS = ['🏠', '🌳', '🏡', '⛰️', '🦉', '🦁', '🦅', '🐺', '🦊', '🐨', '🐼', '🐯', '🌟', '🌈', '🌊', '🔥']

interface NestIdentityProps {
  family: any
  isUploading: boolean
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpdateAvatar: (avatar: string) => void
}

export function NestIdentity({
  family,
  isUploading,
  fileInputRef,
  onImageUpload,
  onUpdateAvatar
}: NestIdentityProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <section className="bg-white dark:bg-card-bg rounded-[4rem] p-10 border-8 border-card-border shadow-2xl relative overflow-hidden group">
      <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors" />
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border-4 border-card-border shadow-inner">
            <Sparkles size={24} className="text-brand-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-brand-primary italic">Identidade do Ninho</h2>
            <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest">Símbolo Sagrado da Família</p>
          </div>
        </div>
        
        {isEditing && (
          <button 
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:scale-105 transition-all"
          >
            Concluir
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-10 relative z-10">
        <div className="relative group/avatar cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
          <div className={`w-48 h-48 bg-brand-primary/5 rounded-[4rem] border-8 shadow-2xl flex items-center justify-center text-9xl transition-all duration-500 overflow-hidden ${isEditing ? 'border-brand-primary scale-105 rotate-2' : 'border-card-border group-hover/avatar:scale-105'}`}>
            {isUploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
                <span className="text-xs font-black text-brand-primary uppercase">Subindo...</span>
              </div>
            ) : family?.photoURL ? (
              <img src={family.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="filter drop-shadow-xl">{family?.avatar || '🏠'}</span>
            )}
          </div>
          <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-brand-primary text-white rounded-3xl flex items-center justify-center shadow-2xl border-8 border-white dark:border-card-bg hover:scale-110 active:scale-95 transition-all z-20 ${isEditing ? 'animate-pulse' : ''}`}>
            <Camera size={32} strokeWidth={2.5} />
          </div>
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full space-y-6 overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 bg-brand-primary/5 border-4 border-dashed border-brand-primary/20 rounded-2xl font-black text-brand-primary hover:bg-brand-primary/10 transition-all flex items-center justify-center gap-3"
                >
                  <Camera size={20} /> Carregar Foto Personalizada
                </button>

                <div className="flex items-center gap-4 px-4">
                  <div className="h-[2px] flex-1 bg-brand-primary/5" />
                  <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-[0.4em] whitespace-nowrap">Ou escolha um Ícone</p>
                  <div className="h-[2px] flex-1 bg-brand-primary/5" />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {FAMILY_AVATARS.map((emoji) => {
                    const isSelected = family?.avatar === emoji && !family.photoURL
                    return (
                      <button 
                        key={emoji}
                        onClick={() => onUpdateAvatar(emoji)}
                        className={`w-full aspect-square rounded-[1.5rem] flex items-center justify-center text-3xl transition-all relative group/btn ${
                          isSelected 
                            ? 'bg-brand-primary text-white shadow-xl scale-110 border-4 border-white z-10' 
                            : 'bg-brand-primary/5 hover:bg-brand-primary/10 hover:scale-105 active:scale-95'
                        }`}
                      >
                        <span className={isSelected ? 'filter drop-shadow-md' : 'opacity-60 group-hover/btn:opacity-100'}>{emoji}</span>
                        {isSelected && (
                          <motion.div layoutId="avatar-selected" className="absolute inset-0 border-4 border-brand-primary rounded-[1.5rem] -z-10" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
