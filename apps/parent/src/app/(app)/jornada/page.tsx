'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  GraduationCap, 
  Stethoscope, 
  Trophy, 
  PartyPopper, 
  Tent,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  X,
  Target
} from 'lucide-react'

// --- Mock Data ---

const EVENT_TYPES = [
  { id: 'school', label: 'Escola', icon: GraduationCap, color: '#3B82F6', bgColor: '#EFF6FF', missions: ['Estudar 20 min', 'Revisar conteúdo', 'Preparar mochila'] },
  { id: 'health', label: 'Saúde', icon: Stethoscope, color: '#10B981', bgColor: '#ECFDF5', missions: ['Preparar carteirinha', 'Levar garrafinha', 'Separar máscara'] },
  { id: 'sports', label: 'Esportes', icon: Trophy, color: '#F59E0B', bgColor: '#FFFBEB', missions: ['Separar uniforme', 'Lavar chuteira', 'Dormir cedo'] },
  { id: 'social', label: 'Festa', icon: PartyPopper, color: '#EC4899', bgColor: '#FDF2F8', missions: ['Escolher presente', 'Confirmar presença', 'Separar look'] },
  { id: 'family', label: 'Família', icon: Tent, color: '#8B5CF6', bgColor: '#F5F3FF', missions: ['Ajudar nos preparativos', 'Organizar brinquedos', 'Planejar roteiro'] },
]

const MOCK_JOURNEY = [
  { 
    id: '1', 
    title: 'Prova de Matemática', 
    type: 'school', 
    date: 'Sexta, 15 Mai', 
    time: '08:00',
    status: 'planned',
    derivedMissions: [
      { id: 'm1', title: 'Revisar Tabuada', status: 'done', xp: 50 },
      { id: 'm2', title: 'Fazer 5 exercícios', status: 'pending', xp: 80 },
      { id: 'm3', title: 'Organizar Estojo', status: 'pending', xp: 30 }
    ]
  },
  { 
    id: '2', 
    title: 'Campeonato de Judô', 
    type: 'sports', 
    date: 'Sábado, 16 Mai', 
    time: '14:30',
    status: 'upcoming',
    derivedMissions: [
      { id: 'm4', title: 'Separar Kimono', status: 'pending', xp: 40 },
      { id: 'm5', title: 'Hidratação Máxima', status: 'pending', xp: 20 }
    ]
  }
]

// --- Components ---

export default function JornadaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(EVENT_TYPES[0])
  const [title, setTitle] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const handleCreateEvent = () => {
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-bg-main p-6 lg:p-12 pb-32">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-black text-brand-primary tracking-tighter italic leading-tight">Mapa da Semana</h1>
          <p className="text-text-secondary font-bold flex items-center gap-2 mt-2">
            <Sparkles size={18} className="text-brand-accent" /> Transforme compromissos em aventuras épicas.
          </p>
        </motion.div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary !rounded-3xl bg-brand-primary text-white h-16 px-8 flex items-center gap-4 shadow-[0_8px_0_0_#1B4332] hover:translate-y-1 hover:shadow-[0_4px_0_0_#1B4332] transition-all"
        >
          <Plus size={24} strokeWidth={3} />
          <span className="font-black text-lg uppercase tracking-wider">Criar Evento Mágico</span>
        </button>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Magic Calendar Timeline */}
        <div className="xl:col-span-2 space-y-8">
           <div className="bg-white rounded-[3rem] p-10 border-4 border-card-border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-brand-primary/5 -rotate-12">
                 <CalendarIcon size={160} strokeWidth={1} />
              </div>

              <div className="relative z-10">
                 <h2 className="text-3xl font-black text-brand-primary italic mb-10 flex items-center gap-4">
                    <CalendarIcon size={32} /> Próximos Destinos
                 </h2>

                 <div className="space-y-12">
                    {MOCK_JOURNEY.map((event, idx) => {
                       const typeInfo = EVENT_TYPES.find(t => t.id === event.type) ?? EVENT_TYPES[0]
                       if (!typeInfo) return null

                       return (
                         <div key={event.id} className="relative pl-12 border-l-4 border-dashed border-brand-primary/10 last:border-0 pb-4">
                            {/* Dot */}
                            <div 
                              className="absolute left-[-14px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-lg"
                              style={{ backgroundColor: typeInfo.color }}
                            />
                            
                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                               {/* Event Card */}
                               <div className="flex-1 bg-bg-main p-8 rounded-[2.5rem] border-4 border-white shadow-xl hover:scale-[1.02] transition-transform cursor-pointer">
                                  <div className="flex justify-between items-start mb-6">
                                     <div className="flex items-center gap-4">
                                        <div 
                                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                                          style={{ backgroundColor: typeInfo.color }}
                                        >
                                           <typeInfo.icon size={28} />
                                        </div>
                                        <div>
                                           <h3 className="text-2xl font-black text-brand-primary italic">{event.title}</h3>
                                           <p className="text-text-muted font-bold text-sm uppercase tracking-wider">{typeInfo.label}</p>
                                        </div>
                                     </div>
                                     <div className="bg-white px-4 py-2 rounded-xl border-2 border-brand-primary/5 text-brand-primary font-black text-sm">
                                        {event.time}
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-6 text-text-secondary font-bold">
                                     <div className="flex items-center gap-2">
                                        <CalendarIcon size={18} /> {event.date}
                                     </div>
                                     <div className="flex items-center gap-2">
                                        <MapPin size={18} /> Presencial
                                     </div>
                                  </div>
                               </div>

                               {/* Derived Missions Arrow */}
                               <div className="hidden lg:flex items-center justify-center text-brand-primary/20">
                                  <ArrowRight size={48} strokeWidth={3} />
                                </div>

                               {/* Missions List */}
                               <div className="w-full lg:w-72 space-y-3">
                                  <h4 className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">Missões Preparatórias</h4>
                                  {event.derivedMissions.map(mission => (
                                    <div key={mission.id} className={`p-4 rounded-2xl border-2 flex items-center justify-between group transition-all ${mission.status === 'done' ? 'bg-brand-success/10 border-brand-success/20' : 'bg-white border-brand-primary/5'}`}>
                                       <div className="flex items-center gap-3">
                                          {mission.status === 'done' ? <CheckCircle2 size={18} className="text-brand-success" /> : <div className="w-[18px] h-[18px] rounded-full border-2 border-brand-primary/20 group-hover:border-brand-primary transition-colors" />}
                                          <span className={`text-sm font-black italic ${mission.status === 'done' ? 'text-brand-success/60 line-through' : 'text-brand-primary'}`}>{mission.title}</span>
                                       </div>
                                       <span className="text-[10px] font-black text-brand-accent">+{mission.xp} XP</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                       )
                    })}
                 </div>
              </div>
           </div>
        </div>

        {/* Info & Stats Sidebar */}
        <div className="space-y-8">
           <div className="bg-brand-primary rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 text-white/5 rotate-12">
                 <Trophy size={140} />
              </div>
              <h3 className="text-2xl font-black italic mb-6">Poder Familiar</h3>
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-center">
                    <span className="font-bold text-white/70">Sincronia Semanal</span>
                    <span className="font-black text-2xl">84%</span>
                 </div>
                 <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[84%] h-full bg-brand-accent" />
                 </div>
                 <p className="text-sm font-medium leading-relaxed text-white/80">
                   Compromissos reais geram <span className="font-black text-brand-accent">3x mais XP</span> do que missões avulsas. Continue conectando!
                 </p>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] p-8 border-4 border-card-border shadow-xl">
              <h4 className="text-lg font-black text-brand-primary italic mb-6 flex items-center gap-3">
                 <AlertCircle size={20} className="text-brand-accent" /> Dicas da Corujinha
              </h4>
              <div className="space-y-4">
                 <div className="flex gap-4 p-4 rounded-2xl bg-bg-main">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 shadow-sm">🧠</div>
                    <p className="text-xs font-bold text-text-secondary leading-relaxed">
                       Cadastre compromissos escolares com antecedência para gerar missões de estudo graduais.
                    </p>
                 </div>
                 <div className="flex gap-4 p-4 rounded-2xl bg-bg-main">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 shadow-sm">⚽</div>
                    <p className="text-xs font-bold text-text-secondary leading-relaxed">
                       Eventos esportivos funcionam melhor quando incluem a missão de "Hidratação Máxima".
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Modal: Criar Evento Mágico */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => { setIsModalOpen(false); setShowPreview(false); }}
               className="absolute inset-0 bg-brand-primary/20 backdrop-blur-xl"
             />

             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-2xl bg-white rounded-[4rem] shadow-2xl border-8 border-card-border overflow-hidden"
             >
                {!showPreview ? (
                  <div className="p-10 lg:p-12">
                    <header className="flex justify-between items-start mb-10">
                       <div>
                          <h2 className="text-4xl font-black text-brand-primary tracking-tighter italic">Novo Evento Mágico</h2>
                          <p className="text-text-secondary font-bold mt-1">Defina o compromisso real da jornada.</p>
                       </div>
                       <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-bg-main flex items-center justify-center text-brand-primary hover:scale-110 transition-transform">
                          <X size={24} />
                       </button>
                    </header>

                    <div className="space-y-10">
                       {/* Title */}
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">O que vai acontecer?</label>
                          <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Noite da Pizza, Prova de Ciências..."
                            className="w-full h-20 px-8 rounded-3xl border-4 border-brand-primary/5 bg-brand-primary/5 font-black text-xl text-brand-primary focus:outline-none focus:border-brand-primary transition-all"
                          />
                       </div>

                       {/* Types */}
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">Tipo de Aventura</label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                             {EVENT_TYPES.map(type => (
                               <button 
                                 key={type.id}
                                 onClick={() => setSelectedType(type)}
                                 className={`h-24 flex flex-col items-center justify-center rounded-[2rem] border-4 transition-all ${selectedType?.id === type.id ? 'bg-brand-primary border-brand-primary text-white shadow-xl' : 'bg-brand-primary/5 border-transparent text-brand-primary/40'}`}
                               >
                                  <type.icon size={28} />
                                  <span className="text-[9px] font-black uppercase tracking-widest mt-2">{type.label}</span>
                               </button>
                             ))}
                          </div>
                       </div>

                       <button 
                         onClick={handleCreateEvent}
                         disabled={!title}
                         className="w-full h-24 btn-primary !rounded-[2.5rem] bg-brand-primary text-white text-2xl font-black shadow-[0_12px_0_0_#1B4332] active:translate-y-2 active:shadow-none transition-all disabled:opacity-50"
                       >
                         Ver Mapa de Missões <ArrowRight className="inline-block ml-3" size={32} strokeWidth={3} />
                       </button>
                    </div>
                  </div>
                ) : (
                  selectedType && (
                    <div className="p-10 lg:p-12">
                     <div className="text-center mb-10">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-brand-primary/10 flex items-center justify-center text-5xl mx-auto mb-6 transform -rotate-12 border-4 border-card-border shadow-xl">
                           <selectedType.icon size={48} className="text-brand-primary" />
                        </div>
                        <h2 className="text-4xl font-black text-brand-primary tracking-tighter italic">Missões Geradas!</h2>
                        <p className="text-text-secondary font-bold mt-2">A Corujinha preparou o terreno para o evento: <br/> <span className="text-brand-primary font-black underline">{title}</span></p>
                     </div>

                     <div className="space-y-4 mb-12">
                        {selectedType.missions.map((mission, i) => (
                           <motion.div 
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.1 }}
                             key={i} 
                             className="p-6 rounded-[2rem] bg-bg-main border-4 border-white shadow-lg flex justify-between items-center"
                           >
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <Sparkles size={20} />
                                 </div>
                                 <span className="font-black text-lg italic text-brand-primary">{mission}</span>
                              </div>
                              <span className="font-black text-brand-accent">+50 XP</span>
                           </motion.div>
                        ))}
                     </div>

                     <button 
                       onClick={() => { setIsModalOpen(false); setShowPreview(false); setTitle(''); }}
                       className="w-full h-24 btn-primary !rounded-[2.5rem] bg-brand-accent text-white text-2xl font-black shadow-[0_12px_0_0_#991B1B] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-4"
                     >
                        Confirmar Jornada <CheckCircle2 size={32} strokeWidth={3} />
                     </button>
                  </div>
                  )
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
