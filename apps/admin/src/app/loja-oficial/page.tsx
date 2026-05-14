'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  ShoppingBag, 
  Plus, 
  Package, 
  Truck, 
  Star,
  MoreVertical,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminData } from '@/hooks/use-admin-data'

export default function LojaOficialPage() {
  const { products, isLoading } = useAdminData()

  if (isLoading) {
    return (
      <AdminShell>
         <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-brand-primary">
               <ShoppingBag size={48} />
            </motion.div>
         </div>
      </AdminShell>
    )
  }

  const stats = [
    { label: 'Receita Total', value: `R$ ${(products.reduce((acc, p) => acc + (p.price * p.sales || 0), 0)).toLocaleString()}`, change: '+12%', icon: ShoppingBag, color: '#10B981', bgColor: '#ECFDF5' },
    { label: 'Valor em Estoque', value: `R$ ${(products.reduce((acc, p) => acc + (p.price * p.stock || 0), 0)).toLocaleString()}`, change: `${products.reduce((acc, p) => acc + (p.stock || 0), 0)} un`, icon: Package, color: '#3B82F6', bgColor: '#EFF6FF' },
    { label: 'Pedidos Pendentes', value: '0', change: 'Estável', icon: Truck, color: '#F59E0B', bgColor: '#FFFBEB', isPending: true },
    { label: 'Satisfação Média', value: '5.0/5.0', change: 'Sem aval.', icon: Star, color: '#8B5CF6', bgColor: '#F5F3FF' }
  ]

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <DashboardHeader 
          title="Loja de Merchandising" 
          subtitle="Gestão de produtos físicos e licenciamento oficial da marca Corujinha." 
        />
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <Truck size={18} strokeWidth={3} /> Pedidos
           </button>
           <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
              <Plus size={20} strokeWidth={3} /> Cadastrar
           </button>
        </div>
      </div>

      {/* Tactical Inventory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
         ))}
      </div>

      {/* Catalog Tools */}
      <div className="flex gap-4 mb-10">
         <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar no catálogo de merchandising..." 
              className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[1.5rem] font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-brand-primary transition-all shadow-sm"
            />
         </div>
         <button className="px-8 bg-white border border-slate-100 rounded-[1.5rem] flex items-center gap-3 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} /> Filtros
         </button>
      </div>

      {/* High-Fidelity Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {products.map((product) => (
           <motion.div 
             key={product.id}
             whileHover={{ y: -8 }}
             className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-6 group cursor-pointer"
           >
              <div className="aspect-square bg-slate-50 rounded-[2rem] flex items-center justify-center text-7xl relative border border-slate-50 overflow-hidden group-hover:bg-brand-bg transition-colors">
                 {product.imageURL ? (
                   <img src={product.imageURL} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 ) : (
                   <span className="group-hover:scale-110 transition-transform duration-500">{product.emoji || '📦'}</span>
                 )}
                 <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-xl text-[10px] font-black text-brand-primary uppercase tracking-widest shadow-sm border border-slate-100">
                    {product.category}
                 </div>
              </div>
              
              <div>
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{product.name}</h3>
                    <button className="text-slate-300 hover:text-slate-500 p-1">
                      <MoreVertical size={20} />
                    </button>
                 </div>
                 
                 <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-black text-slate-900 italic tracking-tighter">R$ {(product.price || 0).toFixed(2)}</span>
                    {product.stock < 10 && (
                      <span className="px-3 py-1 bg-red-50 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-lg">Baixo Estoque</span>
                    )}
                 </div>

                 <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estoque</p>
                       <p className="text-sm font-black text-slate-600">{product.stock || 0} un</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Vendas</p>
                       <p className="text-sm font-black text-slate-600">{product.sales || 0} un</p>
                    </div>
                 </div>

                 <button className="w-full py-4 rounded-2xl bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest group-hover:bg-brand-primary group-hover:text-white transition-all flex items-center justify-center gap-2">
                    Gerenciar Detalhes <ChevronRight size={16} strokeWidth={3} />
                 </button>
              </div>
           </motion.div>
         ))}

         {/* Create New Product Placeholder */}
         <motion.button 
           whileHover={{ scale: 0.98 }}
           className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center gap-6 p-12 group hover:border-brand-primary/20 hover:bg-brand-bg transition-all min-h-[400px]"
         >
            <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-all shadow-sm">
               <Plus size={32} strokeWidth={3} />
            </div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-primary transition-colors">Novo Produto</p>
         </motion.button>
      </div>
    </AdminShell>
  )
}
