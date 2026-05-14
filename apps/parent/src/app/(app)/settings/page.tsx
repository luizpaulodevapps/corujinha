'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Settings,
  Bell,
  Lock,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Palette,
  Shield,
  X,
  Check,
  Loader2,
  Camera,
  Coins as CoinsIcon,
  Star,
  Eye,
  EyeOff,
  Plus,
  Leaf,
  Sparkles,
  User,
  Heart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/auth.store'

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const user = useAuthStore(s => s.user)
  const { theme, setTheme } = useTheme()

  const closeModal = () => setActiveModal(null)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    closeModal()
  }

  return (
    <div className="pb-20 lg:pb-0 min-h-screen bg-bg-main relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />
      
      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-[1.5rem] flex items-center justify-center border-4 border-card-border shadow-sm">
              <Settings size={32} className="text-brand-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-brand-primary leading-none italic">
                Ajustes do Ninho
              </h1>
              <p className="text-brand-secondary/60 font-bold text-lg mt-1 italic">Personalize cada detalhe da sua aventura na floresta.</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-12">
            {/* Section: Account */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 ml-4">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <User size={18} />
                </div>
                <h2 className="text-xl font-black text-brand-primary italic">Guardião & Segurança</h2>
              </div>
              
              <div className="bg-card-bg rounded-[3rem] shadow-sm border-4 border-card-border overflow-hidden">
                <SettingsItem icon={<Shield size={24} />} label="Perfil do Guardião" description="Seu nome, e-mail e avatar" onClick={() => setActiveModal('profile')} />
                <SettingsItem icon={<Lock size={24} />} label="Senha & Acesso" description="Segurança do seu acesso" onClick={() => setActiveModal('security')} />
                <SettingsItem icon={<Bell size={24} />} label="Notificações" description="Alertas e avisos em voo" onClick={() => setActiveModal('notifications')} last />
              </div>
            </section>

            {/* Section: Subscription */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 ml-4">
                <div className="w-8 h-8 bg-brand-warm/10 rounded-lg flex items-center justify-center text-brand-warm border border-brand-warm/20">
                  <Star size={18} />
                </div>
                <h2 className="text-xl font-black text-brand-primary italic">Voo Premium</h2>
              </div>
              <div className="bg-card-bg rounded-[3rem] shadow-sm border-4 border-card-border overflow-hidden border-brand-warm/20">
                <SettingsItem icon={<CreditCard size={24} />} label="Plano Corujinha" description="Assinatura e benefícios" onClick={() => setActiveModal('billing')} last />
              </div>
            </section>
          </div>

          <div className="space-y-12">
            {/* Section: Family Settings */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 ml-4">
                <div className="w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent border border-brand-accent/20">
                  <Heart size={18} />
                </div>
                <h2 className="text-xl font-black text-brand-primary italic">Magia do Ninho</h2>
              </div>
              <div className="bg-card-bg rounded-[3rem] shadow-sm border-4 border-card-border overflow-hidden">
                <SettingsItem icon={<Palette size={24} />} label="Personalização" description="Temas, cores e magias" onClick={() => setActiveModal('appearance')} />
                <SettingsItem icon={<CoinsIcon size={24} />} label="Economia Mágica" description="Moedas e tesouros internos" onClick={() => setActiveModal('currency')} />
                <SettingsItem icon={<HelpCircle size={24} />} label="Sábios da Floresta" description="Ajuda, suporte e tutoriais" onClick={() => setActiveModal('help')} last />
              </div>
            </section>

            {/* Dangerous Zone */}
            <section className="pt-6">
              <button className="w-full py-8 bg-brand-danger/5 text-brand-danger font-black rounded-[2.5rem] border-4 border-brand-danger/10 hover:bg-brand-danger/10 transition-all text-sm uppercase tracking-widest shadow-sm">
                Abandonar o Ninho (Excluir Conta)
              </button>
              <div className="flex flex-col items-center mt-12">
                <div className="w-12 h-1.5 bg-brand-primary/10 rounded-full mb-6" />
                <p className="text-center text-[10px] font-black text-brand-secondary/30 uppercase tracking-[0.3em]">
                  Corujinha v1.0.0 · Criado com Magia
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Settings Modal - Modernized */}
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
                  <h3 className="text-3xl font-black text-brand-primary italic flex items-center gap-3">
                    <Sparkles className="text-brand-warm" />
                    {activeModal === 'profile' && 'Perfil'}
                    {activeModal === 'security' && 'Segurança'}
                    {activeModal === 'notifications' && 'Eco das Corujas'}
                    {activeModal === 'appearance' && 'Personalização'}
                    {activeModal === 'currency' && 'Tesouros'}
                    {activeModal === 'help' && 'Ajuda Sabia'}
                    {activeModal === 'billing' && 'Plano de Voo'}
                  </h3>
                  <button onClick={closeModal} className="w-12 h-12 flex items-center justify-center bg-brand-primary/5 rounded-2xl text-brand-secondary/40 hover:bg-brand-danger/10 hover:text-brand-danger transition-all border-2 border-card-border shadow-sm">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Reuse existing modal contents but themed */}
                  {activeModal === 'profile' && (
                    <div className="space-y-8">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                          <div className="w-32 h-32 bg-brand-primary/5 rounded-[2.5rem] flex items-center justify-center text-6xl border-4 border-card-border group-hover:border-brand-primary transition-all shadow-inner overflow-hidden">
                            <span className="group-hover:scale-110 transition-transform">🦉</span>
                          </div>
                          <button className="absolute -right-2 -bottom-2 w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-card-border">
                            <Camera size={22} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <InputGroup label="Nome de Guardião" defaultValue={user?.displayName || ''} />
                        <InputGroup label="Telefone" placeholder="(00) 00000-0000" />
                        <InputGroup label="E-mail Eterno" value={user?.email || ''} readOnly className="bg-brand-primary/5" />
                      </div>
                    </div>
                  )}

                  {activeModal === 'notifications' && (
                    <div className="space-y-6">
                      <ToggleItem label="Missões em Tempo Real" description="Ecoar quando um explorador terminar uma tarefa" defaultChecked />
                      <ToggleItem label="Resgates do Tesouro" description="Ecoar quando houver solicitação de prêmio" defaultChecked />
                    </div>
                  )}

                  {activeModal === 'appearance' && (
                    <div className="space-y-6">
                      <p className="text-text-secondary font-bold text-center">
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
                            className={`rounded-2xl border-4 py-4 text-sm font-black transition-all motion-safe:duration-200 ${
                              theme === id
                                ? 'border-brand-primary bg-brand-primary/15 text-brand-primary scale-[1.02]'
                                : 'border-card-border bg-bg-main text-text-secondary hover:border-brand-secondary/40'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full btn-primary py-6 mt-6 !rounded-2xl bg-brand-primary text-white font-black shadow-[0_6px_0_0_#1B4332] active:translate-y-1 active:shadow-none flex items-center justify-center"
                  >
                    {isSaving ? <Loader2 className="animate-spin" size={32} /> : 'Consolidar Sabedoria'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SettingsItem({ icon, label, description, onClick, last = false }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-8 hover:bg-brand-primary/5 transition-all text-left group
      ${!last ? 'border-b-4 border-border-main' : ''}`}
    >
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all border-2 border-card-border shadow-sm">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="font-black text-brand-primary text-2xl italic leading-tight">{label}</h3>
          <p className="text-lg font-bold text-brand-secondary/40 mt-1">{description}</p>
        </div>
      </div>
      <ChevronRight size={32} className="text-brand-secondary/20 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" />
    </button>
  )
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest ml-4">{label}</label>
      <input 
        {...props}
        className={`w-full h-14 px-6 bg-brand-primary/5 rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary placeholder:text-brand-secondary/20 focus:outline-none focus:border-brand-primary/20 transition-all ${props.className || ''}`} 
      />
    </div>
  )
}

function ToggleItem({ label, description, defaultChecked = false }: any) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between p-6 bg-brand-primary/5 rounded-[2rem] border-4 border-card-border shadow-sm">
      <div>
        <p className="font-black text-brand-primary text-xl italic">{label}</p>
        <p className="text-xs text-brand-secondary/40 font-bold mt-1 uppercase tracking-widest">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-16 h-8 rounded-full transition-all relative ${checked ? 'bg-brand-primary' : 'bg-brand-secondary/20'}`}
      >
        <div className={`absolute top-1 w-6 h-6 bg-card-bg rounded-full transition-all shadow-sm ${checked ? 'left-9' : 'left-1'}`} />
      </button>
    </div>
  )
}
