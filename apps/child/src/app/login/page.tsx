'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  QrCode, 
  Grid3X3, 
  ArrowLeft, 
  Sparkles, 
  Camera,
  ChevronRight,
  Loader2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ChildLoginPage() {
  const [method, setMethod] = useState<'select' | 'qr' | 'pin'>('select')
  const [pin, setPin] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePinInput = (val: string, index: number) => {
    if (val.length > 1) return
    const newPin = [...pin]
    newPin[index] = val
    setPin(newPin)
    
    // Auto focus next or submit
    if (val && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`)
      nextInput?.focus()
    } else if (val && index === 3) {
      handleLogin()
    }
  }

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate auth logic
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A4332', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Elements */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(82,183,136,0.2) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(82,183,136,0.1) 0%, transparent 70%)' }} />

      <AnimatePresence mode="wait">
        {method === 'select' && (
          <motion.div 
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: '100%', maxWidth: '400px', textAlign: 'center', zIndex: 1 }}
          >
            <div style={{ width: '120px', height: '120px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
               <Sparkles size={64} color="#52B788" />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '12px' }}>Olá, Explorador!</h1>
            <p style={{ color: '#95D5B2', fontSize: '18px', marginBottom: '48px' }}>Como você quer entrar hoje?</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               <button 
                 onClick={() => setMethod('qr')}
                 style={{ 
                   width: '100%', 
                   padding: '24px', 
                   borderRadius: '24px', 
                   backgroundColor: 'white', 
                   color: '#1A4332', 
                   border: 'none', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '20px', 
                   cursor: 'pointer',
                   boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                 }}
               >
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#E9F5EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A4332' }}>
                     <QrCode size={32} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                     <p style={{ margin: 0, fontWeight: 900, fontSize: '18px' }}>Usar QR Code</p>
                     <p style={{ margin: 0, fontSize: '14px', opacity: 0.6 }}>Aponte para o app do papai ou mamãe</p>
                  </div>
                  <ChevronRight style={{ marginLeft: 'auto', opacity: 0.3 }} />
               </button>

               <button 
                 onClick={() => setMethod('pin')}
                 style={{ 
                   width: '100%', 
                   padding: '24px', 
                   borderRadius: '24px', 
                   backgroundColor: 'rgba(255,255,255,0.1)', 
                   color: 'white', 
                   border: '2px solid rgba(255,255,255,0.1)', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '20px', 
                   cursor: 'pointer' 
                 }}
               >
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Grid3X3 size={32} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                     <p style={{ margin: 0, fontWeight: 900, fontSize: '18px' }}>Usar PIN</p>
                     <p style={{ margin: 0, fontSize: '14px', opacity: 0.6 }}>Digite seus 4 números mágicos</p>
                  </div>
                  <ChevronRight style={{ marginLeft: 'auto', opacity: 0.3 }} />
               </button>
            </div>
          </motion.div>
        )}

        {method === 'qr' && (
          <motion.div 
            key="qr"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
          >
             <button onClick={() => setMethod('select')} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '32px' }}>
                <ArrowLeft size={20} /> Voltar
             </button>
             <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '32px' }}>Scan Mágico</h2>
             <div style={{ width: '280px', height: '280px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '32px', margin: '0 auto 32px', border: '4px dashed #52B788', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Camera size={64} opacity={0.2} />
                <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '4px solid #52B788', borderLeft: '4px solid #52B788', borderRadius: '8px 0 0 0' }} />
                <div style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderTop: '4px solid #52B788', borderRight: '4px solid #52B788', borderRadius: '0 8px 0 0' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '40px', height: '40px', borderBottom: '4px solid #52B788', borderLeft: '4px solid #52B788', borderRadius: '0 0 0 8px' }} />
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '4px solid #52B788', borderRight: '4px solid #52B788', borderRadius: '0 0 8px 0' }} />
             </div>
             <p style={{ color: '#95D5B2', fontSize: '16px' }}>Peça para um adulto mostrar o QR Code da sua conta no celular dele.</p>
          </motion.div>
        )}

        {method === 'pin' && (
          <motion.div 
            key="pin"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
          >
             <button onClick={() => setMethod('select')} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '32px' }}>
                <ArrowLeft size={20} /> Voltar
             </button>
             <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px' }}>Números Mágicos</h2>
             <p style={{ color: '#95D5B2', fontSize: '16px', marginBottom: '48px' }}>Digite seu PIN de 4 dígitos</p>
             
             <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
                {pin.map((digit, i) => (
                  <input 
                    key={i}
                    id={`pin-${i}`}
                    type="number"
                    value={digit}
                    onChange={(e) => handlePinInput(e.target.value, i)}
                    style={{ 
                      width: '64px', 
                      height: '80px', 
                      borderRadius: '20px', 
                      border: 'none', 
                      backgroundColor: 'white', 
                      color: '#1A4332', 
                      fontSize: '32px', 
                      fontWeight: 900, 
                      textAlign: 'center',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }}
                  />
                ))}
             </div>

             {isLoading && (
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#52B788', fontWeight: 700 }}>
                  <Loader2 className="animate-spin" /> Validando magia...
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <div style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.5 }}>
         <p style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Universo Corujinha</p>
      </div>
    </div>
  )
}
