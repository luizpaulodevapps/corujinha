'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
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
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight
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
import { motion, AnimatePresence } from 'framer-motion'

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
    <AdminShell noPadding>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Ticket List Navigation */}
        <div className="w-[400px] border-r border-slate-100 bg-white flex flex-col shadow-xl z-10">
          <header className="p-8 border-b border-slate-50 space-y-6">
             <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Atendimento</h1>
                <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                   {tickets.filter(t => t.status === 'open').length} Abertos
                </div>
             </div>
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Pesquisar família..." 
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all" 
                />
             </div>
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
             {isLoading ? (
               <div className="flex flex-col gap-4 p-6">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="h-24 bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
                 ))}
               </div>
             ) : tickets.length === 0 ? (
               <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                    <MessageSquare size={32} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Nenhuma solicitação<br/>ativa no momento.</p>
               </div>
             ) : tickets.map((ticket) => (
                <button 
                  key={ticket.id} 
                  onClick={() => setSelectedTicket(ticket)}
                  className={`w-full text-left p-6 border-b border-slate-50 transition-all relative group
                    ${selectedTicket?.id === ticket.id ? 'bg-slate-50 border-l-4 border-l-brand-primary' : 'bg-white hover:bg-slate-50/50 border-l-4 border-l-transparent'}`}
                >
                   <div className="flex justify-between items-start mb-2">
                      <span className="font-black text-slate-900 text-sm tracking-tight">{ticket.userName}</span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                        {ticket.updatedAt ? new Date(ticket.updatedAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                   </div>
                   <p className={`text-xs truncate ${ticket.status === 'open' ? 'font-black text-slate-700' : 'font-bold text-slate-400'}`}>
                      {ticket.lastMessage || 'Solicitação iniciada'}
                   </p>
                   <div className="flex gap-2 mt-4">
                      <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border
                        ${ticket.status === 'open' 
                          ? 'bg-rose-50 text-rose-500 border-rose-100' 
                          : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                         {ticket.status === 'open' ? 'Pendente' : 'Respondido'}
                      </div>
                   </div>
                </button>
             ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="flex-1 flex flex-col bg-slate-50/50">
           {selectedTicket ? (
             <>
               <header className="p-6 md:p-8 bg-white border-b border-slate-100 flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary border border-brand-primary/10">
                        <User size={28} />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-slate-900 italic tracking-tight">{selectedTicket.userName}</h2>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span className="flex items-center gap-1.5 text-emerald-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Online
                           </span>
                           <span className="w-1 h-1 rounded-full bg-slate-200" />
                           <span className="text-slate-300">ID: {selectedTicket.id.substring(0, 8)}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-all">
                        <CheckCircle2 size={16} strokeWidth={3} /> Resolver
                     </button>
                     <button className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={24} />
                     </button>
                  </div>
               </header>

               <div 
                 ref={scrollRef}
                 className="flex-1 p-8 md:p-12 overflow-y-auto space-y-8 scroll-smooth"
               >
                  <div className="flex justify-center mb-12">
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] bg-white px-6 py-2.5 rounded-full border border-slate-100 shadow-sm">
                        Sessão iniciada • {selectedTicket.createdAt ? new Date(selectedTicket.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : ''}
                     </span>
                  </div>

                  <AnimatePresence>
                    {messages.map((msg, idx) => {
                      const isAdmin = msg.senderRole === 'admin'
                      return (
                        <motion.div 
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                        >
                           <div className={`max-w-[70%] group relative
                             ${isAdmin ? 'text-right' : 'text-left'}`}>
                              
                              {!isAdmin && (
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{selectedTicket.userName}</p>
                              )}

                              <div className={`p-6 rounded-[2rem] shadow-xl shadow-slate-200/20 border
                                ${isAdmin 
                                  ? 'bg-brand-primary text-white border-brand-primary/10 rounded-tr-none' 
                                  : 'bg-white text-slate-900 border-slate-100 rounded-tl-none'}`}>
                                 <p className="text-sm font-bold leading-relaxed">{msg.content}</p>
                                 <div className={`mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter opacity-40
                                   ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                    <Clock size={10} />
                                    {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
               </div>

               <footer className="p-8 bg-white border-t border-slate-100">
                  <form onSubmit={sendMessage} className="flex gap-4 items-center max-w-6xl mx-auto">
                     <button type="button" className="w-14 h-14 flex items-center justify-center text-slate-300 hover:text-brand-primary transition-colors">
                        <Paperclip size={24} />
                     </button>
                     <div className="flex-1 relative group">
                        <input 
                          type="text" 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Digite sua resposta mágica aqui..." 
                          className="w-full pl-8 pr-16 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-900 outline-none focus:bg-white focus:ring-8 focus:ring-brand-primary/5 transition-all" 
                        />
                        <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-amber-500 transition-colors">
                           <Smile size={24} />
                        </button>
                     </div>
                     <button 
                       type="submit" 
                       className="w-16 h-16 bg-brand-primary text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all group"
                     >
                        <Send size={24} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </button>
                  </form>
               </footer>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-10"
                >
                  <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-brand-primary mx-auto shadow-2xl shadow-slate-200/50 border border-slate-100">
                     <MessageSquare size={56} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter">Centro de Relacionamento</h2>
                    <p className="max-w-md mx-auto text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">Selecione uma família na lista ao lado para iniciar um atendimento humanizado.</p>
                  </div>
                  
                  <div className="flex justify-center gap-16 pt-8 border-t border-slate-200/50">
                     <div className="space-y-1">
                        <p className="text-3xl font-black text-slate-900 tracking-tighter italic">12min</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tempo Médio</p>
                     </div>
                     <div className="w-px h-12 bg-slate-200" />
                     <div className="space-y-1">
                        <p className="text-3xl font-black text-emerald-500 tracking-tighter italic">98%</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Satisfação</p>
                     </div>
                  </div>
                </motion.div>
             </div>
           )}
        </div>
      </div>
    </AdminShell>
  )
}
