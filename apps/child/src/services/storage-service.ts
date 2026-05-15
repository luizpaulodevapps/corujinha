import { supabase } from './supabase'

/**
 * Lógica interna para Supabase
 */
const uploadToSupabase = async (file: File, bucket: string = 'photos') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return data.publicUrl
}

/**
 * Lógica interna para Firebase (Placeholder para o futuro)
 */
const uploadToFirebase = async (file: File) => {
  // Implementação futura do Firebase Storage
  console.log('Firebase upload placeholder', file)
  return ''
}

/**
 * Função principal que o resto do app usa.
 * Para trocar de Supabase para Firebase, basta alterar a chamada abaixo.
 */
export const uploadFile = async (file: File) => {
  // Atualmente usando Supabase
  return await uploadToSupabase(file)
  
  // No futuro você apenas descomenta a linha abaixo e comenta a de cima:
  // return await uploadToFirebase(file)
}
