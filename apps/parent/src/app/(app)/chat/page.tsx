'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  MessageCircle, 
  Search, 
  MoreVertical, 
  Plus, 
  Smile, 
  Shield,
  Loader2,
  Clock,
  CheckCheck,
  ChevronLeft,
  Users,
  Paperclip,
  Star,
  Settings as SettingsIcon,
  Circle,
  Zap
} from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  where,
  limit
} from 'firebase/firestore'
import { dashboardService } from '@/services/dashboard.service'
import { useQuery } from '@tanstack/react-query'

type ChatType = 'family' | 'child'

interface ChatItem {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  lastMessageTime?: string
  unreadCount: number
  type: ChatType
  status?: 'online' | 'offline'
}

export default function FamilyChatPage() {
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Fetch Children for Chat List
  const { data: children = [] } = useQuery<any[]>({
    queryKey: ['children', familyId],
    queryFn: () => dashboardService.getChildren(familyId!),
    enabled: !!familyId
  })

  const chatList: ChatItem[] = [
    {
      id: 'family-group',
      name: 'Chat da Família',
      unreadCount: 2,
      type: 'family',
      lastMessage: 'Luca: Terminei a missão! 🚀',
      lastMessageTime: '15:30',
      status: 'online'
    },
    ...children.map(child => ({
      id: child.id,
      name: child.displayName,
      avatar: child.avatar,
      unreadCount: 0,
      type: 'child' as ChatType,
      lastMessage: 'Conversa privada com ' + child.displayName,
      lastMessageTime: 'Hoje',
      status: 'online' as const
    }))
  ]

  // Default selection
  useEffect(() => {
    if (!selectedChat && chatList.length > 0) {
      setSelectedChat(chatList[0] || null)
    }
  }, [children])

  // Real-time Message Listener
  useEffect(() => {
    if (!familyId || !selectedChat) return

    const db = getFirebaseFirestore()
    let chatRef;
    
    if (selectedChat.type === 'family') {
      chatRef = collection(db, 'families', familyId, 'family_messages')
    } else {
      chatRef = collection(db, 'families', familyId, 'children', selectedChat.id, 'messages')
    }
    
    const q = query(chatRef, orderBy('createdAt', 'asc'), limit(50))

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
  }, [familyId, selectedChat?.id])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !familyId || !selectedChat || isSending) return

    setIsSending(true)
    const msg = newMessage
    setNewMessage('')

    try {
      const db = getFirebaseFirestore()
      let chatRef;
      if (selectedChat.type === 'family') {
        chatRef = collection(db, 'families', familyId, 'family_messages')
      } else {
        chatRef = collection(db, 'families', familyId, 'children', selectedChat.id, 'messages')
      }

      await addDoc(chatRef, {
        text: msg,
        senderId: user?.uid,
        senderName: user?.displayName || 'Guardião',
        senderRole: 'parent',
        senderPhoto: user?.photoURL,
        createdAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setIsSending(false)
    }
  }

  if (!user) return null

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-bg-main overflow-hidden rounded-[3.5rem] border-8 border-card-border shadow-2xl relative">
      
      {/* Sidebar de Chats */}
      <aside className={`
        ${showSidebar ? 'w-full lg:w-[400px]' : 'hidden lg:flex lg:w-20'}
        bg-[#FDFCF8] dark:bg-card-bg/40 backdrop-blur-xl border-r-8 border-card-border flex flex-col transition-all duration-500 ease-in-out z-20
      `}>
        {/* Sidebar Header */}
        <div className="p-8 border-b-4 border-card-border flex items-center justify-between">
          {showSidebar ? (
            <>
              <h2 className="text-3xl font-black text-brand-primary italic tracking-tight">Conversas</h2>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                  <Plus size={20} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary lg:hidden" onClick={() => setShowSidebar(false)}>
                  <ChevronLeft size={20} />
                </button>
              </div>
            </>
          ) : (
             <button className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto" onClick={() => setShowSidebar(true)}>
               <MessageCircle size={20} className="text-brand-primary" />
             </button>
          )}
        </div>

        {/* Search */}
        {showSidebar && (
          <div className="p-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/30 group-focus-within:text-brand-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Procurar no ninho..." 
                className="w-full pl-12 pr-4 py-4 bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary rounded-2xl outline-none font-bold text-brand-primary transition-all shadow-inner"
              />
            </div>
          </div>
        )}

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar py-4">
          {chatList.map((chat) => {
            const isActive = selectedChat?.id === chat.id
            return (
              <button 
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat)
                  if (window.innerWidth < 1024) setShowSidebar(false)
                }}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-[2rem] transition-all relative group
                  ${isActive ? 'bg-brand-primary text-white shadow-xl scale-[1.02]' : 'hover:bg-brand-primary/5 text-brand-primary'}
                `}
              >
                <div className="relative">
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border-4 shadow-sm
                    ${isActive ? 'bg-white border-white/20' : 'bg-brand-primary/10 border-card-border'}
                  `}>
                    {chat.type === 'family' ? <Shield size={24} /> : (chat.avatar || '🦊')}
                  </div>
                  {chat.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-card-bg" />
                  )}
                </div>

                {showSidebar && (
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-black truncate ${isActive ? 'text-white' : 'text-brand-primary'}`}>{chat.name}</span>
                      <span className={`text-[10px] font-black uppercase ${isActive ? 'text-white/50' : 'text-brand-secondary/40'}`}>{chat.lastMessageTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className={`text-xs font-medium truncate ${isActive ? 'text-white/70' : 'text-brand-secondary/60'}`}>{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className={`
                          w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black
                          ${isActive ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white'}
                        `}>
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {isActive && (
                  <motion.div layoutId="active-pill" className="absolute left-2 w-1.5 h-8 bg-white rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* User Footer */}
        <div className="p-6 border-t-4 border-card-border">
           <div className={`flex items-center gap-4 ${showSidebar ? 'justify-start' : 'justify-center'}`}>
              <div className="w-12 h-12 rounded-2xl bg-brand-primary overflow-hidden border-2 border-brand-primary shadow-sm">
                {user.photoURL && <img src={user.photoURL} className="w-full h-full object-cover" />}
              </div>
              {showSidebar && (
                <div className="flex-1 min-w-0">
                  <p className="font-black text-brand-primary text-sm truncate">{user.displayName}</p>
                  <p className="text-[10px] font-bold text-brand-secondary/40 uppercase">Guardião Principal</p>
                </div>
              )}
              {showSidebar && <SettingsIcon size={20} className="text-brand-primary/30 hover:text-brand-primary transition-colors cursor-pointer" />}
           </div>
        </div>
      </aside>

      {/* Área do Chat */}
      <main className="flex-1 flex flex-col bg-[#F1F5E9] dark:bg-[#081C15] relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />

        {selectedChat ? (
          <>
            {/* Chat Header */}
            <header className="px-10 py-6 bg-white/80 dark:bg-card-bg/80 backdrop-blur-xl border-b-8 border-card-border flex items-center justify-between relative z-10 shadow-sm">
              <div className="flex items-center gap-5">
                <button className="lg:hidden w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary" onClick={() => setShowSidebar(true)}>
                  <ChevronLeft size={20} />
                </button>
                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center border-4 border-brand-primary/20 text-2xl shadow-inner">
                  {selectedChat.type === 'family' ? <Shield size={28} className="text-brand-primary" /> : (selectedChat.avatar || '🦊')}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-brand-primary italic tracking-tight leading-none mb-1">{selectedChat.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Ativo no Ninho</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center -space-x-4 mr-6">
                  {children.slice(0, 3).map((c, i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-white border-4 border-card-border flex items-center justify-center text-lg shadow-sm">
                      {c.avatar || '🐰'}
                    </div>
                  ))}
                  {children.length > 3 && (
                    <div className="w-10 h-10 rounded-xl bg-brand-primary text-white border-4 border-card-border flex items-center justify-center text-[10px] font-black shadow-sm">
                      +{children.length - 3}
                    </div>
                  )}
                </div>
                <button className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                  <Star size={20} />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar relative z-10">
               {messages.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full opacity-20">
                    <div className="w-32 h-32 bg-brand-primary/10 rounded-[3rem] flex items-center justify-center mb-6">
                      <MessageCircle size={64} />
                    </div>
                    <p className="font-black text-2xl italic tracking-tighter">Prepare sua magia...</p>
                 </div>
               ) : (
                 messages.map((msg, idx) => {
                  const isMe = msg.senderId === user.uid
                  const isSystem = msg.senderRole === 'system'
                  const prevMsg = messages[idx - 1]
                  const showAvatar = !isSystem && (!prevMsg || prevMsg.senderId !== msg.senderId)

                  if (isSystem) {
                    return (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={msg.id}
                        className="flex justify-center my-4"
                      >
                        <div className="px-6 py-2 bg-brand-primary/10 backdrop-blur-md rounded-full border-2 border-brand-primary/20 flex items-center gap-3 shadow-sm">
                          <Zap size={14} className="text-brand-primary animate-pulse" />
                          <p className="text-[11px] font-black text-brand-primary italic tracking-tight">{msg.text}</p>
                        </div>
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={msg.id} 
                      className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {!isMe && showAvatar && (
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-card-bg border-2 border-card-border overflow-hidden shadow-sm flex-shrink-0 flex items-center justify-center text-xl">
                          {msg.senderPhoto ? (
                            <img src={msg.senderPhoto} className="w-full h-full object-cover" />
                          ) : '🦉'}
                        </div>
                      )}
                      {!showAvatar && !isMe && !isSystem && <div className="w-10" />}

                      <div className={`max-w-[75%]`}>
                        {showAvatar && (
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 block px-2 ${isMe ? 'text-right text-brand-primary/30' : 'text-brand-primary/30'}`}>
                            {msg.senderName} {isMe && '(Pai)'}
                          </span>
                        )}
                        <div className={`p-5 rounded-[2.5rem] shadow-xl relative border-4 ${
                          isMe 
                            ? 'bg-brand-primary text-white rounded-br-none border-brand-primary/20 shadow-brand-primary/10' 
                            : 'bg-card-bg text-brand-primary rounded-bl-none border-card-border'
                        }`}>
                          <p className="font-bold text-sm leading-relaxed">{msg.text}</p>
                          <div className={`flex items-center gap-2 mt-2 ${isMe ? 'text-white/50 justify-end' : 'text-brand-secondary/40'}`}>
                            <span className="text-[9px] font-black uppercase tracking-tighter">
                              {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '...'}
                            </span>
                            {isMe && <CheckCheck size={12} className="text-emerald-300" />}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                 })
               )}
               <div ref={scrollRef} />
            </div>

            {/* Chat Input */}
            <footer className="p-10 bg-white/60 dark:bg-card-bg/60 backdrop-blur-2xl border-t-8 border-card-border relative z-10">
              <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto flex items-center gap-5">
                <button type="button" className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                  <Paperclip size={24} />
                </button>
                
                <div className="flex-1 relative flex items-center">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escreva uma mensagem mágica..." 
                    className="w-full bg-white dark:bg-card-bg/80 border-4 border-card-border rounded-[2.5rem] px-10 py-5 outline-none font-bold text-brand-primary focus:border-brand-primary transition-all shadow-inner" 
                  />
                  <button type="button" className="absolute right-6 text-brand-primary/20 hover:text-brand-primary transition-colors">
                    <Smile size={24} />
                  </button>
                </div>

                <button 
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="bg-brand-primary text-white w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-[0_10px_0_0_#1B4332] hover:translate-y-1 hover:shadow-[0_5px_0_0_#1B4332] active:translate-y-4 active:shadow-none transition-all disabled:opacity-50 disabled:grayscale group"
                >
                  {isSending ? <Loader2 className="animate-spin" size={32} /> : <Send size={32} />}
                </button>
              </form>
            </footer >
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="w-40 h-40 bg-brand-primary/5 rounded-[4rem] flex items-center justify-center mb-8 border-8 border-dashed border-brand-primary/10 animate-sway">
                <MessageCircle size={80} className="text-brand-primary/20" />
             </div>
             <h2 className="text-3xl font-black text-brand-primary italic">Selecione uma conversa</h2>
             <p className="text-brand-secondary/60 font-bold">Inicie a magia com sua família</p>
          </div>
        )}
      </main>
    </div>
  )
}
