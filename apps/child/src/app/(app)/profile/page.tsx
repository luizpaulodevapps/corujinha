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
      <section className="cp-hero" aria-labelledby="profile-title">
        <div className="cp-hero__avatar">
          <AvatarUpload currentAvatar={profile.avatar} />
        </div>

        <div className="cp-hero__copy">
          <p className="cp-kicker">
            <User size={15} />
            Heroi da floresta
          </p>

          {isEditingName ? (
            <div className="cp-name-edit">
              <input value={tempName} onChange={event => setTempName(event.target.value)} maxLength={12} autoFocus />
              <button onClick={() => setIsEditingName(false)} aria-label="Confirmar nome">
                <CheckCircle2 size={22} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button className="cp-name-button" onClick={() => setIsEditingName(true)}>
              <h1 id="profile-title">{tempName}</h1>
              <Palette size={19} />
            </button>
          )}

          <div className="cp-hero__stats">
            <span>
              <Trophy size={17} fill="currentColor" />
              Nivel {profile.level}
            </span>
            <span>
              <Coins size={17} fill="currentColor" />
              {profile.coins} moedas
            </span>
          </div>
        </div>
      </section>

      <section className="cp-section" aria-labelledby="avatars-title">
        <div className="cp-section-head">
          <div>
            <p className="cp-eyebrow">Personalizacao</p>
            <h2 id="avatars-title">Escolha seu heroi</h2>
          </div>
          <button className="cp-save" onClick={handleSave}>
            <Save size={18} />
            Salvar
          </button>
        </div>

        <div className="cp-avatar-grid">
          {avatars.map(avatar => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.src)}
              className={clsx('cp-avatar-option', selectedAvatar === avatar.src && 'is-active')}
            >
              <span>{avatar.emoji}</span>
              <img src={avatar.src} alt={avatar.name} />
              <strong>{avatar.name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="cp-section" aria-labelledby="themes-title">
        <div className="cp-section-head">
          <div>
            <p className="cp-eyebrow">Aparencia</p>
            <h2 id="themes-title">Tema favorito</h2>
          </div>
        </div>

        <div className="cp-theme-grid">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={clsx('cp-theme', selectedTheme === theme.id && 'is-active')}
            >
              <span style={{ background: theme.color }} />
              <strong>{theme.name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="cp-stats" aria-label="Estatisticas globais">
        <div>
          <CheckCircle2 size={22} />
          <span>Missoes</span>
          <strong>47</strong>
        </div>
        <div>
          <Star size={22} fill="currentColor" />
          <span>Trofeus</span>
          <strong>08</strong>
        </div>
        <div>
          <Flame size={22} fill="currentColor" />
          <span>Serie</span>
          <strong>05d</strong>
        </div>
      </section>

      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div className="cp-toast" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
            <Sparkles size={20} />
            Perfil salvo na floresta
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}
