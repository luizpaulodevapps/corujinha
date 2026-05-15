'use client'

import { use, useState, useEffect, useRef } from 'react'
import {
  ArrowLeft,
  Trophy,
  Coins,
  Zap,
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Shield,
  Sparkles,
  TrendingUp,
  Target,
  QrCode,
  Grid3X3,
  RefreshCcw,
  Heart,
  MessageCircle,
  History,
  Settings,
  Edit2,
  Check,
  X,
  Trash2,
  Lock,
  Send,
  Loader2,
  Plus
} from 'lucide-react'
import { CreateTaskModal } from '@/components/dashboard/create-task-modal'
import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { doc, updateDoc, onSnapshot, collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import { dashboardService } from '@/services/dashboard.service'
import { section } from 'framer-motion/client'

export default function ChildDossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isShowingQR, setIsShowingQR] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  // Fetch Child Data
  const { data: child, isLoading: isLoadingChild } = useQuery<any>({
    queryKey: ['child', familyId, id],
    queryFn: () => dashboardService.getChild(familyId!, id),
    enabled: !!familyId && !!id
  })

  // Fetch Child Tasks
  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery<any[]>({
    queryKey: ['child-tasks', id],
    queryFn: () => dashboardService.getChildTasks(id),
    enabled: !!id
  })

  // Generate a secure login token when opening QR
  useEffect(() => {
    if (isShowingQR && familyId && id) {
      const generateToken = async () => {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const db = getFirebaseFirestore()
        await updateDoc(doc(db, 'families', familyId, 'children', id), {
          loginToken: token,
          tokenCreatedAt: serverTimestamp()
        })
      }
      generateToken()
    }
  }, [isShowingQR, familyId, id])

  // Real-time Chat Listener
  useEffect(() => {
    if (!familyId || !id) return
    
    const db = getFirebaseFirestore()
    const chatRef = collection(db, 'families', familyId, 'children', id, 'messages')
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
  }, [familyId, id])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !familyId || !id) return
    
    const msg = newMessage
    setNewMessage('')
    
    const db = getFirebaseFirestore()
    const chatRef = collection(db, 'families', familyId, 'children', id, 'messages')
    await addDoc(chatRef, {
      text: msg,
      senderId: user?.uid,
      senderName: user?.displayName || 'Papai/Mamãe',
      senderRole: 'parent',
      createdAt: serverTimestamp()
    })
  }

  const deleteChildMutation = useMutation({
    mutationFn: async () => {
      const db = getFirebaseFirestore()
      const { deleteDoc } = await import('firebase/firestore')
      const childRef = doc(db, 'families', familyId!, 'children', id)
      await deleteDoc(childRef)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children', familyId] })
      window.location.href = '/family'
    }
  })

  const updateChildMutation = useMutation({
    mutationFn: async (data: any) => {
      const db = getFirebaseFirestore()
      const childRef = doc(db, 'families', familyId!, 'children', id)
      await updateDoc(childRef, { 
        ...data,
        updatedAt: new Date()
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['child', familyId, id] })
      setIsEditing(false)
      alert('Alterações salvas com sucesso! ✨')
    }
  })

  const isLoading = isLoadingChild || isLoadingTasks

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-bg-main">
        <div className="w-20 h-20 border-8 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
        <p className="text-brand-secondary font-black text-2xl animate-pulse">Lendo o Dossiê...</p>
      </div>
    )
  }

  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-bg-main">
        <div className="text-8xl">🦉❓</div>
        <h2 className="text-3xl font-black text-brand-primary">Explorador não encontrado</h2>
        <Link href="/dashboard" className="btn-primary px-8 py-4 !rounded-2xl bg-brand-primary text-white font-black">
          Voltar ao Ninho
        </Link>
      </div>
    )
  }

  const avatar = child.gender === 'girl' ? '🐰' : '🦊'
  const level = child.level || 1
  const xp = child.xp || 0
  const coins = child.coins || 0
  const nextLevelXp = level * 1000

  return (
    <div className="pb-20 lg:pb-12 min-h-screen bg-bg-main relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />

      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">

        {/* Navigation Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <Link href="/family" className="flex items-center gap-4 text-brand-primary font-black uppercase tracking-widest text-sm hover:gap-6 transition-all group">
            <div className="w-12 h-12 bg-white dark:bg-brand-primary/10 rounded-2xl flex items-center justify-center shadow-md border-4 border-card-border group-hover:border-brand-primary/20">
              <ArrowLeft size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-brand-secondary/60">Gestão da Família</span>
              <span>Voltar ao Ninho</span>
            </div>
          </Link>

          <nav className="flex bg-card-bg/50 backdrop-blur-2xl p-2 rounded-[2.5rem] border-4 border-card-border shadow-xl">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Geral' },
              { id: 'history', icon: History, label: 'Histórico' },
              { id: 'chat', icon: MessageCircle, label: 'Chat' },
              { id: 'settings', icon: Settings, label: 'Ajustes' },
            ].map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-[1.8rem] font-black text-sm transition-all relative ${
                    isActive 
                      ? 'bg-brand-primary text-white shadow-lg scale-105 z-10' 
                      : 'text-brand-secondary/60 hover:bg-brand-primary/5 hover:text-brand-primary'
                  }`}
                >
                  <tab.icon size={20} strokeWidth={isActive ? 3 : 2} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="tab-active"
                      className="absolute inset-0 bg-brand-primary rounded-[1.8rem] -z-10 shadow-[0_8px_0_0_#1B4332]"
                    />
                  )}
                </button>
              )
            })}
          </nav>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Side: Profile Hero & Stats */}
              <div className="lg:col-span-4 space-y-10">
                <motion.div
                  className="bg-white rounded-[4rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border-8 border-white text-center relative group"
                >
                  <div className="absolute top-8 right-8">
                    <div className="w-12 h-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center text-brand-accent animate-pulse">
                      <Shield size={24} />
                    </div>
                  </div>

                  <div className="w-48 h-48 bg-brand-primary/5 rounded-[3.5rem] flex items-center justify-center text-9xl mx-auto mb-8 border-8 border-brand-primary/10 shadow-inner group-hover:rotate-6 transition-transform duration-500">
                    {child.avatar || avatar}
                  </div>

                  <h1 className="text-5xl font-black text-brand-primary tracking-tight mb-2 italic">
                    {child.displayName}
                  </h1>
                  <p className="text-brand-secondary/40 font-black text-xl uppercase tracking-widest mb-8">
                    {child.age} Anos de Aventura
                  </p>

                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-center px-4">
                      <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Nível {level}</span>
                      <span className="text-xs font-bold text-brand-secondary/40">{xp} / {nextLevelXp} XP</span>
                    </div>
                    <div className="h-4 bg-brand-primary/5 rounded-full overflow-hidden border-2 border-brand-primary/10 p-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(xp / nextLevelXp) * 100}%` }}
                        className="h-full bg-brand-primary rounded-full shadow-[0_0_15px_rgba(45,106,79,0.4)]"
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                  <StatItem icon={<Coins className="text-amber-500" />} value={coins} label="Moedas" bgColor="bg-amber-50" />
                  <StatItem icon={<Trophy className="text-brand-warm" />} value={child.achievements?.length || 0} label="Conquistas" bgColor="bg-brand-warm/5" />
                  <StatItem icon={<Zap className="text-brand-accent" />} value={tasks.filter(t => t.status === 'approved').length} label="Missões OK" bgColor="bg-brand-accent/5" />
                  <StatItem icon={<Heart className="text-brand-danger" />} value={child.streak || 0} label="Dias Seguidos" bgColor="bg-brand-danger/5" />
                </div>
              </div>

              {/* Right Side: Quick Actions & Access */}
              <div className="lg:col-span-8 space-y-12">
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                        <Sparkles size={20} className="text-brand-primary" />
                      </div>
                      <h2 className="text-2xl font-black text-brand-primary italic">Missões Ativas</h2>
                    </div>
                    <button 
                      onClick={() => setIsTaskModalOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-primary/10 text-brand-primary rounded-2xl font-black text-sm hover:bg-brand-primary hover:text-white transition-all group"
                    >
                      <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                      Lançar Missão
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tasks.filter(t => t.status === 'todo' || t.status === 'pending_approval').length > 0 ? (
                      tasks.filter(t => t.status === 'todo' || t.status === 'pending_approval').slice(0, 4).map((task, i) => (
                        <MissionCard key={task.id} task={task} index={i} />
                      ))
                    ) : (
                      <div className="col-span-full py-16 bg-white/50 dark:bg-card-bg/50 rounded-[3rem] border-4 border-dashed border-brand-primary/10 text-center">
                        <p className="text-brand-primary/60 dark:text-text-secondary font-black text-xl italic">Nenhuma missão ativa no momento.</p>
                        <p className="text-brand-secondary/40 dark:text-text-muted font-bold text-sm mt-2">Inicie uma nova aventura acima!</p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="bg-brand-primary text-white p-10 rounded-[4rem] shadow-[0_20px_50px_rgba(26,67,50,0.3)] border-8 border-white/10 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border-4 border-white/20 shadow-inner">
                        <Grid3X3 size={28} className="text-brand-accent" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black italic">Acesso Mágico</h2>
                        <p className="text-white/60 font-bold text-sm">Dados de login do explorador</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="bg-white/5 p-8 rounded-3xl border-4 border-white/10 group/item hover:border-white/20 transition-all">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-3">Username Único</span>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black italic tracking-tight">@{child.username || child.displayName.toLowerCase().replace(' ', '_')}</span>
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/40 group-hover/item:text-brand-accent transition-colors">
                              <Target size={20} />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-3xl border-4 border-white/10 group/item hover:border-white/20 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block">Código PIN Secreto</span>
                            <span className="text-[10px] font-black text-brand-accent uppercase bg-brand-accent/10 px-2 py-0.5 rounded-lg">4-6 Dígitos</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-4xl font-black tracking-[10px]">{child.pinCode || '****'}</span>
                            <button 
                              onClick={() => {
                                const text = `Ninho Corujinha 🦉\n\nExplorador: @${child.username || child.displayName.toLowerCase().replace(' ', '_')}\nPIN: ${child.pinCode || '****'}\n\nBaixe o app e comece sua aventura!`
                                if (navigator.share) {
                                  navigator.share({ title: 'Acesso Corujinha', text })
                                } else {
                                  navigator.clipboard.writeText(text)
                                  alert('Dados de acesso copiados para a área de transferência!')
                                }
                              }}
                              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-brand-accent hover:bg-white/20 transition-all"
                            >
                              <Send size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div 
                        onClick={() => setIsShowingQR(true)}
                        className="flex flex-col items-center justify-center bg-white p-10 rounded-[3.5rem] text-brand-primary text-center shadow-2xl relative cursor-pointer group/qr hover:scale-105 transition-all"
                      >
                        <div className="w-48 h-48 bg-white rounded-[2.5rem] border-8 border-dashed border-brand-primary/10 flex items-center justify-center mb-6 group-hover/qr:rotate-3 transition-transform p-4">
                          <QRCodeSVG 
                            value={`https://corujinhasmart.vercel.app/login?t=${child.loginToken}&f=${familyId}`}
                            size={160}
                            level="H"
                            includeMargin={false}
                            fgColor="#1B4332"
                            bgColor="transparent"
                          />
                        </div>
                        <h4 className="font-black text-2xl mb-2 flex items-center gap-2">
                          Ampliar QR <RefreshCcw size={18} className="animate-spin-slow" />
                        </h4>
                        <p className="text-xs text-brand-secondary/40 font-bold max-w-[200px]">Clique para mostrar em tela cheia.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="bg-white rounded-[3rem] p-12 border-4 border-card-border shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-2xl flex items-center justify-center border-2 border-brand-secondary/20">
                    <History size={24} className="text-brand-secondary" />
                  </div>
                  <h2 className="text-3xl font-black text-brand-primary italic">Todas as Conquistas</h2>
                </div>

                <div className="space-y-8">
                  {tasks.filter(t => t.status === 'approved' || t.status === 'rejected').length > 0 ? (
                    tasks.filter(t => t.status === 'approved' || t.status === 'rejected').map((task, i) => (
                      <TimelineItem key={task.id} task={task} />
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <div className="text-6xl mb-6 opacity-30">📜</div>
                      <p className="text-brand-secondary/40 font-black text-xl italic">A jornada épica ainda não registrou marcos.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card-bg rounded-[3.5rem] border-8 border-card-border shadow-2xl overflow-hidden min-h-[500px] lg:h-[600px] flex flex-col"
            >
              <div className="p-6 bg-brand-primary/5 border-b-4 border-card-border flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border-2 border-brand-primary/10">
                  {child.avatar || (child.gender === 'girl' ? '🐰' : '🦊')}
                </div>
                <div>
                  <h3 className="font-black text-brand-primary italic">{child.displayName}</h3>
                  <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest">Conversa do Ninho</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[url('/forest_pattern.png')] bg-[length:400px] bg-fixed bg-opacity-5">
                <div className="flex justify-center">
                  <span className="bg-brand-primary/5 text-brand-primary/40 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest border-2 border-card-border backdrop-blur-sm">Início da Aventura</span>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderRole === 'parent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-5 rounded-[2rem] max-w-[80%] shadow-lg ${
                      msg.senderRole === 'parent' 
                        ? 'bg-brand-primary text-white rounded-br-none' 
                        : 'bg-white dark:bg-brand-primary/10 text-brand-primary rounded-bl-none border-4 border-card-border'
                    }`}>
                      <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                      <span className={`text-[9px] font-black mt-2 block uppercase tracking-tighter ${msg.senderRole === 'parent' ? 'text-white/50' : 'text-brand-secondary/40'}`}>
                        {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Enviando...'}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>

              <div className="p-8 border-t-8 border-card-border bg-white dark:bg-card-bg">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Envie uma mensagem mágica..." 
                    className="flex-1 bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary rounded-3xl px-8 py-5 outline-none font-black text-brand-primary transition-all shadow-inner" 
                  />
                  <button 
                    type="submit"
                    className="bg-brand-primary text-white w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-[0_8px_0_0_#1B4332] hover:translate-y-1 hover:shadow-[0_4px_0_0_#1B4332] active:translate-y-4 active:shadow-none transition-all"
                  >
                    <Send size={32} className="rotate-0 group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const data = {
                    displayName: formData.get('displayName'),
                    birthDate: formData.get('birthDate'),
                    gender: formData.get('gender'),
                    username: formData.get('username'),
                    pinCode: formData.get('pinCode'),
                  }
                  updateChildMutation.mutate(data)
                }}
                className="bg-card-bg rounded-[3rem] p-12 border-8 border-card-border shadow-2xl space-y-10 relative overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl" />
                
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border-2 border-brand-primary/20">
                    <Settings size={24} className="text-brand-primary" />
                  </div>
                  <h2 className="text-3xl font-black text-brand-primary italic">Configurações do Explorador</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-brand-secondary/60 uppercase tracking-widest ml-4">Nome de Exibição</label>
                    <input 
                      name="displayName"
                      type="text" 
                      defaultValue={child.displayName} 
                      required
                      className="w-full bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-brand-primary/10 rounded-3xl px-8 py-5 font-black text-xl text-brand-primary outline-none transition-all placeholder:text-brand-secondary/20 shadow-inner" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-brand-secondary/60 uppercase tracking-widest ml-4">Data de Nascimento</label>
                    <input 
                      name="birthDate"
                      type="date" 
                      defaultValue={child.birthDate} 
                      required
                      className="w-full bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-brand-primary/10 rounded-3xl px-8 py-5 font-black text-xl text-brand-primary outline-none transition-all shadow-inner" 
                    />
                  </div>
                  
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-xs font-black text-brand-secondary/60 uppercase tracking-widest ml-4">Gênero / Avatar Base</label>
                    <div className="flex gap-4">
                      {[
                        { id: 'boy', label: 'Menino', icon: '🦊' },
                        { id: 'girl', label: 'Menina', icon: '🐰' },
                        { id: 'other', label: 'Outro', icon: '🐼' }
                      ].map((g) => (
                        <label key={g.id} className="flex-1 cursor-pointer group">
                          <input type="radio" name="gender" value={g.id} defaultChecked={child.gender === g.id} className="hidden peer" />
                          <div className="p-6 rounded-[2rem] border-4 border-card-border bg-brand-primary/5 text-center transition-all peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-white shadow-sm group-hover:scale-105 active:scale-95">
                            <div className="text-4xl mb-2">{g.icon}</div>
                            <div className="font-black uppercase text-[10px] tracking-widest">{g.label}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-brand-secondary/60 uppercase tracking-widest ml-4">Username (@)</label>
                    <input 
                      name="username"
                      type="text" 
                      defaultValue={child.username || child.displayName.toLowerCase().replace(' ', '_')} 
                      required
                      className="w-full bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-brand-primary/10 rounded-3xl px-8 py-5 font-black text-xl text-brand-primary outline-none transition-all shadow-inner" 
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-4">
                      <label className="text-xs font-black text-brand-secondary/60 uppercase tracking-widest">Código PIN</label>
                      <span className="text-[10px] font-black text-brand-secondary/30 uppercase">4 a 6 números</span>
                    </div>
                    <div className="relative">
                      <input 
                        name="pinCode"
                        type="password" 
                        defaultValue={child.pinCode || '1234'} 
                        minLength={4}
                        maxLength={6} 
                        required
                        className="w-full bg-brand-primary/5 border-4 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-brand-primary/10 rounded-3xl px-8 py-5 font-black text-3xl tracking-[10px] text-brand-primary outline-none transition-all shadow-inner" 
                      />
                      <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-secondary/20" size={24} />
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex flex-col gap-4 relative z-10">
                  <button 
                    type="submit"
                    disabled={updateChildMutation.isPending}
                    className="w-full py-6 bg-brand-primary text-white rounded-[2rem] font-black text-xl shadow-[0_12px_0_0_#1B4332] hover:translate-y-[2px] hover:shadow-[0_10px_0_0_#1B4332] active:translate-y-[12px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {updateChildMutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Salvando Magia...
                      </>
                    ) : (
                      <>
                        <Check size={24} strokeWidth={4} />
                        Salvar Alterações Mágicas
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      if (confirm('Tem certeza que deseja remover este explorador do ninho? Esta ação é irreversível! 🦉🚫')) {
                        deleteChildMutation.mutate()
                      }
                    }}
                    disabled={deleteChildMutation.isPending}
                    className="w-full py-6 bg-brand-danger/5 text-brand-danger rounded-[2rem] font-black text-sm hover:bg-brand-danger/10 transition-all flex items-center justify-center gap-3 border-4 border-transparent hover:border-brand-danger/10 disabled:opacity-50"
                  >
                    {deleteChildMutation.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash2 size={20} />
                    )}
                    Banir do Ninho (Remover Criança)
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QR Code Modal Overlay */}
        <AnimatePresence>
          {isShowingQR && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsShowingQR(false)}
                className="absolute inset-0 bg-brand-primary/60 backdrop-blur-2xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="bg-[#FDFCF8] dark:bg-card-bg rounded-[4rem] p-10 lg:p-14 border-8 border-card-border shadow-[0_50px_100px_rgba(26,67,50,0.3)] relative z-10 w-full max-w-lg text-center overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl" />
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 border-4 border-card-border shadow-inner">
                    <QrCode size={32} className="text-brand-primary" />
                  </div>
                  
                  <h2 className="text-4xl font-black text-brand-primary italic mb-3 tracking-tighter">Chave de Acesso</h2>
                  <p className="text-brand-secondary/60 dark:text-text-muted font-bold mb-10 max-w-sm text-sm leading-relaxed">
                    Aponte o tablet ou celular do explorador para este portal para entrar instantaneamente.
                  </p>
                  
                  <div className="relative p-10 bg-white rounded-[3rem] border-8 border-dashed border-brand-primary/10 mb-10 group/qr-large shadow-inner">
                    <QRCodeSVG 
                      value={`https://corujinhasmart.vercel.app/login?t=${child.loginToken}&f=${familyId}`}
                      size={240}
                      level="H"
                      includeMargin={false}
                      fgColor="#1B4332"
                      bgColor="transparent"
                    />
                    <motion.div 
                      animate={{ y: [0, 240, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute top-10 left-10 right-10 h-1 bg-brand-primary/40 blur-md rounded-full pointer-events-none"
                    />
                  </div>
                  
                  <div className="bg-brand-primary/5 dark:bg-white/5 px-10 py-5 rounded-3xl border-4 border-card-border inline-flex items-center gap-6">
                    <div>
                      <span className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-[0.3em] block mb-1">Username</span>
                      <span className="text-2xl font-black text-brand-primary italic tracking-tight">@{child.username || child.displayName.toLowerCase().replace(' ', '_')}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsShowingQR(false)}
                    className="mt-12 w-full py-6 bg-brand-primary text-white rounded-[2rem] font-black text-xl shadow-[0_12px_0_0_#1B4332] hover:translate-y-[2px] hover:shadow-[0_10px_0_0_#1B4332] active:translate-y-[12px] active:shadow-none transition-all"
                  >
                    Fechar Portal
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <CreateTaskModal 
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          familyId={familyId || ''}
          children={child ? [child] : []}
        />
      </div>
    </div>
  )
}

function StatItem({ icon, value, label, bgColor }: { icon: React.ReactNode, value: number | string, label: string, bgColor: string }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-6 rounded-[2.5rem] ${bgColor} border-4 border-card-border shadow-sm flex flex-col items-center text-center transition-all cursor-pointer hover:shadow-xl`}
    >
      <div className="mb-3 transform scale-125 filter drop-shadow-sm">{icon}</div>
      <div className="text-3xl font-black text-brand-primary leading-none tracking-tight">{value}</div>
      <div className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.2em] mt-2">{label}</div>
    </motion.div>
  )
}

function MissionCard({ task, index }: { task: any, index: number }) {
  const isPending = task.status === 'pending_approval'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-[2.5rem] p-8 border-4 ${isPending ? 'border-brand-warm/30' : 'border-white'} shadow-sm relative overflow-hidden group`}
    >
      {isPending && (
        <div className="absolute top-0 right-0 bg-brand-warm text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
          Aguardando Validação
        </div>
      )}

      <div className="flex items-center gap-6 mb-6">
        <div className="w-16 h-16 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500">
          {task.taskEmoji || '📝'}
        </div>
        <div>
          <h4 className="text-2xl font-black text-brand-primary leading-tight">{task.taskTitle}</h4>
          <p className="text-xs font-bold text-brand-secondary/40 mt-1">{task.recurrenceType === 'daily' ? 'Missão Diária' : 'Missão Única'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-brand-primary/5">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-amber-600 font-black">
            <Coins size={16} /> +{task.rewardCoins || 0}
          </div>
          <div className="flex items-center gap-1.5 text-brand-primary font-black">
            <Zap size={16} /> +{task.rewardXp || 0} XP
          </div>
        </div>
        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
          <ArrowLeft size={18} className="rotate-180" />
        </div>
      </div>
    </motion.div>
  )
}

function TimelineItem({ task }: { task: any }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border-4 border-white group-hover:bg-brand-primary/5 transition-colors">
          <CheckCircle2 size={24} className="text-brand-success" />
        </div>
        <div className="w-1 h-full bg-brand-primary/5 rounded-full mt-2" />
      </div>

      <div className="flex-1 bg-white p-6 rounded-[2rem] shadow-sm border-4 border-white hover:border-brand-primary/10 transition-all">
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-black text-brand-primary text-xl tracking-tight">{task.taskTitle}</h5>
          <span className="text-[10px] font-bold text-brand-secondary/30 uppercase tracking-widest">
            {task.approvedAt ? new Date(task.approvedAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Recentemente'}
          </span>
        </div>
        <p className="text-brand-secondary/60 font-bold text-sm">Missão concluída com perfeição! Ganhou recompensas mágicas.</p>
        <div className="flex gap-4 mt-4">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-tighter">+{task.rewardCoins} Moedas</span>
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-tighter">+{task.rewardXp} XP</span>
        </div>
      </div>
    </div>
  )
}
