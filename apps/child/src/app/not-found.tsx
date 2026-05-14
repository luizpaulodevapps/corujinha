'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Compass, Home, Sparkles, Map as MapIcon, ArrowLeft } from 'lucide-react'
import { ChildBottomNav } from '@/components/child-bottom-nav'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-bg px-6 pb-40 pt-12">
      {/* Magical Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex max-w-lg flex-col items-center text-center"
      >
        {/* The "Lost Map" Visual */}
        <div className="relative mb-12">
           <motion.div
             animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-48 h-48 bg-white rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(45,106,79,0.2)] border-8 border-app-border flex items-center justify-center text-8xl transform -rotate-6"
           >
             🗺️
           </motion.div>
           <motion.div
             animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute -top-4 -right-4 w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center text-white border-4 border-white shadow-xl"
           >
              <Sparkles size={32} />
           </motion.div>
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-brand-primary px-6 py-2 rounded-full border-4 border-white shadow-lg">
              <span className="text-white font-black italic tracking-tighter text-xl">Página Sumiu!</span>
           </div>
        </div>

        <h1 className="text-8xl font-black text-brand-primary italic tracking-tighter mb-4">404</h1>
        <p className="text-2xl font-black text-brand-secondary italic leading-tight mb-12 max-w-xs">
          Essa parte da floresta ainda não foi explorada...
        </p>

        <div className="flex flex-col w-full gap-6">
          <Link
            href="/dashboard"
            className="h-24 bg-brand-primary rounded-[2.5rem] border-8 border-white shadow-[0_15px_30px_rgba(30,70,54,0.3)] flex items-center justify-center gap-4 text-white text-2xl font-black italic active:scale-95 transition-transform"
          >
            <Home size={32} strokeWidth={3} />
            Voltar ao Ninho
          </Link>
          
          <Link
            href="/jornada"
            className="h-20 bg-white rounded-[2rem] border-4 border-app-border flex items-center justify-center gap-4 text-brand-primary text-xl font-black italic active:scale-95 transition-transform"
          >
            <Compass size={24} className="text-brand-accent" />
            Ver Mapa da Aventura
          </Link>
        </div>

        <p className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-app-faint flex items-center gap-2">
           <Sparkles size={14} className="text-brand-accent" /> Exploradores da Corujinha
        </p>
      </motion.div>

      <ChildBottomNav />
    </main>
  )
}
