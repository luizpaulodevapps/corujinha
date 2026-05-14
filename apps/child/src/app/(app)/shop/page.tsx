'use client'

import { useEffect, useState } from 'react'
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
  const categories = ['Todos', 'Tecnologia', 'Comida', 'Lazer', 'Aventura'] as RewardCategory[]
  const affordableCount = filteredRewards.filter(reward => profile.coins >= reward.cost).length

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <PageContainer title="Loja de Tesouros" hideHeader hideAvatar>
      <ShopBackground />

      <section className="cs-hero" aria-labelledby="shop-title">
        <div className="cs-hero__badge">
          <ShoppingBag size={38} strokeWidth={2.6} />
        </div>
        <div className="cs-hero__copy">
          <p className="cs-kicker">
            <Gem size={15} />
            Loja de tesouros
          </p>
          <h1 id="shop-title">Escolha seu premio magico</h1>
          <p>Use suas moedas para resgatar recompensas combinadas com a familia.</p>
        </div>
        <div className="cs-wallet">
          <span>
            <Coins size={17} fill="currentColor" />
            Carteira
          </span>
          <strong>{profile.coins}</strong>
        </div>
      </section>

      <section className="cs-summary" aria-label="Resumo da loja">
        <div>
          <Leaf size={18} />
          <span>Categoria</span>
          <strong>{filter}</strong>
        </div>
        <div>
          <Sparkles size={18} />
          <span>Disponiveis</span>
          <strong>{affordableCount}</strong>
        </div>
      </section>

      <CategoryFilter categories={categories} activeCategory={filter} onSelect={setFilter} />

      <section className="cs-grid" aria-label="Recompensas">
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
