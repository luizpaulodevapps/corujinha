'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Palette, 
  Smartphone,
  Save,
  Mail,
  Lock,
  Plus,
  Trash2,
  Calendar,
  ChevronRight,
  Settings,
  Users,
  Smartphone as Phone,
  Shield as ShieldIcon,
  Star,
  Sparkles,
  Handshake,
  AlertTriangle,
  MessageSquare
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminData } from '@/hooks/use-admin-data'
import { getFirebaseAuth } from '@corujinha/firebase'

type TabType = 'seguranca' | 'notificacoes' | 'ai' | 'database' | 'idioma' | 'branding' | 'pwa'

export default function ConfiguracoesPage() {
  const { 
    families, 
    children, 
    tasks, 
    rewards, 
    media, 
    tips, 
    products, 
    partners, 
    mascots, 
    systemSettings,
    updateSystemSettings,
    isLoading 
  } = useAdminData()
  
  const [activeTab, setActiveTab] = useState<TabType>('seguranca')
  const auth = getFirebaseAuth()
  const currentUser = auth.currentUser
  
  // Local States for pending changes
  const [localAllowNewAdmins, setLocalAllowNewAdmins] = useState<boolean | null>(null)
  const [primaryColor, setPrimaryColor] = useState('#0A3D2D')
  const [secondaryColor, setSecondaryColor] = useState('#3EC28F')

  // Sync local state with DB once
  const dbAllowNewAdmins = systemSettings?.allowNewAdmins ?? true
  const currentAllowNewAdmins = localAllowNewAdmins !== null ? localAllowNewAdmins : dbAllowNewAdmins

  const hasChanges = 
    (localAllowNewAdmins !== null && localAllowNewAdmins !== dbAllowNewAdmins) ||
    primaryColor !== '#0A3D2D' ||
    secondaryColor !== '#3EC28F'

  const handleSave = async () => {
    await updateSystemSettings({
      allowNewAdmins: currentAllowNewAdmins,
      primaryColor,
      secondaryColor
    })
    setLocalAllowNewAdmins(null) // Reset local track after save
    alert('Configurações salvas com sucesso!')
  }

  if (isLoading) {
    return (
      <AdminShell>
         <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="text-brand-primary">
               <Settings size={32} />
            </motion.div>
         </div>
      </AdminShell>
    )
  }

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'seguranca', label: 'Segurança e Acesso', icon: Shield },
    { id: 'notificacoes', label: 'Notificações do Sistema', icon: Bell },
    { id: 'ai', label: 'Configuração de IA', icon: Sparkles },
    { id: 'database', label: 'Banco de Dados', icon: Database },
    { id: 'idioma', label: 'Região e Idioma', icon: Globe },
    { id: 'branding', label: 'Branding Visual', icon: Palette },
    { id: 'pwa', label: 'Experiência PWA', icon: Smartphone },
  ]

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-100 shadow-sm w-fit mb-3">
             <Calendar size={14} className="text-brand-primary" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 italic tracking-tighter">Configurações Globais</h1>
          <p className="text-sm text-slate-400 font-bold">Ajuste os parâmetros críticos e a identidade da plataforma Corujinha.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={!hasChanges}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all
            ${hasChanges 
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'}`}
        >
          <Save size={18} strokeWidth={3} /> Salvar Parâmetros
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="space-y-2">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                 ${activeTab === tab.id 
                   ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105 z-10' 
                   : 'bg-white text-slate-400 border border-slate-50 hover:bg-slate-50'}`}
             >
                <div className="flex items-center gap-3">
                   <tab.icon size={18} />
                   {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight size={16} />}
             </button>
           ))}
        </aside>

        {/* Content Area */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/20 min-h-[500px]">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -10 }}
               transition={{ duration: 0.2 }}
             >
               {activeTab === 'seguranca' && (
                 <div className="space-y-8">
                    <section>
                      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-50">
                         <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 border border-blue-100">
                            <Shield size={24} />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Segurança e Acesso</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Controle de credenciais e permissões master</p>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">E-mail Master Autorizado</label>
                            <div className="relative group">
                               <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={18} />
                               <input 
                                 type="email" 
                                 disabled
                                 value={currentUser?.email || 'admin@corujinha.com'} 
                                 className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none text-base italic opacity-70 cursor-not-allowed" 
                               />
                               {currentUser?.providerData.some(p => p.providerId === 'google.com') && (
                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                                   <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                                   <span className="text-[8px] font-black text-brand-primary uppercase tracking-widest">Google Auth</span>
                                 </div>
                               )}
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Segurança da Conta</label>
                            <div className="flex gap-2">
                               <button 
                                 onClick={async () => {
                                   if (currentUser?.email) {
                                     try {
                                       const { sendPasswordResetEmail } = await import('firebase/auth')
                                       await sendPasswordResetEmail(auth, currentUser.email)
                                       alert('E-mail de redefinição enviado!')
                                     } catch (err) {
                                       console.error(err)
                                       alert('Falha ao enviar e-mail.')
                                     }
                                   }
                                 }}
                                 className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all group"
                               >
                                  <Lock size={16} className="group-hover:rotate-12 transition-transform" /> 
                                  Redefinir Senha
                               </button>
                               <div className="flex-[1.5] px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
                                  <Shield size={16} className="text-emerald-500" />
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proteção Ativa</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="mt-8 p-6 bg-slate-50/50 rounded-[1.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 group hover:bg-white hover:shadow-lg transition-all duration-500">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center text-brand-primary border border-brand-primary/10">
                               <Plus size={24} />
                            </div>
                            <div>
                               <h4 className="text-lg font-black text-slate-900 italic tracking-tight">Permitir Novos Administradores</h4>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Habilita ou desabilita o registro de novos membros na equipe</p>
                            </div>
                         </div>
                         <div 
                           onClick={() => setLocalAllowNewAdmins(!currentAllowNewAdmins)}
                           className={`w-14 h-7 rounded-full relative cursor-pointer transition-all duration-500 shadow-inner
                             ${currentAllowNewAdmins ? 'bg-brand-primary' : 'bg-slate-200'}`}
                         >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500
                              ${currentAllowNewAdmins ? 'right-1 scale-105' : 'left-1 scale-100'}`} 
                            />
                         </div>
                      </div>
                    </section>

                    <section className="pt-8 border-t border-slate-50">
                      <div className="bg-rose-50/50 rounded-[1.5rem] p-6 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
                         <div>
                            <h4 className="text-lg font-black text-rose-600 italic tracking-tighter mb-1">Zona de Perigo</h4>
                            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Ações irreversíveis no banco de dados e usuários.</p>
                         </div>
                         <button className="px-6 py-4 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all flex items-center gap-3">
                            <Trash2 size={18} strokeWidth={3} /> Resetar todo o ecossistema
                         </button>
                      </div>
                    </section>
                 </div>
               )}

               {activeTab === 'database' && (
                 <div className="space-y-8">
                    <header className="mb-8">
                       <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Métricas do Banco de Dados</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Visão geral do volume de dados em tempo real</p>
                    </header>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {[
                         { label: 'Famílias', value: families.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                         { label: 'Crianças', value: children.length, icon: Phone, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                         { label: 'Missões', value: tasks.length, icon: ShieldIcon, color: 'text-amber-500', bg: 'bg-amber-50' },
                         { label: 'Prêmios', value: rewards.length, icon: Star, color: 'text-rose-500', bg: 'bg-rose-50' },
                         { label: 'Mascotes', value: mascots.length, icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
                         { label: 'Parceiros', value: partners.length, icon: Handshake, color: 'text-indigo-500', bg: 'bg-indigo-50' }
                       ].map((item, i) => (
                         <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center gap-3">
                            <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
                               <item.icon size={20} />
                            </div>
                            <div>
                               <p className="text-xl font-black text-slate-900 italic">{item.value}</p>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4">
                       <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
                          <AlertTriangle size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-amber-900 uppercase tracking-widest mb-1">Backup Automático</p>
                          <p className="text-[11px] text-amber-700 font-bold leading-relaxed">O sistema realiza backups automáticos a cada 24 horas. O último snapshot foi realizado às 03:00 AM.</p>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'branding' && (
                 <div className="space-y-8">
                    <header className="mb-8">
                       <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Identidade Visual</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configure as cores e logos do aplicativo</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cor Primária</label>
                          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                             <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: primaryColor }} />
                             <input 
                               type="text" 
                               value={primaryColor}
                               onChange={(e) => setPrimaryColor(e.target.value)}
                               className="bg-transparent font-black text-slate-900 outline-none uppercase w-24" 
                             />
                             <div className="flex-1 text-right">
                                <input 
                                  type="color" 
                                  value={primaryColor}
                                  onChange={(e) => setPrimaryColor(e.target.value)}
                                  className="w-8 h-8 rounded-full border-none cursor-pointer"
                                />
                             </div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cor Secundária</label>
                          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                             <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: secondaryColor }} />
                             <input 
                               type="text" 
                               value={secondaryColor}
                               onChange={(e) => setSecondaryColor(e.target.value)}
                               className="bg-transparent font-black text-slate-900 outline-none uppercase w-24" 
                             />
                             <div className="flex-1 text-right">
                                <input 
                                  type="color" 
                                  value={secondaryColor}
                                  onChange={(e) => setSecondaryColor(e.target.value)}
                                  className="w-8 h-8 rounded-full border-none cursor-pointer"
                                />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-slate-50">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Logotipos do App</label>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-brand-primary transition-all cursor-pointer">
                               <Plus className="text-slate-300 group-hover:text-brand-primary" size={20} />
                               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Upload Logo</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
               )}

                {activeTab === 'ai' && (
                  <div className="space-y-8">
                     <header className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-50">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 border border-purple-100">
                           <Sparkles size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Personalidade & Segurança da IA</h3>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configure o comportamento e os filtros de proteção infantil</p>
                        </div>
                     </header>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Arquétipo da IA (Persona)</label>
                           <div className="grid grid-cols-2 gap-3">
                              {[
                                { id: 'mago', label: 'Mago Sábio', icon: '🧙‍♂️' },
                                { id: 'hero', label: 'Super-Herói', icon: '🦸‍♂️' },
                                { id: 'prof', label: 'Professor(a)', icon: '👨‍🏫' },
                                { id: 'amigo', label: 'Melhor Amigo', icon: '🐶' }
                              ].map(p => (
                                <button key={p.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:border-brand-primary transition-all">
                                   <span className="text-2xl">{p.icon}</span>
                                   <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                                </button>
                              ))}
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-[2rem] space-y-4">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-2 text-emerald-600">
                                    <ShieldIcon size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Escudo Infantil Ativo</span>
                                 </div>
                                 <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full" />
                                 </div>
                              </div>
                              <p className="text-[10px] text-emerald-600 font-bold leading-relaxed">
                                 Este filtro remove automaticamente qualquer conteúdo com conotação agressiva, sexual, linguagem imprópria ou temas adultos.
                              </p>
                           </div>

                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nível de Criatividade (Temperatura)</label>
                              <div className="px-4 py-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                                 <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
                                    <span>Conservador (Seguro)</span>
                                    <span>Inovador (Ousado)</span>
                                 </div>
                                 <input type="range" className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="pt-8 border-t border-slate-50 space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Diretrizes de Segurança Personalizadas</label>
                        <textarea 
                           className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold text-slate-600 text-sm h-32 outline-none focus:border-brand-primary transition-all"
                           placeholder="Ex: Nunca mencionar lutas reais, focar sempre em cooperação e bondade, evitar o uso da palavra 'inimigo'..."
                        ></textarea>
                        <p className="text-[9px] font-medium text-slate-400 italic">* Estas diretrizes serão injetadas diretamente no 'core' da inteligência artificial.</p>
                     </div>
                  </div>
                )}

               {activeTab === 'notificacoes' && (
                 <div className="space-y-8">
                    <header className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-50">
                       <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 border border-amber-100">
                          <Bell size={24} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Central de Notificações</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configure como o sistema deve alertar os administradores</p>
                       </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {[
                         { id: 'push', label: 'Push Admin', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50' },
                         { id: 'email', label: 'E-mail Master', icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50' },
                         { id: 'whatsapp', label: 'WhatsApp (Beta)', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                       ].map((channel) => (
                         <div key={channel.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex flex-col items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                            <div className={`w-12 h-12 ${channel.bg} ${channel.color} rounded-xl flex items-center justify-center border border-white`}>
                               <channel.icon size={22} />
                            </div>
                            <div className="text-center">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{channel.label}</p>
                               <div className="w-12 h-6 bg-brand-primary rounded-full relative cursor-pointer shadow-inner">
                                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-md" />
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="space-y-4 pt-8 border-t border-slate-50">
                       <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Alertas Operacionais</h4>
                       {[
                         { title: 'Novos Cadastros de Família', desc: 'Alertar quando uma nova conta Guardian for criada' },
                         { title: 'Solicitações de Validação', desc: 'Notificar sobre novas missões pendentes de revisão' },
                         { title: 'Alertas de Segurança', desc: 'Tentativas de login ou alterações críticas de sistema' },
                         { title: 'Relatórios Semanais', desc: 'Resumo executivo de performance do ecossistema' }
                       ].map((item, i) => (
                         <div key={i} className="p-4 bg-white border border-slate-50 rounded-2xl flex items-center justify-between group hover:border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/5 transition-all">
                            <div>
                               <p className="font-black text-slate-900 text-sm italic">{item.title}</p>
                               <p className="text-[10px] text-slate-400 font-bold">{item.desc}</p>
                            </div>
                            <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                               <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {activeTab === 'pwa' && (
                 <div className="space-y-8">
                    <header className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-50">
                       <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 border border-indigo-100">
                          <Smartphone size={24} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Experiência PWA</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configure como o Corujinha se comporta como aplicativo instalado</p>
                       </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nome do App (Instalação)</label>
                          <input type="text" defaultValue="Corujinha" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Modo de Exibição</label>
                          <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none appearance-none">
                             <option>Standalone (App Nativo)</option>
                             <option>Fullscreen</option>
                             <option>Minimal UI</option>
                          </select>
                       </div>
                    </div>

                    <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-[2rem] space-y-6">
                       <div>
                          <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Sparkles size={16} /> Ícones de Alta Fidelidade
                          </h4>
                          <p className="text-[10px] text-emerald-500 font-bold">Otimize a presença visual na home screen do usuário</p>
                       </div>
                       
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: '512x512', desc: 'Main Icon' },
                            { label: '192x192', desc: 'Android/Chrome' },
                            { label: 'Apple Touch', desc: 'iOS Devices' },
                            { label: 'Maskable', desc: 'Adaptive' }
                          ].map((icon, i) => (
                            <div key={i} className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col items-center text-center gap-2 group hover:shadow-lg transition-all cursor-pointer">
                               <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-400 group-hover:text-emerald-500 transition-colors">
                                  <Plus size={20} />
                               </div>
                               <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">{icon.label}</span>
                               <span className="text-[8px] text-emerald-300 font-bold uppercase">{icon.desc}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[80px] -z-0" />
                       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-brand-accent">
                                <Phone size={18} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Instalação Offline</span>
                             </div>
                             <h4 className="text-xl font-black italic tracking-tighter">Cache Estratégico & Service Workers</h4>
                             <p className="text-[11px] text-white/40 font-bold max-w-md">O ecossistema Corujinha já possui suporte nativo para funcionamento offline e carregamento ultra-rápido.</p>
                          </div>
                          <button className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                             Limpar Cache Global
                          </button>
                       </div>
                    </div>
                 </div>
               )}

               {/* Outras abas seguem o mesmo padrão */}
               {activeTab === 'idioma' && (
                 <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                       <Settings size={32} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Módulo em Desenvolvimento</p>
                 </div>
               )}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </AdminShell>
  )
}
