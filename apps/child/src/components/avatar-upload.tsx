'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Loader2, Check } from 'lucide-react'
import Image from 'next/image'
import { uploadFile } from '@/services/storage-service'
import { useChildStore } from '@/stores/use-child-store'

interface AvatarUploadProps {
  currentAvatar?: string
}

/**
 * Componente Premium para upload de avatar.
 * Atualmente direciona para Supabase, mas o serviço de storage é abstraído
 * para facilitar a migração futura para Firebase.
 */
export const AvatarUpload = ({ currentAvatar }: AvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateAvatar } = useChildStore()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setIsUploading(true)

    try {
      const publicUrl = await uploadFile(file)
      await updateAvatar(publicUrl)
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Falha no upload do avatar:', error)
      setPreview(null)
      alert('Erro ao atualizar a foto. Tente novamente em instantes.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative group w-fit mx-auto">
      <div className="relative w-36 h-36 rounded-[var(--radius-lg)] overflow-hidden border-4 border-white shadow-[var(--shadow-lg)] bg-emerald-50 ring-4 ring-emerald-950/5">
        <Image
          src={preview || currentAvatar || '/owl_mascot_new.png'}
          alt="Avatar da Criança"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="144px"
        />
        
        {/* Overlay de Loading */}
        <AnimatePresence>
          {isUploading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-emerald-950/60 flex items-center justify-center backdrop-blur-sm z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <span className="text-loud text-white !text-[8px]">SUBINDO...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interaction Layer */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          aria-label="Alterar foto de perfil"
          className="absolute inset-0 bg-black/0 group-hover:bg-emerald-950/40 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 disabled:cursor-not-allowed z-20"
        >
          <Camera className="w-8 h-8 text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
          <span className="text-loud text-white !text-[8px]">ALTERAR</span>
        </button>
      </div>

      {/* Success Badge */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-2 rounded-full shadow-lg border-2 border-white z-30"
          >
            <Check className="w-4 h-4 stroke-[3px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <p className="mt-4 text-center text-loud text-emerald-900/30 !text-[8px]">
        RECOMENDADO: 512x512
      </p>
    </div>
  )
}
