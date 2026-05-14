import { Goal } from '../types'

export const MOCK_GOALS: Goal[] = [
  {
    id: '1',
    title: 'Sequência de Ouro',
    description: 'Completar missões por 7 dias seguidos.',
    progress: 5,
    total: 7,
    reward: '50 moedas',
    icon: '🔥',
    color: 'linear-gradient(90deg, #fbbf24, #f59e0b)'
  },
  {
    id: '2',
    title: 'Guardião da Natureza',
    description: '10 missões de cuidado com o ninho.',
    progress: 8,
    total: 10,
    reward: 'Troféu Folha',
    icon: '🍃',
    color: 'linear-gradient(90deg, #10b981, #059669)'
  },
  {
    id: '3',
    title: 'Sábio do Ninho',
    description: 'Ler 15 livros na biblioteca mágica.',
    progress: 4,
    total: 15,
    reward: '300 XP Extra',
    icon: '🦉',
    color: 'linear-gradient(90deg, #a855f7, #7c3aed)'
  },
]
