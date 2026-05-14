'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  Mail, 
  Calendar,
  UserPlus,
  Coins
} from 'lucide-react'
import { useState } from 'react'

const mockFamilies = [
  { id: '1', name: 'Família Silva', avatar: '🏡', photoURL: undefined, email: 'pai.silva@email.com', members: 4, activeMissions: 3, totalCoins: 450, joined: '12 Jan 2026' },
  { id: '2', name: 'Família Santos', avatar: '🌊', photoURL: undefined, email: 'mae.santos@email.com', members: 3, activeMissions: 1, totalCoins: 120, joined: '15 Jan 2026' },
  { id: '3', name: 'Família Oliveira', avatar: '🌳', photoURL: undefined, email: 'oliveira@email.com', members: 5, activeMissions: 8, totalCoins: 890, joined: '05 Jan 2026' },
  { id: '4', name: 'Família Pereira', avatar: '🦅', photoURL: undefined, email: 'pereira.fam@email.com', members: 2, activeMissions: 0, totalCoins: 45, joined: '20 Jan 2026' },
]

export default function FamiliasPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Gestão de Famílias</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Gerencie os guardiões e aventureiros cadastrados no ecossistema.</p>
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
            fontWeight: 700, 
            fontSize: '15px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(30, 70, 54, 0.2)'
          }}>
            <UserPlus size={20} strokeWidth={3} /> Convidar Família
          </button>
        </header>

        {/* Search and Filters Bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
            <input 
              type="text" 
              placeholder="Buscar por sobrenome da família ou e-mail do guardião..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '16px 20px 16px 56px', 
                borderRadius: '14px', 
                border: '1px solid #E2E8F0', 
                backgroundColor: 'white',
                fontSize: '15px',
                fontWeight: 500,
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                outline: 'none'
              }}
            />
          </div>
          <button style={{ 
            padding: '0 24px', 
            borderRadius: '14px', 
            border: '1px solid #E2E8F0', 
            backgroundColor: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            color: '#475569', 
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer' 
          }}>
            <Filter size={18} /> Filtros Avançados
          </button>
        </div>

        {/* High-Fidelity Data Table */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          border: '1px solid #F1F5F9',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '24px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Família & Identidade</th>
                <th style={{ padding: '24px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Membros</th>
                <th style={{ padding: '24px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Engajamento</th>
                <th style={{ padding: '24px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Tesouro Acumulado</th>
                <th style={{ padding: '24px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Cadastro</th>
                <th style={{ padding: '24px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '15px' }}>
              {mockFamilies.map((family) => (
                <tr key={family.id} style={{ borderTop: '1px solid #F1F5F9', transition: 'background-color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '14px', 
                        backgroundColor: '#F1F5F9', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: 900,
                        fontSize: '24px',
                        border: '2px solid white',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                        overflow: 'hidden'
                      }}>
                        {/* @ts-ignore */}
                        {family.photoURL ? (
                          <img src={family.photoURL} alt={family.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          /* @ts-ignore */
                          family.avatar || '🏠'
                        )}
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>{family.name}</p>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail size={14} /> {family.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '6px 14px', 
                      borderRadius: '10px', 
                      backgroundColor: '#F1F5F9', 
                      fontSize: '13px', 
                      fontWeight: 700, 
                      color: '#475569' 
                    }}>
                       <Users size={16} /> {family.members}
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: family.activeMissions > 3 ? '#10B981' : family.activeMissions > 0 ? '#F59E0B' : '#CBD5E1',
                        boxShadow: `0 0 0 4px ${family.activeMissions > 3 ? '#10B98120' : family.activeMissions > 0 ? '#F59E0B20' : '#CBD5E120'}`
                      }} />
                      <span style={{ fontWeight: 700, color: '#475569' }}>{family.activeMissions} missões</span>
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: 900, fontSize: '18px' }}>
                       <Coins size={20} fill="currentColor" opacity={0.8} /> {family.totalCoins}
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px', color: '#64748B', fontWeight: 500 }}>
                    {family.joined}
                  </td>
                  <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                      <button style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '10px', 
                        border: '1px solid #E2E8F0', 
                        backgroundColor: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer', 
                        color: '#64748B',
                        transition: 'all 0.2s'
                      }} onMouseOver={(e) => (e.currentTarget.style.color = '#1E4636')} onMouseOut={(e) => (e.currentTarget.style.color = '#64748B')}>
                        <ExternalLink size={18} />
                      </button>
                      <button style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '10px', 
                        border: '1px solid #E2E8F0', 
                        backgroundColor: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer', 
                        color: '#64748B' 
                      }}>
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Statistics */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '15px', color: '#64748B', fontWeight: 500 }}>Exibindo o controle de <b>4</b> famílias ativas</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button disabled style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#CBD5E1', fontWeight: 700, fontSize: '14px', cursor: 'not-allowed' }}>Anterior</button>
            <button style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#1E4636', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>Próxima Página</button>
          </div>
        </div>
      </main>
    </div>
  )
}
