'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Handshake, 
  Plus, 
  Mail, 
  MoreVertical, 
  ExternalLink,
  TrendingUp,
  MapPin,
  Search,
  Globe,
  Briefcase,
  ShieldCheck,
  X,
  Upload,
  Check,
  Edit2,
  Trash2,
  Ban
} from 'lucide-react'
import { useState } from 'react'

const mockPartners = [
  { id: '1', name: 'Escola Pequeno Cientista', category: 'Educacional', location: 'São Paulo, SP', status: 'Ativo', commission: '15%', activeFamilies: 124, logo: '🏫', url: 'https://escola.com' },
  { id: '2', name: 'Brinquedos Criativos', category: 'Produtos', location: 'Curitiba, PR', status: 'Ativo', commission: '10%', activeFamilies: 88, logo: '🧸', url: 'https://loja.com' },
  { id: '3', name: 'Psicologia Infantil ABC', category: 'Saúde', location: 'Rio de Janeiro, RJ', status: 'Em Análise', commission: '20%', activeFamilies: 0, logo: '🧠', url: 'https://saude.com' },
  { id: '4', name: 'Esportes & Ação Kids', category: 'Lazer', location: 'Belo Horizonte, MG', status: 'Ativo', commission: '12%', activeFamilies: 45, logo: '⚽', url: 'https://esportes.com' },
]

export default function ParceirosPage() {
  const [partners, setPartners] = useState(mockPartners)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuccess(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsSuccess(false)
    }, 2000)
  }

  const handleDelete = (id: string) => {
    setPartners(partners.filter(p => p.id !== id))
    setOpenMenuId(null)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1E4636', marginBottom: '8px', letterSpacing: '-0.02em' }}>Rede de Parceiros B2B</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Gerencie as alianças estratégicas e serviços integrados ao ecossistema Corujinha.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '14px 28px', 
              backgroundColor: '#1E4636', 
              color: 'white', 
              borderRadius: '12px', 
              border: 'none', 
              fontWeight: 800, 
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(30, 70, 54, 0.2)',
              transition: 'transform 0.2s'
            }}
          >
            <Plus size={20} strokeWidth={3} /> Nova Parceria
          </button>
        </header>

        {/* Global Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
           {[
             { label: 'Total de Parceiros', value: '42', sub: '3 novos este mês', icon: Handshake, color: '#10B981' },
             { label: 'Conversões via B2B', value: '1.240', sub: '+18% crescimento', icon: TrendingUp, color: '#3B82F6' },
             { label: 'Comissão Média', value: '14.5%', sub: 'Receita recorrente', icon: Briefcase, color: '#8B5CF6' }
           ].map((stat, i) => (
             <div key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, border: '1px solid #F1F5F9' }}>
                   <stat.icon size={28} />
                </div>
                <div>
                   <p style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 700, margin: '0 0 2px' }}>{stat.label}</p>
                   <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0 }}>{stat.value}</h3>
                   <p style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, margin: 0 }}>{stat.sub}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
           <div style={{ flex: 1, position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
              <input type="text" placeholder="Buscar parceiros..." style={{ width: '100%', padding: '16px 20px 16px 56px', borderRadius: '16px', border: '1px solid #E2E8F0', backgroundColor: 'white', fontSize: '15px', fontWeight: 500, outline: 'none' }} />
           </div>
        </div>

        {/* Partner Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '32px' }}>
           {partners.map((partner) => (
             <div key={partner.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '24px', 
                padding: '32px', 
                border: '1px solid #F1F5F9',
                display: 'flex', 
                flexDirection: 'column', 
                gap: '28px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                position: 'relative'
              }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                       <div style={{ width: '72px', height: '72px', borderRadius: '20px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', border: '1px solid #F1F5F9' }}>
                          {partner.logo}
                       </div>
                       <div>
                          <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px' }}>{partner.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <span style={{ fontSize: '11px', fontWeight: 900, color: '#10B981', backgroundColor: '#ECFDF5', padding: '3px 10px', borderRadius: '6px' }}>{partner.category}</span>
                             {partner.status === 'Ativo' && <ShieldCheck size={16} style={{ color: '#1E4636' }} />}
                          </div>
                       </div>
                    </div>
                    
                    {/* Action Menu */}
                    <div style={{ position: 'relative' }}>
                       <button 
                         onClick={() => setOpenMenuId(openMenuId === partner.id ? null : partner.id)}
                         style={{ border: '2px solid #F1F5F9', backgroundColor: 'white', padding: '8px', borderRadius: '10px', color: '#94A3B8', cursor: 'pointer' }}
                       >
                          <MoreVertical size={20} />
                       </button>
                       {openMenuId === partner.id && (
                         <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: 'white', borderRadius: '14px', border: '1px solid #F1F5F9', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 10, width: '180px', padding: '8px', overflow: 'hidden' }}>
                            <button style={{ width: '100%', padding: '10px 12px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 700, color: '#475569', cursor: 'pointer', borderRadius: '8px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                               <Edit2 size={16} /> Editar
                            </button>
                            <button style={{ width: '100%', padding: '10px 12px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 700, color: '#F59E0B', cursor: 'pointer', borderRadius: '8px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFFBEB'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                               <Ban size={16} /> Desativar
                            </button>
                            <button 
                              onClick={() => handleDelete(partner.id)}
                              style={{ width: '100%', padding: '10px 12px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 700, color: '#EF4444', cursor: 'pointer', borderRadius: '8px' }} 
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                               <Trash2 size={16} /> Excluir
                            </button>
                         </div>
                       )}
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '20px', border: '1px solid #F1F5F9' }}>
                       <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#94A3B8', fontWeight: 800 }}>COMISSÃO</p>
                       <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#1E4636' }}>{partner.commission}</p>
                    </div>
                    <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '20px', border: '1px solid #F1F5F9' }}>
                       <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#94A3B8', fontWeight: 800 }}>ALCANCE</p>
                       <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#1E4636' }}>{partner.activeFamilies} fam.</p>
                    </div>
                 </div>

                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '13px', fontWeight: 700 }}>
                       <MapPin size={16} /> {partner.location}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                       <a 
                         href={`mailto:contato@${partner.name.toLowerCase().replace(/ /g, '')}.com.br`}
                         style={{ width: '48px', height: '48px', borderRadius: '14px', border: '2px solid #F1F5F9', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer', textDecoration: 'none' }}
                       >
                          <Mail size={20} />
                       </a>
                       <button 
                         onClick={() => window.open(partner.url, '_blank')}
                         style={{ width: '48px', height: '48px', borderRadius: '14px', border: '2px solid #F1F5F9', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}
                       >
                          <ExternalLink size={20} />
                       </button>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* ... Modal Logic ... */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
             <div style={{ backgroundColor: 'white', borderRadius: '32px', width: '100%', maxWidth: '600px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', position: 'relative' }}>
                {isSuccess ? (
                  <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                     <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Check size={40} strokeWidth={3} /></div>
                     <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginBottom: '12px' }}>Parceria Registrada!</h2>
                  </div>
                ) : (
                  <>
                    <header style={{ padding: '32px 40px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Nova Aliança B2B</h2>
                       <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={24} /></button>
                    </header>
                    <form onSubmit={handleCreatePartner} style={{ padding: '40px' }}>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                             <label style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>NOME DA EMPRESA</label>
                             <input required type="text" style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '15px' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                             <label style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>CUPOM</label>
                             <input type="text" style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '15px' }} />
                          </div>
                       </div>
                       <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '14px', backgroundColor: '#1E4636', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Confirmar Parceria</button>
                    </form>
                  </>
                )}
             </div>
          </div>
        )}
      </main>
    </div>
  )
}
