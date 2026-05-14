'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Leaf
} from 'lucide-react'
import { createFamilySchema, createChildSchema, type CreateChildInput, type CreateFamilyInput, SUGGESTED_TASKS } from '@corujinha/domain'
import { familyService } from '@/services/family.service'
import { useAuthStore } from '@/store/auth.store'

import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { FamilyStep } from '@/components/onboarding/FamilyStep'
import { GuardiansStep } from '@/components/onboarding/GuardiansStep'
import { ChildrenStep, type ChildFormValues } from '@/components/onboarding/ChildrenStep'
import { SuggestionsStep } from '@/components/onboarding/SuggestionsStep'
import { FinishedStep } from '@/components/onboarding/FinishedStep'

type Step = 'welcome' | 'family' | 'guardians' | 'children' | 'suggestions' | 'finished'

export default function OnboardingPage() {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('welcome')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userAvatar, setUserAvatar] = useState('🦉')
  const [partnerName, setPartnerName] = useState('')
  const [partnerEmail, setPartnerEmail] = useState('')
  const [partnerAvatar, setPartnerAvatar] = useState('🐻')
  const [authMethod, setAuthMethod] = useState<'google' | 'password'>('google')
  const [password, setPassword] = useState('')
  const [childrenList, setChildrenList] = useState<ChildFormValues[]>([])
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const user = useAuthStore(s => s.user)
  const setUser = useAuthStore(s => s.setUser)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-fill from Auth
  useEffect(() => {
    if (user) {
      if (user.email && !userEmail) setUserEmail(user.email)
      if (user.displayName && !userName) setUserName(user.displayName)
      if (user.providerId === 'google.com') setAuthMethod('google')
    }
  }, [user, userEmail, userName])

  const familyForm = useForm<CreateFamilyInput>({
    resolver: zodResolver(createFamilySchema),
    defaultValues: { familyName: '' }
  })

  const childForm = useForm<ChildFormValues>({
    // Estendemos o schema original para incluir o gênero
    resolver: zodResolver(createChildSchema.extend({
      gender: z.enum(['boy', 'girl'])
    })) as any,
    defaultValues: { displayName: '', age:0, pin: '', gender: 'boy', birthDate: '' }
  })

  // Auto-calculate age from birthDate (DD/MM/YYYY)
  const watchedBirthDate = childForm.watch('birthDate')
  useEffect(() => {
    if (watchedBirthDate && watchedBirthDate.length === 10) {
      const [day, month, year] = watchedBirthDate.split('/').map(Number)

      // Basic validation
      if (!day || !month || !year || month > 12 || day > 31 || year < 1900 || year > new Date().getFullYear()) return

      const birth = new Date(year, month - 1, day)
      const today = new Date()

      // Verify if it's a valid date (e.g. not 31/02)
      if (birth.getDate() !== day || birth.getMonth() !== month - 1) return

      let age = today.getFullYear() - birth.getFullYear()
      const m = today.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      if (age >= 0 && age < 100) {
        childForm.setValue('age', age)
      }
    }
  }, [watchedBirthDate, childForm])

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 8) value = value.slice(0, 8)

    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`
    }

    e.target.value = value
  }

  const handleNextStep = () => {
    if (step === 'welcome') setStep('family')
    else if (step === 'family') setStep('guardians')
    else if (step === 'guardians') setStep('children')
    else if (step === 'children') {
      if (childrenList.length === 0) return alert('Adicione pelo menos um pequeno explorador!')
      setStep('suggestions')
    }
    else if (step === 'suggestions') setStep('finished')
  }

  const addChild = (data: ChildFormValues) => {
    setChildrenList([...childrenList, data])
    childForm.reset({ displayName: '', age: 7, pin: '', gender: 'boy', birthDate: '' })
  }

  const removeChild = (index: number) => {
    setChildrenList(childrenList.filter((_, i) => i !== index))
  }

  const finishOnboarding = async () => {
    setIsSubmitting(true)
    try {
      // Verifica se a chave existe e se tem um tamanho mínimo (chaves reais têm ~40 caracteres)
      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      const isPreview = !apiKey || apiKey.length < 20 || apiKey === 'your-api-key'

      const familyData = familyForm.getValues()
      let familyId = 'preview-id'

      if (isPreview) {
        console.warn('[Onboarding] Modo Preview Ativo: Simulando sucesso.')
        // Pequeno delay para simular rede
        await new Promise(resolve => setTimeout(resolve, 1500))
      } else {
        familyId = await familyService.createFamilyHierarchy(
          familyData,
          childrenList,
          {
            userName,
            userRole: 'mentor',
            userAvatar,
            partnerName,
            partnerEmail,
            partnerRole: 'mentor',
            partnerAvatar
          },
          SUGGESTED_TASKS.filter(t => selectedTasks.includes(t.title)).map(t => ({
            ...t,
            assignedChildIds: [] // O backend pode distribuir ou o pai ajusta depois
          }))
        )
      }

      // Atualiza o estado local do usuário para refletir que o onboarding acabou
      const user = useAuthStore.getState().user
      if (user) {
        // Se for preview, passamos os filhos criados para que o dashboard os mostre sem precisar do Firestore
        setUser(user as any, { ...user, familyId, onboardingCompleted: true }, isPreview ? childrenList : undefined)
      }

      // Salva no localStorage para o Modo Preview persistir o estado
      localStorage.setItem('corujinha-onboarding-done', 'true')
      if (isPreview) {
        localStorage.setItem('corujinha-preview-children', JSON.stringify(childrenList))
      }

      router.push('/dashboard')
    } catch (error: any) {
      console.error('[Onboarding] Erro ao finalizar:', error)
      alert('Erro ao criar família: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[120px] animate-float [animation-delay:2s]" />

        {/* Animated Leaves falling */}
        <div className="absolute inset-0">
          {mounted && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * 100 + '%', rotate: 0, opacity: 0 }}
              animate={{
                y: '110vh',
                x: (Math.random() * 100 - 10) + '%',
                rotate: 360,
                opacity: [0, 0.4, 0.4, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 8,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              className="absolute text-brand-secondary/20"
            >
              <Leaf size={Math.random() * 20 + 20} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl premium-card !rounded-[4rem] relative overflow-hidden p-10 md:p-16 z-10 border-8 border-card-border group"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-brand-primary/5">
          <motion.div
            className="h-full bg-brand-primary shadow-[0_0_20px_rgba(45,106,79,0.3)] rounded-r-full"
            animate={{ width: step === 'welcome' ? '20%' : step === 'family' ? '40%' : step === 'guardians' ? '60%' : step === 'children' ? '80%' : '100%' }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <WelcomeStep onNext={handleNextStep} />
          )}

          {step === 'family' && (
            <FamilyStep form={familyForm} onNext={handleNextStep} onBack={() => setStep('welcome')} />
          )}

          {step === 'guardians' && (
            <GuardiansStep
              userName={userName} setUserName={setUserName}
              userEmail={userEmail} setUserEmail={setUserEmail}
              userAvatar={userAvatar} setUserAvatar={setUserAvatar}
              partnerName={partnerName} setPartnerName={setPartnerName}
              partnerEmail={partnerEmail} setPartnerEmail={setPartnerEmail}
              partnerAvatar={partnerAvatar} setPartnerAvatar={setPartnerAvatar}
              onNext={handleNextStep} onBack={() => setStep('family')}
            />
          )}

          {step === 'children' && (
            <ChildrenStep
              childrenList={childrenList}
              form={childForm}
              onAdd={addChild}
              onRemove={removeChild}
              onNext={handleNextStep}
              onBack={() => setStep('guardians')}
              handleBirthDateChange={handleBirthDateChange}
            />
          )}

          {step === 'suggestions' && (
            <SuggestionsStep
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
              onNext={handleNextStep}
              onBack={() => setStep('children')}
            />
          )}

          {step === 'finished' && (
            <FinishedStep onFinish={finishOnboarding} isSubmitting={isSubmitting} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
