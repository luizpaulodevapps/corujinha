import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User as FirebaseUser } from 'firebase/auth'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  familyId: string | null
  onboardingCompleted: boolean
  providerId: string | null
  previewChildren?: any[] | undefined
  plan?: string
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  status: AuthStatus
  user: AuthUser | null
  // Actions
  setLoading: () => void
  setUser: (firebaseUser: FirebaseUser, claims: Record<string, unknown>, previewChildren?: any[]) => void
  clearUser: () => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      status: 'loading',
      user: null,

      setLoading: () => set({ status: 'loading' }, false, 'auth/setLoading'),

      setUser: (firebaseUser, claims, previewChildren) =>
        set(
          {
            status: 'authenticated',
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              familyId: (claims['familyId'] as string | null) ?? null,
              onboardingCompleted: Boolean(claims['onboardingCompleted'] || claims['familyId'] || previewChildren),
              providerId: firebaseUser.providerData?.[0]?.providerId ?? null,
              previewChildren,
              plan: (claims['plan'] as string | null) ?? 'free'
            },
          },
          false,
          'auth/setUser'
        ),

      clearUser: () =>
        set({ status: 'unauthenticated', user: null }, false, 'auth/clearUser'),
    }),
    { name: 'AuthStore' }
  )
)

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectIsAuthenticated = (s: AuthState) => s.status === 'authenticated'
export const selectIsLoading = (s: AuthState) => s.status === 'loading'
export const selectUser = (s: AuthState) => s.user
export const selectFamilyId = (s: AuthState) => s.user?.familyId ?? null
export const selectNeedsOnboarding = (s: AuthState) =>
  s.status === 'authenticated' && !s.user?.onboardingCompleted
