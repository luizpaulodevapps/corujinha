'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { SUGGESTED_TASKS } from '@corujinha/domain'

interface SuggestionsStepProps {
  selectedTasks: string[]
  setSelectedTasks: (tasks: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function SuggestionsStep({
  selectedTasks,
  setSelectedTasks,
  onNext,
  onBack
}: SuggestionsStepProps) {
  return (
    <motion.div
      key="suggestions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
    >
      <h1 className="text-4xl font-black text-brand-primary mb-3 text-center tracking-tight italic">Missões Iniciais</h1>
      <p className="text-text-muted mb-10 text-center text-lg font-bold">Escolha as primeiras missões para o seu ninho.</p>

      <div className="grid grid-cols-1 gap-4 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {SUGGESTED_TASKS.map((task) => (
          <button
            key={task.title}
            onClick={() => {
              if (selectedTasks.includes(task.title)) {
                setSelectedTasks(selectedTasks.filter(t => t !== task.title))
              } else {
                setSelectedTasks([...selectedTasks, task.title])
              }
            }}
            className={`flex items-center gap-6 p-6 rounded-[2.5rem] border-4 transition-all text-left group ${selectedTasks.includes(task.title) ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-primary/5 bg-white hover:border-brand-primary/20'}`}
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border-2 border-brand-primary/5 group-hover:rotate-6 transition-transform">
              {task.iconEmoji}
            </div>
            <div className="flex-1">
              <p className="font-black text-brand-primary text-xl leading-tight tracking-tight">{task.title}</p>
              <p className="text-xs font-bold text-text-muted mt-2 leading-relaxed">{task.description}</p>
            </div>
            <div className={`w-10 h-10 rounded-2xl border-4 flex items-center justify-center transition-all ${selectedTasks.includes(task.title) ? 'bg-brand-primary border-brand-primary text-white shadow-lg' : 'border-brand-primary/10 text-transparent'}`}>
              <CheckCircle2 size={20} strokeWidth={4} />
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button type="button" onClick={onBack} className="px-8 py-4 font-black text-brand-secondary/60 hover:text-brand-primary transition-colors uppercase tracking-widest text-xs">Voltar</button>
        <button onClick={onNext} className="flex-1 btn-primary h-20 !rounded-[2rem] shadow-[0_10px_0_0_#1B4332]">
          {selectedTasks.length > 0 ? `Adicionar ${selectedTasks.length} Missões` : 'Pular por enquanto'}
        </button>
      </div>
    </motion.div>
  )
}
