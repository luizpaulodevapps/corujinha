import { Reward } from '../types'

export const MOCK_REWARDS: Reward[] = [
  { id: '1', title: '30 min de Tablet', description: 'Tempo livre para jogar seus games favoritos!', cost: 50, icon: '📱', color: 'linear-gradient(135deg, #10b981, #0d9488)', category: 'Tecnologia' },
  { id: '2', title: 'Sobremesa Especial', description: 'Escolha seu doce ou fruta favorita hoje.', cost: 30, icon: '🍰', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)', category: 'Comida' },
  { id: '3', title: 'Escolher o Filme', description: 'Você manda na TV hoje à noite!', cost: 40, icon: '🎬', color: 'linear-gradient(135deg, #a855f7, #7c3aed)', category: 'Lazer' },
  { id: '4', title: 'Hora de Videogame', description: '+1 hora de aventura digital.', cost: 60, icon: '🎮', color: 'linear-gradient(135deg, #2d6a4f, #52b788)', category: 'Tecnologia' },
  { id: '5', title: 'Passeio no Parque', description: 'Um dia inteirinho de exploração na natureza.', cost: 100, icon: '🎡', color: 'linear-gradient(135deg, #60a5fa, #4f46e5)', category: 'Aventura' },
  { id: '6', title: 'Noite da Pizza', description: 'Vamos colocar a mão na massa juntos!', cost: 80, icon: '🍕', color: 'linear-gradient(135deg, #f43f5e, #e11d48)', category: 'Comida' },
]
