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

export default function ChildChatPage() {
  const { profile } = useChildStore()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // O childId é o ID do perfil logado. 
  // No ecossistema Corujinha, o childId está no profile.id
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
      // Auto scroll
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
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg pb-32 flex flex-col">
      {/* Header Mágico */}
      <header className="p-6 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white italic tracking-tight">Chat da Família</h1>
            <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-1">
              <Shield size={10} /> Guardiões Online
            </p>
          </div>
        </div>
        <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center border-2 border-brand-primary/30">
          <MessageCircle size={24} className="text-brand-primary" />
        </div>
      </header>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('/forest_pattern.png')] bg-[length:300px] bg-fixed bg-opacity-5">
        {messages.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={40} className="text-white/20" />
            </div>
            <p className="text-white/40 font-bold italic">Nenhuma mensagem ainda... Envie um "Oi!"</p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.senderRole === 'child' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-5 rounded-[2.5rem] max-w-[85%] shadow-xl relative ${
                msg.senderRole === 'child' 
                  ? 'bg-brand-primary text-white rounded-br-none border-b-4 border-emerald-700' 
                  : 'bg-white/10 backdrop-blur-xl text-white rounded-bl-none border border-white/20'
              }`}>
                <p className="font-bold text-sm leading-relaxed">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-2 ${msg.senderRole === 'child' ? 'text-white/50' : 'text-emerald-300/50'}`}>
                   <Clock size={10} />
                   <span className="text-[9px] font-black uppercase tracking-tighter">
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
      <div className="p-6 bg-white/5 backdrop-blur-2xl border-t border-white/10 sticky bottom-24 z-50">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Diga algo especial..." 
            className="flex-1 bg-white/10 border-2 border-white/10 rounded-[2.5rem] px-8 py-5 outline-none font-bold text-white focus:border-brand-primary transition-all placeholder:text-white/20" 
          />
          <button 
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="bg-brand-primary text-white w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-[0_8px_0_0_#1B4332] active:translate-y-2 active:shadow-none transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Send size={32} />
          </button>
        </form>
      </div>
    </div>
  )
}
