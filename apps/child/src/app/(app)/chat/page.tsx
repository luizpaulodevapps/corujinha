'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  ArrowLeft, 
  Sparkles, 
  Loader2, 
  Shield,
  MessageCircle,
  Clock
} from 'lucide-react'
import { useChildStore } from '@/stores/use-child-store'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore'
import Link from 'next/link'
import clsx from 'clsx'

import { PageContainer } from '@/components/page-container'

export default function ChildChatPage() {
  const { profile } = useChildStore()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const childId = profile?.id
  const familyId = profile?.familyId

  useEffect(() => {
    if (!familyId || !childId) return

    const db = getFirebaseFirestore()
    const chatRef = collection(db, 'families', familyId, 'family_messages')
    const q = query(chatRef, orderBy('createdAt', 'asc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMessages(msgs)
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })

    return () => unsubscribe()
  }, [familyId, childId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !familyId || !childId || isSending) return

    setIsSending(true)
    const msg = newMessage
    setNewMessage('')

    try {
      const db = getFirebaseFirestore()
      const chatRef = collection(db, 'families', familyId, 'family_messages')
      await addDoc(chatRef, {
        text: msg,
        senderId: childId,
        senderName: profile?.name || 'Explorador',
        senderRole: 'child',
        createdAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setIsSending(false)
    }
  }

  if (!profile) {
    return (
      <PageContainer title="Chat da Família" hideHeader hideAvatar>
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="animate-spin text-emerald-600" size={48} />
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer 
      title="Chat da Família" 
      hideHeader 
      hideAvatar 
      className="flex flex-col h-[calc(100vh-140px)]" // Adjust for bottom nav if present, or fixed
    >
      {/* Header Mágico */}
      <header className="px-6 py-8 bg-emerald-950 rounded-b-[3rem] shadow-[var(--shadow-lg)] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/textures/noise.svg)' }} />
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-accent/20 blur-[40px] rounded-full" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="w-12 h-12 bg-white/10 rounded-[var(--radius-md)] flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-white italic tracking-tight leading-none mb-2">Voz do Ninho</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <p className="text-loud text-emerald-400/80 !text-[8px]">GUARDIÕES ATIVOS</p>
              </div>
            </div>
          </div>
          <div className="w-14 h-14 bg-brand-accent/10 rounded-[var(--radius-lg)] flex items-center justify-center border-2 border-brand-accent/30 text-brand-accent shadow-2xl">
            <MessageCircle size={28} />
          </div>
        </div>
      </header>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto px-6 py-10 space-y-8 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-emerald-100">
              <Sparkles size={40} className="text-emerald-200" />
            </div>
            <p className="text-poetic !text-[16px] !not-italic text-emerald-950/30">O ninho está silencioso... Que tal enviar um "Oi!"?</p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.senderRole === 'child' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={clsx(
                "p-5 rounded-[var(--radius-card)] max-w-[85%] shadow-md relative group",
                msg.senderRole === 'child' 
                  ? 'bg-emerald-950 text-white rounded-br-none border-b-4 border-emerald-900' 
                  : 'bg-white text-emerald-950 rounded-bl-none border-2 border-emerald-50'
              )}>
                {!profile || msg.senderId !== profile.id && (
                  <span className="text-loud !text-[7px] block mb-1 opacity-40">{msg.senderName.toUpperCase()}</span>
                )}
                <p className="font-bold text-[15px] leading-relaxed italic">{msg.text}</p>
                <div className={clsx(
                  "flex items-center gap-1 mt-2",
                  msg.senderRole === 'child' ? 'text-white/30' : 'text-emerald-900/20'
                )}>
                   <Clock size={10} />
                   <span className="text-loud !text-[7px]">
                    {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '...'}
                   </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input de Mensagem */}
      <div className="p-6 bg-white/80 backdrop-blur-2xl border-t border-emerald-50 sticky bottom-0 z-50">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Diga algo especial..." 
              className="w-full bg-emerald-50/50 border-2 border-emerald-100 rounded-[var(--radius-xl)] px-8 py-5 outline-none font-bold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:shadow-lg transition-all placeholder:text-emerald-900/20" 
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
              <Sparkles size={20} className="text-emerald-600" />
            </div>
          </div>
          <button 
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="bg-emerald-950 text-white w-20 h-20 rounded-[var(--radius-lg)] flex items-center justify-center shadow-[0_8px_0_0_#064e3b] active:translate-y-2 active:shadow-none transition-all disabled:opacity-50 disabled:grayscale hover:bg-emerald-900 shrink-0"
          >
            {isSending ? <Loader2 className="animate-spin" size={32} /> : <Send size={32} />}
          </button>
        </form>
      </div>
    </PageContainer>
  )
}
