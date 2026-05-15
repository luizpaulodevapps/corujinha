'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map as MapIcon, Shield, Sword, Target, Trophy, User, MessageCircle } from 'lucide-react'
import clsx from 'clsx'

const ITEMS = [
  { href: '/jornada', label: 'Agenda', icon: MapIcon },
  { href: '/dashboard', label: 'Missoes', icon: Sword },
  { href: '/metas', label: 'Metas', icon: Target },
  { href: '/shop', label: 'Loja', icon: Shield },
  { href: '/achievements', label: 'Conquistas', icon: Trophy },
  { href: '/chat', label: 'Conversa', icon: MessageCircle },
  { href: '/profile', label: 'Perfil', icon: User },
] as const

export function ChildBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="child-bottom-nav" aria-label="Navegacao infantil">
      <div className="child-bottom-nav__shell">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href

          return (
            <Link key={href} href={href} className={clsx('child-bottom-nav__item', active && 'is-active')}>
              <span className="child-bottom-nav__icon">
                <Icon size={active ? 24 : 21} strokeWidth={active ? 3 : 2.5} />
              </span>
              <span className="child-bottom-nav__label">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
