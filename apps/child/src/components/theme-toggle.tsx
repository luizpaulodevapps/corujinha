'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-12 w-12 rounded-2xl bg-white/50" aria-hidden />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-brand-surface text-brand-primary shadow-sm overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun size={20} strokeWidth={3} className="text-brand-accent" />
          ) : (
            <Moon size={20} strokeWidth={3} className="text-brand-primary" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
