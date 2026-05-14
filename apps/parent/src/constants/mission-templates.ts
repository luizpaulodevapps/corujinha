export interface MissionTemplate {
  id: string
  title: string
  category: 'morning' | 'study' | 'house' | 'health' | 'night'
  emoji: string
  coins: number
  xp: number
}

export const MISSION_TEMPLATES: MissionTemplate[] = [
  { id: 't1', title: 'Arrumar a Cama', category: 'house', emoji: '🛏️', coins: 10, xp: 20 },
  { id: 't2', title: 'Escovar os Dentes', category: 'health', emoji: '🪥', coins: 5, xp: 15 },
  { id: 't3', title: 'Ler 15 Minutos', category: 'study', emoji: '📖', coins: 20, xp: 50 },
  { id: 't4', title: 'Guardar os Brinquedos', category: 'house', emoji: '🧸', coins: 15, xp: 30 },
  { id: 't5', title: 'Comer Frutas', category: 'health', emoji: '🍎', coins: 10, xp: 20 },
  { id: 't6', title: 'Tomar Banho', category: 'health', emoji: '🚿', coins: 10, xp: 20 },
  { id: 't7', title: 'Fazer o Dever de Casa', category: 'study', emoji: '✏️', coins: 30, xp: 100 },
  { id: 't8', title: 'Organizar a Mochila', category: 'study', emoji: '🎒', coins: 15, xp: 40 },
  { id: 't9', title: 'Dormir no Horário', category: 'night', emoji: '😴', coins: 20, xp: 60 },
  { id: 't10', title: 'Ajudar no Jantar', category: 'house', emoji: '🍽️', coins: 25, xp: 50 },
]
