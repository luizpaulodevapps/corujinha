import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { getFunctions, type Functions } from 'firebase/functions'
import { getMessaging, type Messaging, isSupported } from 'firebase/messaging'

// ─── Config ───────────────────────────────────────────────────────────────────

function getEnv(key: string, publicValue?: string): string {
  // 1. Prioridade para o valor estático (importante para Next.js Client-side)
  if (publicValue) return publicValue

  // 2. Fallback para process.env (importante para Server-side/Node)
  if (typeof process !== 'undefined' && process.env) {
    return (process.env as any)[key] || (process.env as any)[`NEXT_PUBLIC_${key}`] || ''
  }

  return ''
}

export function getFirebaseConfig() {
  const config = {
    apiKey:            getEnv('FIREBASE_API_KEY', process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain:        getEnv('FIREBASE_AUTH_DOMAIN', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId:         getEnv('FIREBASE_PROJECT_ID', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket:     getEnv('FIREBASE_STORAGE_BUCKET', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID', process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
    appId:             getEnv('FIREBASE_APP_ID', process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  }

  if (!config.apiKey) {
    console.warn(
      '[Firebase] Configuração incompleta detected.\n' +
      'Verifique se as variáveis de ambiente estão configuradas corretamente.'
    )
  }

  return config
}

// ─── Singleton Initialization ─────────────────────────────────────────────────

let _app: FirebaseApp | null = null

export function getFirebaseApp(): FirebaseApp {
  if (_app) return _app

  const config = getFirebaseConfig()
  
  if (!config.apiKey) {
    const msg = '[Firebase] API Key não encontrada. Verifique seu arquivo .env.local.'
    console.error(msg, {
      hasApiKey: !!config.apiKey,
      projectId: config.projectId,
      env: typeof process !== 'undefined' ? process.env.NODE_ENV : 'unknown'
    })
    throw new Error(msg)
  }

  try {
    _app = getApps().length > 0 ? getApp() : initializeApp(config)
    return _app
  } catch (error) {
    console.error('[Firebase] Failed to initialize Firebase App:', error)
    throw error
  }
}

// ─── Service Getters ──────────────────────────────────────────────────────────

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp())
}

export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseApp())
}

export function getFirebaseStorage(): FirebaseStorage {
  return getStorage(getFirebaseApp())
}

export function getFirebaseFunctions(region = 'southamerica-east1'): Functions {
  return getFunctions(getFirebaseApp(), region)
}

export async function getFirebaseMessaging(): Promise<Messaging | null> {
  if (typeof window === 'undefined') return null
  const supported = await isSupported()
  if (!supported) return null
  return getMessaging(getFirebaseApp())
}
