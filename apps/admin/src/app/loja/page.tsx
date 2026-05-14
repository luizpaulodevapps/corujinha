'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Tag, 
  Package, 
  DollarSign, 
  MoreVertical,
  Star,
  Gamepad2,
  Tv,
  IceCream,
  Sparkles,
  Zap
} from 'lucide-react'
import { useState } from 'react'

const mockProducts = [
  { id: '1', title: '30 min de Tablet', cost: 50, category: 'Tecnologia', emoji: '📱', stock: 'Ilimitado', status: 'Ativo', sales: 342 },
  { id: '2', title: 'Sobremesa Especial', cost: 30, category: 'Comida', emoji: '🍦', stock: 'Ilimitado', status: 'Ativo', sales: 156 },
  { id: '3', title: 'Escolher o Filme', cost: 40, category: 'Lazer', emoji: '🎬', stock: 'Ilimitado', status: 'Ativo', sales: 89 },
  { id: '4', title: 'Dormir 30 min mais tarde', cost: 60, category: 'Lazer', emoji: '🌙', stock: 'Ilimitado', status: 'Pausado', sales: 124 },
  { id: '5', title: 'Escolher o Jantar', cost: 100, category: 'Comida', emoji: '🍕', stock: 'Ilimitado', status: 'Ativo', sales: 56 },
  { id: '6', title: 'Vale Abraço Gigante', cost: 5, category: 'Afeição', emoji: '🫂', stock: 'Ilimitado', status: 'Ativo', sales: 999 },
]

export default function LojaPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1E4636', marginBottom: '8px', letterSpacing: '-0.02em' }}>Loja de Recompensas</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Configure os itens que as crianças podem trocar por suas moedas e XP.</p>
          </div>
          <button style={{ 
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
            boxShadow: '0 8px 20px rgba(30, 70, 54, 0.2)'
          }}>
            <Plus size={20} strokeWidth={3} /> Novo Item de Troca
          </button>
        </header>

        {/* Reward Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
           {[
             { label: 'Itens Trocados', value: '1.850', sub: 'Total histórico', icon: Zap, color: '#F59E0B' },
             { label: 'Economia Circular', value: '45.8k', sub: 'Moedas em giro', icon: DollarSign, color: '#10B981' },
             { label: 'Item Mais Popular', value: 'Vale Tablet', sub: '342 trocas', icon: Star, color: '#3B82F6' },
             { label: 'Categorias', value: '8', sub: 'Diversidade de prêmios', icon: Tag, color: '#8B5CF6' }
           ].map((stat, i) => (
             <div key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, marginBottom: '16px', border: '1px solid #F1F5F9' }}>
                   <stat.icon size={20} />
                </div>
                <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700, margin: '0 0 2px' }}>{stat.label}</p>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>{stat.value}</h3>
                <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, margin: 0 }}>{stat.sub}</p>
             </div>
           ))}
        </div>

        {/* Control Bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
           <div style={{ flex: 1, position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
              <input 
                type="text" 
                placeholder="Filtrar por nome do prêmio ou categoria..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 500, outline: 'none' }} 
              />
           </div>
           <div style={{ display: 'flex', gap: '8px' }}>
              {['Todos', 'Lazer', 'Comida', 'Tecnologia'].map((cat, i) => (
                <button key={i} style={{ padding: '0 20px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: i === 0 ? '#1E4636' : 'white', color: i === 0 ? 'white' : '#64748B', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}>{cat}</button>
              ))}
           </div>
        </div>

        {/* Reward Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
           {mockProducts.map((product) => (
             <div key={product.id} style={{ 
               backgroundColor: 'white', 
               borderRadius: '24px', 
               padding: '24px', 
               border: '1px solid #F1F5F9',
               display: 'flex', 
               flexDirection: 'column',
               gap: '20px',
               transition: 'all 0.2s',
               cursor: 'pointer'
             }}
             onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.04)'}
             onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                   <div style={{ 
                     width: '64px', 
                     height: '64px', 
                     borderRadius: '20px', 
                     backgroundColor: '#F8FAFC', 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center', 
                     fontSize: '32px',
                     border: '1px solid #F1F5F9'
                   }}>
                      {product.emoji}
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', fontWeight: 900, color: product.status === 'Ativo' ? '#10B981' : '#EF4444', backgroundColor: product.status === 'Ativo' ? '#ECFDF5' : '#FEF2F2', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>{product.status}</span>
                      <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>{product.sales} trocas</p>
                   </div>
                </div>

                <div>
                   <span style={{ fontSize: '11px', fontWeight: 800, color: '#1E4636', opacity: 0.5, letterSpacing: '0.05em' }}>{product.category.toUpperCase()}</span>
                   <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '2px 0 16px', letterSpacing: '-0.02em' }}>{product.title}</h3>
                   
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', backgroundColor: '#FFFBEB', borderRadius: '16px', border: '1px solid #FEF3C7' }}>
                      <DollarSign size={20} className="text-amber-600" />
                      <span style={{ fontSize: '20px', fontWeight: 910, color: '#D97706' }}>{product.cost} <span style={{ fontSize: '13px', fontWeight: 800 }}>Moedas</span></span>
                   </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                   <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#475569', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}>Editar</button>
                   <button style={{ 
                     flex: 1, 
                     padding: '12px', 
                     borderRadius: '12px', 
                     border: 'none', 
                     backgroundColor: '#1E4636', 
                     color: 'white', 
                     fontWeight: 800, 
                     fontSize: '13px', 
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '6px'
                   }}>
                      Dashboard <Sparkles size={14} />
                   </button>
                </div>
             </div>
           ))}

           {/* Add New Reward Placeholder */}
           <button style={{ 
              borderRadius: '24px', 
              border: '3px dashed #E2E8F0', 
              backgroundColor: 'transparent', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '16px', 
              padding: '40px',
              cursor: 'pointer',
              color: '#94A3B8'
           }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'white')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Plus size={28} strokeWidth={3} />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 800 }}>Novo Item de Recompensa</span>
           </button>
        </div>
      </main>
    </div>
  )
}
