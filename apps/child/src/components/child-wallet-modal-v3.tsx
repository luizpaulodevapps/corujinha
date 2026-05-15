'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, History, TrendingUp, Heart, Target } from 'lucide-react'
import { useChildStore } from '@/stores/use-child-store'
import clsx from 'clsx'

export function ChildWalletModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { profile, transactions: storeTransactions } = useChildStore()
  const coins = profile?.coins || 0
  
  const transactions = storeTransactions.length > 0 ? storeTransactions : [
    { id: '1', type: 'gain', amount: 50, title: 'Missão Cumprida', date: 'Hoje' },
    { id: '2', type: 'gain', amount: 20, title: 'Bônus de Série', date: 'Ontem' },
    { id: '3', type: 'spend', amount: 100, title: 'Novo Avatar', date: 'Há 2 dias' },
  ] as any[]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xl"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-color-moon-cream rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto"
        >
          {/* Header */}
          <div className="relative h-60 bg-emerald-950 p-8 flex flex-col justify-center items-center text-center overflow-hidden shrink-0">
             <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url(/textures/noise.svg)]" />
             <div className="relative z-10">
               <motion.div 
                 animate={{ y: [0, -5, 0] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 className="mb-6 inline-flex p-5 rounded-[2rem] bg-white/5 border border-white/10"
               >
                 <Sparkles className="text-brand-accent/80" size={32} />
               </motion.div>
               <h2 className="text-[10px] font-bold tracking-[0.3em] text-brand-accent/40 uppercase mb-3">Tesouro do Explorador</h2>
               <div className="flex items-center justify-center gap-4">
                  <span className="text-6xl font-black text-white tracking-tighter italic">{coins}</span>
                  <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-emerald-950 shadow-lg border-2 border-white/20 rotate-12">
                     <span className="text-2xl font-black">C</span>
                  </div>
               </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-16">
            <section className="bg-color-forest-parchment/50 rounded-[3rem] p-10 border border-emerald-100/50 flex items-center gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
                  <Target size={100} className="text-emerald-900" />
               </div>
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-emerald-700 shrink-0 shadow-sm border border-emerald-100">
                  <Heart size={40} fill="currentColor" />
               </div>
               <div className="flex-1">
                  <h4 className="text-[9px] font-bold tracking-widest text-emerald-900/30 mb-2 uppercase">Próximo Sonho</h4>
                  <p className="text-2xl font-black text-emerald-950 mb-4 italic tracking-tighter">Sorvete em Família 🍦</p>
                  <div className="flex items-center gap-4 text-emerald-700 text-sm font-bold">
                     <div className="flex-1 h-2 bg-emerald-100/50 rounded-full overflow-hidden border border-emerald-900/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          className="h-full bg-brand-accent"
                        />
                     </div>
                     <span className="text-[9px] font-black text-emerald-950 uppercase tracking-widest opacity-40">Faltam 120</span>
                  </div>
               </div>
            </section>

            <section>
              <div className="flex flex-col gap-2 mb-10 px-2">
                <div className="flex items-center gap-2 text-emerald-600/40">
                  <TrendingUp size={14} />
                  <span className="text-[9px] font-bold tracking-widest uppercase">Crescendo com o Tesouro</span>
                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-2 px-2">
                {[
                  { title: 'Poupe para o Épico', body: 'Guardar moedas ajuda a conquistar sonhos gigantes.', icon: '💎' },
                  { title: 'Gasto Inteligente', body: 'Pense: Eu realmente preciso disso agora?', icon: '🧠' },
                  { title: 'Regra dos 3', body: 'Gastar um pouco, guardar muito, ajudar sempre.', icon: '⚖️' }
                ].map((tip, i) => (
                  <motion.div
                    key={i}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 w-56 p-8 rounded-[2.5rem] bg-white border border-emerald-100/50 shadow-sm"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50/50 flex items-center justify-center text-3xl mb-6 border border-emerald-100/50">
                      {tip.icon}
                    </div>
                    <p className="text-[15px] font-black text-emerald-950 mb-2 italic tracking-tight">{tip.title}</p>
                    <p className="text-poetic !text-[12px] !not-italic text-emerald-900/50 leading-relaxed">{tip.body}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex flex-col gap-2 mb-10 px-2">
                <div className="flex items-center gap-2 text-emerald-600/40">
                  <History size={14} />
                  <span className="text-[9px] font-bold tracking-widest uppercase">Suas Conquistas</span>
                </div>
              </div>
              <div className="space-y-6">
                {transactions.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-6 rounded-[2.5rem] bg-color-forest-parchment/30 border border-emerald-100/30 hover:bg-white transition-all">
                    <div className="flex items-center gap-5">
                      <div className={clsx(
                        "w-12 h-12 rounded-2xl flex items-center justify-center border",
                        t.type === 'gain' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                      )}>
                        <TrendingUp size={20} className={t.type === 'spend' ? 'rotate-180' : ''} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[16px] font-black text-emerald-950 italic tracking-tight">{t.title}</p>
                        <p className="text-[9px] font-bold tracking-widest text-emerald-900/20 uppercase">{t.date}</p>
                      </div>
                    </div>
                    <span className={clsx(
                      "text-2xl font-black italic tracking-tighter",
                      t.type === 'gain' ? 'text-emerald-500' : 'text-emerald-900/60'
                    )}>
                      {t.type === 'gain' ? '+' : '-'}{t.amount}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <button
              onClick={onClose}
              className="w-full h-18 bg-emerald-950 text-white rounded-[2.5rem] text-[12px] font-black tracking-widest shadow-xl flex items-center justify-center gap-4 active:scale-95 transition-all uppercase"
            >
              Continuar Explorando
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
