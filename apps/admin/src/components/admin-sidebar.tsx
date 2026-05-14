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

const menuGroups = [
  {
    title: 'Operações',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
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

  return (
    <aside style={{ 
      width: '300px', 
      height: '100vh', 
      borderRight: '1px solid #F1F5F9', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'sticky', 
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Identity */}
      <div style={{ padding: '40px 32px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          width: '44px', 
          height: '44px', 
          backgroundColor: '#1E4636', 
          borderRadius: '14px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white',
          boxShadow: '0 8px 16px rgba(30, 70, 54, 0.2)'
        }}>
          <ShieldCheck size={26} strokeWidth={2.5} />
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#1E4636', margin: 0, letterSpacing: '-0.02em' }}>Corujinha</h1>
          <p style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Command Center</p>
        </div>
      </div>

      {/* Structured Menu */}
      <nav style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }} className="scrollbar-hide">
        {menuGroups.map((group, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ 
              fontSize: '11px', 
              fontWeight: 800, 
              color: '#94A3B8', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              paddingLeft: '16px',
              marginBottom: '4px'
            }}>{group.title}</p>
            
            {group.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '14px', 
                    padding: '12px 16px', 
                    borderRadius: '14px', 
                    textDecoration: 'none',
                    backgroundColor: isActive ? '#F8FAFC' : 'transparent',
                    color: isActive ? '#1E4636' : '#64748B',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '15px',
                    transition: 'all 0.2s'
                  }}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isActive && <ChevronRight size={16} strokeWidth={3} />}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Operational Footer */}
      <div style={{ padding: '32px 20px', borderTop: '1px solid #F1F5F9', marginTop: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '14px', 
          marginBottom: '24px',
          padding: '0 12px'
        }}>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '50%', 
            backgroundColor: '#F1F5F9', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '2px solid white',
            boxShadow: '0 0 0 1px #F1F5F9'
          }}>
            <Users size={22} color="#1E4636" strokeWidth={2.5} />
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Super Admin</p>
            <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 500, margin: 0 }}>ID: CX-9428</p>
          </div>
        </div>
        <button style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '14px 16px', 
          borderRadius: '14px', 
          border: '1px solid #F1F5F9',
          backgroundColor: '#F8FAFC',
          color: '#EF4444',
          fontWeight: 800,
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          <LogOut size={20} strokeWidth={2.5} />
          <span>Sair do Centro</span>
        </button>
      </div>
    </aside>
  )
}
