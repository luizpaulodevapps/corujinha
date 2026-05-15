'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Coins, CheckCircle2, Loader2, Trophy, Zap, Wand2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { dashboardService } from '@/services/dashboard.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MISSION_TEMPLATES, MissionTemplate } from '@/constants/mission-templates'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  familyId: string
  children: any[]
  userPlan?: string | undefined 
}

const CATEGORIES = [
  { id: 'morning', label: 'Matinal', emoji: '☀️', color: 'bg-amber-500' },
  { id: 'study', label: 'Estudo', emoji: '📚', color: 'bg-brand-primary' },
  { id: 'house', label: 'Casa', emoji: '🏠', color: 'bg-brand-warm' },
  { id: 'health', label: 'Saúde', emoji: '🍎', color: 'bg-brand-success' },
  { id: 'night', label: 'Noturna', emoji: '🌙', color: 'bg-brand-secondary' },
]

const AI_MISSIONS = [
  { title: 'Expedição ao Planeta dentes limpos', coins: 15, xp: 80, category: 'morning', emoji: '🚀' },
  { title: 'Treinamento Ninja de Arrumação', coins: 25, xp: 120, category: 'house', emoji: '🥷' },
  { title: 'O Desafio do Mestre da Leitura', coins: 20, xp: 100, category: 'study', emoji: '🧙‍♂️' },
  { title: 'Poção Mágica da Hidratação (Beber Água)', coins: 10, xp: 40, category: 'health', emoji: '🧪' },
  { title: 'Missão Silenciosa do Pijama', coins: 15, xp: 60, category: 'night', emoji: '🤫' },
]

export function CreateTaskModal({ isOpen, onClose, familyId, children, userPlan = 'free' }: CreateTaskModalProps) {
  const queryClient = useQueryClient()
  const isPremium = userPlan === 'premium' || userPlan === 'family_plus'
  
  const [mode, setMode] = useState<'library' | 'custom'>('library')
  const [selectedTemplate, setSelectedTemplate] = useState<MissionTemplate | null>(null)
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      coins: 10,
      xp: 50,
      category: 'house',
      taskEmoji: '📝',
      isCustom: false
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (selectedChildIds.length === 0) throw new Error('Selecione ao menos um explorador')
      
      const promises = selectedChildIds.map(childId => {
        const child = children.find(c => c.id === childId)
        return dashboardService.createTask({
          ...data,
          familyId,
          childId,
          childName: child?.displayName || 'Explorador',
          isCustom: mode === 'custom',
          taskEmoji: mode === 'custom' ? data.taskEmoji : selectedTemplate?.emoji || '📝',
          status: 'todo',
        })
      })
      return Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['pending-tasks'] })
      reset()
      setSelectedChildIds([])
      onClose()
    }
  })

  const handleSelectTemplate = (template: MissionTemplate) => {
    setSelectedTemplate(template)
    setValue('title', template.title)
    setValue('category', template.category)
    setValue('coins', template.coins)
    setValue('xp', template.xp)
    setValue('taskEmoji', template.emoji)
  }

  const handleAIGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const randomMission = AI_MISSIONS[Math.floor(Math.random() * AI_MISSIONS.length)]
      if (randomMission) {
        setValue('title', randomMission.title)
        setValue('coins', randomMission.coins)
        setValue('xp', randomMission.xp)
        setValue('category', randomMission.category as any)
        setValue('taskEmoji', randomMission.emoji)
      }
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-primary/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-card-bg w-full max-w-4xl h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-[3rem] sm:rounded-[4rem] border-t-8 sm:border-8 border-card-border shadow-2xl relative z-10 flex flex-col overflow-hidden"
          >
            {/* Header Sticky */}
            <div className="p-8 pb-4 border-b-4 border-brand-primary/5 flex items-center justify-between shrink-0 bg-white dark:bg-card-bg z-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center border-4 border-card-border">
                  <Wand2 size={28} className="text-brand-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-brand-primary italic">Lançar Nova Missão</h2>
                  <p className="text-xs font-black text-brand-secondary/40 uppercase tracking-widest">Defina o próximo desafio dos exploradores</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-brand-primary/5 text-brand-primary rounded-xl flex items-center justify-center hover:bg-brand-danger hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-6 pb-32">
              <div className="space-y-10">
                {/* 1. Select Explorers */}
                <section>
                  <div className="flex items-center gap-2 mb-4 ml-2">
                    <span className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-[0.2em]">Passo 1: Quem participará?</span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {children.map((child) => {
                      const isSelected = selectedChildIds.includes(child.id)
                      return (
                        <button
                          key={child.id}
                          onClick={() => {
                            setSelectedChildIds(prev => 
                              isSelected ? prev.filter(id => id !== child.id) : [...prev, child.id]
                            )
                          }}
                          className={`flex flex-col items-center gap-3 p-4 rounded-[2rem] border-4 transition-all shrink-0 min-w-[120px] relative ${
                            isSelected 
                              ? 'bg-brand-primary border-brand-primary shadow-xl scale-105' 
                              : 'bg-brand-primary/5 border-card-border grayscale hover:grayscale-0'
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${isSelected ? 'bg-white/20' : 'bg-white'}`}>
                            {child.avatar || (child.gender === 'boy' ? '🦊' : '🐰')}
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-brand-primary/60'}`}>
                            {child.displayName}
                          </span>
                          {isSelected && (
                             <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-brand-primary">
                               <CheckCircle2 size={14} className="text-brand-primary" />
                             </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </section>

                {/* 2. Choose Mode */}
                <div className="grid grid-cols-2 gap-4 p-2 bg-brand-primary/5 rounded-[2rem] border-4 border-card-border">
                  <button 
                    onClick={() => setMode('library')}
                    className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${mode === 'library' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-secondary/40 hover:text-brand-primary'}`}
                  >
                    Pergaminhos Antigos
                  </button>
                  <button 
                    onClick={() => isPremium && setMode('custom')}
                    className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${mode === 'custom' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-secondary/40 hover:text-brand-primary'} ${!isPremium ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    Magia Própria
                  </button>
                </div>

                {mode === 'library' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MISSION_TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleSelectTemplate(template)}
                        className={`p-6 rounded-[2rem] border-4 flex items-center gap-4 text-left transition-all ${selectedTemplate?.id === template.id ? 'border-brand-primary bg-brand-primary/5 shadow-inner' : 'border-card-border bg-white'}`}
                      >
                        <span className="text-3xl">{template.emoji}</span>
                        <div>
                          <p className="font-black text-brand-primary leading-tight">{template.title}</p>
                          <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest mt-1">
                            {template.coins} moedas • {template.xp} XP
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">Nome da Missão</label>
                       <div className="relative">
                          <input 
                            {...register('title')}
                            placeholder="Ex: Arrumar o quarto..."
                            className="w-full bg-brand-primary/5 border-4 border-transparent p-6 rounded-2xl font-black text-brand-primary placeholder:text-brand-primary/30 outline-none focus:border-brand-primary/20 transition-all"
                          />
                          <button 
                            type="button"
                            onClick={handleAIGenerate}
                            disabled={isGenerating}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-xl shadow-md text-brand-primary hover:scale-110 transition-all"
                          >
                            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                          </button>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">Moedas</label>
                          <div className="relative">
                            <Coins className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
                            <input type="number" {...register('coins')} className="w-full bg-brand-primary/5 border-4 border-transparent p-6 pl-14 rounded-2xl font-black text-brand-primary outline-none" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">XP</label>
                          <div className="relative">
                            <Trophy className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-warm" size={20} />
                            <input type="number" {...register('xp')} className="w-full bg-brand-primary/5 border-4 border-transparent p-6 pl-14 rounded-2xl font-black text-brand-primary outline-none" />
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer FAB */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-card-bg dark:via-card-bg/90 pointer-events-none flex justify-center z-30">
               <div className="max-w-md w-full pointer-events-auto">
                 <button 
                    onClick={handleSubmit((data) => mutation.mutate(data))}
                    disabled={mutation.isPending || selectedChildIds.length === 0}
                    className="w-full py-6 bg-brand-primary text-white rounded-[2rem] font-black text-xl shadow-[0_12px_0_0_#1B4332] hover:translate-y-[2px] hover:shadow-[0_10px_0_0_#1B4332] active:translate-y-[12px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-3 border-4 border-white/20"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <Zap size={24} className="fill-white" />
                        Lançar Desafio Mágico
                      </>
                    )}
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
