'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Coins, Star, Target, CheckCircle2, Loader2, Trophy, Zap, Plus, BookOpen, Crown, Lock, Wand2 } from 'lucide-react'
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
  const [isGenerating, setIsGenerating] = useState(false)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      childId: '',
      coins: 10,
      xp: 50,
      category: 'house',
      taskEmoji: '📝',
      isCustom: false
    }
  })

  const selectedCategory = watch('category')

  const mutation = useMutation({
    mutationFn: (data: any) => dashboardService.createTask({
      ...data,
      familyId,
      isCustom: mode === 'custom',
      taskEmoji: mode === 'custom' ? data.taskEmoji : selectedTemplate?.emoji || '📝',
      status: 'todo',
      childName: children.find(c => c.id === data.childId)?.displayName || 'Explorador'
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['pending-tasks'] })
      reset()
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-primary/20 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-card-border overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <header className="bg-bg-main p-10 lg:p-12 text-brand-primary relative border-b-4 border-white">
          <button 
            onClick={onClose}
            className="absolute right-8 top-8 w-12 h-12 flex items-center justify-center bg-white rounded-2xl hover:bg-brand-primary/5 transition-all shadow-sm border-2 border-brand-primary/5 group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-brand-primary/10 rounded-[2.5rem] flex items-center justify-center text-4xl border-4 border-card-border shadow-xl transform -rotate-6">
              {mode === 'custom' ? (watch('taskEmoji') || '✨') : (CATEGORIES.find(c => c.id === selectedCategory)?.emoji || '📜')}
            </div>
            <div>
              <h2 className="text-5xl font-black tracking-tighter italic leading-none">Nova Missão</h2>
              <div className="flex gap-4 mt-2">
                 <button 
                   onClick={() => setMode('library')}
                   className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-2 transition-all ${mode === 'library' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-brand-primary border-brand-primary/10'}`}
                 >
                    <BookOpen size={12} /> Biblioteca
                 </button>
                 <button 
                   onClick={() => isPremium && setMode('custom')}
                   className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-2 transition-all ${mode === 'custom' ? 'bg-brand-accent text-white border-brand-accent' : 'bg-white text-brand-secondary/40 border-brand-secondary/5'} ${!isPremium ? 'cursor-not-allowed opacity-60' : ''}`}
                 >
                    {isPremium ? <Crown size={12} /> : <Lock size={12} />} Personalizada
                 </button>
              </div>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-10 lg:p-12 space-y-10">
          
          {/* Section 1: Target Explorer */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
               <Target size={14} /> Para quem é a missão?
            </label>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {children.map((child) => (
                <label key={child.id} className="relative cursor-pointer shrink-0">
                  <input 
                    type="radio" 
                    {...register('childId', { required: 'Selecione um explorador' })} 
                    value={child.id}
                    className="peer sr-only"
                  />
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-3 px-8 py-6 rounded-[2.5rem] border-4 border-brand-primary/5 bg-brand-primary/5 peer-checked:border-brand-primary peer-checked:bg-white peer-checked:shadow-2xl transition-all"
                  >
                    <span className="text-5xl">{child.avatar || '🦊'}</span>
                    <span className="font-black text-brand-primary text-sm italic">{child.displayName}</span>
                  </motion.div>
                </label>
              ))}
            </div>
            {errors.childId && <p className="text-rose-500 text-xs font-black ml-2">{errors.childId.message as string}</p>}
          </div>

          {mode === 'library' ? (
            /* LIBRARY MODE */
            <div className="space-y-6">
               <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">Escolha na nossa Biblioteca Mágica</label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {MISSION_TEMPLATES.map((template) => (
                    <div 
                      key={template.id}
                      onClick={() => handleSelectTemplate(template)}
                      className={`p-6 rounded-[2rem] border-4 cursor-pointer transition-all flex items-center gap-6 ${selectedTemplate?.id === template.id ? 'bg-brand-primary border-brand-primary shadow-xl' : 'bg-white border-brand-primary/5 hover:border-brand-primary/20'}`}
                    >
                       <div className="text-4xl">{template.emoji}</div>
                       <div className="flex-1">
                          <h4 className={`font-black text-lg italic ${selectedTemplate?.id === template.id ? 'text-white' : 'text-brand-primary'}`}>{template.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                             <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${selectedTemplate?.id === template.id ? 'text-white/60' : 'text-amber-500'}`}>
                                <Coins size={12} /> {template.coins}
                             </span>
                             <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${selectedTemplate?.id === template.id ? 'text-white/60' : 'text-brand-primary/60'}`}>
                                <Sparkles size={12} /> {template.xp} XP
                             </span>
                          </div>
                       </div>
                       {selectedTemplate?.id === template.id && (
                         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-lg">
                            <CheckCircle2 size={20} strokeWidth={3} />
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>
          ) : (
            /* CUSTOM MODE with AI */
            <div className="space-y-8">
               {!isPremium ? (
                 <div className="p-8 bg-brand-accent/10 rounded-[2.5rem] border-4 border-dashed border-brand-accent/20 flex flex-col items-center text-center">
                    <Crown size={48} className="text-brand-accent mb-4" />
                    <h4 className="text-2xl font-black text-brand-accent italic">Funcionalidade Premium</h4>
                    <p className="text-brand-accent/60 font-bold mb-6">No plano Gratuito você pode usar nossa Biblioteca Mágica. Missões personalizadas são exclusivas para assinantes!</p>
                    <button type="button" className="btn-primary bg-brand-accent !rounded-2xl px-8 shadow-[0_8px_0_0_#991B1B]">Fazer Upgrade Agora</button>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-2">
                         <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em]">Título da Missão</label>
                         <button 
                           type="button"
                           onClick={handleAIGenerate}
                           disabled={isGenerating}
                           className="flex items-center gap-2 text-[10px] font-black text-brand-accent uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50"
                         >
                            {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                            Gerar com IA
                         </button>
                      </div>
                      <div className="relative">
                         <input 
                           {...register('title', { required: mode === 'custom' })}
                           placeholder="Ex: Fazer carinho no Totó..."
                           className={`w-full h-20 px-8 rounded-3xl border-4 border-brand-primary/5 bg-brand-primary/5 font-black text-xl text-brand-primary focus:outline-none focus:border-brand-primary transition-all ${isGenerating ? 'animate-pulse' : ''}`}
                         />
                         {isGenerating && (
                           <motion.div 
                             layoutId="sparkle"
                             className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-accent"
                           >
                             <Sparkles size={24} className="animate-bounce" />
                           </motion.div>
                         )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">Categoria</label>
                      <div className="grid grid-cols-3 gap-3">
                        {CATEGORIES.map(cat => (
                          <label key={cat.id} className="cursor-pointer">
                            <input type="radio" {...register('category')} value={cat.id} className="peer sr-only" />
                            <div className="h-20 flex flex-col items-center justify-center rounded-2xl border-4 border-brand-primary/5 bg-brand-primary/5 peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-all peer-checked:shadow-xl">
                              <span className="text-2xl">{cat.emoji}</span>
                              <span className="text-[8px] font-black uppercase tracking-widest text-brand-secondary/40 peer-checked:text-white mt-1">{cat.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* Rewards */}
          <div className="bg-brand-primary/5 rounded-[3rem] p-10 border-4 border-card-border shadow-inner grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">Tesouro (Moedas)</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500"><Coins size={28} className="fill-amber-500/20" /></div>
                <input 
                  type="number" 
                  {...register('coins', { valueAsNumber: true })}
                  disabled={mode === 'library'}
                  className={`w-full h-20 pl-20 pr-8 rounded-2xl border-4 border-card-border bg-white font-black text-3xl text-amber-500 focus:outline-none focus:border-amber-500 transition-all shadow-sm ${mode === 'library' ? 'opacity-50 cursor-not-allowed' : ''} ${isGenerating ? 'animate-pulse' : ''}`}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">Mágica (XP)</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-primary"><Sparkles size={28} className="text-brand-magic" /></div>
                <input 
                  type="number" 
                  {...register('xp', { valueAsNumber: true })}
                  disabled={mode === 'library'}
                  className={`w-full h-20 pl-20 pr-8 rounded-2xl border-4 border-card-border bg-white font-black text-3xl text-brand-primary focus:outline-none focus:border-brand-primary transition-all shadow-sm ${mode === 'library' ? 'opacity-50 cursor-not-allowed' : ''} ${isGenerating ? 'animate-pulse' : ''}`}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={mutation.isPending || isGenerating || (mode === 'library' && !selectedTemplate)}
            className="w-full h-24 btn-primary !rounded-[2.5rem] bg-brand-primary text-white text-2xl font-black shadow-[0_12px_0_0_#1B4332] active:translate-y-2 active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-4"
          >
            {mutation.isPending ? <Loader2 className="animate-spin" size={32} /> : (
              <>
                Lançar Missão ao Ninho <Plus size={32} strokeWidth={3} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
