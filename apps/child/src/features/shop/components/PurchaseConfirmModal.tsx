'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Coins, Sparkles, X } from 'lucide-react'
import { Reward } from '../types'

interface PurchaseConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  reward: Reward | null
}

export function PurchaseConfirmModal({ isOpen, onClose, onConfirm, reward }: PurchaseConfirmModalProps) {
  if (!reward) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="cs-modal" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.96, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 24 }}
            className="cs-modal__panel"
            onClick={event => event.stopPropagation()}
          >
            <button className="cs-modal__close" onClick={onClose} aria-label="Fechar compra">
              <X size={20} strokeWidth={3} />
            </button>

            <div className="cs-modal__media" style={{ background: reward.color }}>
              <span>{reward.icon}</span>
            </div>

            <div className="cs-modal__body">
              <p className="cs-modal__kicker">Resgate magico</p>
              <h2>Confirmar troca?</h2>
              <p>Voce vai usar moedas para resgatar <strong>{reward.title}</strong>.</p>

              <div className="cs-modal__cost">
                <Coins size={26} fill="currentColor" />
                -{reward.cost}
              </div>

              <div className="cs-modal__actions">
                <button className="cs-modal__secondary" onClick={onClose}>Ainda nao</button>
                <button className="cs-modal__primary" onClick={onConfirm}>
                  <Sparkles size={20} />
                  Confirmar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
