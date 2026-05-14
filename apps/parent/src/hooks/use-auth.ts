'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import type { User } from 'firebase/auth'

export function useAuthListener() {
  useEffect(() => {
    const { setUser, clearUser } = useAuthStore.getState()
    const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? ''
    const isConfigured = key.trim().length > 20 // Keys reais são longas

    const enterPreviewMode = () => {
      const hasCompletedOnboarding = typeof window !== 'undefined' && localStorage.getItem('corujinha-onboarding-done') === 'true'
      
      console.warn('[Corujinha] Entrando em Modo Preview.')
      setUser(
        {
          uid: 'preview-user-id',
          email: 'admin@corujinha.dev',
          displayName: 'Marina Silva (Preview)',
          photoURL: null,
        } as unknown as User,
        { 
          role: 'parent', 
          familyId: hasCompletedOnboarding ? 'preview-id' : null 
        },
        hasCompletedOnboarding ? JSON.parse(localStorage.getItem('corujinha-preview-children') || '[]') : []
      )
    }

    if (!isConfigured) {
      enterPreviewMode()
      return
    }

    let unsub: (() => void) | undefined
    
    const init = async () => {
      try {
        const { getFirebaseAuth } = await import('@corujinha/firebase')
        const { onAuthStateChanged } = await import('firebase/auth')
        
        // Se getFirebaseAuth() estourar erro (chave inválida), o catch abaixo pega
        const auth = getFirebaseAuth()
        
        unsub = onAuthStateChanged(auth, async (fu) => {
          const s = useAuthStore.getState()
          if (!fu) { s.clearUser(); return }
          try {
            const [tokenResult, { getDoc, doc }, { getFirebaseFirestore }] = await Promise.all([
              fu.getIdTokenResult(),
              import('firebase/firestore'),
              import('@corujinha/firebase')
            ])
            
            // Busca dados extras no Firestore para garantir família e onboarding
            const db = getFirebaseFirestore()
            const userDoc = await getDoc(doc(db, 'users', fu.uid))
            const userData = userDoc.exists() ? userDoc.data() : {}
            
            // Prioriza claims, mas usa Firestore como fallback
            const finalClaims = {
              ...tokenResult.claims,
              familyId: tokenResult.claims.familyId || userData.familyId || null,
              onboardingCompleted: Boolean(tokenResult.claims.familyId || userData.familyId || userData.onboardingCompleted)
            }

            s.setUser(fu, finalClaims)
          } catch (e) {
            console.error('[Auth] Erro ao buscar Claims/Firestore:', e)
            s.clearUser()
          }
        })
      } catch (err) {
        console.warn('[Firebase] Configuração inválida detectada. Ativando Modo Preview de segurança.')
        enterPreviewMode()
      }
    }

    void init()
    return () => unsub?.()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useAuthActions() {
  const checkKey = () => {
    const k = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? ''
    if (k.trim().length < 10) throw new Error('Configure o Firebase no .env.local')
  }

  const signIn = async (email: string, password: string) => {
    checkKey()
    const { getFirebaseAuth } = await import('@corujinha/firebase')
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    checkKey()
    const { getFirebaseAuth } = await import('@corujinha/firebase')
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
    const auth = getFirebaseAuth()
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, { displayName })
    await user.getIdToken(true)
  }

  const signOut = async () => {
    const k = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? ''
    if (k.trim().length < 10) return
    const { getFirebaseAuth } = await import('@corujinha/firebase')
    const { signOut: fbOut } = await import('firebase/auth')
    await fbOut(getFirebaseAuth())
  }

  const resetPassword = async (email: string) => {
    checkKey()
    const { getFirebaseAuth } = await import('@corujinha/firebase')
    const { sendPasswordResetEmail } = await import('firebase/auth')
    await sendPasswordResetEmail(getFirebaseAuth(), email)
  }

  return { signIn, signUp, signOut, resetPassword }
}

export function useAuth() {
  const status = useAuthStore((s) => s.status)
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'
  const needsOnboarding = isAuthenticated && !user?.onboardingCompleted
  return { status, user, isAuthenticated, isLoading, needsOnboarding }
}
