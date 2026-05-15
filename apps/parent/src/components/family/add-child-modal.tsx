'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PlusCircle, X, Loader2, Sparkles } from 'lucide-react'

interface AddChildModalProps {
  isOpen: boolean
  onClose: () => void
  onAddChild: (data: any) => void
  isPending: boolean
}

export function AddChildModal({
  isOpen,
  onClose,
  onAddChild,
  isPending
}: AddChildModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-primary/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-card-bg w-full max-w-2xl rounded-[4rem] border-8 border-card-border shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="p-12">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center border-4 border-card-border">
                    <PlusCircle size={28} className="text-brand-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-brand-primary italic">Novo Explorador</h2>
                    <p className="text-xs font-black text-brand-secondary/40 uppercase tracking-widest">Iniciando uma nova jornada</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 bg-brand-primary/5 text-brand-primary rounded-xl flex items-center justify-center hover:bg-brand-danger hover:text-white transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const data = {
                    displayName: formData.get('displayName'),
                    gender: formData.get('gender'),
                    username: formData.get('username'),
                    pinCode: formData.get('pinCode'),
                    age: 7
                  }
                  onAddChild(data)
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">Nome do Explorador</label>
                    <input name="displayName" type="text" required className="w-full bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary rounded-3xl px-6 py-4 font-black text-brand-primary outline-none transition-all" placeholder="Ex: Luca" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">Username (@)</label>
                    <input name="username" type="text" required className="w-full bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary rounded-3xl px-6 py-4 font-black text-brand-primary outline-none transition-all" placeholder="Ex: luca_ninja" />
                  </div>

                  <div className="col-span-full space-y-3">
                    <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">Gênero</label>
                    <div className="flex gap-4">
                      {[
                        { id: 'boy', label: 'Menino', icon: '🦊' },
                        { id: 'girl', label: 'Menina', icon: '🐰' },
                        { id: 'other', label: 'Outro', icon: '🐼' }
                      ].map((g) => (
                        <label key={g.id} className="flex-1 cursor-pointer group">
                          <input type="radio" name="gender" value={g.id} defaultChecked={g.id === 'boy'} className="hidden peer" />
                          <div className="p-4 rounded-2xl border-4 border-card-border bg-brand-primary/5 text-center transition-all peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-white shadow-sm group-hover:scale-105">
                            <div className="text-3xl mb-1">{g.icon}</div>
                            <div className="font-black uppercase text-[8px] tracking-widest">{g.label}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">PIN (4-6 dígitos)</label>
                    <input name="pinCode" type="password" inputMode="numeric" pattern="[0-9]*" minLength={4} maxLength={6} required className="w-full bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary rounded-3xl px-6 py-4 font-black text-2xl tracking-[8px] text-brand-primary outline-none transition-all text-center" placeholder="****" />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isPending}
                  className="w-full py-6 bg-brand-primary text-white rounded-[2rem] font-black text-xl shadow-[0_12px_0_0_#1B4332] hover:translate-y-[2px] hover:shadow-[0_10px_0_0_#1B4332] active:translate-y-[12px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles size={24} />
                  )}
                  Concluir Invocação do Explorador
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
