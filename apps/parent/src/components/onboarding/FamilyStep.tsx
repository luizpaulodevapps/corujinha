'use client'

import { motion } from 'framer-motion'
import { Users, Target, ArrowRight } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CreateFamilyInput } from '@corujinha/domain'

interface FamilyStepProps {
  form: UseFormReturn<any>
  onNext: () => void
  onBack: () => void
}

export function FamilyStep({ form, onNext, onBack }: FamilyStepProps) {
  return (
    <motion.div
      key="family" 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="text-center"
    >
      <div className="w-20 h-20 bg-brand-primary/5 rounded-3xl flex items-center justify-center text-brand-primary mx-auto mb-8 border-4 border-brand-primary/10">
        <Users size={36} />
      </div>
      <h1 className="text-4xl font-black text-brand-primary mb-4 tracking-tight italic">O Nome do seu Ninho</h1>
      <p className="text-text-muted mb-10 text-lg font-bold">Crie o quartel-general da sua família na floresta.</p>

      <form onSubmit={form.handleSubmit(onNext)} className="space-y-10">
        <div className="text-left">
          <label className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.3em] ml-6 mb-3 block">Nome da Família</label>
          <input
            {...form.register('familyName')}
            placeholder="Ex: Família Silva"
            className="input-field h-18 text-xl font-bold !rounded-[2rem]"
            autoFocus
          />
          {form.formState.errors.familyName && (
            <p className="text-brand-danger text-sm mt-4 font-black flex items-center gap-2 ml-6">
              <Target size={16} /> {form.formState.errors.familyName.message as string}
            </p>
          )}
        </div>

        <div className="flex items-center gap-6 mt-10">
          <button type="button" onClick={onBack} className="px-8 py-4 font-black text-brand-secondary/60 hover:text-brand-primary transition-colors uppercase tracking-widest text-xs">Voltar</button>
          <button type="submit" className="flex-1 btn-primary h-18 !rounded-2xl shadow-[0_8px_0_0_#1B4332]">
            Próximo Passo <ArrowRight size={22} />
          </button>
        </div>
      </form>
    </motion.div>
  )
}
