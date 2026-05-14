'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  MessageSquare, 
  ArrowLeft, 
  Sparkles, 
  Loader2,
  CheckCircle2,
  Phone
} from 'lucide-react'
import Link from 'next/link'
import { getFirebaseFirestore, getFirebaseAuth } from '@corujinha/firebase'
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  where,
  limit,
  doc,
  updateDoc
} from 'firebase/firestore'

export default function ParentSupportPage() {
  const [ticket, setTicket] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const auth = getFirebaseAuth()
  const db = getFirebaseFirestore()
  const user = auth.currentUser

  // 1. Find or Create Ticket
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'supportTickets'), 
      where('userId', '==', user.uid),
      where('status', 'in', ['open', 'replied']),
      limit(1)
    )

    const unsub = onSnapshot(q, (snapshot) => {
      const firstDoc = snapshot.docs[0]
      if (firstDoc) {
        setTicket({ id: firstDoc.id, ...firstDoc.data() })
      } else {
        setTicket(null)
      }
      setIsLoading(false)
    })

    return unsub
  }, [user, db])

  // 2. Fetch Messages
  useEffect(() => {
    if (!ticket) return
    const q = query(
      collection(db, `supportTickets/${ticket.id}/messages`), 
      orderBy('createdAt', 'asc')
    )
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [ticket, db])

  // 3. Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const startNewTicket = async () => {
    if (!user) return
    setIsLoading(true)
    const docRef = await addDoc(collection(db, 'supportTickets'), {
      userId: user.uid,
      userName: user.displayName || 'Guardião',
      status: 'open',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: ''
    })
    setTicket({ id: docRef.id })
    setIsLoading(false)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !ticket || !user) return

    const msg = newMessage
    setNewMessage('')

    await addDoc(collection(db, `supportTickets/${ticket.id}/messages`), {
      content: msg,
      senderId: user.uid,
      senderRole: 'parent',
      senderName: user.displayName || 'Guardião',
      createdAt: serverTimestamp()
    })
    
    // Trigger update on ticket for admin
    await updateDoc(doc(db, 'supportTickets', ticket.id), {
      lastMessage: msg,
      updatedAt: serverTimestamp(),
      status: 'open'
    })
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAF9' }}>
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAF9', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '24px', backgroundColor: 'white', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/dashboard" style={{ color: '#64748B' }}><ArrowLeft size={24} /></Link>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '18px', fontWeight: 900, color: '#1A4332', margin: 0 }}>Suporte Corujinha</h1>
          <p style={{ fontSize: '12px', color: '#10B981', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            Especialistas online
          </p>
        </div>
        <button style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAF9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
           <Phone size={20} />
        </button>
      </header>

      {/* Chat Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!ticket ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ width: '120px', height: '120px', backgroundColor: '#E9F5EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}
            >
              <MessageSquare size={56} color="#1A4332" />
            </motion.div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1A4332', marginBottom: '16px' }}>Como podemos ajudar?</h2>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6, marginBottom: '32px', maxWidth: '300px' }}>
              Nossa equipe de especialistas está pronta para tirar suas dúvidas e ajudar com a jornada mágica.
            </p>
            <button 
              onClick={startNewTicket}
              style={{ padding: '16px 32px', borderRadius: '16px', border: 'none', backgroundColor: '#1A4332', color: 'white', fontWeight: 800, fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(26, 67, 50, 0.2)' }}
            >
              Iniciar Chat Agora
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div 
              ref={scrollRef}
              style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Welcome Message */}
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>Início da Conversa</span>
              </div>

              {messages.map((msg) => {
                const isParent = msg.senderRole === 'parent'
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: isParent ? 'flex-end' : 'flex-start' }}>
                    <div style={{ 
                      maxWidth: '85%', 
                      padding: '16px', 
                      borderRadius: isParent ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      backgroundColor: isParent ? '#1A4332' : 'white',
                      color: isParent ? 'white' : '#1A4332',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      position: 'relative'
                    }}>
                      <p style={{ fontSize: '14px', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{msg.content}</p>
                      <span style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px', display: 'block', textAlign: isParent ? 'right' : 'left' }}>
                         {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Input Box */}
            <footer style={{ padding: '20px 24px', backgroundColor: 'white', borderTop: '1px solid #E2E8F0' }}>
              <form onSubmit={sendMessage} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escreva sua mensagem..." 
                  style={{ flex: 1, padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '14px', backgroundColor: '#F8FAF9' }} 
                />
                <button 
                  type="submit" 
                  style={{ width: '52px', height: '52px', borderRadius: '16px', border: 'none', backgroundColor: '#1A4332', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 15px rgba(26, 67, 50, 0.2)' }}
                >
                  <Send size={24} />
                </button>
              </form>
            </footer>
          </div>
        )}
      </main>
    </div>
  )
}
