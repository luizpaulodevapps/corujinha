'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Sparkles } from 'lucide-react'

interface Avatar {
  id: string
  src: string
  emoji: string
  cat: string
}

const PREDEFINED_AVATARS: Avatar[] = [
  { id: 'Corujinha', src: '/owl_mascot_new.png', emoji: '🦉', cat: 'Animal' },
  { id: 'Raposa', src: 'https://api.dicebear.com/9.x/bottts/svg?seed=Felix', emoji: '🦊', cat: 'Animal' },
  { id: 'Leão', src: 'https://api.dicebear.com/9.x/bottts/svg?seed=Leo', emoji: '🦁', cat: 'Animal' },
  { id: 'Leo', src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Leo', emoji: '👦', cat: 'Menino' },
  { id: 'Kael', src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Kael', emoji: '🧑‍🎤', cat: 'Menino' },
  { id: 'Davi', src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Davi', emoji: '🤴', cat: 'Menino' },
  { id: 'Mia', src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mia', emoji: '👧', cat: 'Menina' },
  { id: 'Luna', src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Luna', emoji: '🧒', cat: 'Menina' },
  { id: 'Bela', src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Bela', emoji: '👸', cat: 'Menina' },
  { id: 'Mago', src: 'https://api.dicebear.com/9.x/bottts/svg?seed=Mago', emoji: '🧙‍♂️', cat: 'Mágico' },
  { id: 'Fada', src: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Fada', emoji: '🧚‍♀️', cat: 'Mágico' },
]

interface AvatarCustomizationModalProps {
  isOpen: boolean
  onClose: () => void
  currentAvatar: string
  onSelect: (src: string) => void
}

export function AvatarCustomizationModal({ isOpen, onClose, currentAvatar, onSelect }: AvatarCustomizationModalProps) {
  // Grouping for narrative
  const categories = Array.from(new Set(PREDEFINED_AVATARS.map(av => av.cat)))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 !z-[10000] bg-emerald-950/40 backdrop-blur-md flex items-center justify-center p-4"
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
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/textures/noise.svg')] pointer-events-none" />

            <div className="p-10 pb-4 text-center relative z-10">
               <h2 className="text-4xl font-black text-emerald-950 italic tracking-tighter m-0">Escolha seu Herói</h2>
               <p className="text-xs font-black text-emerald-600/60 uppercase tracking-[0.3em] mt-2">Qual aventura você viverá hoje?</p>
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-8 scrollbar-hide relative z-10">
              {categories.map((cat) => (
                <div key={cat} className="mb-8 last:mb-0">
                  <h3 className="text-[10px] font-black text-emerald-800/40 uppercase tracking-[0.4em] mb-4 text-center">— {cat} —</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {PREDEFINED_AVATARS.filter(av => av.cat === cat).map((av) => (
                      <motion.button
                        key={av.id}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(av.src)}
                        className={`group p-5 rounded-[2.5rem] border-2 transition-all relative overflow-hidden flex flex-col items-center gap-3 ${
                          currentAvatar === av.src 
                            ? 'bg-white border-emerald-400 shadow-md' 
                            : 'bg-white border-transparent hover:border-emerald-100 hover:shadow-sm'
                        }`}
                      >
                        {/* Pedestal Effect */}
                        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/5 rounded-full blur-md transition-all ${
                          currentAvatar === av.src ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                        
                        <div className="relative w-20 h-20">
                          <img 
                            src={av.src} 
                            alt={av.id} 
                            className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" 
                          />
                          {currentAvatar === av.src && (
                            <motion.div 
                              layoutId="active-av-glow"
                              className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl -z-10"
                            />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 relative z-10">
                          <span className="text-lg">{av.emoji}</span>
                          <p className={`text-[12px] font-black uppercase tracking-widest ${
                            currentAvatar === av.src ? 'text-emerald-800' : 'text-emerald-800/40'
                          }`}>
                            {av.id}
                          </p>
                        </div>

                        {currentAvatar === av.src && (
                          <div className="absolute top-4 right-4">
                            <Sparkles size={16} className="text-emerald-500" fill="currentColor" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Selfie Option (The Portal) */}
              <div className="mt-8">
                <h3 className="text-[10px] font-black text-emerald-800/40 uppercase tracking-[0.4em] mb-4 text-center">— Poder Especial —</h3>
                <motion.label
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-24 rounded-[2.5rem] bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-100 cursor-pointer flex items-center justify-center gap-4 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <Camera size={24} strokeWidth={3} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xl font-black text-emerald-900 italic leading-none">Selfie Mágica!</span>
                    <span className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest mt-1">Transforme-se agora</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="user" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) onSelect(URL.createObjectURL(file))
                    }}
                  />
                </motion.label>
              </div>
            </div>

            <div className="p-10 pt-0 mt-auto relative z-10">
              <button 
                onClick={onClose}
                className="w-full h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-black hover:bg-emerald-200 transition-all text-xs uppercase tracking-[0.25em] border-2 border-emerald-200/50 shadow-[0_6px_0_0_#d1fae5] active:translate-y-1 active:shadow-none"
              >
                Voltar à Jornada
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
