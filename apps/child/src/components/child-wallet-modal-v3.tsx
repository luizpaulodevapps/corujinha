'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, History, TrendingUp, Heart, Target } from 'lucide-react'
import { useChildStore } from '@/stores/use-child-store'
import clsx from 'clsx'

export function ChildWalletModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { profile, transactions: storeTransactions } = useChildStore()
  const coins = profile?.coins || 0
  const [mounted, setMounted] = useState(false)

  // Garante que o Portal só rode no lado do cliente (evita Hydration Error no Next.js)
  useEffect(() => {
    setMounted(true)
  }, [])

  const transactions = storeTransactions.length > 0 ? storeTransactions : [
    { id: '1', type: 'gain', amount: 50, title: 'Missão Cumprida', date: 'Hoje' },
    { id: '2', type: 'gain', amount: 20, title: 'Bônus de Série', date: 'Ontem' },
    { id: '3', type: 'spend', amount: 100, title: 'Novo Avatar', date: 'Há 2 dias' },
  ] as any[]

  if (!mounted) return null

  // O createPortal joga o modal pro final do <body>, evitando bugs de largura/altura
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          
          {/* Fundo Escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Container do Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            // max-h-[85dvh] respeita a barra de endereços do celular
            className="relative w-full max-w-xl bg-white rounded-[1rem] shadow-2xl overflow-hidden flex flex-col max-h-[80dvh] border-[6px] pointer-events-auto"
          >
            
            {/* Header: Altura reduzida no mobile (h-40) para sobrar espaço para o conteúdo */}
            <div className="relative h-40 sm:h-52 bg-emerald-950 px-6 py-4 flex flex-col justify-center items-center text-center overflow-hidden shrink-0">
               <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url(/textures/noise.svg)]" />
               <div className="relative z-10">
                 <motion.div 
                   animate={{ y: [0, -4, 0] }} 
                   transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                   className="mb-4 inline-flex p-3 sm:p-4 rounded-[2rem] bg-white/5 border border-white/10"
                 >
                   <Sparkles className="text-brand-accent/80" size={24} />
                 </motion.div>
                 <h2 className="text-[10px] font-bold tracking-[0.3em] text-brand-accent/40 uppercase mb-2">Tesouro do Explorador</h2>
                 <div className="flex items-center justify-center gap-3">
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter italic leading-none">{coins}</span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-accent rounded-xl flex items-center justify-center text-emerald-950 shadow-lg border-2 border-white/20 rotate-12">
                       <span className="text-xl sm:text-2xl font-black">C</span>
                    </div>
                 </div>
               </div>
            </div>

            {/* Body: A classe min-h-0 é OBRIGATÓRIA para o scroll funcionar direito no Flexbox */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 scrollbar-hide space-y-8 sm:space-y-10 min-h-0">
              
              <section className="bg-emerald-50/50 rounded-[0.5rem] p-5 sm:p-6 border border-emerald-100/50 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                    <Target size={80} className="text-emerald-900" />
                 </div>
                 <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-[0.5rem] flex items-center justify-center text-emerald-700 shrink-0 shadow-sm border border-emerald-100 z-10">
                    <Heart size={24} fill="currentColor" className="text-rose-500" />
                 </div>
                 <div className="flex-1 text-center sm:text-left z-10 w-full">
                    <h4 className="text-[9px] font-bold tracking-widest text-emerald-900/40 mb-1.5 uppercase">Próximo Sonho</h4>
                    <p className="text-2xl font-black text-emerald-950 mb-3 italic tracking-tighter">Sorvete em Família</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-emerald-700 text-sm font-bold">
                       <div className="flex-1 h-2.5 bg-emerald-100/50 rounded-full overflow-hidden border border-emerald-900/5 w-full">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            className="h-full bg-brand-accent shadow-[0_0_15px_rgba(252,225,138,0.5)]"
                          />
                       </div>
                       <span className="text-[9px] font-black text-emerald-950 uppercase tracking-widest bg-emerald-950 px-3 py-1.5 rounded-full text-brand-accent whitespace-nowrap self-end sm:self-auto">Faltam 120</span>
                    </div>
                 </div>
              </section>

              {/* SEÇÃO MODIFICADA: Transformada de carrossel para lista vertical */}
              <section>
                <div className="flex items-center gap-2 text-emerald-600/50 mb-5 px-1">
                  <TrendingUp size={14} />
                  <span className="text-[9px] font-bold tracking-widest uppercase">Crescendo com o Tesouro</span>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { title: 'Poupe para o Épico', body: 'Guardar moedas ajuda a conquistar sonhos gigantes.', icon: '💎' },
                    { title: 'Gasto Inteligente', body: 'Pense: Eu realmente preciso disso agora?', icon: '🧠' },
                    { title: 'Regra dos 3', body: 'Gastar um pouco, guardar muito, ajudar sempre.', icon: '⚖️' }
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-4 p-4 rounded-[0.5rem] bg-white border border-emerald-100/50 shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-50/80 flex items-center justify-center text-2xl border border-emerald-100/50 shrink-0">
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-black text-emerald-950 mb-0.5 italic tracking-tight leading-tight">{tip.title}</p>
                        <p className="text-poetic !text-[11px] !not-italic text-emerald-900/50 leading-relaxed">{tip.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 text-emerald-600/50 mb-5 px-1">
                  <History size={14} />
                  <span className="text-[9px] font-bold tracking-widest uppercase">Suas Conquistas</span>
                </div>
                <div className="space-y-3">
                  {transactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-4 rounded-[0.5rem] bg-emerald-50/40 border border-emerald-100/40 hover:bg-white transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={clsx(
                          "w-10 h-10 rounded-xl flex items-center justify-center border shrink-0",
                          t.type === 'gain' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                        )}>
                          <TrendingUp size={16} className={t.type === 'spend' ? 'rotate-180' : ''} />
                        </div>
                        {/* min-w-0 e truncate evitam que textos longos quebrem a tela horizontalmente */}
                        <div className="space-y-0.5 min-w-0 flex-1 pr-2">
                          <p className="text-[14px] font-black text-emerald-950 italic tracking-tight truncate">{t.title}</p>
                          <p className="text-[8px] font-bold tracking-widest text-emerald-900/40 uppercase">{t.date}</p>
                        </div>
                      </div>
                      <span className={clsx(
                        "text-xl font-black italic tracking-tighter shrink-0",
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
                className="w-full h-14 bg-emerald-950 text-black rounded-[2rem] text-[11px] font-black tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all uppercase shrink-0 mt-2"
              >
                Continuar Explorando
                <ArrowRight size={16} strokeWidth={3} />
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}