'use client'

import { AdminShell } from '@/components/admin-shell'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Download,
  Filter,
  CheckCircle2,   
  MoreVertical
} from 'lucide-react'
import { useAdminData } from '@/hooks/use-admin-data'
import { motion } from 'framer-motion'

export default function FinanceiroPage() {
  const { families, isLoading } = useAdminData()

  if (isLoading) {
    return (
      <AdminShell>
         <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2 }} className="text-brand-primary">
               <DollarSign size={48} />
            </motion.div>
         </div>
      </AdminShell>
    )
  }

  const kpis = [
    { label: 'Receita Prevista', value: `R$ ${(families.length * 29.9).toLocaleString()}`, change: '+12.5%', up: true, icon: DollarSign, color: '#10B981', bgColor: '#ECFDF5' },
    { label: 'Famílias Ativas', value: families.length.toString(), change: '+42', up: true, icon: Users, color: '#3B82F6', bgColor: '#EFF6FF' },
    { label: 'Ticket Médio', value: 'R$ 29,90', change: 'Estável', up: true, icon: TrendingUp, color: '#F59E0B', bgColor: '#FFFBEB' },
    { label: 'Impacto Social', value: families.length.toString(), change: 'Famílias', up: true, icon: CreditCard, color: '#8B5CF6', bgColor: '#F5F3FF' }
  ]

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <DashboardHeader 
          title="Gestão Financeira" 
          subtitle="Acompanhe as assinaturas e a saúde econômica da plataforma." 
        />
        <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
          <Download size={20} strokeWidth={3} /> Exportar Relatório
        </button>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {kpis.map((stat, i) => (
           <StatCard 
             key={i}
             label={stat.label}
             value={stat.value}
             change={stat.change}
             icon={stat.icon}
             color={stat.color}
             bgColor={stat.bgColor}
           />
         ))}
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
         <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
               <h3 className="text-2xl font-black text-slate-900 mb-1">Status de Assinatura por Família</h3>
               <p className="text-sm text-slate-500 font-bold text-center md:text-left">Listagem detalhada das famílias e seus planos vigentes.</p>
            </div>
            <button className="px-8 py-3 bg-white border border-slate-100 rounded-2xl flex items-center gap-2 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
               <Filter size={18} /> Filtros
            </button>
         </div>
         
         <div className="overflow-x-auto">
           <table className="w-full border-collapse">
              <thead>
                 <tr className="bg-slate-50/50">
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Família</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Plano</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Vencimento</th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                    <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                 {families.map((family, i) => (
                    <tr key={family.id} className="hover:bg-slate-50/30 transition-colors group">
                       <td className="px-10 py-8 font-black text-slate-900">Família {family.name || family.id.slice(0, 5)}</td>
                       <td className="px-10 py-8">
                          <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-[11px] font-black uppercase tracking-widest">Premium Mensal</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest bg-emerald-50 text-emerald-500`}
                          >
                             <CheckCircle2 size={16} strokeWidth={3} />
                             Ativo
                          </div>
                       </td>
                       <td className="px-10 py-8 text-sm text-slate-400 font-black">Próx. Mês</td>
                       <td className="px-10 py-8 font-black text-slate-900 text-lg italic">R$ 29,90</td>
                       <td className="px-10 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-all">
                             <MoreVertical size={20} />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
         </div>
      </div>
    </AdminShell>
  )
}
