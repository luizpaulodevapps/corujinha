'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Sparkles, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Star,
  Trash2,
  Palette,
  Loader2
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { collection, query, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore'
import type { Mascot } from '@corujinha/domain'

export default function MascotesPage() {
  const [mascots, setMascots] = useState<Mascot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const db = getFirebaseFirestore()

  useEffect(() => {
    const q = query(collection(db, 'mascots'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setMascots(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Mascot)))
      setIsLoading(false)
    })
    return unsub
  }, [db])

  const toggleDefault = async (id: string, currentlyDefault: boolean) => {
    if (currentlyDefault) return 

    for (const m of mascots) {
       if (m.isDefault) {
         await updateDoc(doc(db, 'mascots', m.id), { isDefault: false })
       }
    }
    
    await updateDoc(doc(db, 'mascots', id), { isDefault: true, active: true })
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Laboratório de Mascotes</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Crie e gerencie os guardiões mágicos que acompanham os pequenos aventureiros.</p>
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
            <Plus size={20} strokeWidth={3} /> Incubar Novo Mascote
          </button>
        </header>

        {/* Mascot Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
          {isLoading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px' }}>
               <Loader2 size={48} className="animate-spin" color="#1E4636" />
            </div>
          ) : mascots.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '120px 40px', 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              border: '3px dashed #E2E8F0',
              color: '#64748B'
            }}>
               <Sparkles size={64} style={{ marginBottom: '24px', opacity: 0.3 }} />
               <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>O Ninho está Vazio!</h3>
               <p style={{ fontSize: '16px', fontWeight: 500, margin: 0 }}>Comece incubando o primeiro guardião mágico do Universo Corujinha.</p>
            </div>
          ) : (
            <>
              {mascots.map((mascot) => (
                <div key={mascot.id} style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                   {mascot.isDefault && (
                     <div style={{ 
                       position: 'absolute', 
                       top: '20px', 
                       left: '20px', 
                       backgroundColor: '#FEF3C7', 
                       color: '#D97706', 
                       padding: '6px 14px', 
                       borderRadius: '12px', 
                       fontSize: '11px', 
                       fontWeight: 900, 
                       display: 'flex', 
                       alignItems: 'center', 
                       gap: '6px', 
                       zIndex: 10,
                       boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                     }}>
                       <Star size={14} fill="#D97706" /> GUARDIÃO MESTRE
                     </div>
                   )}
                   
                   <div style={{ 
                     height: '240px', 
                     backgroundColor: '#F8FAFC', 
                     position: 'relative', 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center', 
                     overflow: 'hidden',
                     borderBottom: '1px solid #F1F5F9'
                   }}>
                      {mascot.imageUrl ? (
                        <img src={mascot.imageUrl} alt={mascot.name} style={{ height: '70%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }} />
                      ) : (
                        <Palette size={80} color="#CBD5E1" strokeWidth={1} />
                      )}
                   </div>

                   <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                         <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>{mascot.name}</h3>
                         <button style={{ border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}><MoreVertical size={24} /></button>
                      </div>
                      <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '24px', lineHeight: 1.6, fontWeight: 500 }}>{mascot.description}</p>
                      
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                         {mascot.traits?.map((trait, i) => (
                           <span key={i} style={{ 
                             fontSize: '12px', 
                             fontWeight: 800, 
                             backgroundColor: '#ECFDF5', 
                             color: '#10B981', 
                             padding: '6px 14px', 
                             borderRadius: '10px' 
                           }}>{trait}</span>
                         ))}
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                         <button 
                           onClick={() => toggleDefault(mascot.id, mascot.isDefault)}
                           disabled={mascot.isDefault}
                           style={{ 
                             flex: 1, 
                             padding: '14px', 
                             borderRadius: '12px', 
                             border: mascot.isDefault ? 'none' : '1px solid #E2E8F0', 
                             backgroundColor: mascot.isDefault ? '#1E4636' : 'white', 
                             color: mascot.isDefault ? 'white' : '#475569',
                             fontWeight: 800, 
                             fontSize: '14px', 
                             cursor: mascot.isDefault ? 'default' : 'pointer',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             gap: '10px',
                             transition: 'all 0.2s'
                           }}
                         >
                           {mascot.isDefault ? <CheckCircle2 size={18} strokeWidth={3} /> : <Star size={18} />}
                           {mascot.isDefault ? 'Guardião Ativo' : 'Tornar Mestre'}
                         </button>
                         <button style={{ 
                           width: '48px', 
                           height: '48px', 
                           borderRadius: '12px', 
                           border: '1px solid #FEE2E2', 
                           backgroundColor: '#FFF1F2', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           color: '#EF4444', 
                           cursor: 'pointer',
                           transition: 'all 0.2s'
                         }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FECDD3')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FFF1F2')}>
                            <Trash2 size={20} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
              
              {/* Add New Placeholder */}
              <button style={{ 
                 height: '100%',
                 minHeight: '480px',
                 borderRadius: '24px', 
                 border: '3px dashed #E2E8F0', 
                 backgroundColor: 'transparent', 
                 display: 'flex', 
                 flexDirection: 'column', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 gap: '20px', 
                 color: '#64748B',
                 cursor: 'pointer',
                 transition: 'all 0.3s'
              }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                 <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={32} />
                 </div>
                 <span style={{ fontSize: '18px', fontWeight: 800 }}>Incubar Novo Guardião</span>
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
