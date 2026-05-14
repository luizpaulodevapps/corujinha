'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Lightbulb, X } from 'lucide-react'

interface MascotTipProps {
  tip: string
  isVisible: boolean
  onClose: () => void
}

export function MascotTip({ tip, isVisible, onClose }: MascotTipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="cd-tip">
          <div className="cd-tip__icon">
            <img src="/owl_mascot_new.png" alt="Corujinha" />
            <span>
              <Lightbulb size={12} fill="currentColor" />
            </span>
          </div>

          <div className="cd-tip__body">
            <p>Dica rapida</p>
            <strong>{tip}</strong>
          </div>

          <button onClick={onClose} aria-label="Fechar dica">
            <X size={18} strokeWidth={3} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
