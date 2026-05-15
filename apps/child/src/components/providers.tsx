'use client'

import { ThemeProvider } from 'next-themes'
import { WorldStateOverlay } from '@/features/world-state/components/WorldStateOverlay'
import { EveningRitualModal } from '@/features/evening-ritual/components/EveningRitualModal'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="corujinha-play-theme"
      disableTransitionOnChange={false}
    >
      <WorldStateOverlay />
      <EveningRitualModal />
      {children}
    </ThemeProvider>
  )
}
