import { Variants } from 'framer-motion'

/**
 * 🎨 Nav Animations
 * 
 * Define a linguagem de movimento do Dock Mágico e navegação.
 */

export const bloomExpand: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: -20,
    transition: { 
      type: 'spring', 
      damping: 25, 
      stiffness: 400 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 40,
    transition: { duration: 0.3 }
  }
}

export const dockBreathing: Variants = {
  animate: {
    scale: [1, 1.01, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export const magicIconRotate: Variants = {
  active: { rotate: 90, scale: 0.9 },
  inactive: { rotate: 0, scale: 1 }
}
