'use client'

import { Variants, Transition } from 'framer-motion'

/**
 * 🎭 Ceremony Animations: Linguagem de Movimento Corujinha
 */

export const modalPanelVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: 100 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: { scale: 0.8, opacity: 0, y: 100 }
}

export const mentorAvatarVariants: Variants = {
  hidden: { scale: 0, rotate: -20 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: { type: 'spring', damping: 15, stiffness: 200 }
  }
}

export const rewardCardVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({ 
    x: 0, 
    opacity: 1,
    transition: { delay: 0.2 + i * 0.1, duration: 0.5 }
  })
}

export const phraseRevealVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 0.8, duration: 0.6 }
  }
}

export const floatTransition: Transition = {
  repeat: Infinity,
  duration: 4,
  ease: 'easeInOut'
}
