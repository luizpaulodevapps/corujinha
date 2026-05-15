import { MentorType } from '@/stores/use-relationship-store'
import { DialogueContext, MentorVoice, EmotionalState } from './types'

/**
 * 🦉 MentorDialogueService: O Cérebro Narrativo da Corujinha
 */

const VOICES: Record<MentorType, MentorVoice> = {
  Bubo: {
    signature: "Hm-hm!",
    traits: ["Sábio", "Calmo", "Profundo"],
    phrases: {
      morning: ["O sol banha a clareira! Que sementes de sabedoria vamos plantar hoje?", "Um novo mapa se abre diante de nós, pequeno herói."],
      night: ["As estrelas sussurram segredos sobre o amanhã. Hora de descansar."],
      streak: ["Suas asas estão ficando fortes! {streak} dias de constância!", "A sabedoria vem com a prática. {streak} dias seguidos!"],
      memory_recall: ["Lembro que você aprendeu muito sobre {category} ontem. Que tal continuarmos?"],
      generic: ["Como vai sua jornada hoje?", "Sempre há algo novo para aprender na floresta."]
    }
  },
  Lumi: {
    signature: "Zapt!",
    traits: ["Radiante", "Elétrico", "Alegre"],
    phrases: {
      morning: ["Que dia brilhante para ser você!", "Acorda, herói! A luz da clareira está te chamando!"],
      night: ["Shhh... as estrelas chegaram para iluminar seu descanso.", "Hora de brilhar no ritual da noite."],
      streak: ["Faiscante! {streak} dias de pura luz!", "Você está brilhando mais que um cometa! {streak} dias!"],
      memory_recall: ["Vi que você brilhou muito em {category}. Incrível!"],
      generic: ["Sua luz está radiante hoje!", "Pluft! Vamos fazer algo incrível?"]
    }
  },
  Gaia: {
    signature: "Shhh...",
    traits: ["Serena", "Natural", "Protetora"],
    phrases: {
      morning: ["A floresta respira calma hoje. Vamos construir nossa rotina, pedra por pedra.", "Bom dia. A harmonia começa com um pequeno passo."],
      night: ["A terra se prepara para o sono. Respire fundo com as árvores."],
      streak: ["O seu ninho está ficando cada vez mais sólido. {streak} dias de ordem!", "As raízes da sua vontade estão profundas. {streak} dias."],
      memory_recall: ["Senti que você cuidou muito bem da sua {category}. A clareira agradece."],
      generic: ["Sinta a terra sob seus pés. Respire fundo.", "A clareira agradece por seu cuidado."]
    }
  },
  Bolt: {
    signature: "Vapt-vupt!",
    traits: ["Rápido", "Corajoso", "Enérgico"],
    phrases: {
      morning: ["Quem vai ser o mais rápido hoje?", "Energia máxima! A aventura já começou!"],
      night: ["Até o vento descansa agora. Recupere sua energia para amanhã."],
      streak: ["Velocidade máxima! {streak} dias sem parar!", "Você é um raio de persistência! {streak} dias!"],
      memory_recall: ["Você foi muito rápido em {category} ontem. Topa de novo?"],
      generic: ["Rápido como o vento! O que vamos conquistar?", "Nenhuma montanha é alta demais para você!"]
    }
  }
}

class MentorDialogueService {
  private static instance: MentorDialogueService

  public static getInstance(): MentorDialogueService {
    if (!MentorDialogueService.instance) {
      MentorDialogueService.instance = new MentorDialogueService()
    }
    return MentorDialogueService.instance
  }

  public getGreeting(context: DialogueContext): string {
    const { mentor, streak, timeOfDay, recentMemories } = context
    const voice = VOICES[mentor]
    
    // 1. Prioridade: Reconhecimento de Memória Recente
    const memory = recentMemories.find(m => m.type === 'category_mastered')
    if (memory && Math.random() > 0.5) {
      const category = memory.metadata?.title || 'suas tarefas'
      return `${voice.signature} ${voice.phrases.memory_recall[0]!.replace('{category}', category)}`
    }

    // 2. Prioridade: Streak (Reconhecimento)
    if (streak > 3 && Math.random() > 0.4) {
      const templates = voice.phrases.streak
      const template = templates[Math.floor(Math.random() * templates.length)]!
      return `${voice.signature} ${template.replace('{streak}', String(streak))}`
    }

    // 3. Prioridade: Temporal
    if (timeOfDay === 'morning') {
      const templates = voice.phrases.morning
      return `${voice.signature} ${templates[Math.floor(Math.random() * templates.length)]}`
    }
    if (timeOfDay === 'night') {
      const templates = voice.phrases.night
      return `${voice.signature} ${templates[Math.floor(Math.random() * templates.length)]}`
    }

    // 4. Fallback: Genérico
    const templates = voice.phrases.generic
    return `${voice.signature} ${templates[Math.floor(Math.random() * templates.length)]}`
  }

  public getEmotionalState(timeOfDay: string, streak: number): EmotionalState {
    if (timeOfDay === 'night') return 'sleepy'
    if (timeOfDay === 'evening') return 'cozy'
    if (streak > 5) return 'celebratory'
    return 'calm'
  }
}

export const mentorDialogueService = MentorDialogueService.getInstance()
