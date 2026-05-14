'use client'

import { AdminSidebar } from './admin-sidebar'
import { ReactNode } from 'react'

interface AdminShellProps {
  children: ReactNode
  noPadding?: boolean
}

import { motion } from 'framer-motion'

export function AdminShell({ children, noPadding = false }: AdminShellProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-brand-bg font-outfit selection:bg-brand-accent/30 selection:text-brand-primary">
      <div className="flex-shrink-0 z-50">
        <AdminSidebar />
      </div>
      <main className="flex-1 flex flex-col overflow-y-auto relative scroll-smooth">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-1 w-full max-w-[1600px] mx-auto ${noPadding ? '' : 'p-6 md:p-8 lg:p-10'}`}
        >
          {children}
        </motion.div>
        
        {/* Subtle Bottom Glow */}
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      </main>
    </div>
  )
}
