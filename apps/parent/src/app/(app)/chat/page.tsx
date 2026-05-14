'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Image as ImageIcon, 
  Smile, 
  MoreVertical, 
  ShieldCheck, 
  Trophy, 
  Coins,
  ArrowLeft,
  Sparkles,
  Search,
  PlusCircle,
  Paperclip
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Mock Data ──────────────────────────────────────────────────────────────
const mockUser = {
  id: 'parent-1',
  name: 'Ana (Mãe)',
  role: 'parent',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
}

const mockMessages = [
  {
    id: '1',
    senderId: 'parent-2',
    senderName: 'Carlos (Pai)',
    senderRole: 'parent',
    content: 'Olá! O Luca já arrumou a cama hoje?',
    type: 'text',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    senderId: 'parent-1',
    senderName: 'Ana (Mãe)',
    senderRole: 'parent',
    content: 'Ainda não, vou lembrá-lo agora mesmo.',
    type: 'text',
    createdAt: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: '3',
    senderId: 'system',
    senderName: 'Corujinha',
    senderRole: 'system',
    content: 'Luca completou a missão: Escovar os Dentes! ✨',
    type: 'system',
    metadata: {
      actionType: 'milestone',
      referenceType: 'task'
    },
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '4',
    senderId: 'parent-2',
    senderName: 'Carlos (Pai)',
    senderRole: 'parent',
    content: 'Excelente! Vou liberar a recompensa dele.',
    type: 'text',
    createdAt: new Date(Date.now() - 600000).toISOString(),
  }
]

export default function FamilyChatPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [inputValue, setInputValue] = useState('')
  const [mounted, setMounted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    const newMessage = {
      id: Date.now().toString(),
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderRole: mockUser.role,
      content: inputValue,
      type: 'text',
      createdAt: new Date().toISOString(),
    }
    
    setMessages([...messages, newMessage])
    setInputValue('')
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-[#F8FAF5] dark:bg-[#081C15]">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <header className="px-6 py-4 bg-white/80 dark:bg-[#132A13]/80 backdrop-blur-xl border-b border-[#E9F5EB] dark:border-[#1B4332] flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-[#F0F7F2] dark:hover:bg-white/5 rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#2D6A4F] dark:text-[#52B788]" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#2D6A4F] rounded-full flex items-center justify-center border-2 border-white dark:border-[#1B4332] shadow-sm">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#132A13] rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#081C15] dark:text-[#F8FAF5] leading-tight">Chat da Família</h1>
              <p className="text-xs font-semibold text-[#2D6A4F] dark:text-[#52B788] uppercase tracking-wider">Guardiões Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#F0F7F2] dark:hover:bg-white/5 rounded-xl transition-colors">
            <Search className="w-5 h-5 text-[#2D6A4F]" />
          </button>
          <button className="p-2 hover:bg-[#F0F7F2] dark:hover:bg-white/5 rounded-xl transition-colors">
            <MoreVertical className="w-5 h-5 text-[#2D6A4F]" />
          </button>
        </div>
      </header>

      {/* ─── Messages List ─────────────────────────────────────────────────── */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
        style={{ backgroundImage: 'radial-gradient(#2D6A4F10 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isMe = msg.senderId === mockUser.id
            const isSystem = msg.senderId === 'system'

            if (isSystem) {
              return (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <div className="bg-[#E9F5EB] dark:bg-[#1B4332] px-4 py-2 rounded-2xl flex items-center gap-2 border border-[#B7E4C7] dark:border-[#2D6A4F]">
                    <Sparkles className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                    <p className="text-sm font-bold text-[#2D6A4F] dark:text-[#52B788]">{msg.content}</p>
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: isMe ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-[#1B4332] flex-shrink-0 mt-auto">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.senderName}`} alt={msg.senderName} />
                    </div>
                  )}
                  <div className={`space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    {!isMe && (
                      <span className="text-[10px] font-black text-[#2D6A4F] dark:text-[#52B788] uppercase tracking-widest ml-1">{msg.senderName}</span>
                    )}
                    <div className={`
                      px-4 py-3 rounded-3xl text-sm font-semibold shadow-sm leading-relaxed
                      ${isMe 
                        ? 'bg-[#2D6A4F] text-white rounded-br-lg' 
                        : 'bg-white dark:bg-[#132A13] text-[#081C15] dark:text-[#F8FAF5] border border-[#E9F5EB] dark:border-[#1B4332] rounded-bl-lg'}
                    `}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] font-bold text-[#748E83] dark:text-[#52B788]/50 uppercase mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </main>

      {/* ─── Input Area ─────────────────────────────────────────────────────── */}
      <footer className="p-6 bg-white dark:bg-[#132A13] border-t border-[#E9F5EB] dark:border-[#1B4332]">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-[#F8FAF5] dark:bg-[#081C15] p-2 rounded-[2rem] border-2 border-[#E9F5EB] dark:border-[#1B4332] focus-within:border-[#2D6A4F] transition-all group">
          <button className="p-3 text-[#2D6A4F] hover:bg-[#E9F5EB] dark:hover:bg-white/5 rounded-full transition-colors">
            <PlusCircle className="w-6 h-6" />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escreva uma mensagem mágica..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-[#081C15] dark:text-[#F8FAF5] placeholder:text-[#748E83] dark:placeholder:text-[#52B788]/30"
          />
          <div className="flex items-center gap-1">
            <button className="p-3 text-[#748E83] hover:text-[#2D6A4F] transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`
                p-3 rounded-full transition-all
                ${inputValue.trim() 
                  ? 'bg-[#2D6A4F] text-white shadow-lg shadow-[#2D6A4F]/20 scale-100' 
                  : 'bg-[#E9F5EB] dark:bg-white/5 text-[#B7E4C7] dark:text-[#2D6A4F] scale-95'}
              `}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] font-black text-[#748E83] dark:text-[#52B788]/30 uppercase tracking-[0.2em] mt-4">
          Chat Seguro & Criptografado • Corujinha 1.0
        </p>
      </footer>
    </div>
  )
}
