'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Lightbulb, 
  Plus, 
  Search, 
  Eye, 
  MoreVertical,
  TrendingUp,
  Brain,
  Sparkles,
  Calendar,
  BarChart3,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const mockTips = [
  { id: '1', title: 'Sabedoria do Ninho: Por que poupar?', category: 'Financeiro', status: 'Ativa', views: 1240, engagement: '92%', lastEdit: '2 dias atrás' },
  { id: '2', title: 'O Poder da Arrumação Mágica', category: 'Comportamento', status: 'Ativa', views: 856, engagement: '78%', lastEdit: '5 dias atrás' },
  { id: '3', title: 'Dica da Corujinha: Frutas são Superpoderes', category: 'Saúde', status: 'Agendada', views: 0, engagement: '0%', lastEdit: 'Hoje' },
  { id: '4', title: 'Como se tornar um Mestre da Calma', category: 'Emocional', status: 'Rascunho', views: 0, engagement: '0%', lastEdit: '1 semana atrás' },
]

export default function DicasPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Dicas da Corujinha</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Gerencie as pílulas de conhecimento e o conteúdo educativo global.</p>
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
            <Plus size={20} strokeWidth={3} /> Nova Pílula Mágica
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
          {/* Content Management Area */}
          <div>
             <div style={{ position: 'relative', marginBottom: '32px' }}>
                <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar dicas por título, categoria ou palavra-chave..." 
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px 16px 56px', 
                    borderRadius: '14px', 
                    border: '1px solid #E2E8F0', 
                    fontSize: '15px',
                    fontWeight: 500,
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                  }}
                />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mockTips.map((tip) => (
                   <div key={tip.id} style={{ 
                     backgroundColor: 'white', 
                     borderRadius: '20px', 
                     padding: '24px', 
                     border: '1px solid #F1F5F9',
                     display: 'flex', 
                     alignItems: 'center', 
                     gap: '24px',
                     boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                     transition: 'transform 0.2s'
                   }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}>
                      <div style={{ 
                        width: '56px', 
                        height: '56px', 
                        borderRadius: '14px', 
                        backgroundColor: '#F1F5F9', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#1E4636' 
                      }}>
                         {tip.category === 'Financeiro' ? <TrendingUp size={28} /> : tip.category === 'Comportamento' ? <Brain size={28} /> : <Sparkles size={28} />}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tip.category}</span>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
                            <span style={{ 
                               fontSize: '11px', 
                               fontWeight: 900, 
                               color: tip.status === 'Ativa' ? '#10B981' : tip.status === 'Agendada' ? '#3B82F6' : '#94A3B8',
                               backgroundColor: tip.status === 'Ativa' ? '#ECFDF5' : tip.status === 'Agendada' ? '#EFF6FF' : '#F8FAFC',
                               padding: '2px 8px',
                               borderRadius: '6px'
                            }}>{tip.status}</span>
                         </div>
                         <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: 0 }}>{tip.title}</h3>
                      </div>

                      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', padding: '0 24px', borderRight: '1px solid #F1F5F9', borderLeft: '1px solid #F1F5F9' }}>
                         <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 900, color: '#0F172A' }}>{tip.views}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Vistas</p>
                         </div>
                         <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 900, color: '#0F172A' }}>{tip.engagement}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Engaj.</p>
                         </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <button style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Eye size={20} />
                         </button>
                         <button style={{ border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}>
                            <MoreVertical size={24} />
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Performance Intelligence Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
             <div style={{ 
               backgroundColor: 'white', 
               borderRadius: '24px', 
               padding: '32px', 
               border: '1px solid #F1F5F9',
               boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
             }}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <BarChart3 size={20} color="#3B82F6" /> Top Performance
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   {[1, 2, 3].map((_, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                         <div style={{ fontSize: '14px', fontWeight: 900, color: '#94A3B8', width: '20px' }}>{i+1}</div>
                         <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Poupar moedas é mágico</p>
                            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>98.2% engajamento</p>
                         </div>
                         <ChevronRight size={16} color="#CBD5E1" />
                      </div>
                   ))}
                </div>
             </div>

             <div style={{ 
               backgroundColor: '#1E4636', 
               borderRadius: '24px', 
               padding: '32px', 
               color: 'white',
               boxShadow: '0 10px 20px rgba(30, 70, 54, 0.2)',
               backgroundImage: 'linear-gradient(135deg, #1E4636 0%, #2D6A4F 100%)'
             }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                   <Calendar size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>Calendário Editorial</h3>
                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '24px', lineHeight: 1.5 }}>Você possui <b>3 pílulas mágicas</b> agendadas para os próximos 7 dias. Mantenha o ritmo!</p>
                <button style={{ 
                  width: '100%', 
                  padding: '14px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  backgroundColor: 'white', 
                  color: '#1E4636', 
                  fontWeight: 800, 
                  fontSize: '14px', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>Ver Agenda Completa</button>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
