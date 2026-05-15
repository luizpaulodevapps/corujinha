'use client'

import { useState, useEffect } from 'react'
import { CeremonyStage } from '../types'

/**
 * ⏳ Hook: useCeremonyTimeline
 * 
 * Gerencia a progressão temporal da cerimônia.
 */

export function useCeremonyTimeline(isOpen: boolean) {
  const [stage, setStage] = useState<CeremonyStage>(CeremonyStage.IDLE)

  useEffect(() => {
    if (isOpen) {
      // Timeline Sequence
      setStage(CeremonyStage.ENTER)

      const timer1 = setTimeout(() => setStage(CeremonyStage.MENTOR_APPEAR), 600)
      const timer2 = setTimeout(() => setStage(CeremonyStage.REWARD_REVEAL), 1200)
      const timer3 = setTimeout(() => setStage(CeremonyStage.NEST_EVOLUTION), 2000)
      const timer4 = setTimeout(() => setStage(CeremonyStage.CTA), 2800)

      return () => {
        [timer1, timer2, timer3, timer4].forEach(clearTimeout)
      }
    } else {
      setStage(CeremonyStage.IDLE)
    }
  }, [isOpen])

  return stage
}
