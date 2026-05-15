'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sword, Coins, Star, Info, Save, Sparkles, Wand2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { getFirebaseFirestore } from '@corujinha/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export function MissionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Saúde',
    difficulty: 'easy',
    rewardCoins: 10,
    rewardXp: 50,
    requiresProof: true,
    imageUrl: ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const handleAiGenerate = async () => {
    if (!aiPrompt) return
    setIsGenerating(true)
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim()
      let model = process.env.NEXT_PUBLIC_GEMINI_MODEL?.trim() || 'gemini-1.5-flash'
      
      // Limpar o nome do modelo caso já contenha o prefixo 'models/'
      model = model.replace('models/', '')
      
      if (!apiKey) {
        throw new Error('Variável NEXT_PUBLIC_GEMINI_API_KEY não encontrada no sistema.')
      }
      
      if (apiKey === 'sua_chave_aqui') {
        throw new Error('A chave configurada ainda é o valor padrão "sua_chave_aqui".')
      }

      const prompt = `Você é o Arquiteto de Missões da Floresta Encantada. Sua função é transformar tarefas em aventuras épicas.
      
      SISTEMA DE MENTORES (ADOTE A VOZ DE ACORDO COM A CATEGORIA):
      - SABEDORIA/DEVERES (Bubo): Voz poética, sábia, focada no "porquê". Usa "Mapas", "Pergaminhos".
      - SAÚDE/NOITE (Lumi): Voz alegre, rápida, onomatopeias. Usa "Brilho", "Pérolas", "Zapt".
      - ORGANIZAÇÃO (Gaia): Voz calma, pausada, passo-a-passo. Usa "Santuário", "Harmonia", "Pedra por pedra".
      - NATUREZA/ESPORTE (Bolt): Voz motivadora, direta, desafiadora. Usa "Vento", "Foguete", "Vapt-vupt".
      
      DIRETRIZES DE LORE:
      1. TÍTULO: NUNCA literal. Transforme em Ritual/Desafio.
      2. BIOMAS: Use Clareira do Sol, Rio de Cristal, Caverna dos Ecos, Ninho das Nuvens.
      
      Entrada do usuário: "${aiPrompt}".
      
      Retorne APENAS um JSON puro: 
      { 
        "title": "...", 
        "description": "...", 
        "category": "Saúde|Organização|Sabedoria|Natureza|Deveres", 
        "difficulty": "easy|medium|hard", 
        "rewardCoins": 20, 
        "rewardXp": 100, 
        "imageSearchTerm": "...",
        "mentor": "Bubo|Lumi|Gaia|Bolt"
      }`

      const tryGenerate = async (currentModel: string, currentVersion: string) => {
        // Garantir que o nome do modelo tenha o prefixo correto se necessário
        const modelPath = currentModel.includes('models/') ? currentModel : `models/${currentModel}`
        const url = `https://generativelanguage.googleapis.com/${currentVersion}/${modelPath}:generateContent?key=${apiKey}`
        
        return await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        })
      }

      // 1. Tentar o modelo configurado
      let response = await tryGenerate(model, 'v1beta')
      
      // 2. Se der 404, tentar listar modelos disponíveis para descobrir o nome correto
      if (response.status === 404) {
        console.warn(`[Gemini] Modelo ${model} não encontrado. Tentando listar modelos disponíveis...`)
        try {
          const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
          const listRes = await fetch(listUrl)
          const listData = await listRes.json()
          console.log('[Gemini] Modelos disponíveis para esta chave:', listData)
          
          if (listData.models && listData.models.length > 0) {
            // Buscar o primeiro modelo que suporte geração de conteúdo e seja da família gemini
            const fallbackModel = listData.models.find((m: any) => 
              m.supportedGenerationMethods.includes('generateContent') && 
              m.name.toLowerCase().includes('gemini')
            )
            
            if (fallbackModel) {
              console.info(`[Gemini] Usando modelo auto-descoberto: ${fallbackModel.name}`)
              response = await tryGenerate(fallbackModel.name, 'v1beta')
            }
          }
        } catch (listErr) {
          console.error('[Gemini] Erro ao tentar auto-descobrir modelos:', listErr)
        }
      }

      if (!response.ok) {
        const errorData = await response.json()
        console.error('[Gemini] Erro crítico:', errorData)
        const errorMsg = errorData.error?.message || response.statusText
        const errorCode = errorData.error?.status || response.status
        throw new Error(`${errorMsg} (Status: ${errorCode})`)
      }

      const result = await response.json()
      const text = result.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim()
      const data = JSON.parse(text)

      // Get Image from stable service based on search term
      const searchTerm = data.imageSearchTerm || data.title || 'fantasy'
      const finalImageUrl = `https://loremflickr.com/400/400/${encodeURIComponent(searchTerm.replace(/\s+/g, ','))},illustration,cartoon`

      setFormData({ 
        ...formData, 
        title: data.title,
        description: data.description,
        category: data.category,
        difficulty: data.difficulty,
        rewardCoins: data.rewardCoins,
        rewardXp: data.rewardXp,
        imageUrl: finalImageUrl
      })
    } catch (err: any) {
      console.error('Erro detalhado na IA:', err)
      const keySnippet = process.env.NEXT_PUBLIC_GEMINI_API_KEY 
        ? `${process.env.NEXT_PUBLIC_GEMINI_API_KEY.substring(0, 6)}...${process.env.NEXT_PUBLIC_GEMINI_API_KEY.slice(-4)}`
        : 'AUSENTE'
      
      alert(`🚨 FALHA NA IA\n\nMotivo: ${err.message}\nChave detectada: ${keySnippet}\n\nSe estiver na Vercel, certifique-se de ter feito o REDEPLOY após salvar a variável.`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const db = getFirebaseFirestore()
      await addDoc(collection(db, 'tasks'), {
        ...formData,
        active: true,
        familyId: 'global',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      onClose()
    } catch (err) {
      console.error(err)
      setIsSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl relative"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors p-2"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-brand-primary border border-emerald-100">
                <Sword size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 italic tracking-tighter">Arquiteto de Missões</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Crie aventuras manuais ou use o poder da IA</p>
              </div>
            </div>

            {/* AI Prompt Section */}
            <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-primary">
                     <Sparkles size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Assistente Mágico Corujinha</span>
                  </div>
                  {isGenerating && <Loader2 size={16} className="animate-spin text-brand-primary" />}
               </div>
               <div className="flex gap-2">
                  <input 
                    type="text"
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="Descreva a missão (ex: 'Missão para escovar os dentes')"
                    className="flex-1 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold placeholder:text-slate-300 outline-none focus:border-brand-primary transition-all"
                  />
                  <button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating || !aiPrompt}
                    className="px-6 py-3 bg-brand-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    <Wand2 size={16} /> Gerar
                  </button>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Título da Missão</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="Ex: O Desafio da Alvorada" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none italic" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Instruções Épicas</label>
                      <textarea 
                        required 
                        rows={3}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="Explique o desafio para o pequeno herói..." 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none resize-none" 
                      />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Arte da Missão</label>
                    <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 overflow-hidden group hover:border-brand-primary transition-all relative">
                       {formData.imageUrl ? (
                         <>
                           <img src={formData.imageUrl} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="text-white bg-red-500 p-2 rounded-full"><X size={16} /></button>
                           </div>
                         </>
                       ) : (
                         <>
                           <ImageIcon size={32} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
                           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Clique p/ Upload</span>
                         </>
                       )}
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Categoria</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest outline-none"
                    >
                      <option>Saúde</option>
                      <option>Organização</option>
                      <option>Sabedoria</option>
                      <option>Natureza</option>
                      <option>Deveres</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Dificuldade</label>
                    <select 
                      value={formData.difficulty}
                      onChange={e => setFormData({...formData, difficulty: e.target.value as any})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest outline-none"
                    >
                      <option value="easy">Iniciante</option>
                      <option value="medium">Intermediária</option>
                      <option value="hard">Avançada</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Moedas</label>
                    <div className="relative">
                       <Coins size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                       <input 
                         type="number" 
                         value={formData.rewardCoins}
                         onChange={e => setFormData({...formData, rewardCoins: parseInt(e.target.value)})}
                         className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-black text-sm outline-none" 
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">XP</label>
                    <div className="relative">
                       <Star size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" />
                       <input 
                         type="number" 
                         value={formData.rewardXp}
                         onChange={e => setFormData({...formData, rewardXp: parseInt(e.target.value)})}
                         className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-black text-sm outline-none" 
                       />
                    </div>
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full h-16 bg-brand-primary text-white rounded-[1.5rem] font-black text-[13px] uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <><Save size={20} strokeWidth={3} /> Lançar Missão Global</>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
