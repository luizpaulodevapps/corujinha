'use client'

import clsx from 'clsx'
import { RewardCategory } from '../types'

interface CategoryFilterProps {
  categories: RewardCategory[]
  activeCategory: RewardCategory
  onSelect: (category: RewardCategory) => void
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="cs-filter" role="tablist" aria-label="Categorias da loja">
      {categories.map(category => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={activeCategory === category}
          onClick={() => onSelect(category)}
          className={clsx('cs-filter__button', activeCategory === category && 'is-active')}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
