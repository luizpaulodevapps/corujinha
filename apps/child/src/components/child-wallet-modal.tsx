'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Coins, Sparkles, ArrowRight } from 'lucide-react'

interface Transaction {
  id: string
  title: string
  value: number
  type: 'earn' | 'spend'
  date: string
}

interface ChildWalletModalProps {
  isOpen: boolean
  onClose: () => void
  coins: number
  transactions: Transaction[]
}

export function ChildWalletModal({ isOpen, onClose, coins, transactions }: ChildWalletModalProps) {
  const COIN_VALUE_BRL = 0.01
  const brlBalance = (coins * COIN_VALUE_BRL).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 !z-[10000] flex items-center justify-center p-4 bg-emerald-950/30 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.9, y: 50, rotate: 2 }}
            className="w-full max-w-[480px] max-h-[calc(100vh-2rem)] flex flex-col bg-gradient-to-b from-[#FCFFFD] to-[#F0F9F2] shadow-[0_50px_100px_rgba(6,31,21,0.5)] rounded-[3.5rem] border-4 border-white relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            {/* 1. CINEMATIC VAULT HEADER (Forest Deep) */}
            <div className="p-10 pb-14 relative overflow-hidden text-center shrink-0">
               {/* Background Layers */}
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-[#0A2F1F] to-[#061F15]" />
               
               {/* Ambient Glows */}
               <motion.div 
                 animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                 transition={{ duration: 6, repeat: Infinity }}
                 className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-400/10 blur-[100px] rounded-full" 
               />

               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-secondary/60 mb-6 relative z-10">
                 Tesouro do Explorador
               </p>
               
               <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                 <motion.div
                   animate={{ rotateY: [0, 360], y: [0, -5, 0] }}
                   transition={{ rotateY: { duration: 8, repeat: Infinity, ease: "linear" }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                   className="mb-3"
                 >
                   <Coins size={64} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
                 </motion.div>
                 
                 <span className="text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                    {coins}
                 </span>
               </div>

               <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 relative z-10">
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Valor Real:</span>
                  <span className="text-brand-accent text-2xl font-black tabular-nums">{brlBalance}</span>
               </div>
            </div>

            {/* 2. MAGIC RULE TIP (The Floating Scroll) */}
            <div className="mx-8 -mt-8 relative z-20 bg-gradient-to-r from-amber-400 to-yellow-500 p-6 rounded-[2.5rem] shadow-[0_12px_24px_rgba(251,191,36,0.25)] border-2 border-white overflow-hidden flex items-center gap-5">
               <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-white font-black text-2xl shadow-inner shrink-0">!</div>
               <p className="text-[15px] font-black text-amber-950 m-0 leading-tight">
                 Cada 100 Moedas valem R$ 1,00 para trocar por prêmios reais! 🎁
               </p>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-8 pt-10 pb-8 relative z-10">
              {/* Financial Tips (GoalCard Style) */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Sparkles size={22} fill="currentColor" />
                   </div>
                   <h3 className="text-xs font-black text-emerald-900 uppercase tracking-[0.25em] m-0">Dicas de Mestre Tesoureiro</h3>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-2 px-2">
                  {[
                    { title: 'Poupe para o Épico', body: 'Guardar ajuda a comprar prêmios gigantes!', icon: '💎', color: 'bg-blue-100 text-blue-600' },
                    { title: 'Gasto Inteligente', body: 'Pense: Eu realmente preciso disso agora?', icon: '🧠', color: 'bg-amber-100 text-amber-600' },
                    { title: 'Regra dos 3', body: 'Divida seu tesouro: gastar, guardar e ajudar!', icon: '⚖️', color: 'bg-pink-100 text-pink-600' },
                    { title: 'Paciência Mágica', body: 'Ver seu tesouro crescer é como cuidar de uma plantinha.', icon: '🌱', color: 'bg-emerald-100 text-emerald-600' }
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="flex-shrink-0 w-44 p-6 rounded-[2.5rem] bg-white border-2 border-emerald-50 shadow-[0_8px_20px_rgba(6,31,21,0.04)] relative overflow-hidden"
                    >
                      <div className={`w-12 h-12 rounded-2xl ${tip.color} flex items-center justify-center text-2xl shadow-sm mb-4`}>
                        {tip.icon}
                      </div>
                      <p className="text-[14px] font-black text-emerald-900 mb-1 leading-tight">{tip.title}</p>
                      <p className="text-[11px] font-bold text-emerald-800/40 leading-relaxed m-0">{tip.body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Transaction Statement (Clean & Tactile) */}
              <div>
                <h3 className="text-xs font-black text-emerald-900/40 uppercase tracking-[0.25em] mb-6 m-0">Histórico de Conquistas</h3>
                <div className="space-y-3">
                  {transactions.map(t => (
                    <motion.div 
                      key={t.id} 
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-5 rounded-[2.25rem] bg-white border-2 border-emerald-50 hover:border-emerald-100 transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${t.type === 'earn' ? 'bg-emerald-500' : 'bg-rose-500'} shadow-md group-hover:rotate-12 transition-transform`}>
                            {t.type === 'earn' ? <ArrowRight size={20} className="-rotate-45" /> : <ArrowRight size={20} className="rotate-45" />}
                         </div>
                         <div>
                            <p className="text-[15px] font-black text-emerald-950 m-0 leading-tight">{t.title}</p>
                            <p className="text-[10px] font-black text-emerald-800/30 m-0 uppercase tracking-widest mt-1">{t.date}</p>
                         </div>
                      </div>
                      <span className={`font-black text-2xl italic tabular-nums ${t.type === 'earn' ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {t.type === 'earn' ? '+' : '-'}{t.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. FINAL ACTION BUTTON (3D Game Style) */}
            <div className="p-10 pt-0 mt-auto relative z-10">
              <button 
                onClick={onClose}
                className="w-full h-20 rounded-[2.25rem] bg-emerald-600 text-white font-black text-2xl italic shadow-[0_10px_0_0_#064e3b] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-3 hover:brightness-110"
              >
                Continuar Jornada
                <Sparkles size={24} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
