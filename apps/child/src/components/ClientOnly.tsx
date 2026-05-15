'use client'

import { useEffect, useState } from 'react'

/**
 * 🧱 ClientOnly Component
 * 
 * Evita problemas de hidratação ao garantir que o conteúdo só seja renderizado no cliente.
 * Essencial para componentes que dependem de localStorage ou estados globais dinâmicos.
 */

export function ClientOnly({ children, fallback = null }: { children: React.ReactNode, fallback?: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
