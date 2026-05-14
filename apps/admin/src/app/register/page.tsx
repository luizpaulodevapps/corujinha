'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Lock, Mail, User, Briefcase, ArrowRight, Loader2, Sparkles, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { getFirebaseAuth } from '@corujinha/firebase'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Chrome } from 'lucide-react'

import { useAdminData } from '@/hooks/use-admin-data'

export default function RegisterPage() {
  const { systemSettings, isLoading: isSettingsLoading } = useAdminData()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const allowNewAdmins = systemSettings?.allowNewAdmins ?? true

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!allowNewAdmins) {
      setError('O registro de novos administradores está temporariamente desativado pelo sistema.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const auth = getFirebaseAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password)
      
      await updateProfile(userCredential.user, { 
        displayName: `${name} | ${role}` 
      })
      
      router.push('/')
    } catch (err: any) {
      console.error('[Admin Register] Erro:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail administrativo já está em uso.')
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.')
      } else if (err.code === 'auth/invalid-email') {
        setError('E-mail em formato inválido.')
      } else {
        setError('Erro ao solicitar acesso. Verifique as credenciais.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    if (!allowNewAdmins) {
      setError('O registro via Google está desativado.')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const auth = getFirebaseAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      
      if (userCredential.user.displayName === null) {
        await updateProfile(userCredential.user, { 
          displayName: userCredential.user.email?.split('@')[0] || 'Novo Admin'
        })
      }
      
      router.push('/')
    } catch (err: any) {
      console.error('[Admin Google Register] Erro:', err)
      setError('Falha ao registrar com Google.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSettingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-primary">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-primary p-6 relative overflow-hidden">
      {/* ─── Background Orbs ────────────────────────────────────────────── */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-400/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ─── Back to Login ──────────────────────────────────────────────── */}
      <Link href="/login" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/50 font-black uppercase tracking-widest text-[10px] hover:text-brand-accent transition-all group">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar para o Login
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[520px] z-10"
      >
        <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
          {/* Admin Seal Decoration */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl" />
          
          <div className="text-center mb-10 relative z-10">
            <motion.div 
              whileHover={{ rotate: -5, scale: 1.05 }}
              className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand-accent mx-auto mb-6 border-2 border-white/10"
            >
              <Sparkles size={32} />
            </motion.div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter m-0">
              Solicitar Acesso
            </h1>
            <p className="text-brand-accent/60 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
              Recrutamento de Gestores
            </p>
          </div>

          {!allowNewAdmins && (
            <div className="mb-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-[2rem] text-center space-y-3">
               <ShieldCheck className="mx-auto text-amber-500" size={32} />
               <p className="text-xs font-black text-amber-200 uppercase tracking-widest leading-relaxed">
                  O registro de novos administradores <br/> está bloqueado pelo administrador master.
               </p>
            </div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 font-bold text-xs text-center justify-center"
            >
              <ShieldCheck size={14} className="animate-pulse" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className={`space-y-5 relative z-10 ${!allowNewAdmins ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Nome Completo</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-accent transition-colors"><User size={18} /></div>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu Nome"
                    className="w-full h-14 pl-12 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-bold placeholder:text-white/10 outline-none focus:border-brand-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Cargo / Função</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-accent transition-colors"><Briefcase size={18} /></div>
                  <input 
                    type="text" 
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Gestor"
                    className="w-full h-14 pl-12 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-bold placeholder:text-white/10 outline-none focus:border-brand-accent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">E-mail Corporativo</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-accent transition-colors"><Mail size={18} /></div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@corujinha.com"
                  className="w-full h-14 pl-12 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-bold placeholder:text-white/10 outline-none focus:border-brand-accent transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Senha de Acesso</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-accent transition-colors"><Lock size={18} /></div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-bold placeholder:text-white/10 outline-none focus:border-brand-accent transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-18 bg-white/10 text-brand-accent border-2 border-brand-accent/20 font-black text-xl rounded-[1.5rem] hover:bg-brand-accent hover:text-brand-primary transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>Solicitar Registro <ArrowRight size={22} strokeWidth={3} /></>
              )}
            </button>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-brand-primary px-4 text-white/20">Registro Rápido</span></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full h-16 rounded-2xl border border-white/10 flex items-center justify-center gap-4 font-black text-white hover:bg-white/5 transition-all disabled:opacity-50"
            >
              <Chrome size={20} className="text-brand-accent" /> Registrar com Google
            </button>
          </form>

          <p className="mt-10 text-center text-[9px] font-black text-white/20 uppercase tracking-[0.2em] leading-relaxed">
             Todas as solicitações passam por <br/> auditoria de segurança. 🛡️
          </p>
        </div>

        {/* Footer Brand */}
        <div className="mt-8 text-center opacity-10 flex flex-col items-center gap-2">
           <Image src="/owl_mascot.png" alt="Corujinha" width={32} height={32} className="grayscale brightness-0 invert" />
           <p className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Guardian Protocol v2.4</p>
        </div>
      </motion.div>
    </div>
  )
}
