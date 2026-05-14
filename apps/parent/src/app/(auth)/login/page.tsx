'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck,
  Chrome,
  Loader2,
  AlertCircle,
  Leaf,
  Sparkles,
  ChevronLeft
} from 'lucide-react'
import { getFirebaseAuth } from '@corujinha/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuth } from '@/hooks/use-auth'
import { useHydrated } from '@/hooks/use-hydrated'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const hydrated = useHydrated()

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [hydrated, isAuthenticated, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('[Login] Erro:', err)
      if (err.code === 'auth/invalid-credential') {
        setError('E-mail ou senha incorretos.')
      } else if (err.code === 'auth/invalid-api-key') {
        setError('Configuração do servidor pendente. Ativando Modo Preview...')
        setTimeout(() => router.push('/dashboard'), 2000)
      } else {
        setError('Ocorreu um erro ao entrar. Tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const auth = getFirebaseAuth()
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (err: any) {
      setError('Erro ao entrar com Google.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-6 relative overflow-hidden selection:bg-brand-accent selection:text-brand-primary">
      
      {/* ─── Nature Background Elements ────────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[120px] animate-float [animation-delay:2s]" />
        
        {/* Animated Leaves falling */}
        <div className="absolute inset-0">
          {hydrated && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * 100 + '%', rotate: 0, opacity: 0 }}
              animate={{ 
                y: '110vh', 
                x: (Math.random() * 100 - 10) + '%', 
                rotate: 360,
                opacity: [0, 0.4, 0.4, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 8, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5 
              }}
              className="absolute text-brand-secondary/20"
            >
              <Leaf size={Math.random() * 20 + 20} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Back to Landing ─────────────────────────────────────────────── */}
      <Link href="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all bg-card-bg/55 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-brand-primary/10">
        <ChevronLeft size={18} /> Voltar para a Floresta
      </Link>

      {/* ─── Main Login Container ────────────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden relative z-10 border-8 border-card-border group"
      >
        
        {/* Left Side: Enchanted Welcome */}
        <div className="hidden lg:flex flex-col justify-center p-20 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-success text-white relative overflow-hidden">
          {/* Animated Mesh */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#F9D42333_0%,transparent_50%)]" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#52B78833_0%,transparent_50%)]" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 space-y-8"
          >
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-brand-accent/30 rounded-full blur-2xl group-hover:bg-brand-accent/50 transition-all animate-pulse" />
              <div className="relative w-24 h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                <Image src="/owl_mascot.png" alt="Corujinha" width={96} height={96} className="object-contain animate-sway" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl font-black leading-[0.9] tracking-tight italic">
                Bem-vindo de <br/>volta ao <span className="text-brand-accent">Ninho.</span>
              </h1>
              <p className="text-brand-secondary/80 text-xl font-bold leading-relaxed max-w-sm">
                Sua família está esperando por mais uma jornada incrível hoje.
              </p>
            </div>

            <div className="pt-10">
              <div className="flex items-center gap-4 font-black text-sm bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border-2 border-card-border/10 shadow-2xl">
                <div className="w-12 h-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center text-brand-accent">
                  <ShieldCheck size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-accent uppercase tracking-widest text-[10px]">Proteção Ativa</span>
                  <span>Ambiente seguro para sua família</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Sparkles */}
          <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 right-20 text-brand-accent/20">
            <Sparkles size={120} />
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10 md:p-20 flex flex-col justify-center bg-white relative">
          <div className="mb-12 text-center lg:text-left space-y-2">
            <h2 className="text-4xl font-black text-brand-primary tracking-tight">Entrar</h2>
            <p className="text-text-muted font-bold text-lg">
              Novo por aqui? <Link href="/onboarding" className="text-brand-warm hover:underline decoration-brand-warm/30 underline-offset-4">Recrute sua família</Link>
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-5 bg-brand-danger/5 border-4 border-brand-danger/10 rounded-[2rem] flex items-center gap-4 text-brand-danger font-black text-sm shadow-xl"
            >
              <div className="w-10 h-10 bg-brand-danger/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} />
              </div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] ml-6">E-mail de Guardião</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-secondary/30 group-focus-within:text-brand-primary transition-colors"><Mail size={22} /></div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@familia.com"
                  className="input-field pl-16 h-18 text-lg font-bold !rounded-[2rem]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-6">
                <label className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em]">Senha Secreta</label>
                <button type="button" className="text-[10px] font-black text-brand-warm uppercase tracking-widest hover:underline">Esqueci</button>
              </div>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-secondary/30 group-focus-within:text-brand-primary transition-colors"><Lock size={22} /></div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-16 h-18 text-lg font-bold !rounded-[2rem]"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full btn-primary h-18 !rounded-[2rem] text-xl gap-4 shadow-[0_10px_0_0_#1B4332] !bg-brand-primary group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  {isLoading ? <Loader2 className="animate-spin" /> : (
                    <>Iniciar Missão <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></>
                  )}
                </span>
              </button>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t-4 border-brand-primary/5"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-6 text-brand-secondary/30">Acesso Rápido</span></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-18 rounded-[2rem] border-4 border-brand-primary/10 flex items-center justify-center gap-4 font-black text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary/20 transition-all disabled:opacity-50 text-lg shadow-sm"
            >
              <Chrome size={24} className="text-brand-warm" /> Entrar com Google
            </button>
          </form>

          <p className="mt-14 text-center text-[10px] font-black text-brand-secondary/30 uppercase tracking-[0.2em] leading-relaxed">
            Ao entrar, você concorda em manter o ninho <br/>seguro e cheio de propósito. ✨
          </p>
        </div>

      </motion.div>
    </div>
  )
}
