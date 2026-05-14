'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  Plus, 
  Play, 
  Music, 
  MoreVertical, 
  ExternalLink,
  Eye,
  Heart,
  Sparkles,
  Search
} from 'lucide-react'
import { useState } from 'react'

const mockMedia = [
  { id: '1', title: 'O Tesouro da Corujinha', type: 'video', category: 'Educação', views: 4200, duration: '12:45', premium: true, thumb: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=340&h=180&auto=format&fit=crop' },
  { id: '2', title: 'Música do Ninho (Lofi)', type: 'audio', category: 'Música', views: 8500, duration: '45:00', premium: false, thumb: 'https://images.unsplash.com/photo-1514525253344-f81fad3a232f?q=80&w=340&h=180&auto=format&fit=crop' },
  { id: '3', title: 'Como Poupar sua Primeira Moeda', type: 'video', category: 'Educação', views: 2100, duration: '05:30', premium: true, thumb: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=340&h=180&auto=format&fit=crop' },
]

export default function TvPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Corujinha TV & Music</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Gerencie o império de mídia: vídeos, músicas e histórias originais.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
             <button style={{ 
               padding: '14px 28px', 
               borderRadius: '12px', 
               border: 'none', 
               backgroundColor: '#1E4636', 
               color: 'white', 
               fontWeight: 700, 
               fontSize: '15px',
               cursor: 'pointer',
               display: 'flex',
               alignItems: 'center',
               gap: '10px',
               boxShadow: '0 4px 12px rgba(30, 70, 54, 0.2)'
             }}>
                <Plus size={20} strokeWidth={3} /> Novo Conteúdo
             </button>
          </div>
        </header>

        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
           {['Todos', 'Vídeos', 'Músicas', 'Livros Narrados', 'Premium'].map((cat, i) => (
             <button key={i} style={{ 
               padding: '10px 20px', 
               borderRadius: '10px', 
               backgroundColor: i === 0 ? '#1E4636' : 'white', 
               color: i === 0 ? 'white' : '#64748B',
               fontWeight: 700,
               fontSize: '14px',
               border: i === 0 ? 'none' : '1px solid #E2E8F0',
               cursor: 'pointer'
             }}>
               {cat}
             </button>
           ))}
        </div>

        {/* Media Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
           {mockMedia.map((media) => (
             <div key={media.id} style={{ 
               backgroundColor: 'white', 
               borderRadius: '24px', 
               overflow: 'hidden', 
               border: '1px solid #F1F5F9',
               boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
               transition: 'transform 0.2s, box-shadow 0.2s',
               cursor: 'pointer'
             }}>
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                   <img src={media.thumb} alt={media.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E4636', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                         {media.type === 'video' ? <Play size={28} fill="currentColor" /> : <Music size={28} />}
                      </div>
                   </div>
                   
                   <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                      {media.premium && (
                        <div style={{ 
                          backgroundColor: '#FEF3C7', 
                          color: '#D97706', 
                          padding: '6px 12px', 
                          borderRadius: '10px', 
                          fontSize: '11px', 
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                           <Sparkles size={14} /> PREMIUM
                        </div>
                      )}
                   </div>
                   
                   <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 800 }}>
                      {media.duration}
                   </div>
                </div>
                
                <div style={{ padding: '24px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: 0, lineHeight: 1.4 }}>{media.title}</h3>
                      <button style={{ border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}><MoreVertical size={24} /></button>
                   </div>
                   <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', backgroundColor: '#ECFDF5', padding: '4px 12px', borderRadius: '8px' }}>{media.category}</span>
                   </div>
                   
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', fontWeight: 700 }}>
                            <Eye size={18} /> {media.views.toLocaleString()}
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', fontWeight: 700 }}>
                            <Heart size={18} /> {(media.views * 0.1).toFixed(0)}
                         </div>
                      </div>
                      <button style={{ color: '#1E4636', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '14px' }}>
                         Configurar <ExternalLink size={16} />
                      </button>
                   </div>
                </div>
             </div>
           ))}

           {/* Add New Media Card */}
           <button style={{ 
              height: '420px', 
              borderRadius: '24px', 
              border: '3px dashed #E2E8F0', 
              backgroundColor: 'transparent', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '16px', 
              color: '#64748B',
              cursor: 'pointer',
              transition: 'all 0.3s'
           }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Plus size={32} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800 }}>Novo Conteúdo de Mídia</span>
           </button>
        </div>
      </main>
    </div>
  )
}
