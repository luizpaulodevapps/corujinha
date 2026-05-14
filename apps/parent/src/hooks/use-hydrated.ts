'use client'

import { useEffect, useState } from 'react'

/**
 * Hook que previne mismatches de hydration com stores Zustand.
 * Retorna `false` durante SSR/hydration e `true` após montar no cliente.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
