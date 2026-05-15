'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useHydrated } from '@/hooks/use-hydrated'
import { Sidebar } from '@/components/layout/sidebar'
import { PageTransition } from '@/components/layout/page-transition'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated()
  const { isAuthenticated, isLoading, needsOnboarding } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isOnboardingPage = pathname === '/onboarding'

  useEffect(() => {
    if (!hydrated || isLoading) return
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    
    // Evita loop infinito: só redireciona se já não estiver na página de onboarding
    if (needsOnboarding && !isOnboardingPage) {
      router.replace('/onboarding')
    }

    // Se já completou onboarding e está na página de onboarding, vai para o dashboard
    if (!needsOnboarding && isOnboardingPage) {
      router.replace('/dashboard')
    }
  }, [hydrated, isAuthenticated, isLoading, needsOnboarding, router, isOnboardingPage])

  // Aguarda hydration antes de qualquer decisão de auth
  if (!hydrated || isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  // Se for página de onboarding, renderizamos sem Sidebar e sem o padding lateral
  if (isOnboardingPage) {
    return (
      <div className="min-h-screen bg-bg-main motion-safe:transition-colors">
        <PageTransition>{children}</PageTransition>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-main selection:bg-brand-accent selection:text-brand-primary motion-safe:transition-colors">
      <Sidebar />
      <main className="lg:pl-72 min-h-screen transition-all duration-300 relative">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
