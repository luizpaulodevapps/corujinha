'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Sword, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Coins,
  Loader2,
  Trophy,
  Target
} from 'lucide-react'
import { useState } from 'react'
import { useAdminData } from '@/hooks/use-admin-data'
import { MissionModal } from '@/components/mission-modal'

export default function MissoesPage() {
  const { tasks, isLoading } = useAdminData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar />
        <main style={{ flex: 1, backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 className="animate-spin" size={48} color="#1E4636" />
        </main>
      </div>
    )
  }

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Gestão de Missões</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Crie, edite e monitore as tarefas épicas que guiam os pequenos heróis.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ 
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
            }}
          >
            <Plus size={20} strokeWidth={3} /> Nova Missão Global
          </button>
        </header>

        {/* Tactical Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: 'Missões Ativas', value: tasks.filter(t => t.active).length, icon: Target, color: '#10B981', bgColor: '#ECFDF5' },
            { label: 'Total de Modelos', value: tasks.length, icon: Sword, color: '#3B82F6', bgColor: '#EFF6FF' },
            { label: 'Categorias Mágicas', value: new Set(tasks.map(t => t.category)).size, icon: Trophy, color: '#F59E0B', bgColor: '#FFFBEB' }
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'white', padding: '24px 32px', borderRadius: '16px', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '20px' }}>
               <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: stat.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  <stat.icon size={26} />
               </div>
               <div>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#64748B', fontWeight: 600 }}>{stat.label}</p>
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>{stat.value}</h3>
               </div>
            </div>
          ))}
        </div>

        {/* Global Missions Table */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          border: '1px solid #F1F5F9',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
               <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
               <input 
                 type="text" 
                 placeholder="Buscar missões pelo título ou categoria..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 style={{ 
                   width: '100%', 
                   padding: '12px 16px 12px 48px', 
                   borderRadius: '12px', 
                   border: '1px solid #E2E8F0', 
                   fontSize: '15px',
                   fontWeight: 500,
                   outline: 'none',
                   transition: 'border-color 0.2s'
                 }}
               />
            </div>
            <button style={{ 
              padding: '0 20px', 
              borderRadius: '12px', 
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
              <Filter size={18} /> Filtros
            </button>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F8FAFC' }}>
              <tr style={{ color: '#64748B', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '20px 32px' }}>Missão & Detalhes</th>
                <th style={{ padding: '20px 32px' }}>Categoria</th>
                <th style={{ padding: '20px 32px' }}>Dificuldade</th>
                <th style={{ padding: '20px 32px' }}>Recompensa Principal</th>
                <th style={{ padding: '20px 32px' }}>Origem</th>
                <th style={{ padding: '20px 32px' }}>Status Global</th>
                <th style={{ padding: '20px 32px', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '15px' }}>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '80px', textAlign: 'center', color: '#64748B', fontWeight: 500 }}>Nenhuma missão encontrada no universo atual.</td>
                </tr>
              ) : filteredTasks.map((mission) => (
                <tr key={mission.id} style={{ borderTop: '1px solid #F1F5F9', transition: 'background-color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E4636' }}>
                          <Sword size={20} />
                       </div>
                       <div>
                          <p style={{ fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>{mission.title}</p>
                          <p style={{ margin: 0, fontSize: '13px', color: '#64748B', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mission.description}</p>
                       </div>
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#475569', fontSize: '13px', fontWeight: 700 }}>
                      {mission.category}
                    </span>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: mission.difficulty === 'easy' ? '#10B981' : mission.difficulty === 'medium' ? '#F59E0B' : '#EF4444', boxShadow: '0 0 8px rgba(0,0,0,0.05)' }} />
                        {mission.difficulty === 'easy' ? 'Iniciante' : mission.difficulty === 'medium' ? 'Intermediária' : 'Avançada'}
                     </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                       <span style={{ fontWeight: 800, color: '#D97706', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px' }}>
                         <Coins size={18} fill="currentColor" opacity={0.8} /> {mission.rewardCoins}
                       </span>
                       <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>+ {mission.rewardXp} XP de bônus</span>
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    {/* @ts-ignore */}
                    {mission.isCustom ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                         <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#F5F3FF', color: '#8B5CF6', fontSize: '11px', fontWeight: 800, width: 'fit-content' }}>PERSONALIZADA</span>
                         <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>Família VIP</span>
                      </div>
                    ) : (
                      <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#10B981', fontSize: '11px', fontWeight: 800, width: 'fit-content' }}>GLOBAL</span>
                    )}
                  </td>
                  <td style={{ padding: '24px 32px' }}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '6px 14px', 
                      borderRadius: '20px',
                      backgroundColor: mission.active ? '#ECFDF5' : '#FEF2F2',
                      color: mission.active ? '#10B981' : '#EF4444',
                      fontWeight: 800,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                       {mission.active ? <CheckCircle2 size={14} strokeWidth={3} /> : <Clock size={14} strokeWidth={3} />}
                       {mission.active ? 'Ativa' : 'Inativa'}
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                    <button style={{ border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer', padding: '8px' }}>
                       <MoreVertical size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <MissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  )
}
