'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  QrCode, 
  Grid3X3, 
  ArrowLeft, 
  Sparkles, 
  Camera,
  ChevronRight,
  Loader2,
  User,
  ScanFace
} from 'lucide-react'
import { useRouter} from 'next/navigation'
import { useChildStore } from '@/stores/use-child-store'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'

type LoginMethod = 'select' | 'qr' | 'pin' | 'credentials' | 'face'

export default function ChildLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A14] flex items-center justify-center"><Loader2 className="animate-spin text-brand-primary" size={48} /></div>}>
      <LoginPageContent />
    </Suspense>
  )
}

function LoginPageContent() {
  const [method, setMethod] = useState<LoginMethod>('select')
  const [pin, setPin] = useState(['', '', '', ''])
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setProfile } = useChildStore()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const t = searchParams.get('t')
    const f = searchParams.get('f')
    
    if (t && f) {
      handleLogin(undefined, undefined, f, t)
    }
  }, [searchParams])

  const handleLogin = async (u?: string, p?: string, f?: string, t?: string) => {
    setIsLoading(true)
    const targetUsername = u || username
    const targetPin = p || pin.join('')
    
    try {
      const db = getFirebaseFirestore()
      
      if (t && f) {
        // Login via Magic Token (Secure)
        const childrenRef = collection(db, 'families', f, 'children')
        const q = query(childrenRef, where('loginToken', '==', t))
        const snapshot = await getDocs(q)
          
        if (!snapshot.empty) {
          const childDoc = snapshot.docs[0]
          if (childDoc) {
            setProfile({ id: childDoc.id, familyId: f, ...childDoc.data() } as any)
            router.push('/dashboard')
            return
          }
        }
      } else if (f) {
        // Manual Login with PIN
        const childrenRef = collection(db, 'families', f, 'children')
        const q = query(childrenRef, where('username', '==', targetUsername))
        const snapshot = await getDocs(q)
        
        if (!snapshot.empty) {
          const childDoc = snapshot.docs[0]
          if (childDoc) {
            const childData = childDoc.data()
            
            if (childData.pinCode === targetPin) {
              setProfile({ id: childDoc.id, familyId: f, ...childData } as any)
              router.push('/dashboard')
              return
            }
          }
        }
      } else {
        alert('Por favor, use o QR Code do Papai ou Mamãe!')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Opa! A magia falhou. Verifique seus dados.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePinInput = (val: string, index: number) => {
    if (val.length > 1) return
    const newPin = [...pin]
    newPin[index] = val
    setPin(newPin)
    
    if (val && index < 3) {
      document.getElementById(`pin-${index + 1}`)?.focus()
    } else if (val && index === 3) {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Immersivo */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/login-bg.png")' }}
      >
        <div className="absolute inset-0 bg-[#0A1A14]/60 backdrop-blur-[2px]" />
      </div>

      {/* Partículas / Efeito de Brilho */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse delay-700" />

      <AnimatePresence mode="wait">
        {method === 'select' && (
          <motion.div 
            key="select"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 w-full max-w-md text-center"
          >
            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
               <Sparkles size={48} className="text-brand-primary animate-bounce" />
            </div>
            
            <h1 className="text-4xl font-black text-white mb-3 italic tracking-tighter">Portal Corujinha</h1>
            <p className="text-emerald-200/60 font-bold mb-12 uppercase tracking-[0.2em] text-xs">A jornada começa aqui</p>

            <div className="grid grid-cols-1 gap-4">
               {/* QR Code Button */}
               <button 
                 onClick={() => setMethod('qr')}
                 className="group relative flex items-center gap-4 p-5 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/20 transition-all duration-300"
               >
                  <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                     <QrCode size={28} />
                  </div>
                  <div className="text-left">
                     <p className="text-white font-black text-lg italic leading-tight">Escanear Magia</p>
                     <p className="text-emerald-300/50 text-[10px] font-bold uppercase tracking-wider">Usar o QR Code do Papai/Mamãe</p>
                  </div>
                  <ChevronRight className="ml-auto text-white/30" size={20} />
               </button>

               <div className="grid grid-cols-2 gap-4">
                  {/* PIN Button */}
                  <button 
                    onClick={() => setMethod('pin')}
                    className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl hover:bg-white/10 transition-all"
                  >
                     <Grid3X3 size={24} className="text-emerald-400" />
                     <span className="text-white font-black text-[10px] uppercase tracking-widest">Usar PIN</span>
                  </button>

                  {/* Username Button */}
                  <button 
                    onClick={() => setMethod('credentials')}
                    className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl hover:bg-white/10 transition-all"
                  >
                     <User size={24} className="text-blue-400" />
                     <span className="text-white font-black text-[10px] uppercase tracking-widest">Usuário</span>
                  </button>
               </div>

               {/* Facial Placeholder */}
               <button 
                 onClick={() => setMethod('face')}
                 className="flex items-center justify-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/20 rounded-2xl group overflow-hidden relative"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <ScanFace size={18} className="text-emerald-400" />
                  <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Login por Rosto (Em breve)</span>
               </button>
            </div>
          </motion.div>
        )}

        {method === 'qr' && (
          <motion.div 
            key="qr"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-sm text-center"
          >
             <button onClick={() => setMethod('select')} className="mb-8 text-emerald-300/50 hover:text-white flex items-center gap-2 mx-auto uppercase font-black text-[10px] tracking-widest">
                <ArrowLeft size={16} /> Voltar
             </button>
             
             <h2 className="text-3xl font-black text-white mb-8 italic tracking-tighter">Scan Mágico</h2>
             
             <div className="relative w-72 h-72 mx-auto mb-8 p-1 bg-gradient-to-br from-emerald-400/50 to-blue-500/50 rounded-[3rem]">
                <div className="w-full h-full bg-black/40 backdrop-blur-xl rounded-[2.8rem] flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 border-2 border-emerald-400/30 border-dashed animate-[spin_20s_linear_infinite]" />
                   <Camera size={64} className="text-white/10" />
                   
                   {/* Scanner Line */}
                   <motion.div 
                     animate={{ top: ['10%', '90%'] }}
                     transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                     className="absolute left-[10%] right-[10%] h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10" 
                   />
                </div>
             </div>
             <p className="text-emerald-200/60 font-bold text-sm px-8">Mostre o QR Code do Portal do Guardião para a câmera.</p>
          </motion.div>
        )}

        {method === 'pin' && (
          <motion.div 
            key="pin"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="relative z-10 w-full max-w-sm text-center"
          >
             <button onClick={() => setMethod('select')} className="mb-8 text-emerald-300/50 hover:text-white flex items-center gap-2 mx-auto uppercase font-black text-[10px] tracking-widest">
                <ArrowLeft size={16} /> Voltar
             </button>
             
             <h2 className="text-3xl font-black text-white mb-2 italic tracking-tighter">Números Mágicos</h2>
             <p className="text-emerald-200/60 font-bold mb-12 uppercase tracking-widest text-[10px]">Digite seu segredo</p>
             
             <div className="flex justify-center gap-4 mb-12">
                {pin.map((digit, i) => (
                  <input 
                    key={i}
                    id={`pin-${i}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinInput(e.target.value, i)}
                    className="w-16 h-20 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-center text-white text-4xl font-black focus:border-brand-primary outline-none transition-all"
                  />
                ))}
             </div>

             {isLoading && (
               <div className="flex items-center justify-center gap-3 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                  <Loader2 className="animate-spin" size={16} /> Validando Magia...
               </div>
             )}
          </motion.div>
        )}

        {method === 'credentials' && (
          <motion.div 
            key="credentials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-sm text-center"
          >
             <button onClick={() => setMethod('select')} className="mb-8 text-emerald-300/50 hover:text-white flex items-center gap-2 mx-auto uppercase font-black text-[10px] tracking-widest">
                <ArrowLeft size={16} /> Voltar
             </button>
             
             <h2 className="text-3xl font-black text-white mb-2 italic tracking-tighter">Identidade Secreta</h2>
             <p className="text-emerald-200/60 font-bold mb-12 uppercase tracking-widest text-[10px]">Nome de usuário ou telefone</p>
             
             <div className="space-y-4 mb-8">
                <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-primary transition-colors">
                      <User size={20} />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Qual o seu nome?"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className="w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl text-white font-bold outline-none focus:border-brand-primary transition-all placeholder:text-white/20"
                   />
                </div>
                
                <button 
                  onClick={() => handleLogin()}
                  disabled={!username || isLoading}
                  className="w-full py-5 bg-brand-primary text-white font-black rounded-3xl shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                   {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'ENTRAR NA AVENTURA'}
                </button>
             </div>
          </motion.div>
        )}

        {method === 'face' && (
          <motion.div 
            key="face"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-sm text-center"
          >
             <button onClick={() => setMethod('select')} className="mb-8 text-emerald-300/50 hover:text-white flex items-center gap-2 mx-auto uppercase font-black text-[10px] tracking-widest">
                <ArrowLeft size={16} /> Voltar
             </button>
             
             <div className="w-48 h-48 mx-auto mb-8 bg-brand-primary/10 rounded-full flex items-center justify-center border-2 border-brand-primary/20 relative">
                <ScanFace size={80} className="text-brand-primary animate-pulse" />
                <div className="absolute inset-0 border-4 border-brand-primary rounded-full animate-ping opacity-20" />
             </div>

             <h2 className="text-2xl font-black text-white mb-2 italic tracking-tighter">Visão de Coruja</h2>
             <p className="text-emerald-200/60 font-bold mb-8 text-sm">Este recurso está sendo preparado pelo Grande Guardião!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-0 right-0 text-center z-10 opacity-30">
         <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Desenvolvido para Heróis</p>
      </div>
    </div>
  )
}
