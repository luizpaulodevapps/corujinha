'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, Sparkles, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { getFirebaseAuth } from '@corujinha/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

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
      router.push('/')
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-primary p-6 relative overflow-hidden">
      {/* ─── Background Orbs ────────────────────────────────────────────── */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-400/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ─── Back to Landing ────────────────────────────────────────────── */}
      <Link href="https://corujinha.vercel.app" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/50 font-black uppercase tracking-widest text-[10px] hover:text-brand-accent transition-all group">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar para o Portal
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
          {/* Admin Seal Decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl" />
          
          <div className="text-center mb-12 relative z-10">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-20 h-20 bg-brand-accent rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-6 shadow-[0_15px_30px_rgba(82,183,136,0.3)] border-4 border-white/10"
            >
              <ShieldCheck size={40} strokeWidth={2.5} />
            </motion.div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter m-0">
              Corujinha Admin
            </h1>
            <p className="text-brand-accent/60 text-xs font-black uppercase tracking-[0.2em] mt-3">
              Centro de Comando
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 font-bold text-xs text-center justify-center"
            >
              <Sparkles size={14} className="animate-pulse" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Credencial</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-accent transition-colors"><Mail size={20} /></div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@corujinha.com"
                  className="w-full h-16 pl-14 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/10 outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Chave de Segurança</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-accent transition-colors"><Lock size={20} /></div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-16 pl-14 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/10 outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-18 bg-brand-accent text-brand-primary font-black text-xl rounded-[1.5rem] shadow-[0_8px_0_0_#2d6a4f] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>Acessar Painel <ArrowRight size={22} strokeWidth={3} /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <Link href="/register" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
              Solicitar Acesso Administrativo
            </Link>
          </div>
        </div>

        {/* Footer Brand */}
        <div className="mt-8 text-center opacity-20 flex flex-col items-center gap-2">
           <Image src="/owl_mascot.png" alt="Corujinha" width={40} height={40} className="grayscale brightness-0 invert" />
           <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Encrypted Environment v2.4</p>
        </div>
      </motion.div>
    </div>
  )
}

