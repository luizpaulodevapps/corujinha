'use client'

import { ReactNode } from 'react'
import { ChildHeader } from './child-header'
import { useChildStore } from '@/stores/use-child-store'
import { useNotificationStore } from '@/stores/use-notification-store'
import { useDashboardModals } from '@/stores/use-dashboard-modals'
import { ChildWalletModal } from './child-wallet-modal-v3'
import { NotificationDrawer } from './modals/NotificationDrawer'
import { AvatarCustomizationModal } from './modals/AvatarCustomizationModal'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import { MagicBackground } from './magic-background'
import { ChildBottomNav } from './child-bottom-nav'

interface PageContainerProps {
  children: ReactNode
  title: string
  subtitle?: string
  showBack?: boolean
  backHref?: string
  hideHeader?: boolean
  hideBottomNav?: boolean
  className?: string
  headerProps?: any
  hideAvatar?: boolean
  mentor?: 'bubo' | 'bolt' | 'lumi' | 'gaia'
  energy?: 'calm' | 'adventure' | 'magic' | 'night'
}

export function PageContainer({ 
  children, 
  title, 
  subtitle, 
  showBack = false, 
  backHref = '/dashboard',
  hideHeader = false,
  hideBottomNav = false,
  className = '',
  headerProps = {},
  hideAvatar = false,
  mentor,
  energy
}: PageContainerProps) {
  const { profile, updateAvatar } = useChildStore()
  const { notifications, markAsRead, clearAll } = useNotificationStore()
  const modals = useDashboardModals()

  const unreadCount = notifications.filter(n => !n.read).length

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0A1A14] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
          <Sparkles className="text-brand-primary" size={48} />
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      className="relative min-h-screen flex flex-col"
      data-mentor={mentor}
      data-energy={energy}
    >
      <MagicBackground />

      {!hideHeader && (
        <ChildHeader 
          title={title}
          subtitle={subtitle}
          showBack={showBack}
          backHref={backHref}
          coins={profile.coins}
          xp={profile.xp}
          avatarUrl={profile.avatar}
          unreadCount={unreadCount}
          onCoinsClick={modals.openWallet}
          onXpClick={modals.openWallet}
          onAvatarClick={modals.openAvatar}
          onNotificationsClick={modals.openNotifications}
          hideAvatar={hideAvatar}
          {...headerProps}
        />
      )}

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative z-0 child-page-main ${className}`}
      >
        <div className="child-page-inner">
          {children}
        </div>
      </motion.main>

      {/* Global Modals Orchestration */}
      <ChildWalletModal 
        isOpen={modals.showWallet}
        onClose={modals.closeWallet}
      />

      <NotificationDrawer 
        isOpen={modals.showNotifications}
        onClose={modals.closeNotifications}
        notifications={notifications}
        onRead={markAsRead}
        onClearAll={clearAll}
      />

      <AvatarCustomizationModal 
        isOpen={modals.showAvatar}
        onClose={modals.closeAvatar}
        currentAvatar={profile.avatar}
        onSelect={updateAvatar}
      />
    </div>
  )
}
