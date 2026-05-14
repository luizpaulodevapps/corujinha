'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Search, 
  MessageSquare, 
  Send, 
  User, 
  MoreVertical, 
  CheckCircle2,
  Paperclip,
  Smile,
  Loader2,
  Clock,
  ShieldCheck
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  doc,
  updateDoc
} from 'firebase/firestore'

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const db = getFirebaseFirestore()

  useEffect(() => {
    const q = query(collection(db, 'supportTickets'), orderBy('updatedAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setTickets(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
      setIsLoading(false)
    })
    return unsub
  }, [db])

  useEffect(() => {
    if (!selectedTicket) return
    const q = query(
      collection(db, `supportTickets/${selectedTicket.id}/messages`), 
      orderBy('createdAt', 'asc')
    )
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [selectedTicket, db])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedTicket) return

    const msg = newMessage
    setNewMessage('')

    await addDoc(collection(db, `supportTickets/${selectedTicket.id}/messages`), {
      content: msg,
      senderId: 'admin-1',
      senderRole: 'admin',
      senderName: 'Suporte Corujinha',
      createdAt: serverTimestamp()
    })

    await updateDoc(doc(db, 'supportTickets', selectedTicket.id), {
      lastMessage: msg,
      updatedAt: serverTimestamp(),
      status: 'replied'
    })
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', display: 'flex', overflow: 'hidden' }}>
        {/* Ticket List Navigation */}
        <div style={{ width: '400px', borderRight: '1px solid #F1F5F9', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          <header style={{ padding: '40px 24px', borderBottom: '1px solid #F1F5F9' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Atendimento</h1>
                <div style={{ padding: '6px 12px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#10B981', fontSize: '12px', fontWeight: 800 }}>
                   {tickets.filter(t => t.status === 'open').length} Abertos
                </div>
             </div>
             <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
                <input 
                  type="text" 
                  placeholder="Pesquisar por família ou ID..." 
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px 12px 48px', 
                    borderRadius: '12px', 
                    border: '1px solid #E2E8F0', 
                    fontSize: '14px', 
                    backgroundColor: '#F8FAFC',
                    fontWeight: 500,
                    outline: 'none'
                  }} 
                />
             </div>
          </header>

          <div style={{ flex: 1, overflowY: 'auto' }}>
             {isLoading ? (
               <div style={{ padding: '60px', textAlign: 'center' }}><Loader2 className="animate-spin" color="#1E4636" size={32} /></div>
             ) : tickets.length === 0 ? (
               <div style={{ padding: '60px 40px', textAlign: 'center', color: '#94A3B8' }}>
                  <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                  <p style={{ fontWeight: 600 }}>Nenhuma solicitação ativa no momento.</p>
               </div>
             ) : tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  onClick={() => setSelectedTicket(ticket)}
                  style={{ 
                    padding: '24px', 
                    borderBottom: '1px solid #F1F5F9', 
                    cursor: 'pointer',
                    backgroundColor: selectedTicket?.id === ticket.id ? '#F8FAFC' : 'transparent',
                    borderLeft: selectedTicket?.id === ticket.id ? '4px solid #1E4636' : '4px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>{ticket.userName}</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>
                        {ticket.updatedAt ? new Date(ticket.updatedAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                   </div>
                   <p style={{ 
                     fontSize: '13px', 
                     color: ticket.status === 'open' ? '#0F172A' : '#64748B', 
                     margin: 0, 
                     overflow: 'hidden', 
                     textOverflow: 'ellipsis', 
                     whiteSpace: 'nowrap', 
                     fontWeight: ticket.status === 'open' ? 700 : 500 
                   }}>
                      {ticket.lastMessage || 'Solicitação iniciada'}
                   </p>
                   <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <div style={{ 
                        padding: '2px 8px', 
                        borderRadius: '6px', 
                        backgroundColor: ticket.status === 'open' ? '#FEF2F2' : '#F1F5F9', 
                        color: ticket.status === 'open' ? '#EF4444' : '#64748B', 
                        fontSize: '10px', 
                        fontWeight: 900,
                        textTransform: 'uppercase'
                      }}>
                         {ticket.status === 'open' ? 'Aguardando Resposta' : 'Respondido'}
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Conversation View */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
           {selectedTicket ? (
             <>
               <header style={{ padding: '24px 40px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E4636' }}>
                        <User size={28} />
                     </div>
                     <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 2px' }}>{selectedTicket.userName}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                           <span style={{ color: '#10B981' }}>● Online</span>
                           <span>•</span>
                           <span>ID: {selectedTicket.id.substring(0, 8).toUpperCase()}</span>
                        </div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                     <button style={{ 
                       padding: '12px 24px', 
                       borderRadius: '12px', 
                       border: '1px solid #E2E8F0', 
                       backgroundColor: 'white', 
                       fontSize: '14px', 
                       fontWeight: 800, 
                       color: '#475569',
                       cursor: 'pointer', 
                       display: 'flex', 
                       alignItems: 'center', 
                       gap: '10px' 
                     }}>
                        <CheckCircle2 size={18} strokeWidth={2.5} /> Resolver Chamado
                     </button>
                     <button style={{ border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer', padding: '8px' }}>
                        <MoreVertical size={24} />
                     </button>
                  </div>
               </header>

               <div 
                 ref={scrollRef}
                 style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#F8FAFC' }}
               >
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                     <span style={{ fontSize: '11px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: 'white', padding: '6px 16px', borderRadius: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                        Início do Atendimento • {selectedTicket.createdAt ? new Date(selectedTicket.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : ''}
                     </span>
                  </div>

                  {messages.map((msg) => {
                    const isAdmin = msg.senderRole === 'admin'
                    return (
                      <div key={msg.id} style={{ display: 'flex', justifyContent: isAdmin ? 'flex-end' : 'flex-start' }}>
                         <div style={{ 
                           maxWidth: '65%', 
                           padding: '20px', 
                           borderRadius: isAdmin ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                           backgroundColor: isAdmin ? '#1E4636' : 'white',
                           color: isAdmin ? 'white' : '#0F172A',
                           boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                           position: 'relative',
                           border: isAdmin ? 'none' : '1px solid #F1F5F9'
                         }}>
                            <p style={{ fontSize: '15px', margin: 0, fontWeight: 500, lineHeight: 1.6 }}>{msg.content}</p>
                            <div style={{ 
                              fontSize: '11px', 
                              opacity: 0.6, 
                              marginTop: '8px', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: isAdmin ? 'flex-end' : 'flex-start',
                              gap: '4px',
                              fontWeight: 700
                            }}>
                               <Clock size={12} />
                               {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}
                            </div>
                         </div>
                      </div>
                    )
                  })}
               </div>

               <footer style={{ padding: '32px 40px', backgroundColor: 'white', borderTop: '1px solid #F1F5F9' }}>
                  <form onSubmit={sendMessage} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                     <button type="button" style={{ border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer' }}><Paperclip size={26} /></button>
                     <div style={{ flex: 1, position: 'relative' }}>
                        <input 
                          type="text" 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Digite sua resposta mágica aqui..." 
                          style={{ 
                            width: '100%', 
                            padding: '18px 56px 18px 24px', 
                            borderRadius: '18px', 
                            border: '1px solid #E2E8F0', 
                            fontSize: '15px', 
                            backgroundColor: '#F8FAFC',
                            fontWeight: 500,
                            outline: 'none',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.02) inset'
                          }} 
                        />
                        <button type="button" style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                           <Smile size={24} />
                        </button>
                     </div>
                     <button 
                       type="submit" 
                       style={{ 
                         width: '64px', 
                         height: '64px', 
                         borderRadius: '18px', 
                         border: 'none', 
                         backgroundColor: '#1E4636', 
                         color: 'white', 
                         display: 'flex', 
                         alignItems: 'center', 
                         justifyContent: 'center', 
                         cursor: 'pointer', 
                         boxShadow: '0 8px 16px rgba(30, 70, 54, 0.2)',
                         transition: 'transform 0.2s'
                       }}
                       onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                       onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                     >
                        <Send size={28} strokeWidth={2.5} />
                     </button>
                  </form>
               </footer>
             </>
           ) : (
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748B', textAlign: 'center', padding: '40px', backgroundColor: '#F8FAFC' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '32px', 
                  backgroundColor: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#1E4636', 
                  marginBottom: '32px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
                }}>
                   <MessageSquare size={48} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Centro de Relacionamento</h2>
                <p style={{ maxWidth: '400px', fontSize: '16px', marginTop: '16px', fontWeight: 500, lineHeight: 1.6 }}>Selecione uma família na lista ao lado para iniciar um atendimento humanizado e resolver dúvidas.</p>
                <div style={{ marginTop: '40px', display: 'flex', gap: '32px' }}>
                   <div style={{ textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>12min</p>
                      <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Tempo Médio</p>
                   </div>
                   <div style={{ width: '1px', height: '40px', backgroundColor: '#E2E8F0' }} />
                   <div style={{ textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#10B981' }}>98%</p>
                      <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Satisfação</p>
                   </div>
                </div>
             </div>
           )}
        </div>
      </main>
    </div>
  )
}
