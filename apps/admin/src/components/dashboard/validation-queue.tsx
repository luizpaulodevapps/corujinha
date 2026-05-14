'use client'

import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TaskExecution } from '@corujinha/domain'

interface ValidationQueueProps {
  tasks: TaskExecution[]
  onApprove: (task: TaskExecution) => void
  onReject: (id: string, reason: string) => void
}

export function ValidationQueue({ tasks, onApprove, onReject }: ValidationQueueProps) {
  return (
    <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 mb-1 italic tracking-tight">Fila de Validação Prioritária</h3>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Analise as evidências enviadas pelos pequenos heróis.</p>
        </div>
        
        <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em]
          ${tasks.length > 0 ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-emerald-50 text-emerald-500 border border-emerald-100'}`}
        >
          {tasks.length > 0 ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
          {tasks.length} solicitações em espera
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {tasks.length === 0 ? (
          <div className="text-center py-16 px-10">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-2 italic">Tudo em Ordem!</h4>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">O Universo Corujinha está operando em 100% de harmonia.</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Criança</th>
                <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Missão</th>
                <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Evidência</th>
                <th className="px-8 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Horário</th>
                <th className="px-8 py-5 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Decisão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.tr 
                    key={task.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-brand-primary/20">
                          {task.childName.charAt(0)}
                        </div>
                        <span className="font-black text-slate-900 text-sm">{task.childName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-bold text-slate-600 text-sm">{task.taskTitle}</span>
                    </td>
                    <td className="px-8 py-6">
                      {task.proofImageUrl ? (
                        <a 
                          href={task.proofImageUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="block w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md hover:scale-110 transition-transform cursor-zoom-in"
                        >
                          <img src={task.proofImageUrl} alt="Prova" className="w-full h-full object-cover" />
                        </a>
                      ) : (
                        <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">
                          Sem Foto
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-400">
                      {task.completedAt 
                        ? new Date(task.completedAt.seconds * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
                        : '--:--'}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onApprove(task)}
                          className="h-10 px-5 rounded-xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:translate-y-1"
                        >
                          <CheckCircle2 size={14} strokeWidth={3} /> Aprovar
                        </button>
                        <button 
                          onClick={() => onReject(task.id, 'Evidência insuficiente')}
                          className="h-10 px-5 rounded-xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2 shadow-lg shadow-red-500/20 active:translate-y-1"
                        >
                          <XCircle size={14} strokeWidth={3} /> Recusar
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
