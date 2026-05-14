'use client'

import { useState } from 'react'
import { 
  Gift, 
  Plus, 
  Search, 
  Coins,
  ShoppingCart,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Trophy
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { CreateRewardModal } from '@/components/dashboard/create-reward-modal'
import { useAuthStore } from '@/store/auth.store'

export default function RewardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Tudo')
  const user = useAuthStore(s => s.user)

  const categories = ['Tudo', 'Digital', 'Experiência', 'Privilégio', 'Físico']

  const mockRewards = [
    { id: '1', title: '30 min de Videogame', cost: 50, category: 'Digital', emoji: '🎮', stock: 'Ilimitado' },
    { id: '2', title: 'Escolher o Jantar', cost: 100, category: 'Experiência', emoji: '🍕', stock: '1 por semana' },
    { id: '3', title: 'Dormir 30 min mais tarde', cost: 80, category: 'Privilégio', emoji: '🌙', stock: 'Ilimitado' },
    { id: '4', title: 'Novo Livro de Histórias', cost: 300, category: 'Físico', emoji: '📚', stock: '2 disponíveis' },
    { id: '5', title: 'Dia de Parque', cost: 500, category: 'Experiência', emoji: '🌳', stock: 'Especial' },
  ]

  return (
    <div className="pb-20 lg:pb-0 min-h-screen bg-bg-main relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/forest_pattern.png")', backgroundSize: '400px' }} />
      
      <div className="max-w-7xl mx-auto p-6 lg:p-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-500/10 rounded-[1.5rem] flex items-center justify-center border-4 border-card-border shadow-sm">
              <Gift size={32} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-brand-primary leading-none italic">
                Loja de Tesouros
              </h1>
              <p className="text-brand-secondary/60 font-bold text-lg mt-1 italic">Gerencie as recompensas que seus exploradores podem conquistar.</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary px-8 py-4 !rounded-2xl bg-amber-500 text-white font-black shadow-[0_6px_0_0_#92400E] active:translate-y-1 active:shadow-none flex items-center gap-3"
          >
            <Plus size={24} /> Novo Tesouro
          </button>
        </header>

        {/* Categories & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border-4 border-card-border overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-amber-500 text-white shadow-lg' : 'text-brand-secondary/40 hover:text-brand-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-secondary/30" size={20} />
            <input 
              type="text" 
              placeholder="Procurar tesouro..." 
              className="w-full h-14 pl-14 pr-6 bg-white rounded-2xl border-4 border-card-border shadow-sm font-bold text-brand-primary placeholder:text-brand-secondary/30 focus:outline-none focus:border-amber-500/20 transition-all"
            />
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {mockRewards.map((reward, i) => (
              <RewardCard key={reward.id} reward={reward} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <CreateRewardModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        familyId={user?.familyId || ''}
      />
    </div>
  )
}

function RewardCard({ reward, index }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[3rem] p-8 shadow-sm border-4 border-card-border group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-16 h-16 bg-amber-500/5 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-2 border-amber-500/10 group-hover:rotate-6 transition-transform">
            {reward.emoji || '🎁'}
          </div>
          <span className="px-4 py-1.5 bg-brand-primary/5 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-brand-primary/10">
            {reward.category}
          </span>
        </div>

        <h3 className="text-2xl font-black text-brand-primary mb-2 leading-tight">{reward.title}</h3>
        <p className="text-brand-secondary/40 font-bold mb-8 italic">Tesouro disponível no ninho</p>

        <div className="flex items-center justify-between pt-6 border-t border-brand-primary/5">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-brand-secondary/30 uppercase tracking-widest">Custo</span>
              <span className="font-black text-amber-500 text-xl flex items-center gap-1.5">
                <Coins size={18} className="fill-amber-500/20" /> {reward.cost}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-brand-secondary/30 uppercase tracking-widest">Estoque</span>
              <span className="font-black text-brand-primary text-sm mt-1">{reward.stock}</span>
            </div>
          </div>

          <button className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-[0_4px_0_0_#92400E] active:translate-y-1 active:shadow-none transition-all">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
