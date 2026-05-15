'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, Gem, Leaf, ShoppingBag, Sparkles } from 'lucide-react'
import { PageContainer } from '@/components/page-container'
import { useShop } from '@/features/shop/hooks/use-shop'
import { RewardCard } from '@/features/shop/components/RewardCard'
import { CategoryFilter } from '@/features/shop/components/CategoryFilter'
import { ShopBackground } from '@/features/shop/components/ShopBackground'
import { PurchaseConfirmModal } from '@/features/shop/components/PurchaseConfirmModal'
import { PurchaseSuccessModal } from '@/features/shop/components/PurchaseSuccessModal'
import { useChildStore } from '@/stores/use-child-store'
import type { RewardCategory } from '@/features/shop/types'

export default function ShopPage() {
  const [mounted, setMounted] = useState(false)
  const {
    filter,
    setFilter,
    filteredRewards,
    selectedReward,
    isConfirmOpen,
    isSuccessOpen,
    setIsConfirmOpen,
    setIsSuccessOpen,
    handlePurchaseClick,
    confirmPurchase,
  } = useShop()

  const { profile } = useChildStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !profile) {
    return (
      <PageContainer title="Loja de Tesouros" hideHeader hideAvatar>
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
            <Sparkles className="text-brand-primary" size={48} />
          </motion.div>
        </div>
      </PageContainer>
    )
  }

  const categories = ['Todos', 'Tecnologia', 'Comida', 'Lazer', 'Aventura'] as RewardCategory[]
  const affordableCount = filteredRewards.filter(reward => profile.coins >= reward.cost).length

  return (
    <PageContainer title="Loja de Tesouros" hideHeader hideAvatar>
      <ShopBackground />

      {/* Hero Section: Magical Shop Header */}
      <section className="relative px-6 pt-12 pb-20 rounded-b-[3rem] bg-emerald-950 overflow-hidden shadow-[var(--shadow-lg)]" aria-labelledby="shop-title">
        {/* Background Texture & Ambient Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/textures/noise.svg)' }} />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/20 blur-[80px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 w-20 h-20 bg-brand-accent/10 border-2 border-brand-accent/20 rounded-[var(--radius-lg)] flex items-center justify-center text-brand-accent shadow-2xl backdrop-blur-md"
          >
            <ShoppingBag size={42} strokeWidth={2.5} />
          </motion.div>
          
          <div className="space-y-3">
            <p className="text-loud text-emerald-100/40 !text-[10px] flex items-center justify-center gap-2">
              <Gem size={14} className="text-brand-accent" />
              SANTUÁRIO DE RECOMPENSAS
            </p>
            <h1 id="shop-title" className="text-hero-title text-white">
              Escolha seu prêmio mágico
            </h1>
            <p className="text-poetic text-emerald-100/60 !text-[15px] max-w-md mx-auto">
              Use suas moedas para resgatar recompensas combinadas com sua família. Cada escolha é um passo na sua jornada.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 rounded-[var(--radius-lg)] p-4 pr-6 backdrop-blur-xl shadow-inner group">
            <div className="w-12 h-12 bg-brand-accent rounded-[var(--radius-md)] flex items-center justify-center text-emerald-950 shadow-xl border-2 border-brand-accent/50 rotate-6 group-hover:rotate-12 transition-transform">
               <Coins size={24} fill="currentColor" />
            </div>
            <div className="text-left">
              <span className="text-loud text-white/40 !text-[8px]">SEU TESOURO</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white tracking-tighter leading-none">{profile.coins}</span>
                <span className="text-loud text-brand-accent !text-[8px]">MOEDAS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section: Stats & Context */}
      <section className="px-6 -mt-10 mb-12 relative z-20" aria-label="Resumo da loja">
        <div className="max-w-xl mx-auto grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[var(--radius-card)] p-5 border-2 border-emerald-50 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
              <Leaf size={22} />
            </div>
            <div>
              <span className="text-loud text-emerald-900/30 !text-[8px]">FILTRANDO POR</span>
              <p className="font-black text-emerald-950 italic truncate">{filter}</p>
            </div>
          </div>
          <div className="bg-white rounded-[var(--radius-card)] p-5 border-2 border-emerald-50 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
              <Sparkles size={22} fill="currentColor" />
            </div>
            <div>
              <span className="text-loud text-emerald-900/30 !text-[8px]">AO SEU ALCANCE</span>
              <p className="font-black text-emerald-950 italic">{affordableCount} prêmios</p>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 mb-12">
        <CategoryFilter categories={categories} activeCategory={filter} onSelect={setFilter} />
      </div>

      {/* Rewards Grid */}
      <section className="px-6 pb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Recompensas">
        {filteredRewards.map((reward, i) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            index={i}
            canAfford={profile.coins >= reward.cost}
            onClick={() => handlePurchaseClick(reward)}
          />
        ))}
      </section>

      <PurchaseConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmPurchase}
        reward={selectedReward}
      />

      <PurchaseSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        reward={selectedReward}
      />
    </PageContainer>
  )
}
