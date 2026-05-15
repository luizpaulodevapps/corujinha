'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Settings,
  Bell,
  Mail,
  Lock,
  CreditCard,
  HelpCircle,
  Palette,
  Shield,
  X,
  Loader2,
  Camera,
  Coins as CoinsIcon,
  Star,
  Sparkles,
  User,
  Heart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/auth.store'

import { SettingsItem, InputGroup, ToggleItem } from '@/components/settings/settings-ui'
import {
  ProfileSettings,
  SecuritySettings,
  DeleteAccountModal
} from '@/components/settings/settings-modals'
import { getFirebaseFirestore, getFirebaseAuth } from '@corujinha/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth'

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const user = useAuthStore(s => s.user)
  const updateUser = useAuthStore(s => s.updateUser)
  const { theme, setTheme } = useTheme()

  const closeModal = () => setActiveModal(null)

  const handleSaveProfile = async (data: { 
    firstName: string, 
    lastName: string, 
    birthDate: string, 
    whatsapp: string 
  }) => {
    if (!user) return
    setIsSaving(true)
    try {
      const auth = getFirebaseAuth()
      if (auth.currentUser) {
        const fullDisplayName = `${data.firstName} ${data.lastName}`.trim()
        
        // 1. Atualiza no Firebase Auth
        await updateProfile(auth.currentUser, {
          displayName: fullDisplayName
        })
        
        // 2. Atualiza no Firestore
        const db = getFirebaseFirestore()
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {
          firstName: data.firstName,
          lastName: data.lastName,
          name: fullDisplayName,
          birthDate: data.birthDate,
          whatsapp: data.whatsapp,
          updatedAt: new Date()
        })

        // 3. Atualiza estado local
        updateUser({ 
          displayName: fullDisplayName,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          whatsapp: data.whatsapp
        })
        
        closeModal()
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetPassword = async () => {
    if (!user?.email) return
    const auth = getFirebaseAuth()
    await sendPasswordResetEmail(auth, user.email)
  }

  return (
    <div className="min-h-screen bg-bg-main pb-24 lg:pb-12 pt-safe relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <header className="flex flex-col items-center text-center mb-16 pt-8">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-[2.5rem] flex items-center justify-center border-4 border-card-border shadow-sm mb-6">
            <Settings size={36} className="text-brand-primary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-brand-primary italic leading-none mb-2">
              Ajustes do Ninho
            </h1>
            <p className="text-brand-secondary/60 font-black text-xs md:text-sm uppercase tracking-[0.3em] italic">Configurações • Guardião</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-12">
            {/* Section: Account */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 ml-4">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <User size={18} />
                </div>
                <h2 className="text-lg font-black text-brand-primary italic">Guardião & Segurança</h2>
              </div>

              <div className="bg-card-bg rounded-[3rem] shadow-sm border-4 border-card-border overflow-hidden">
                <SettingsItem icon={<Shield size={20} />} label="Perfil do Guardião" description="Seu nome, e-mail e avatar" onClick={() => setActiveModal('profile')} />
                <SettingsItem icon={<Lock size={20} />} label="Senha & Acesso" description="Segurança do seu acesso" onClick={() => setActiveModal('security')} />
                <SettingsItem icon={<Bell size={20} />} label="Notificações" description="Alertas e avisos em voo" onClick={() => setActiveModal('notifications')} last />
              </div>
            </section>

            {/* Section: Subscription */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 ml-4">
                <div className="w-8 h-8 bg-brand-warm/10 rounded-lg flex items-center justify-center text-brand-warm border border-brand-warm/20">
                  <Star size={18} />
                </div>
                <h2 className="text-lg font-black text-brand-primary italic">Voo Premium</h2>
              </div>
              <div className="bg-card-bg rounded-[3rem] shadow-sm border-4 border-card-border overflow-hidden border-brand-warm/20">
                <SettingsItem icon={<CreditCard size={20} />} label="Plano Corujinha" description="Assinatura e benefícios" onClick={() => setActiveModal('billing')} last />
              </div>
            </section>
          </div>

          <div className="space-y-12">
            {/* Section: Family Settings */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 ml-4">
                <div className="w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent border border-brand-accent/20">
                  <Heart size={18} />
                </div>
                <h2 className="text-lg font-black text-brand-primary italic">Magia do Ninho</h2>
              </div>
              <div className="bg-card-bg rounded-[3rem] shadow-sm border-4 border-card-border overflow-hidden">
                <SettingsItem icon={<Palette size={20} />} label="Personalização" description="Temas, cores e magias" onClick={() => setActiveModal('appearance')} />
                <SettingsItem icon={<CoinsIcon size={20} />} label="Economia Mágica" description="Moedas e tesouros internos" onClick={() => setActiveModal('currency')} />
                <SettingsItem icon={<HelpCircle size={20} />} label="Sábios da Floresta" description="Ajuda, suporte e tutoriais" onClick={() => setActiveModal('help')} last />
              </div>
            </section>

            {/* Dangerous Zone */}
            <section className="pt-6">
              <button
                onClick={() => setActiveModal('delete')}
                className="w-full py-8 bg-brand-danger/5 text-brand-danger font-black rounded-[2.5rem] border-4 border-brand-danger/10 hover:bg-brand-danger/10 transition-all text-xs uppercase tracking-widest shadow-sm"
              >
                Abandonar o Ninho (Excluir Conta)
              </button>
              <div className="flex flex-col items-center mt-12">
                <div className="w-12 h-1 bg-brand-primary/10 rounded-full mb-6" />
                <p className="text-center text-[9px] font-black text-brand-secondary/30 uppercase tracking-[0.3em]">
                  Corujinha v1.0.0 · Criado com Magia
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-brand-primary/20 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-xl bg-card-bg rounded-[3.5rem] shadow-2xl border-4 border-card-border overflow-hidden"
            >
              <div className="p-10 lg:p-12">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-brand-primary italic flex items-center gap-3">
                    <Sparkles size={20} className="text-brand-warm" />
                    {activeModal === 'profile' && 'Perfil'}
                    {activeModal === 'security' && 'Segurança'}
                    {activeModal === 'notifications' && 'Eco das Corujas'}
                    {activeModal === 'appearance' && 'Personalização'}
                    {activeModal === 'currency' && 'Economia Mágica'}
                    {activeModal === 'help' && 'Ajuda Sábia'}
                    {activeModal === 'billing' && 'Plano de Voo'}
                    {activeModal === 'delete' && 'Abandonar Ninho'}
                  </h3>
                  <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center bg-brand-primary/5 rounded-xl text-brand-secondary/40 hover:bg-brand-danger/10 hover:text-brand-danger transition-all border-2 border-card-border shadow-sm">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {activeModal === 'profile' && (
                    <ProfileSettings
                      user={user}
                      isSaving={isSaving}
                      onSave={handleSaveProfile}
                    />
                  )}

                  {activeModal === 'security' && (
                    <SecuritySettings onResetPassword={handleResetPassword} />
                  )}

                  {activeModal === 'notifications' && (
                    <div className="space-y-4">
                      <ToggleItem label="Missões em Tempo Real" description="Ecoar quando um explorador terminar uma tarefa" defaultChecked />
                      <ToggleItem label="Resgates do Tesouro" description="Ecoar quando houver solicitação de prêmio" defaultChecked />
                      <div className="pt-6">
                        <button onClick={closeModal} className="w-full py-5 rounded-2xl bg-brand-primary text-white font-black shadow-[0_6px_0_0_#1B4332] active:translate-y-1 active:shadow-none">
                          Consolidar Alertas
                        </button>
                      </div>
                    </div>
                  )}

                  {activeModal === 'appearance' && (
                    <div className="space-y-6">
                      <p className="text-brand-primary/60 font-bold text-center text-sm">
                        Escolha o brilho da floresta neste aparelho.
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {(
                          [
                            { id: 'light' as const, label: 'Claro' },
                            { id: 'dark' as const, label: 'Escuro' },
                            { id: 'system' as const, label: 'Sistema' },
                          ]
                        ).map(({ id, label }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setTheme(id)}
                            className={`rounded-xl border-4 py-3 text-xs font-black transition-all ${theme === id
                              ? 'border-brand-primary bg-brand-primary/10 text-brand-primary scale-105'
                              : 'border-card-border bg-bg-main text-brand-secondary/60 hover:border-brand-secondary/40'
                              }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <div className="pt-6">
                        <button onClick={closeModal} className="w-full py-5 rounded-2xl bg-brand-primary text-white font-black shadow-[0_6px_0_0_#1B4332] active:translate-y-1 active:shadow-none">
                          Consolidar Estilo
                        </button>
                      </div>
                    </div>
                  )}

                  {activeModal === 'delete' && (
                    <DeleteAccountModal onDelete={() => console.log('Delete account logic')} />
                  )}

                  {activeModal === 'currency' && (
                    <div className="space-y-6">
                      <div className="bg-amber-500/5 p-6 rounded-3xl border-2 border-amber-500/10 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border-2 border-amber-500/10 text-2xl">
                          🪙
                        </div>
                        <div>
                          <h4 className="font-black text-brand-primary text-sm uppercase">Moedas do Ninho</h4>
                          <p className="text-xs font-medium text-brand-secondary/60 mt-1">Configure o multiplicador de recompensas.</p>
                        </div>
                      </div>
                      <InputGroup label="Multiplicador de Sabedoria" defaultValue="1.0" />
                      <div className="pt-6">
                        <button onClick={closeModal} className="w-full py-5 rounded-2xl bg-brand-primary text-white font-black shadow-[0_6px_0_0_#1B4332] active:translate-y-1 active:shadow-none">
                          Consolidar Economia
                        </button>
                      </div>
                    </div>
                  )}

                  {activeModal === 'billing' && (
                    <div className="space-y-6 text-center">
                      <div className="w-20 h-20 bg-brand-warm/10 rounded-3xl flex items-center justify-center text-brand-warm mx-auto border-4 border-card-border shadow-sm">
                        <Star size={40} className="fill-brand-warm" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-brand-primary italic">Plano Corujinha Grátis</h4>
                        <p className="text-xs font-medium text-brand-secondary/40 mt-1">Você está usando a versão base da floresta.</p>
                      </div>
                      <div className="bg-brand-primary/5 p-6 rounded-3xl border-2 border-brand-primary/10">
                        <p className="text-sm font-bold text-brand-primary">O Voo Premium está chegando!</p>
                        <p className="text-xs text-brand-secondary/60 mt-2">Em breve: Relatórios de IA e missões ilimitadas.</p>
                      </div>
                    </div>
                  )}

                  {activeModal === 'help' && (
                    <div className="space-y-4">
                      <SettingsItem icon={<Mail size={18} />} label="Falar com Mentores" description="Suporte via E-mail" onClick={() => {}} />
                      <SettingsItem icon={<HelpCircle size={18} />} label="Central de Sabedoria" description="Tutoriais e FAQs" onClick={() => {}} last />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
