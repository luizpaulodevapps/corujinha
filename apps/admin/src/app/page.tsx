'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, Sparkles, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { getFirebaseAuth } from '@corujinha/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Chrome } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email.trim(), password)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('[Admin Login] Erro:', err)
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('E-mail ou senha incorretos.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Por favor, digite um e-mail válido.')
      } else {
        setError('Acesso negado ou erro de conexão.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const auth = getFirebaseAuth()
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('[Admin Google Login] Erro:', err)
      setError('Falha na autenticação com Google.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0a1a12]">
      {/* ─── Background Image Layer ────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/login-bg.png" 
          alt="Enchanted Forest Background" 
          fill 
          className="object-cover opacity-60 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a12]/80 via-transparent to-[#0a1a12]/90" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* ─── Background Orbs & Effects ─────────────────────────────────── */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-accent/20 rounded-full blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[460px] z-10"
      >
        <div className="bg-white/[0.03] backdrop-blur-[40px] p-10 md:p-14 rounded-[4rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="text-center mb-12 relative z-10">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-gradient-to-br from-brand-accent to-emerald-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-[0_20px_40px_rgba(82,183,136,0.4)] border-2 border-white/20"
            >
              <ShieldCheck size={40} strokeWidth={2.5} />
            </motion.div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter m-0 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Corujinha Admin
            </h1>
            <p className="text-brand-accent/80 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
              Mesa de Comando Épica
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-200 font-bold text-xs text-center justify-center backdrop-blur-md"
            >
              <Sparkles size={14} className="text-red-400" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Portal de Acesso</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-accent transition-all"><Mail size={18} /></div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@corujinha.com"
                  className="w-full h-16 pl-16 pr-6 bg-white/[0.05] border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/20 outline-none focus:border-brand-accent/50 focus:bg-white/[0.08] transition-all text-sm shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Chave de Segurança</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-accent transition-all"><Lock size={18} /></div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-16 pl-16 pr-6 bg-white/[0.05] border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/20 outline-none focus:border-brand-accent/50 focus:bg-white/[0.08] transition-all text-sm shadow-inner"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 bg-gradient-to-r from-brand-accent to-emerald-500 text-white font-black text-[13px] uppercase tracking-widest rounded-2xl shadow-[0_8px_20px_rgba(82,183,136,0.3)] hover:shadow-[0_12px_25px_rgba(82,183,136,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>Manifestar Painel <ArrowRight size={20} strokeWidth={3} /></>
              )}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest"><span className="bg-[#0c1c14] px-4 text-white/20">Fluxo Místico</span></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-14 rounded-2xl border border-white/10 flex items-center justify-center gap-4 font-black text-white/80 hover:bg-white/5 transition-all disabled:opacity-50 text-[10px] uppercase tracking-widest bg-white/[0.02]"
            >
              <Chrome size={18} className="text-brand-accent" /> Entrar com Google
            </button>
          </form>

          <div className="mt-10 text-center">
            <Link href="/register" className="text-white/30 text-[9px] font-black uppercase tracking-widest hover:text-brand-accent transition-colors">
              Solicitar Acesso Administrativo
            </Link>
          </div>
        </div>

        {/* Footer Brand */}
        <div className="mt-10 text-center opacity-40 flex flex-col items-center gap-3">
           <Image src="/owl_mascot.png" alt="Corujinha" width={32} height={32} className="grayscale brightness-200 invert opacity-50" />
           <div className="flex flex-col items-center gap-1">
             <p className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Encrypted Environment</p>
             <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
           </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  )
}
