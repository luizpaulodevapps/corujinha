import { JourneyEvent } from '../types'

export const MOCK_JOURNEY_EVENTS: JourneyEvent[] = [
  { 
    id: '1', 
    title: 'Prova de Matemática', 
    type: 'school', 
    status: 'planned',
    emoji: '📚',
    date: 'Hoje',
    time: '14:00',
    isUrgent: true,
    color: '#3B82F6',
    description: 'Prepare-se para brilhar nos cálculos! Revise tudo com calma para o seu cérebro ficar super afiado! ✨',
    missions: [
      { id: 'm1', title: 'Revisar Tabuada', status: 'done', xp: 50 },
      { id: 'm2', title: 'Fazer 5 exercícios', status: 'pending', xp: 80 },
      { id: 'm3', title: 'Organizar Estojo', status: 'pending', xp: 30 }
    ]
  },
  { 
    id: '2', 
    title: 'Campeonato de Judô', 
    type: 'sports', 
    status: 'upcoming',
    emoji: '🥋',
    date: 'Amanhã',
    time: '10:30',
    isUrgent: false,
    color: '#F59E0B',
    description: 'Sua maior competição está chegando! Força e foco no tatame para conquistar essa vitória! 🥋✨',
    missions: [
      { id: 'm4', title: 'Separar Kimono', status: 'pending', xp: 40 },
      { id: 'm5', title: 'Hidratação Máxima', status: 'pending', xp: 20 }
    ]
  },
  {
    id: '3', 
    title: 'Noite da Pizza em Família', 
    type: 'family', 
    status: 'locked',
    emoji: '🍕',
    date: 'Sexta',
    time: '20:00',
    isUrgent: false,
    color: '#8B5CF6',
    description: 'Momento de alegria e muita massa! Delicie-se com a família na nossa noite mais gostosa da semana! 🍕🦉',
    missions: []
  }
]
