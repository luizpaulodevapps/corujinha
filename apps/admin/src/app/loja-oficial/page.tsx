'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { 
  ShoppingBag, 
  Plus, 
  Package, 
  Truck, 
  Star,
  Layers,
  ArrowUpRight,
  MoreVertical,
  ChevronRight,
  Search
} from 'lucide-react'
import { useState } from 'react'

const mockProducts = [
  { id: '1', name: 'Pelúcia Corujinha Sábia', price: 89.90, stock: 120, sales: 45, category: 'Brinquedos', image: '🦉' },
  { id: '2', name: 'Livro: O Mistério das Moedas', price: 45.00, stock: 350, sales: 124, category: 'Livros', image: '📖' },
  { id: '3', name: 'Kit Mestre Tesoureiro', price: 129.90, stock: 50, sales: 88, category: 'Acessórios', image: '🪙' },
  { id: '4', name: 'Mochila Explorador da Floresta', price: 159.00, stock: 85, sales: 32, category: 'Acessórios', image: '🎒' },
]

export default function LojaOficialPage() {
  const [products] = useState(mockProducts)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '48px' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Loja de Merchandising</h1>
            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 500 }}>Gestão de produtos físicos e licenciamento oficial da marca Corujinha.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
             <button style={{ 
               padding: '14px 24px', 
               borderRadius: '12px', 
               border: '1px solid #E2E8F0', 
               backgroundColor: 'white', 
               color: '#475569',
               fontWeight: 800, 
               fontSize: '14px', 
               cursor: 'pointer', 
               display: 'flex', 
               alignItems: 'center', 
               gap: '10px',
               boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
             }}>
                <Truck size={18} strokeWidth={2.5} /> Gestão de Pedidos
             </button>
             <button style={{ 
               padding: '14px 28px', 
               borderRadius: '12px', 
               border: 'none', 
               backgroundColor: '#1E4636', 
               color: 'white', 
               fontWeight: 800, 
               fontSize: '14px', 
               cursor: 'pointer', 
               display: 'flex', 
               alignItems: 'center', 
               gap: '10px',
               boxShadow: '0 8px 16px rgba(30, 70, 54, 0.2)'
             }}>
                <Plus size={18} strokeWidth={3} /> Cadastrar Produto
             </button>
          </div>
        </header>

        {/* Tactical Inventory Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
           {[
             { label: 'Receita Total', value: 'R$ 14.890', sub: '+12% este mês', icon: ShoppingBag, color: '#10B981', bgColor: '#ECFDF5' },
             { label: 'Valor em Estoque', value: 'R$ 42.850', sub: '1.240 unidades', icon: Package, color: '#3B82F6', bgColor: '#EFF6FF' },
             { label: 'Pedidos Pendentes', value: '14', sub: '4 urgentes', icon: Truck, color: '#F59E0B', bgColor: '#FFFBEB' },
             { label: 'Satisfação', value: '4.9/5.0', sub: '256 avaliações', icon: Star, color: '#8B5CF6', bgColor: '#F5F3FF' }
           ].map((stat, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '20px', 
                border: '1px solid #F1F5F9',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
              }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '12px', 
                      backgroundColor: stat.bgColor, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: stat.color 
                    }}>
                       <stat.icon size={22} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', backgroundColor: '#ECFDF5', padding: '4px 8px', borderRadius: '6px' }}>
                       LIVE
                    </span>
                 </div>
                 <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 700, margin: '0 0 4px' }}>{stat.label}</p>
                 <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px' }}>{stat.value}</h3>
                 <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, margin: 0 }}>{stat.sub}</p>
              </div>
           ))}
        </div>

        {/* Catalog Tools */}
        <div style={{ marginBottom: '32px', display: 'flex', gap: '16px' }}>
           <div style={{ flex: 1, position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
              <input 
                type="text" 
                placeholder="Pesquisar no catálogo de merchandising..." 
                style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 500, outline: 'none', backgroundColor: 'white' }} 
              />
           </div>
           <button style={{ padding: '0 24px', borderRadius: '14px', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#475569', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>Filtros</button>
        </div>

        {/* High-Fidelity Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
           {products.map((product) => (
             <div key={product.id} style={{ 
               backgroundColor: 'white', 
               borderRadius: '24px', 
               padding: '24px',
               border: '1px solid #F1F5F9',
               display: 'flex', 
               flexDirection: 'column', 
               gap: '24px',
               boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
               transition: 'transform 0.2s, box-shadow 0.2s',
               cursor: 'pointer'
             }}
             onMouseOver={(e) => {
               e.currentTarget.style.transform = 'translateY(-4px)'
               e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.04)'
             }}
             onMouseOut={(e) => {
               e.currentTarget.style.transform = 'translateY(0)'
               e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.02)'
             }}>
                <div style={{ 
                  height: '240px', 
                  backgroundColor: '#F8FAFC', 
                  borderRadius: '18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '80px',
                  position: 'relative',
                  border: '1px solid #F1F5F9'
                }}>
                   {product.image}
                   <div style={{ 
                     position: 'absolute', 
                     top: '16px', 
                     left: '16px', 
                     backgroundColor: 'white', 
                     padding: '4px 12px', 
                     borderRadius: '8px', 
                     fontSize: '11px', 
                     fontWeight: 900, 
                     color: '#1E4636',
                     boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                   }}>
                      {product.category}
                   </div>
                </div>
                
                <div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>{product.name}</h3>
                      <MoreVertical size={20} color="#94A3B8" />
                   </div>
                   
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <span style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>R$ {product.price.toFixed(2)}</span>
                      {product.stock < 100 && (
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#EF4444', backgroundColor: '#FEF2F2', padding: '2px 8px', borderRadius: '4px' }}>
                           BAIXO ESTOQUE
                        </span>
                      )}
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                      <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                         <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>ESTOQUE</p>
                         <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#475569' }}>{product.stock} un</p>
                      </div>
                      <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                         <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>VENDAS</p>
                         <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#475569' }}>{product.sales} un</p>
                      </div>
                   </div>

                   <button style={{ 
                     width: '100%', 
                     padding: '14px', 
                     borderRadius: '12px', 
                     border: 'none', 
                     backgroundColor: '#F1F5F9', 
                     color: '#1E4636', 
                     fontWeight: 800, 
                     fontSize: '14px', 
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '8px',
                     transition: 'all 0.2s'
                   }}
                   onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E9F5EB')}
                   onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}>
                      Gerenciar Detalhes <ChevronRight size={18} />
                   </button>
                </div>
             </div>
           ))}

           {/* Create New Product Placeholder */}
           <div style={{ 
             borderRadius: '24px', 
             border: '3px dashed #E2E8F0', 
             backgroundColor: 'white', 
             display: 'flex', 
             flexDirection: 'column', 
             alignItems: 'center', 
             justifyContent: 'center', 
             gap: '20px', 
             padding: '40px',
             cursor: 'pointer',
             transition: 'all 0.2s'
           }}
           onMouseOver={(e) => (e.currentTarget.style.borderColor = '#1E4636')}
           onMouseOut={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F8FAFC', border: '2px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1' }}>
                 <Plus size={32} strokeWidth={3} />
              </div>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#64748B', margin: 0 }}>Novo Produto Licenciado</p>
           </div>
        </div>
      </main>
    </div>
  )
}
