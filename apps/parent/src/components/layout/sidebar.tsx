'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ListTodo,
  Map as MapIcon,
  LayoutDashboard, 
  Calendar, 
  Gift, 
  Users, 
  Settings,
  LogOut,
  Leaf,
  History,
  BarChart3,
  MessageCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthActions } from '@/hooks/use-auth'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Painel', href: '/dashboard' },
  { icon: MapIcon, label: 'Jornada', href: '/jornada' },
  { icon: ListTodo, label: 'Missões', href: '/tasks' },
  { icon: Gift, label: 'Prêmios', href: '/rewards' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: History, label: 'Diário', href: '/history' },
  { icon: BarChart3, label: 'Evolução', href: '/reports' },
  { icon: Users, label: 'Família', href: '/family' },
  { icon: Settings, label: 'Ajustes', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useAuthActions()

  return (
    <>
      <div className="fixed top-4 right-4 z-[60] lg:hidden">
        <ThemeToggle />
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card-bg/90 backdrop-blur-2xl border-t-4 border-brand-secondary/20 flex items-center justify-around z-50 lg:hidden px-4 pb-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-all p-2 rounded-2xl ${isActive ? 'bg-brand-primary text-white shadow-lg' : 'text-text-secondary'}`}
            >
              <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
              <span className="text-[10px] font-black uppercase tracking-wider">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="fixed top-0 bottom-0 left-0 w-72 bg-card-bg/80 backdrop-blur-3xl border-r-8 border-brand-secondary/10 flex-col p-8 hidden lg:flex z-50 overflow-hidden">
        {/* Decorative Leaves */}
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-10 -right-10 text-brand-secondary/20"
        >
          <Leaf size={120} />
        </motion.div>

        <div className="flex flex-col items-center gap-4 mb-14 px-2 relative z-10 text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-xl animate-pulse group-hover:bg-brand-accent/40 transition-all" />
            <div className="relative w-20 h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
              <Image 
                src="/owl_mascot.png" 
                alt="Corujinha" 
                width={80}
                height={80}
                className="object-contain relative z-10 animate-sway"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-4xl tracking-tight text-brand-primary leading-none italic">Corujinha</span>
            <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-[0.3em] mt-1">Ninho da Sabedoria</span>
          </div>
        </div>

        <div className="flex flex-col w-full gap-3 flex-1 relative z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`group flex items-center gap-4 px-6 py-4 rounded-[2rem] font-bold transition-all relative border-4
                  ${isActive 
                    ? 'bg-brand-primary text-white border-brand-primary shadow-[0_8px_0_0_#1B4332]' 
                    : 'text-text-secondary border-transparent hover:bg-brand-secondary/10 hover:text-brand-primary hover:border-brand-secondary/20'}`}
              >
                <item.icon size={24} className={isActive ? 'text-white' : 'text-brand-secondary group-hover:text-brand-primary'} strokeWidth={isActive ? 3 : 2} />
                <span className={isActive ? 'text-lg font-black' : 'text-lg'}>{item.label}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute -right-2 w-4 h-8 bg-brand-accent rounded-l-full shadow-lg border-2 border-card-border"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 px-2">
            <span className="text-xs font-black uppercase tracking-widest text-text-muted">Aparência</span>
            <ThemeToggle />
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-4 px-6 py-4 rounded-[2rem] font-bold text-text-muted hover:bg-brand-danger/10 hover:text-brand-danger transition-all border-4 border-transparent hover:border-brand-danger/20"
          >
            <LogOut size={24} />
            <span className="text-lg">Sair da Floresta</span>
          </button>
        </div>
      </nav>
    </>
  )
}
