'use client'

import { motion } from 'framer-motion'
import { Trash2, Plus, ArrowRight } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

export interface ChildFormValues {
  displayName: string
  age: number
  pin: string
  gender: 'boy' | 'girl'
  birthDate?: string | undefined
}

interface ChildrenStepProps {
  childrenList: ChildFormValues[]
  form: UseFormReturn<any>
  onAdd: (data: ChildFormValues) => void
  onRemove: (index: number) => void
  onNext: () => void
  onBack: () => void
  handleBirthDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ChildrenStep({
  childrenList,
  form,
  onAdd,
  onRemove,
  onNext,
  onBack,
  handleBirthDateChange
}: ChildrenStepProps) {
  return (
    <motion.div
      key="children" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
    >
      <h1 className="text-4xl font-black text-brand-primary mb-3 text-center tracking-tight italic">Recrute os Pequenos</h1>
      <p className="text-text-muted mb-10 text-center text-lg font-bold">Quem vai participar dessa aventura?</p>

      <div className="space-y-4 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {childrenList.map((child, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            key={i} className="flex items-center gap-5 bg-bg-main p-6 rounded-[2rem] border-4 border-brand-primary/10 shadow-sm"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border-2 border-brand-primary/5">
              {child.gender === 'girl' ? '🐰' : '🦊'}
            </div>
            <div className="flex-1">
              <p className="font-black text-brand-primary text-xl tracking-tight">{child.displayName}</p>
              <p className="text-sm font-black text-brand-secondary uppercase tracking-widest mt-1">Nível 1 · {child.age} anos</p>
            </div>
            <button onClick={() => onRemove(i)} className="w-12 h-12 flex items-center justify-center text-brand-danger hover:bg-brand-danger/5 rounded-2xl transition-colors">
              <Trash2 size={22} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-brand-primary/5 p-8 rounded-[3rem] border-4 border-dashed border-brand-primary/20 mb-10 space-y-8">
        {/* Gender Toggle */}
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer group">
            <input type="radio" {...form.register('gender')} value="boy" className="peer sr-only" />
            <div className="flex flex-col items-center gap-2 p-6 rounded-[2rem] border-4 border-transparent bg-white peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 peer-checked:shadow-lg transition-all">
              <span className="text-5xl group-hover:scale-110 group-hover:rotate-6 transition-transform">🦊</span>
              <span className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest peer-checked:text-brand-primary">Menino</span>
            </div>
          </label>
          <label className="flex-1 cursor-pointer group">
            <input type="radio" {...form.register('gender')} value="girl" className="peer sr-only" />
            <div className="flex flex-col items-center gap-2 p-6 rounded-[2rem] border-4 border-transparent bg-white peer-checked:border-brand-magic peer-checked:bg-brand-magic/5 peer-checked:shadow-lg transition-all">
              <span className="text-5xl group-hover:scale-110 group-hover:rotate-6 transition-transform">🐰</span>
              <span className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest peer-checked:text-brand-magic">Menina</span>
            </div>
          </label>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-6">Nome do Explorador</label>
            <input {...form.register('displayName')} placeholder="Como devemos chamá-lo?" className="input-field h-16 text-lg font-bold !rounded-2xl" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-6">Nascimento</label>
              <input
                {...form.register('birthDate', { onChange: handleBirthDateChange })}
                type="text"
                placeholder="DD/MM/AAAA"
                className="input-field h-16 text-lg font-bold !rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-6">PIN Secreto</label>
              <input {...form.register('pin')} placeholder="6 dígitos" maxLength={6} className="input-field h-16 text-lg font-bold tracking-[0.5em] text-center !rounded-2xl" />
            </div>
          </div>
        </div>

        <button type="button" onClick={form.handleSubmit(onAdd)} className="w-full py-5 bg-white border-4 border-brand-primary/10 rounded-[2rem] font-black text-brand-primary hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all flex items-center justify-center gap-3 shadow-sm">
          <Plus size={24} /> Adicionar ao Time
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button type="button" onClick={onBack} className="px-8 py-4 font-black text-brand-secondary/60 hover:text-brand-primary transition-colors uppercase tracking-widest text-xs">Voltar</button>
        <button onClick={onNext} disabled={childrenList.length === 0} className="flex-1 btn-primary h-20 !rounded-[2rem] shadow-[0_10px_0_0_#1B4332] disabled:opacity-30">
          Próximo Passo <ArrowRight size={24} />
        </button>
      </div>
    </motion.div>
  )
}
