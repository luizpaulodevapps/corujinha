'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  User,
  ArrowRight, 
  ShieldCheck,
  Chrome,
  Loader2,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { getFirebaseAuth } from '@corujinha/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const auth = getFirebaseAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Atualiza o nome do perfil do usuário
      await updateProfile(userCredential.user, { displayName: name })
      
      // Envia para o onboarding para criar a família
      router.push('/onboarding')
    } catch (err: any) {
      console.error('[Register] Erro:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.')
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setIsLoading(true)
    try {
      const auth = getFirebaseAuth()
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/onboarding')
    } catch (err: any) {
      setError('Erro ao entrar com Google.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg p-6 relative overflow-hidden text-slate-900">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-100/40 rounded-full blur-[100px] animate-float-slow" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3.5rem] shadow-magic overflow-hidden relative z-10 border-4 border-card-border">
        
        {/* Left Side: Storytelling */}
        <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-brand-primary via-indigo-600 to-brand-magic text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-8">
            <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center text-4xl shadow-xl animate-glow">🦉</div>
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Sua jornada de <span className="text-brand-accent">Mentor</span> começa aqui.
            </h1>
            <p className="text-blue-100 text-xl font-medium leading-relaxed">
              Junte-se a milhares de pais que estão transformando tarefas chatas em conquistas épicas.
            </p>

            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white"><Sparkles size={20} /></div>
                <p className="font-bold text-sm">Gamificação baseada em psicologia positiva.</p>
              </div>
            </div>
          </motion.div>

          <img 
            src="/corujinha_mascot_3d_1778545748622.png" 
            alt="Mascote" 
            className="absolute -right-16 -bottom-16 w-80 h-80 opacity-20 rotate-[-15deg]" 
          />
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Criar Conta</h2>
            <p className="text-slate-400 font-bold">Já tem conta? <Link href="/login" className="text-brand-primary hover:underline">Entre no Ninho</Link></p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 font-bold text-sm">
              <AlertCircle size={20} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Como quer ser chamado?</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"><User size={20} /></div>
                <input 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu Nome de Mentor"
                  className="input-field pl-14 h-14 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">E-mail</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"><Mail size={20} /></div>
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="familia@exemplo.com"
                  className="input-field pl-14 h-14 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Senha</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"><Lock size={20} /></div>
                <input 
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-14 h-14 font-bold"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-primary text-white h-16 rounded-[1.5rem] font-black text-xl shadow-magic hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>Criar Meu Ninho <ArrowRight size={24} /></>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-300">Ou use sua conta</span></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full h-14 rounded-2xl border-2 border-slate-50 flex items-center justify-center gap-2 font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              <Chrome size={20} /> Registrar com Google
            </button>
          </form>

          <p className="mt-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">
            Ao se registrar, você aceita os termos <br/>da jornada Corujinha. 🛡️
          </p>
        </div>
      </div>
    </div>
  )
}
