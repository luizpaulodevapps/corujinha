'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Mail, ChevronRight, Loader2, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { getFirebaseAuth } from '@corujinha/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (err: any) {
      console.error(err)
      setError('Credenciais inválidas ou sem permissão de administrador.')
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0F172A', // Darker background for premium feel
      backgroundImage: `
        radial-gradient(circle at 10% 10%, rgba(45, 106, 79, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 90% 90%, rgba(82, 183, 136, 0.1) 0%, transparent 40%),
        url("https://www.transparenttextures.com/patterns/carbon-fibre.png")
      `,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ 
          width: '100%', 
          maxWidth: '460px', 
          padding: '60px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
          zIndex: 10
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.div 
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#10B981', 
              borderRadius: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white',
              margin: '0 auto 24px',
              boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
              border: '4px solid rgba(255, 255, 255, 0.1)'
            }}>
            <ShieldCheck size={40} strokeWidth={2.5} />
          </motion.div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.03em' }}>Corujinha Admin</h1>
          <p style={{ fontSize: '15px', color: '#94A3B8', marginTop: '12px', fontWeight: 500 }}>
             Central de Comando do Ecossistema
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', marginLeft: '4px' }}>E-mail Administrativo</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@corujinha.com"
                style={{ 
                  width: '100%', 
                  padding: '18px 20px 18px 56px', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  fontSize: '15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.2s'
                }} 
                onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', marginLeft: '4px' }}>Senha de Segurança</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '18px 20px 18px 56px', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  fontSize: '15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.2s'
                }} 
                onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#F87171', padding: '16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              marginTop: '12px',
              padding: '20px', 
              borderRadius: '16px', 
              border: 'none', 
              backgroundColor: '#10B981', 
              color: 'white', 
              fontWeight: 900, 
              fontSize: '16px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(16, 185, 129, 0.4)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.25)'
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                Entrar no Sistema <ChevronRight size={20} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#64748B'}>Problemas com acesso?</a>
          <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', gap: '8px', opacity: 0.3, margin: '0 auto' }}>
             <Sparkles size={14} className="text-white" />
             <span style={{ fontSize: '10px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Encrypted Dashboard v2.4</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
