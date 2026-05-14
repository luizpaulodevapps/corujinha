'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Users, 
  Sword, 
  TrendingUp, 
  Clock,
  ChevronUp,
  Activity,
  Loader2,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Calendar,
  AlertCircle
} from 'lucide-react'
import { useAdminData } from '@/hooks/use-admin-data'

export default function AdminDashboard() {
  const { families, children, tasks, pendingTasks, isLoading, approveTask, rejectTask } = useAdminData()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar />
        <main style={{ flex: 1, backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
             <Loader2 className="animate-spin" size={48} color="#1E4636" style={{ marginBottom: '16px' }} />
             <p style={{ fontWeight: 700, color: '#64748B' }}>Sincronizando Universo...</p>
          </div>
        </main>
      </div>
    )
  }

  const stats = [
    { label: 'Famílias Ativas', value: families.length.toString(), change: '+12%', icon: Users, color: '#3B82F6', bgColor: '#EFF6FF' },
    { label: 'Pequenos Heróis', value: children.length.toString(), change: '+18%', icon: Activity, color: '#8B5CF6', bgColor: '#F5F3FF' },
    { label: 'Missões Ativas', value: tasks.filter(t => t.active).length.toString(), change: '+5%', icon: Sword, color: '#10B981', bgColor: '#ECFDF5' },
    { label: 'Validações', value: pendingTasks.length.toString(), change: 'Pendentes', icon: Clock, color: '#F59E0B', bgColor: '#FFFBEB' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Dashboard Executivo</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Bem-vindo ao Centro de Comando Estratégico da Corujinha.</p>
          </div>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px 20px', 
            borderRadius: '14px', 
            border: '1px solid #E2E8F0', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            fontSize: '15px', 
            fontWeight: 700, 
            color: '#475569',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <Calendar size={20} color="#1E4636" /> {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </header>

        {/* Vital Signs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '20px', 
              border: '1px solid #F1F5F9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '14px', 
                  backgroundColor: stat.bgColor, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: stat.color 
                }}>
                  <stat.icon size={26} />
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  color: i === 3 ? '#F59E0B' : '#10B981', 
                  fontSize: '13px', 
                  fontWeight: 800, 
                  backgroundColor: i === 3 ? '#FFFBEB' : '#ECFDF5', 
                  padding: '6px 12px', 
                  borderRadius: '10px', 
                  height: 'fit-content' 
                }}>
                  {i < 3 && <ChevronUp size={14} strokeWidth={3} />} {stat.change}
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, marginBottom: '8px' }}>{stat.label}</p>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', margin: 0 }}>{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Dashboard Intelligence Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* Pending Validations - Priority Queue */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '24px', 
            border: '1px solid #F1F5F9',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '32px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                 <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px' }}>Fila de Validação Prioritária</h3>
                 <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, margin: 0 }}>Analise as evidências enviadas pelos pequenos heróis.</p>
              </div>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: 800, 
                backgroundColor: pendingTasks.length > 0 ? '#FEF2F2' : '#ECFDF5', 
                color: pendingTasks.length > 0 ? '#EF4444' : '#10B981', 
                padding: '8px 16px', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {pendingTasks.length > 0 ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                {pendingTasks.length} solicitações em espera
              </div>
            </div>
            
            <div style={{ padding: '0' }}>
              {pendingTasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 40px', color: '#64748B' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', margin: '0 auto 24px' }}>
                     <CheckCircle2 size={40} />
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>Tudo em Ordem!</h4>
                  <p style={{ fontWeight: 500, margin: 0 }}>O Universo Corujinha está operando em 100% de harmonia.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC' }}>
                        <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Criança</th>
                        <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Missão</th>
                        <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Evidência</th>
                        <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Horário</th>
                        <th style={{ padding: '20px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', textAlign: 'right' }}>Decisão</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: '15px' }}>
                      {pendingTasks.map((exec) => (
                        <tr key={exec.id} style={{ borderTop: '1px solid #F1F5F9', transition: 'background-color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                          <td style={{ padding: '24px 32px' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1E4636' }}>
                                   {exec.childName.charAt(0)}
                                </div>
                                <span style={{ fontWeight: 700, color: '#0F172A' }}>{exec.childName}</span>
                             </div>
                          </td>
                          <td style={{ padding: '24px 32px', color: '#475569', fontWeight: 600 }}>{exec.taskTitle}</td>
                          <td style={{ padding: '24px 32px' }}>
                             {exec.proofImageUrl ? (
                               <a href={exec.proofImageUrl} target="_blank" rel="noreferrer" style={{ 
                                 width: '48px', 
                                 height: '48px', 
                                 borderRadius: '10px', 
                                 overflow: 'hidden', 
                                 display: 'block', 
                                 border: '2px solid #E2E8F0',
                                 transition: 'transform 0.2s'
                               }} onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                                 <img src={exec.proofImageUrl} alt="Prova" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                               </a>
                             ) : (
                               <div style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', fontSize: '12px', color: '#94A3B8', fontWeight: 700, border: '1px solid #E2E8F0', width: 'fit-content' }}>
                                  SEM FOTO
                               </div>
                             )}
                          </td>
                          <td style={{ padding: '24px 32px', color: '#64748B', fontWeight: 500 }}>
                            {exec.completedAt ? new Date(exec.completedAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '---'}
                          </td>
                          <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                              <button 
                                onClick={() => approveTask(exec)}
                                style={{ 
                                  padding: '10px 20px', 
                                  borderRadius: '10px', 
                                  border: 'none', 
                                  backgroundColor: '#ECFDF5', 
                                  color: '#10B981', 
                                  fontWeight: 800, 
                                  fontSize: '13px',
                                  cursor: 'pointer', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '8px',
                                  transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D1FAE5')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ECFDF5')}
                              >
                                <CheckCircle2 size={18} strokeWidth={3} /> Aprovar
                              </button>
                              <button 
                                onClick={() => rejectTask(exec.id, 'Evidência insuficiente')}
                                style={{ 
                                  padding: '10px 20px', 
                                  borderRadius: '10px', 
                                  border: 'none', 
                                  backgroundColor: '#FEF2F2', 
                                  color: '#EF4444', 
                                  fontWeight: 800, 
                                  fontSize: '13px',
                                  cursor: 'pointer', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '8px',
                                  transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                              >
                                <XCircle size={18} strokeWidth={3} /> Recusar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
