'use client'

import { useState, useRef } from 'react'
import { Users, Baby, Sparkles, Star, UserPlus, Mail, PlusCircle, Wrench, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import { useAuthStore } from '@/store/auth.store'
import { getFirebaseFirestore, getFirebaseStorage } from '@corujinha/firebase'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Novos Componentes Modularizados
import { FamilyHero } from '@/components/family/family-hero'
import { NestIdentity } from '@/components/family/nest-identity'
import { AddChildModal } from '@/components/family/add-child-modal'
import { InviteGuardianModal } from '@/components/family/invite-guardian-modal'
import { GuardianManagementCard, ChildManagementCard } from '@/components/family/cards'

export default function FamilyPage() {
  const user = useAuthStore(s => s.user)
  const familyId = user?.familyId
  const queryClient = useQueryClient()

  // Estados Locais
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isAddingChild, setIsAddingChild] = useState(false)
  const [isInvitingGuardian, setIsInvitingGuardian] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Consultas (TanStack Query)
  const { data: family, isLoading: isLoadingFamily } = useQuery<any>({
    queryKey: ['family', familyId],
    queryFn: () => dashboardService.getFamily(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  const { data: dbChildren = [] } = useQuery({
    queryKey: ['children', familyId],
    queryFn: () => dashboardService.getChildren(familyId!),
    enabled: !!familyId && familyId !== 'preview-id'
  })

  const children = dbChildren.length > 0 ? dbChildren : (user?.previewChildren || [])

  // Mutações
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const db = getFirebaseFirestore()
      const familyRef = doc(db, 'families', familyId!)
      await updateDoc(familyRef, { ...data, updatedAt: serverTimestamp() })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family', familyId] })
      setIsEditingName(false)
    }
  })

  const addChildMutation = useMutation({
    mutationFn: async (data: any) => {
      const db = getFirebaseFirestore()
      const { collection, addDoc } = await import('firebase/firestore')
      const childrenRef = collection(db, 'families', familyId!, 'children')
      await addDoc(childrenRef, {
        ...data,
        level: 1,
        xp: 0,
        achievements: [],
        streak: 0,
        createdAt: serverTimestamp()
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children', familyId] })
      setIsAddingChild(false)
    }
  })

  // Handlers
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !familyId) {
      console.warn('Upload cancelado: arquivo ou familyId ausente', { file, familyId })
      return
    }

    console.log('Iniciando upload de imagem...', file.name)
    setIsUploading(true)

    try {
      const storage = getFirebaseStorage()
      const storageRef = ref(storage, `families/${familyId}/avatar`)

      console.log('Enviando bytes para o Storage...')
      await uploadBytes(storageRef, file)

      console.log('Upload concluído, buscando URL pública...')
      const url = await getDownloadURL(storageRef)

      console.log('URL obtida:', url, 'Atualizando Firestore...')
      await updateMutation.mutateAsync({ photoURL: url, avatar: null })

      console.log('Processo concluído com sucesso!')
    } catch (error) {
      console.error('ERRO FATAL NO UPLOAD:', error)
      alert('Houve um erro ao salvar sua imagem. Verifique sua conexão ou permissões.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-main pb-24 lg:pb-12 pt-safe relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <FamilyHero
          family={family}
          isEditingName={isEditingName}
          setIsEditingName={setIsEditingName}
          tempName={tempName}
          setTempName={setTempName}
          onUpdateName={() => updateMutation.mutate({ familyName: tempName })}
          isUploading={isUploading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Coluna Esquerda: Identidade (Sidebar Style) */}
          <div className="lg:col-span-4 sticky top-8 space-y-8">
            <NestIdentity
              family={family}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
              onImageUpload={handleImageUpload}
              onUpdateAvatar={(emoji) => updateMutation.mutate({ avatar: emoji, photoURL: null })}
            />
            
            <div className="bg-white/50 dark:bg-card-bg/50 backdrop-blur-xl p-8 rounded-[2.5rem] border-4 border-card-border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                  <Users size={20} className="text-brand-primary" />
                </div>
                <h3 className="font-black text-brand-primary">Resumo do Ninho</h3>
              </div>
              <p className="text-sm font-medium text-brand-secondary/60">
                Seu ninho tem <span className="text-brand-primary font-black">{dbChildren.length} exploradores</span> ativos e <span className="text-brand-primary font-black">{Object.keys(family?.guardians || {}).length + 1} guardiões</span> protegendo a jornada.
              </p>
            </div>
          </div>

          {/* Coluna Direita: Conteúdo Principal */}
          <div className="lg:col-span-8 space-y-12">
            {/* Seção de Filhos com Grid */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center border-2 border-brand-primary/20">
                    <Baby size={20} className="text-brand-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Pequenos Corujinhas</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {dbChildren.map((child: any, index: number) => (
                    <ChildManagementCard
                      key={child.id || index}
                      child={child}
                      index={index}
                    />
                  ))}
                  <button
                    onClick={() => setIsAddingChild(true)}
                    className="group h-full min-h-[160px] bg-brand-primary/5 rounded-[3rem] border-4 border-dashed border-brand-primary/20 flex flex-col items-center justify-center gap-4 hover:bg-brand-primary/10 hover:border-brand-primary transition-all p-8"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform">
                      <Plus size={28} />
                    </div>
                    <span className="text-xs font-black text-brand-primary/60 uppercase tracking-widest text-center">Novo Pequeno Explorador</span>
                  </button>
                </AnimatePresence>
              </div>
            </section>

            {/* Seção de Guardiões com Grid */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-warm/10 rounded-xl flex items-center justify-center border-2 border-brand-warm/20">
                    <Star size={20} className="text-brand-warm fill-brand-warm" />
                  </div>
                  <h2 className="text-2xl font-black text-brand-primary italic">Guardiões Sábios</h2>
                </div>
                
                <button 
                  onClick={() => setIsInvitingGuardian(true)}
                  className="hidden sm:flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-2xl font-black text-xs shadow-[0_4px_0_0_#1B4332] hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <UserPlus size={18} /> Convidar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <button 
                  onClick={() => setIsInvitingGuardian(true)}
                  className="sm:hidden w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm shadow-[0_4px_0_0_#1B4332] active:translate-y-1 active:shadow-none transition-all"
                >
                  <UserPlus size={18} /> Convidar Novo Guardião
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <AddChildModal
        isOpen={isAddingChild}
        onClose={() => setIsAddingChild(false)}
        onAddChild={(data) => addChildMutation.mutate(data)}
        isPending={addChildMutation.isPending}
      />

      <InviteGuardianModal 
        isOpen={isInvitingGuardian}
        onClose={() => setIsInvitingGuardian(false)}
        familyId={familyId || ''}
        familyName={family?.familyName || 'Nosso Ninho'}
      />
    </div>
  )
}
