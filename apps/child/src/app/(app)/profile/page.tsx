'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Coins, Flame, Palette, Save, Sparkles, Star, Trophy, User } from 'lucide-react'
import clsx from 'clsx'
import { PageContainer } from '@/components/page-container'
import { useChildStore } from '@/stores/use-child-store'
import { AvatarUpload } from '@/components/avatar-upload'

const avatars = [
  { id: 'owl-new', emoji: '🦉', name: 'Aventureira', src: '/owl_mascot_new.png' },
  { id: 'owl-classic', emoji: '🌿', name: 'Guardia', src: '/owl_mascot.png' },
  { id: 'owl-gold', emoji: '⭐', name: 'Estrela', src: '/owl_mascot_new.png' },
  { id: 'owl-forest', emoji: '🍃', name: 'Floresta', src: '/owl_mascot.png' },
]

const themes = [
  { id: 'green', name: 'Floresta', color: '#4B9C7A' },
  { id: 'gold', name: 'Sol', color: '#F59E0B' },
  { id: 'sky', name: 'Ceu', color: '#0EA5E9' },
  { id: 'berry', name: 'Magia', color: '#A855F7' },
]

export default function ProfilePage() {
  const { profile, updateAvatar } = useChildStore()
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('green')
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (profile) {
      setSelectedAvatar(profile.avatar)
      setTempName(profile.name)
    }
  }, [profile])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !profile) {
    return (
      <div className="min-h-screen bg-[#0A1A14] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
          <Sparkles className="text-brand-primary" size={48} />
        </motion.div>
      </div>
    )
  }

  const handleSave = () => {
    updateAvatar(selectedAvatar)
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 1800)
  }

  return (
    <PageContainer title="Meu Perfil" hideHeader hideAvatar>
      {/* Hero Section: Profile Sanctuary */}
      <section className="relative px-6 pt-12 pb-20 rounded-b-[3rem] bg-emerald-950 overflow-hidden shadow-[var(--shadow-lg)]" aria-labelledby="profile-title">
        {/* Background Texture & Ambient Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/textures/noise.svg)' }} />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/20 blur-[80px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <AvatarUpload currentAvatar={profile.avatar} />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 border-2 border-dashed border-brand-accent/30 rounded-full pointer-events-none"
            />
          </div>

          <div className="space-y-4 w-full">
            <p className="text-loud text-emerald-100/40 !text-[10px] flex items-center justify-center gap-2">
              <User size={14} className="text-brand-accent" />
              HERÓI DA FLORESTA
            </p>

            {isEditingName ? (
              <div className="relative max-w-xs mx-auto">
                <input 
                  value={tempName} 
                  onChange={event => setTempName(event.target.value)} 
                  maxLength={12} 
                  autoFocus 
                  className="w-full bg-white/10 border-2 border-brand-accent rounded-[var(--radius-lg)] px-6 py-4 text-2xl font-black text-white text-center outline-none shadow-xl"
                />
                <button 
                  onClick={() => setIsEditingName(false)} 
                  className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-accent text-emerald-950 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <CheckCircle2 size={24} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <button className="group relative" onClick={() => setIsEditingName(true)}>
                <h1 id="profile-title" className="text-hero-title text-white group-hover:text-brand-accent transition-colors">
                  {tempName}
                </h1>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Palette size={20} className="text-brand-accent" />
                </div>
              </button>
            )}

            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md flex items-center gap-2">
                <Trophy size={16} fill="currentColor" className="text-brand-accent" />
                <span className="text-loud text-white !text-[9px]">NÍVEL {profile.level}</span>
              </div>
              <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md flex items-center gap-2">
                <Coins size={16} fill="currentColor" className="text-brand-accent" />
                <span className="text-loud text-white !text-[9px]">{profile.coins} MOEDAS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Sections Container */}
      <div className="px-6 -mt-10 relative z-20 space-y-12 pb-32">
        
        {/* Personalization Section */}
        <section className="bg-white rounded-[var(--radius-card)] p-8 border-2 border-emerald-50 shadow-md">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-loud text-emerald-600/40 !text-[8px] mb-1">PERSONALIZAÇÃO</p>
              <h2 className="text-2xl font-black text-emerald-950 italic tracking-tight">Escolha seu Herói</h2>
            </div>
            <button 
              className="bg-emerald-950 text-white px-6 py-3 rounded-[var(--radius-md)] text-loud !text-[9px] flex items-center gap-2 hover:bg-emerald-900 transition-colors shadow-lg active:scale-95"
              onClick={handleSave}
            >
              <Save size={18} />
              SALVAR
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {avatars.map(avatar => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.src)}
                className={clsx(
                  'p-6 rounded-[var(--radius-lg)] border-2 transition-all duration-300 flex flex-col items-center gap-3 group',
                  selectedAvatar === avatar.src 
                    ? 'bg-emerald-50 border-emerald-600 shadow-inner' 
                    : 'bg-white border-emerald-50 hover:border-emerald-100'
                )}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm border border-emerald-50 group-hover:scale-110 transition-transform">
                    <img src={avatar.src} alt={avatar.name} className="w-14 h-14 object-contain" />
                  </div>
                  <span className="absolute -top-1 -right-1 text-xl">{avatar.emoji}</span>
                </div>
                <strong className="text-loud text-emerald-950 !text-[8px]">{avatar.name.toUpperCase()}</strong>
              </button>
            ))}
          </div>
        </section>

        {/* Appearance Section */}
        <section className="bg-white rounded-[var(--radius-card)] p-8 border-2 border-emerald-50 shadow-md">
          <div className="mb-8">
            <p className="text-loud text-emerald-600/40 !text-[8px] mb-1">APARÊNCIA</p>
            <h2 className="text-2xl font-black text-emerald-950 italic tracking-tight">Tema Favorito</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={clsx(
                  'p-4 rounded-[var(--radius-md)] border-2 transition-all duration-300 flex items-center gap-4',
                  selectedTheme === theme.id 
                    ? 'bg-emerald-50 border-emerald-600 shadow-inner' 
                    : 'bg-white border-emerald-50 hover:border-emerald-100'
                )}
              >
                <span className="w-10 h-10 rounded-full border-4 border-white shadow-sm shrink-0" style={{ background: theme.color }} />
                <strong className="text-loud text-emerald-950 !text-[8px]">{theme.name.toUpperCase()}</strong>
              </button>
            ))}
          </div>
        </section>

        {/* Stats Summary */}
        <section className="grid grid-cols-3 gap-4">
          {[
            { icon: CheckCircle2, label: 'MISSÕES', value: '47', color: 'text-emerald-600' },
            { icon: Star, label: 'TROFÉUS', value: '08', color: 'text-brand-accent', fill: true },
            { icon: Flame, label: 'SÉRIE', value: '05d', color: 'text-orange-500', fill: true }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[var(--radius-card)] p-6 border-2 border-emerald-50 shadow-md flex flex-col items-center text-center gap-3">
              <div className={clsx(
                "w-12 h-12 rounded-[var(--radius-md)] bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-inner",
                stat.color
              )}>
                <stat.icon size={24} fill={stat.fill ? 'currentColor' : 'none'} />
              </div>
              <div>
                <span className="text-loud text-emerald-950/30 !text-[7px] block">{stat.label}</span>
                <strong className="text-2xl font-black text-emerald-950 tracking-tighter">{stat.value}</strong>
              </div>
            </div>
          ))}
        </section>
      </div>

      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[1000] bg-emerald-950 text-white px-8 py-4 rounded-full shadow-2xl border-2 border-emerald-600 flex items-center gap-3"
          >
            <Sparkles size={20} className="text-brand-accent" />
            <span className="text-loud !text-[10px]">PERFIL SALVO NA FLORESTA</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
