'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MoreVertical
} from 'lucide-react'
import { useState } from 'react'

export default function FinanceiroPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Gestão Financeira</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Acompanhe as assinaturas e a saúde econômica da plataforma.</p>
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
            <Download size={20} strokeWidth={3} /> Exportar Relatório
          </button>
        </header>

        {/* Financial KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
           {[
             { label: 'MRR (Receita Mensal)', value: 'R$ 18.450', change: '+12.5%', up: true, icon: DollarSign, color: '#10B981', bgColor: '#ECFDF5' },
             { label: 'Assinaturas Ativas', value: '432', change: '+42', up: true, icon: Users, color: '#3B82F6', bgColor: '#EFF6FF' },
             { label: 'Churn Rate', value: '2.4%', change: '-0.5%', up: true, icon: TrendingUp, color: '#F59E0B', bgColor: '#FFFBEB' },
             { label: 'Receita Total', value: 'R$ 142.800', change: '+8.2%', up: true, icon: CreditCard, color: '#8B5CF6', bgColor: '#F5F3FF' }
           ].map((stat, i) => (
             <div key={i} style={{ 
               backgroundColor: 'white', 
               padding: '32px', 
               borderRadius: '16px', 
               border: '1px solid #F1F5F9',
               boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
             }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                   <div style={{ 
                     width: '48px', 
                     height: '48px', 
                     borderRadius: '12px', 
                     backgroundColor: stat.bgColor, 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center', 
                     color: stat.color 
                   }}>
                      <stat.icon size={24} />
                   </div>
                   <div style={{ 
                     display: 'flex', 
                     alignItems: 'center', 
                     gap: '4px', 
                     fontSize: '13px', 
                     fontWeight: 800, 
                     color: stat.up ? '#10B981' : '#EF4444',
                     backgroundColor: stat.up ? '#ECFDF5' : '#FEF2F2',
                     padding: '4px 10px',
                     borderRadius: '8px'
                   }}>
                      {stat.up ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />} {stat.change}
                   </div>
                </div>
                <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, margin: '0 0 8px' }}>{stat.label}</p>
                <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', margin: 0 }}>{stat.value}</h3>
             </div>
           ))}
        </div>

        {/* Subscriptions Table - Master Detail Style */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '20px', 
          border: '1px solid #F1F5F9',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
          overflow: 'hidden'
        }}>
           <div style={{ padding: '32px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px' }}>Assinaturas Recentes</h3>
                 <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, margin: 0 }}>Listagem detalhada das últimas transações na plataforma.</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                 <button style={{ 
                   padding: '10px 20px', 
                   borderRadius: '10px', 
                   border: '1px solid #E2E8F0', 
                   backgroundColor: 'white', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '8px', 
                   fontSize: '14px', 
                   fontWeight: 700, 
                   color: '#475569',
                   cursor: 'pointer'
                 }}>
                    <Filter size={18} /> Filtros
                 </button>
              </div>
           </div>
           
           <div style={{ overflowX: 'auto' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                   <tr style={{ backgroundColor: '#F8FAFC' }}>
                      <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Família</th>
                      <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Plano</th>
                      <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Status</th>
                      <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Vencimento</th>
                      <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Valor</th>
                      <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Ações</th>
                   </tr>
                </thead>
                <tbody style={{ fontSize: '15px' }}>
                   {[
                     { name: 'Família Silva', plan: 'Premium Mensal', status: 'Ativo', date: '12 Fev 2026', price: 'R$ 29,90' },
                     { name: 'Família Santos', plan: 'Family Plus Anual', status: 'Pendente', date: '---', price: 'R$ 299,00' },
                     { name: 'Família Oliveira', plan: 'Premium Mensal', status: 'Ativo', date: '15 Fev 2026', price: 'R$ 29,90' },
                     { name: 'Família Pereira', plan: 'Gratuito', status: 'Cancelado', date: '---', price: 'R$ 0,00' },
                   ].map((sub, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #F1F5F9', transition: 'background-color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                         <td style={{ padding: '24px 32px', fontWeight: 700, color: '#0F172A' }}>{sub.name}</td>
                         <td style={{ padding: '24px 32px' }}>
                            <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#F1F5F9', fontSize: '13px', fontWeight: 700, color: '#475569' }}>{sub.plan}</span>
                         </td>
                         <td style={{ padding: '24px 32px' }}>
                            <div style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              padding: '6px 14px', 
                              borderRadius: '20px',
                              backgroundColor: sub.status === 'Ativo' ? '#ECFDF5' : sub.status === 'Pendente' ? '#FFFBEB' : '#FEF2F2',
                              color: sub.status === 'Ativo' ? '#10B981' : sub.status === 'Pendente' ? '#F59E0B' : '#EF4444',
                              fontWeight: 700,
                              fontSize: '13px'
                            }}>
                               {sub.status === 'Ativo' ? <CheckCircle2 size={16} /> : sub.status === 'Pendente' ? <Clock size={16} /> : <XCircle size={16} />}
                               {sub.status}
                            </div>
                         </td>
                         <td style={{ padding: '24px 32px', color: '#64748B', fontWeight: 500 }}>{sub.date}</td>
                         <td style={{ padding: '24px 32px', fontWeight: 800, color: '#0F172A' }}>{sub.price}</td>
                         <td style={{ padding: '24px 32px' }}>
                            <button style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}>
                               <MoreVertical size={20} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
           </div>
        </div>
      </main>
    </div>
  )
}
