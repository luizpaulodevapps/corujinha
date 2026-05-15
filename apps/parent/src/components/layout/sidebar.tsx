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

const PRIMARY_NAV = [
  { icon: LayoutDashboard, label: 'Início', href: '/dashboard' },
  { icon: ListTodo, label: 'Missões', href: '/tasks' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: Users, label: 'Família', href: '/family' },
]

const SECONDARY_NAV = [
  { icon: MapIcon, label: 'Jornada', href: '/jornada' },
  { icon: Gift, label: 'Prêmios', href: '/rewards' },
  { icon: History, label: 'Diário', href: '/history' },
  { icon: BarChart3, label: 'Evolução', href: '/reports' },
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

      {/* Mobile Bottom Nav (Clean & App-like) */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card-bg/95 backdrop-blur-2xl border-t-4 border-card-border flex items-center justify-around z-50 lg:hidden px-6 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        {PRIMARY_NAV.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-all relative px-4 py-2 rounded-2xl ${isActive ? 'text-brand-primary scale-110' : 'text-text-muted hover:text-brand-primary'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 bg-brand-primary/10 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon size={26} strokeWidth={isActive ? 3 : 2} className="relative z-10" />
              <span className={`text-[9px] font-black uppercase tracking-tighter relative z-10 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="fixed top-0 bottom-0 left-0 w-72 bg-card-bg/80 backdrop-blur-3xl border-r-8 border-brand-secondary/10 flex-col p-8 hidden lg:flex z-50">
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

        <div className="flex flex-col w-full gap-2 flex-1 relative z-10 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar mb-8">
          <div className="mb-4">
            <p className="text-[10px] font-black text-brand-primary/30 uppercase tracking-[0.3em] mb-4 px-6">Principal</p>
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`group flex items-center gap-4 px-6 py-4 rounded-[2rem] font-bold transition-all relative border-4 mb-2
                    ${isActive 
                      ? 'bg-brand-primary text-white border-brand-primary shadow-[0_8px_0_0_#1B4332]' 
                      : 'text-text-secondary border-transparent hover:bg-brand-primary/5 hover:text-brand-primary hover:border-brand-primary/10'}`}
                >
                  <item.icon size={22} className={isActive ? 'text-white' : 'text-brand-secondary group-hover:text-brand-primary'} strokeWidth={isActive ? 3 : 2} />
                  <span className={isActive ? 'text-base font-black' : 'text-base'}>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t-4 border-brand-primary/5">
            <p className="text-[10px] font-black text-brand-primary/30 uppercase tracking-[0.3em] mb-4 px-6">Ferramentas</p>
            {SECONDARY_NAV.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`group flex items-center gap-4 px-6 py-4 rounded-[2rem] font-bold transition-all relative border-4 mb-2
                    ${isActive 
                      ? 'bg-brand-primary text-white border-brand-primary shadow-[0_8px_0_0_#1B4332]' 
                      : 'text-text-secondary border-transparent hover:bg-brand-primary/5 hover:text-brand-primary hover:border-brand-primary/10'}`}
                >
                  <item.icon size={22} className={isActive ? 'text-white' : 'text-brand-secondary group-hover:text-brand-primary'} strokeWidth={isActive ? 3 : 2} />
                  <span className={isActive ? 'text-base font-black' : 'text-base'}>{item.label}</span>
                </Link>
              )
            })}
          </div>
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
