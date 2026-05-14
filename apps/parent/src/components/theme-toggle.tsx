'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Moon, Sun, Monitor } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={`h-12 w-12 rounded-2xl border-4 border-brand-secondary/20 bg-brand-secondary/5 ${className}`}
        aria-hidden
      />
    )
  }

  const cycle = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const Icon = theme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun
  const label =
    theme === 'system' ? 'Tema: sistema' : theme === 'dark' ? 'Tema: escuro' : 'Tema: claro'

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={cycle}
      title={label}
      aria-label={label}
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-brand-secondary/25 bg-brand-secondary/10 text-brand-primary shadow-sm transition-colors hover:border-brand-secondary/50 hover:bg-brand-secondary/20 dark:text-brand-accent ${className}`}
    >
      <Icon size={22} strokeWidth={2.5} />
    </motion.button>
  )
}
