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
    const timers: NodeJS.Timeout[] = []

    if (isOpen) {
      // Timeline Sequence
      setStage(CeremonyStage.ENTER)

      timers.push(setTimeout(() => setStage(CeremonyStage.MENTOR_APPEAR), 600))
      timers.push(setTimeout(() => setStage(CeremonyStage.REWARD_REVEAL), 1200))
      timers.push(setTimeout(() => setStage(CeremonyStage.NEST_EVOLUTION), 2000))
      timers.push(setTimeout(() => setStage(CeremonyStage.CTA), 2800))
    } else {
      setStage(CeremonyStage.IDLE)
    }

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [isOpen])

  return stage
}
