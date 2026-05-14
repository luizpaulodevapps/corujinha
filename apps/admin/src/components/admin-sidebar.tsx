'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Sword,  
  Lightbulb, 
  Settings,
  MessageSquare,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Handshake,
  Youtube,
  ShoppingBag,
  Store
} from 'lucide-react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { getFirebaseAuth } from '@corujinha/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const menuGroups = [
  {
    title: 'Operações',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Users, label: 'Famílias', href: '/familias' },
      { icon: Sword, label: 'Missões', href: '/missoes' },
      { icon: MessageSquare, label: 'Suporte', href: '/suporte' },
    ]
  },
  {
    title: 'Ecossistema Corujinha',
    items: [
      { icon: Youtube, label: 'Corujinha TV', href: '/tv' },
      { icon: ShoppingBag, label: 'Loja Oficial', href: '/loja-oficial' },
      { icon: Store, label: 'Itens In-App', href: '/loja' },
      { icon: Handshake, label: 'Parceiros', href: '/parceiros' },
    ]
  },
  {
    title: 'Conteúdo & Marca',
    items: [
      { icon: Lightbulb, label: 'Dicas Mágicas', href: '/dicas' },
      { icon: Sparkles, label: 'Mascotes', href: '/mascotes' },
    ]
  },
  {
    title: 'Gestão',
    items: [
      { icon: CreditCard, label: 'Financeiro', href: '/financeiro' },
      { icon: Settings, label: 'Configurações', href: '/configuracoes' },
    ]
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const auth = getFirebaseAuth()
  const user = auth.currentUser

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('[Admin Sidebar] Erro ao deslogar:', error)
    }
  }

  const adminName = user?.displayName || user?.email?.split('@')[0] || 'Administrador'
  const adminEmail = user?.email || 'admin@corujinha.com'
  const adminPhoto = user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${adminName}&backgroundColor=b6e3f4`

  return (
    <aside className="w-[280px] lg:w-[320px] h-screen glass-panel flex flex-col sticky top-0 z-[100] font-outfit border-r border-white/20">
      {/* Brand Identity with Magic Touch */}
      <div className="p-10 px-8 flex items-center gap-5">
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.15 }}
          className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-brand-primary/30 flex-shrink-0"
        >
          <ShieldCheck size={28} strokeWidth={2.5} />
        </motion.div>
        <div className="min-w-0">
          <h1 className="text-2xl font-black text-brand-primary leading-none tracking-tighter italic">Corujinha</h1>
          <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mt-1.5 opacity-80">Command Center</p>
        </div>
      </div>

      {/* Structured Menu with Premium Styling */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto scrollbar-hide py-4">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <p className="text-[10px] font-black text-slate-400/60 uppercase tracking-[0.3em] px-8 mb-4">
              {group.title}
            </p>
            
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={clsx(
                      "sidebar-item",
                      isActive && "active"
                    )}
                  >
                    <item.icon />
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-1.5 h-6 bg-white/40 rounded-full"
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Operational Footer - Refined */}
      <div className="p-8 px-6 bg-white/40 backdrop-blur-md border-t border-white/50">
        <div className="flex items-center gap-4 mb-8 px-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border-2 border-brand-accent/20 shadow-xl overflow-hidden">
               <img 
                 src={adminPhoto} 
                 alt="Admin Avatar"
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-black text-slate-900 leading-none italic truncate capitalize">{adminName}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 truncate">{adminEmail}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] bg-white border border-slate-100 text-red-500 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-xl hover:shadow-rose-200 transition-all active:scale-95 group"
        >
          <LogOut size={20} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
          <span>Sair do Centro</span>
        </button>
      </div>
    </aside>
  )
}
