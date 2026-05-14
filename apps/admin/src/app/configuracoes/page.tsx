'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Palette, 
  Save,
  Lock,
  Mail,
  Smartphone,
  Check,
  ChevronRight,
  Monitor,
  Type,
  Image as ImageIcon,
  MousePointer2,
  Download,
  Languages,
  Clock,
  Zap,
  Globe2,
  Trash2,
  Plus
} from 'lucide-react'
import { useState } from 'react'

type TabType = 'seguranca' | 'notificacoes' | 'firestore' | 'localizacao' | 'branding' | 'pwa'

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('notificacoes')
  
  // Theme State
  const [primaryColor, setPrimaryColor] = useState('#1E4636')
  const [secondaryColor, setSecondaryColor] = useState('#10B981')
  const [alertColor, setAlertColor] = useState('#EF4444')
  const [fontFamily, setFontFamily] = useState('Outfit')

  const tabs = [
    { id: 'seguranca', icon: Shield, label: 'Segurança e Acesso' },
    { id: 'notificacoes', icon: Bell, label: 'Notificações do Sistema' },
    { id: 'firestore', icon: Database, label: 'Banco de Dados' },
    { id: 'localizacao', icon: Globe, label: 'Região e Idioma' },
    { id: 'branding', icon: Palette, label: 'Branding Visual' },
    { id: 'pwa', icon: Smartphone, label: 'Experiência PWA' }
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Configurações Globais</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Ajuste os parâmetros críticos e a identidade da plataforma Corujinha.</p>
          </div>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '14px 28px', 
            backgroundColor: '#1E4636', 
            color: 'white', 
            borderRadius: '12px', 
            border: 'none', 
            fontWeight: 800, 
            fontSize: '15px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(30, 70, 54, 0.2)'
          }}>
            <Save size={20} strokeWidth={3} /> Salvar Parâmetros
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '48px' }}>
          {/* Settings Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
             {tabs.map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id as TabType)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '18px 24px', 
                    borderRadius: '16px', 
                    border: activeTab === tab.id ? '2px solid #1E4636' : '2px solid transparent', 
                    backgroundColor: activeTab === tab.id ? 'white' : 'transparent', 
                    color: activeTab === tab.id ? '#1E4636' : '#64748B',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer',
                    boxShadow: activeTab === tab.id ? '0 10px 20px rgba(0,0,0,0.04)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                   <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <tab.icon size={20} strokeWidth={activeTab === tab.id ? 3 : 2} />
                      {tab.label}
                   </div>
                   {activeTab === tab.id && <ChevronRight size={16} strokeWidth={3} />}
                </button>
             ))}
          </div>

          {/* Dynamic Content Area */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '32px', 
            padding: '48px', 
            border: '1px solid #F1F5F9',
            boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
          }}>
             {activeTab === 'branding' && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                  {/* Colors Section */}
                  <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                          <Palette size={20} />
                       </div>
                       <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Identidade de Marca</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                       {[
                         { label: 'Cor Primária', value: primaryColor, setter: setPrimaryColor },
                         { label: 'Cor de Destaque', value: secondaryColor, setter: setSecondaryColor },
                         { label: 'Cor de Urgência', value: alertColor, setter: setAlertColor }
                       ].map((item, i) => (
                          <div key={i} style={{ padding: '32px 24px', borderRadius: '24px', border: '1px solid #F1F5F9', textAlign: 'center', backgroundColor: '#F8FAFC' }}>
                             <div style={{ 
                               width: '64px', 
                               height: '64px', 
                               backgroundColor: item.value, 
                               borderRadius: '16px', 
                               margin: '0 auto 20px', 
                               boxShadow: `0 10px 20px ${item.value}20`,
                               cursor: 'pointer',
                               border: '4px solid white'
                             }} />
                             <p style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>{item.label}</p>
                             <input 
                               type="text" 
                               value={item.value} 
                               onChange={(e) => item.setter(e.target.value)}
                               style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 700, border: 'none', backgroundColor: 'transparent', textAlign: 'center', width: '100%', outline: 'none' }} 
                             />
                          </div>
                       ))}
                    </div>
                  </section>

                  {/* Logo Management */}
                  <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                          <ImageIcon size={20} />
                       </div>
                       <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Logotipia Oficial</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                       <div style={{ padding: '40px', backgroundColor: '#F8FAFC', borderRadius: '24px', border: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                          <div style={{ width: '120px', height: '120px', backgroundColor: 'white', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>🦉</div>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748B' }}>Logo Principal (Símbolo)</p>
                          <div style={{ display: 'flex', gap: '10px' }}>
                             <button style={{ padding: '8px 16px', borderRadius: '10px', backgroundColor: '#1E4636', color: 'white', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Alterar</button>
                             <button style={{ padding: '8px 16px', borderRadius: '10px', backgroundColor: 'white', color: '#EF4444', border: '1px solid #FEE2E2', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Remover</button>
                          </div>
                       </div>
                       <div style={{ padding: '40px', backgroundColor: primaryColor, borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                          <h2 style={{ color: 'white', fontWeight: 900, fontSize: '28px', margin: 0 }}>Corujinha</h2>
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '13px' }}>Versão Horizontal (Marca D'água)</p>
                       </div>
                    </div>
                  </section>

                  {/* UI Elements Preview */}
                  <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                          <MousePointer2 size={20} />
                       </div>
                       <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Preview de Componentes</h3>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '32px', backgroundColor: '#F8FAFC', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
                       <button style={{ padding: '16px 32px', backgroundColor: primaryColor, color: 'white', border: 'none', borderRadius: '14px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', boxShadow: `0 8px 16px ${primaryColor}30` }}>Botão Primário</button>
                       <button style={{ padding: '16px 32px', backgroundColor: secondaryColor, color: 'white', border: 'none', borderRadius: '14px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', boxShadow: `0 8px 16px ${secondaryColor}30` }}>Destaque</button>
                       <button style={{ padding: '16px 32px', backgroundColor: 'white', color: primaryColor, border: `2px solid ${primaryColor}`, borderRadius: '14px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>Outline</button>
                       <button style={{ padding: '16px 32px', backgroundColor: alertColor, color: 'white', border: 'none', borderRadius: '14px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>Alerta</button>
                    </div>
                  </section>

                  {/* Typography Selection */}
                  <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                          <Type size={20} />
                       </div>
                       <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Tipografia</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                       {['Outfit', 'Inter', 'Roboto'].map((font) => (
                          <button 
                            key={font} 
                            onClick={() => setFontFamily(font)}
                            style={{ 
                              padding: '24px', 
                              borderRadius: '16px', 
                              border: fontFamily === font ? `2px solid ${primaryColor}` : '2px solid #F1F5F9', 
                              backgroundColor: fontFamily === font ? '#F8FAF9' : 'white',
                              textAlign: 'left',
                              cursor: 'pointer'
                            }}
                          >
                             <h4 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 900, color: '#0F172A', fontFamily: font }}>{font}</h4>
                             <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: 500 }}>The quick brown fox jumps over the lazy dog.</p>
                          </button>
                       ))}
                    </div>
                  </section>
               </div>
             )}

             {activeTab === 'notificacoes' && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                        <Bell size={20} />
                     </div>
                     <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Central de Alertas e Notificações</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Canais Habilitados</h4>
                        {[
                          { label: 'E-mail Transacional', desc: 'Envio de convites e confirmações.', status: true },
                          { label: 'Push Notifications', desc: 'Alertas diretos no celular.', status: true },
                          { label: 'Relatórios Automáticos', desc: 'Envio semanal para guardiões.', status: false },
                          { label: 'Alertas de Suporte', desc: 'Novas solicitações de ajuda.', status: true }
                        ].map((item, i) => (
                           <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: '20px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                              <div style={{ flex: 1 }}>
                                 <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>{item.label}</p>
                                 <p style={{ margin: 0, fontSize: '12px', color: '#64748B', fontWeight: 500 }}>{item.desc}</p>
                              </div>
                              <div style={{ width: '48px', height: '26px', borderRadius: '20px', backgroundColor: item.status ? '#10B981' : '#CBD5E1', position: 'relative', cursor: 'pointer' }}>
                                 <div style={{ position: 'absolute', right: item.status ? '4px' : 'auto', left: item.status ? 'auto' : '4px', top: '3px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white' }} />
                              </div>
                           </div>
                        ))}
                     </div>
                     <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Logs Recentes</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                           {['Relatório Semanal Enviado', 'Nova Missão Criada', 'Erro de Login Admin'].map((log, i) => (
                              <div key={i} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #F1F5F9', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                                 {log}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'pwa' && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FDF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                          <Smartphone size={20} />
                       </div>
                       <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Configurações PWA</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                           <label style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Nome do Aplicativo</label>
                           <input type="text" defaultValue="Corujinha App" style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 600 }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                           <label style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Cor de Tema (Browser)</label>
                           <input type="text" defaultValue={primaryColor} style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 600 }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
                           <div>
                              <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: '15px' }}>Modo Offline</p>
                              <p style={{ margin: 0, fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Permitir acesso básico sem internet.</p>
                           </div>
                           <div style={{ width: '48px', height: '26px', borderRadius: '20px', backgroundColor: '#10B981', position: 'relative' }}>
                              <div style={{ position: 'absolute', right: '3px', top: '3px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white' }} />
                           </div>
                        </div>
                     </div>

                     <div style={{ padding: '40px', backgroundColor: '#0F172A', borderRadius: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', position: 'relative' }}>
                        <div style={{ width: '180px', height: '360px', border: '8px solid rgba(255,255,255,0.1)', borderRadius: '30px', position: 'relative', overflow: 'hidden', backgroundColor: 'white' }}>
                           <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                              <div style={{ width: '64px', height: '64px', backgroundColor: primaryColor, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🦉</div>
                              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>Corujinha</h4>
                              <div style={{ padding: '10px 24px', backgroundColor: primaryColor, color: 'white', borderRadius: '10px', fontSize: '12px', fontWeight: 800 }}>Instalar App</div>
                           </div>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600 }}>Visualização Mobile do Manifesto</p>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'localizacao' && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                          <Globe2 size={20} />
                       </div>
                       <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Região e Localização</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Idioma Padrão</label>
                        <div style={{ position: 'relative' }}>
                           <Languages style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
                           <select style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 600, appearance: 'none', backgroundColor: 'white' }}>
                              <option>Português (Brasil)</option>
                              <option>English (USA)</option>
                              <option>Español</option>
                           </select>
                        </div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Fuso Horário</label>
                        <div style={{ position: 'relative' }}>
                           <Clock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
                           <select style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 600, appearance: 'none', backgroundColor: 'white' }}>
                              <option>Brasília (GMT-3)</option>
                              <option>New York (EST)</option>
                              <option>London (GMT)</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'seguranca' && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FDF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                          <Shield size={20} />
                       </div>
                       <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Controle de Acesso</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <label style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>E-mail Master</label>
                          <div style={{ position: 'relative' }}>
                             <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
                             <input type="email" defaultValue="admin@corujinha.com" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 600 }} />
                          </div>
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <label style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Chave de Autenticação</label>
                          <div style={{ position: 'relative' }}>
                             <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
                             <input type="password" defaultValue="********" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 600 }} />
                          </div>
                       </div>
                    </div>
                  </section>

                  <section>
                     <div style={{ padding: '32px', borderRadius: '24px', backgroundColor: '#FEF2F2', border: '2px solid #FEE2E2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                           <h4 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 900, color: '#991B1B' }}>Zona de Perigo</h4>
                           <p style={{ margin: 0, fontSize: '14px', color: '#B91C1C', fontWeight: 500 }}>Ações irreversíveis no banco de dados e usuários.</p>
                        </div>
                        <button style={{ padding: '12px 24px', borderRadius: '12px', backgroundColor: '#EF4444', color: 'white', border: 'none', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Trash2 size={20} /> Resetar Ecossistema
                        </button>
                     </div>
                  </section>
               </div>
             )}

             {activeTab === 'firestore' && (
               <div style={{ textAlign: 'center', padding: '100px 0' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '24px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: '#10B981', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.1)' }}>
                     <Check size={40} strokeWidth={3} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '12px' }}>Firebase Sincronizado</h3>
                  <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500, maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>O núcleo de dados está conectado e operando em perfeita harmonia com o ambiente de produção.</p>
                  <button style={{ marginTop: '32px', padding: '12px 24px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#475569', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Testar Conexão Novamente</button>
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  )
}
