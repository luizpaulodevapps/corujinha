'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { Notification } from '@/types'

interface NotificationDrawerProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onRead: (id: string) => void
  onClearAll: () => void
}

export function NotificationDrawer({ isOpen, onClose, notifications, onRead, onClearAll }: NotificationDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 !z-[10000] bg-emerald-950/20 backdrop-blur-sm flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%', rotate: 2 }}
            animate={{ x: 0, rotate: 0 }}
            exit={{ x: '100%', rotate: -2 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-[90%] max-w-[380px] h-full bg-[#F8FFF9] p-8 flex flex-col gap-8 shadow-[-30px_0_80px_rgba(6,31,21,0.2)] border-l border-emerald-100 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg rotate-[-8deg]">
                    <Sparkles size={24} fill="currentColor" />
                 </div>
                 <h2 className="text-2xl font-black text-emerald-900 italic tracking-tighter m-0 leading-tight">
                    Correio da<br />Floresta
                 </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-800 transition-all active:scale-90"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-5 scrollbar-hide relative z-10">
              {notifications.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 p-8">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-7xl filter drop-shadow-xl"
                  >
                    🦉
                  </motion.div>
                  <div>
                    <p className="font-black text-emerald-900 leading-tight uppercase text-sm tracking-widest mb-2">
                      Nenhuma carta nova
                    </p>
                    <p className="text-xs font-bold text-emerald-800/40 m-0">
                      Sua árvore de correspondências está descansando por hoje.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map(n => (
                    <motion.div
                      key={n.id}
                      whileHover={{ scale: 1.02, x: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer relative group ${
                        n.read 
                          ? 'bg-white/40 border-transparent opacity-60' 
                          : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                      }`}
                      onClick={() => onRead(n.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[11px] font-black uppercase tracking-widest ${n.read ? 'text-emerald-800/40' : 'text-emerald-600'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800/30 italic">{n.time}</span>
                      </div>
                      <p className="text-[14px] font-bold text-emerald-900 leading-relaxed m-0">{n.body}</p>
                      
                      {!n.read && (
                        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
                      )}

                      {/* Letter Edge Decoration */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-emerald-400/20 rounded-r-full group-hover:bg-emerald-400 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onClearAll}
              className="w-full h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-black hover:bg-emerald-200 transition-all uppercase text-xs tracking-[0.25em] relative z-10 border-2 border-emerald-200/50 shadow-[0_6px_0_0_#d1fae5] active:translate-y-1 active:shadow-none"
            >
              Guardar Todas as Cartas
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
