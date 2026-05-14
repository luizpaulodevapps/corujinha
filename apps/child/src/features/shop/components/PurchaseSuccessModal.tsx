'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper, Sparkles } from 'lucide-react'

interface PurchaseSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  reward: {
    title: string
  } | null
}

export function PurchaseSuccessModal({ isOpen, onClose, reward }: PurchaseSuccessModalProps) {
  if (!reward) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="cs-modal" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.96, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 24 }}
            className="cs-success"
            onClick={event => event.stopPropagation()}
          >
            <div className="cs-success__icon">
              <PartyPopper size={46} />
            </div>
            <p className="cs-modal__kicker">Tesouro resgatado</p>
            <h2>Sensacional!</h2>
            <p>Voce acaba de resgatar <strong>{reward.title}</strong>.</p>
            <button onClick={onClose}>
              <Sparkles size={22} />
              Continuar jornada
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
