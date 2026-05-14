export interface TaskTemplate {
  title: string
  description: string
  iconEmoji: string
  category: 'routine' | 'study' | 'health' | 'help'
  difficulty: 'easy' | 'medium' | 'hard'
  suggestedCoins: number
  suggestedXp: number
}

export interface RewardTemplate {
  title: string
  description: string
  iconEmoji: string
  category: 'digital' | 'physical' | 'experience' | 'privilege'
  suggestedCost: number
}

export const SUGGESTED_TASKS: TaskTemplate[] = [
  {
    title: 'Arrumar a Cama',
    description: 'Deixar o quarto organizado logo ao acordar.',
    iconEmoji: '🛏️',
    category: 'routine',
    difficulty: 'easy',
    suggestedCoins: 5,
    suggestedXp: 10
  },
  {
    title: 'Escovar os Dentes',
    description: 'Manter o sorriso brilhante e saudável.',
    iconEmoji: '🪥',
    category: 'health',
    difficulty: 'easy',
    suggestedCoins: 2,
    suggestedXp: 5
  },
  {
    title: 'Dever de Casa',
    description: 'Concluir todas as tarefas da escola do dia.',
    iconEmoji: '📚',
    category: 'study',
    difficulty: 'medium',
    suggestedCoins: 15,
    suggestedXp: 30
  },
  {
    title: 'Ajudar no Jantar',
    description: 'Pôr a mesa ou ajudar a organizar a cozinha.',
    iconEmoji: '🍽️',
    category: 'help',
    difficulty: 'easy',
    suggestedCoins: 10,
    suggestedXp: 20
  },
  {
    title: 'Ler um Livro',
    description: 'Ler pelo menos 15 minutos de uma história.',
    iconEmoji: '📖',
    category: 'study',
    difficulty: 'medium',
    suggestedCoins: 10,
    suggestedXp: 25
  },
  {
    title: 'Guardar os Brinquedos',
    description: 'Nenhum brinquedo fora do lugar após a brincadeira.',
    iconEmoji: '🧸',
    category: 'routine',
    difficulty: 'easy',
    suggestedCoins: 8,
    suggestedXp: 15
  }
]

export const SUGGESTED_REWARDS: RewardTemplate[] = [
  {
    title: '30 min de Videogame',
    description: 'Tempo extra para jogar seu jogo favorito.',
    iconEmoji: '🎮',
    category: 'digital',
    suggestedCost: 50
  },
  {
    title: 'Escolher o Jantar',
    description: 'Você decide o que a família vai comer hoje!',
    iconEmoji: '🍕',
    category: 'experience',
    suggestedCost: 100
  },
  {
    title: 'Filme com Pipoca',
    description: 'Sessão de cinema em casa com direito a guloseimas.',
    iconEmoji: '🍿',
    category: 'experience',
    suggestedCost: 150
  },
  {
    title: 'Dormir 30 min mais tarde',
    description: 'Um privilégio especial para dias de folga.',
    iconEmoji: '🌙',
    category: 'privilege',
    suggestedCost: 80
  },
  {
    title: 'Passeio no Parque',
    description: 'Uma tarde de diversão ao ar livre.',
    iconEmoji: '🌳',
    category: 'experience',
    suggestedCost: 200
  }
]
