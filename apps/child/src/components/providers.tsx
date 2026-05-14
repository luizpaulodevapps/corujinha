'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="corujinha-play-theme"
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  )
}
