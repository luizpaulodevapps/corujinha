'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sword, Coins, Star, Info, Save } from 'lucide-react'
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
    requiresProof: true
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const db = getFirebaseFirestore()
      await addDoc(collection(db, 'tasks'), {
        ...formData,
        active: true,
        familyId: 'global', // Admin tasks can be global or template
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="admin-card"
            style={{ width: '100%', maxWidth: '600px', padding: '32px', position: 'relative' }}
          >
            <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'none', cursor: 'pointer', color: '#64748B' }}>
              <X size={24} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E9F5EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                <Sword size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--brand-primary)', margin: 0 }}>Nova Missão</h2>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Defina os detalhes desta nova aventura.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Título da Missão</label>
                <input 
                  type="text" 
                  required 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Escovar os Dentes" 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--app-border)', fontSize: '14px' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Descrição / Instruções</label>
                <textarea 
                  required 
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Explique o que a criança deve fazer..." 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--app-border)', fontSize: '14px', resize: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Categoria</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--app-border)', fontSize: '14px' }}
                  >
                    <option>Saúde</option>
                    <option>Organização</option>
                    <option>Sabedoria</option>
                    <option>Natureza</option>
                    <option>Deveres</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Dificuldade</label>
                  <select 
                    value={formData.difficulty}
                    onChange={e => setFormData({...formData, difficulty: e.target.value as any})}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--app-border)', fontSize: '14px' }}
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Média</option>
                    <option value="hard">Difícil</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Recompensa (Moedas)</label>
                  <div style={{ position: 'relative' }}>
                    <Coins style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#D97706' }} size={16} />
                    <input 
                      type="number" 
                      required 
                      value={formData.rewardCoins}
                      onChange={e => setFormData({...formData, rewardCoins: parseInt(e.target.value)})}
                      style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: '1px solid var(--app-border)', fontSize: '14px' }} 
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Experiência (XP)</label>
                  <div style={{ position: 'relative' }}>
                    <Star style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8B5CF6' }} size={16} />
                    <input 
                      type="number" 
                      required 
                      value={formData.rewardXp}
                      onChange={e => setFormData({...formData, rewardXp: parseInt(e.target.value)})}
                      style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: '1px solid var(--app-border)', fontSize: '14px' }} 
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSaving}
                style={{ 
                  marginTop: '12px',
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  backgroundColor: 'var(--brand-primary)', 
                  color: 'white', 
                  fontWeight: 800, 
                  fontSize: '15px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isSaving ? 'Salvando...' : <><Save size={20} /> Criar Missão Épica</>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
