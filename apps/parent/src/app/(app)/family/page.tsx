'use client'

import { 
  Users, 
  Plus, 
  ShieldCheck, 
  Baby, 
  Settings2,
  Trophy,
  ArrowRight,
  Leaf,
  Sparkles,
  Star,
  Mail,
  UserPlus
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import { useAuthStore } from '@/store/auth.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const FAMILY_AVATARS = ['🏠', '🌳', '🏡', '⛰️', '🦉', '🦁', '🦅', '🐺', '🦊', '🐨', '🐼', '🐯', '🌟', '🌈', '🌊', '🔥']

export default function FamilyPage() {
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId
  const queryClient = useQueryClient()

  const { data: family, isLoading: isLoadingFamily } = useQuery<any>({
    queryKey: ['family', familyId],
    queryFn: () => dashboardService.getFamily(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  const { data: dbChildren = [], isLoading: isLoadingChildren } = useQuery({
    queryKey: ['children', familyId],
    queryFn: () => dashboardService.getChildren(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  const mutation = useMutation({
    mutationFn: async (avatar: string) => {
      const db = getFirebaseFirestore()
      const familyRef = doc(db, 'families', familyId!)
      await updateDoc(familyRef, { avatar })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family', familyId] })
    }
  })

  const children = dbChildren.length > 0 ? dbChildren : (user?.previewChildren || [])

  return (
    <div className="pb-20 lg:pb-0 min-h-screen bg-bg-main relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />
      
      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-[1.5rem] flex items-center justify-center border-4 border-card-border shadow-sm">
              <Users size={32} className="text-brand-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-brand-primary leading-none italic">
                Nosso Ninho
              </h1>
              <p className="text-brand-secondary/60 font-bold text-lg mt-1 italic">Gestão da família e dos pequenos exploradores.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="btn-secondary px-8 py-4 !rounded-2xl border-4 border-brand-primary/10 bg-white text-brand-primary font-black hover:bg-brand-primary/5 shadow-sm flex items-center gap-2">
              <UserPlus size={20} /> Convidar Guardião
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Nest Identity & Guardians */}
          <div className="lg:col-span-5 space-y-12">
            {/* NEW: Nest Identity Section */}
            <section className="bg-white rounded-[3rem] p-10 border-8 border-card-border shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                    <Sparkles size={20} className="text-brand-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Identidade do Ninho</h2>
               </div>

               <div className="flex flex-col items-center gap-8">
                  <div className="relative group/avatar">
                     <div className="w-32 h-32 bg-brand-primary/5 rounded-[2.5rem] border-8 border-card-border shadow-inner flex items-center justify-center text-7xl transition-transform group-hover/avatar:scale-105 duration-500">
                        {family?.photoURL ? (
                          <img src={family.photoURL} alt="" className="w-full h-full object-cover rounded-[1.8rem]" />
                        ) : (
                          family?.avatar || '🏠'
                        )}
                     </div>
                     <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white hover:scale-110 transition-all">
                        <Plus size={24} />
                     </button>
                  </div>

                  <div className="w-full">
                     <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-[0.3em] mb-4 text-center">Escolha um Brasão</p>
                     <div className="grid grid-cols-4 gap-3">
                        {FAMILY_AVATARS.map((emoji) => (
                           <button 
                             key={emoji}
                             onClick={() => mutation.mutate(emoji)}
                             className={`w-full aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all ${family?.avatar === emoji ? 'bg-brand-primary text-white shadow-xl scale-110 border-4 border-white' : 'bg-brand-primary/5 hover:bg-brand-primary/10'}`}
                           >
                              {emoji}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-brand-warm/10 rounded-xl flex items-center justify-center border-2 border-brand-warm/20">
                  <Star size={20} className="text-brand-warm fill-brand-warm" />
                </div>
                <h2 className="text-2xl font-black text-brand-primary italic">Guardiões Sábios</h2>
              </div>

              <div className="space-y-4">
                <GuardianManagementCard 
                  name={user?.displayName || 'Guardião'} 
                  role="MENTOR PRINCIPAL" 
                  avatar={user?.photoURL || '🦉'} 
                  isHost
                />
                
                {Object.entries(family?.guardians || {}).map(([id, g]: [string, any]) => {
                  if (id === user?.uid || id === 'partner') return null
                  return (
                    <GuardianManagementCard 
                      key={id}
                      name={g.name} 
                      role={g.role === 'mentor' ? 'MENTOR DA FLORESTA' : g.role} 
                      avatar={g.avatar || '🦉'} 
                    />
                  )
                })}
              </div>
            </section>

            {family?.guardians?.partner && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card-bg/65 backdrop-blur-xl border-4 border-brand-primary/10 rounded-[3rem] p-8 relative overflow-hidden shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4 text-brand-secondary">
                  <Sparkles size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Convite em Voo</span>
                </div>
                <h4 className="text-xl font-black text-brand-primary mb-2">Você enviou um convite para</h4>
                <p className="text-brand-primary font-bold underline mb-6">{family.guardians.partner.email}</p>
                <button className="w-full py-4 bg-brand-primary/5 text-brand-primary rounded-2xl font-black text-sm hover:bg-brand-primary/10 transition-all border-2 border-card-border">
                  Reenviar Coruja →
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Column: Children */}
          <div className="lg:col-span-7 space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                  <Baby size={20} className="text-brand-primary" />
                </div>
                <h2 className="text-2xl font-black text-brand-primary italic">Pequenos Corujinhas</h2>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {children.map((child: any, i: number) => (
                    <ChildManagementCard key={child.id || i} child={child} index={i} />
                  ))}
                </AnimatePresence>
                
                <button className="w-full py-8 bg-card-bg/55 border-4 border-dashed border-brand-primary/10 rounded-[3rem] flex flex-col items-center justify-center gap-3 text-brand-primary hover:bg-white hover:border-brand-primary/30 transition-all group">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={32} />
                  </div>
                  <span className="font-black text-xl italic">Novo Pequeno Explorador</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuardianManagementCard({ name, role, avatar, isHost = false }: any) {
  return (
    <motion.div 
      whileHover={{ x: 10 }}
      className="bg-white rounded-[2.5rem] p-6 shadow-sm border-4 border-card-border flex items-center justify-between group"
    >
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-3xl border-2 border-brand-primary/10">
          {avatar.length > 2 ? <img src={avatar} alt="" className="w-full h-full object-cover rounded-2xl" /> : avatar}
        </div>
        <div>
          <h3 className="font-black text-xl text-brand-primary leading-tight">{name}</h3>
          <p className="text-[10px] font-black text-brand-secondary/40 uppercase tracking-widest mt-1">{role}</p>
        </div>
      </div>
      {isHost ? (
        <span className="px-4 py-1.5 bg-brand-primary/5 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-brand-primary/10">Anfitrião</span>
      ) : (
        <button className="w-12 h-12 text-brand-secondary/30 hover:text-brand-primary transition-colors">
          <Settings2 size={24} />
        </button>
      )}
    </motion.div>
  )
}

function ChildManagementCard({ child, index }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-[3rem] p-8 shadow-sm border-4 border-card-border flex items-center justify-between group"
    >
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-5xl border-2 border-brand-primary/10 group-hover:rotate-6 transition-all">
          {child.gender === 'boy' ? '🦊' : child.gender === 'girl' ? '🐰' : '🐼'}
        </div>
        <div>
          <h3 className="font-black text-3xl text-brand-primary leading-tight">{child.displayName}</h3>
          <p className="text-brand-secondary/60 font-black text-lg italic mt-1">
            Nível {child.level || 1} · <span className="text-brand-warm">{child.xp || 0} XP</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-brand-primary font-black">
            <Trophy size={18} className="text-brand-warm" /> {child.achievements?.length || 0} Conquistas
          </div>
          <span className="text-[10px] font-black text-brand-secondary/20 uppercase tracking-widest">Desde Jan 2026</span>
        </div>
        <button className="w-14 h-14 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
          <Settings2 size={24} />
        </button>
      </div>
    </motion.div>
  )
}
