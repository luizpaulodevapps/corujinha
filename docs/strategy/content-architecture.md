# 🏗️ Content Architecture: Ecossistema Corujinha

Este documento define como o conteúdo é estruturado e distribuído para garantir o "Loop de Retenção Diária".

## 1. O Core Loop (O Coração)
Toda peça de conteúdo deve servir ao ciclo:
`Missão (Estímulo) → Execução (Ação) → Recompensa (Prazer) → Progresso (Identidade)`.

## 2. Taxonomia de Conteúdo
O conteúdo é dividido em camadas de profundidade:

### A. Conteúdo Efêmero (Diário)
- **Missões Geradas por IA:** Narrativas rápidas para tarefas de rotina.
- **Dicas da Corujinha:** Frases curtas de incentivo ao abrir o app.
- **Notificações:** Chamados lúdicos ("Um novo mistério surgiu na Clareira...").

### B. Conteúdo Estrutural (Progressão)
- **Caminho do Herói (Levels):** Nomes e ícones para cada nível conquistado.
- **Marcos de Conquista (Badges):** Medalhas raras para sequências de hábitos (ex: "Guardião da Higiene - 7 dias").

### C. Conteúdo de Expansão (Lore)
- **Contos da Floresta:** Pequenas histórias (áudio ou texto) desbloqueadas ao subir de nível.
- **Eventos Sazonais:** Mudanças visuais e missões especiais (ex: "Festival do Equinócio de Inverno").

## 3. Diretório de Ativos (Content Directory Structure)
Estrutura sugerida para o gerenciamento de conteúdo no repositório/CMS:

```txt
/content
  /missions
    /templates        # Estruturas base para a IA
    /categories       # Saúde, Natureza, Sabedoria, etc.
  /characters
    /profiles         # Bio, Voz, Atitude de cada mascote
    /assets           # Sprites e animações
  /audio
    /songs            # Trilhas sonoras ambientes
    /fx               # Efeitos de recompensa/moedas
  /events
    /seasonal         # Configurações de eventos temporários
```

## 4. Estratégia de Retenção Emocional
O conteúdo deve focar em criar uma **conexão de longo prazo**:
- **Personalização:** A IA deve aprender as categorias favoritas da criança.
- **Mascotes:** Cada área do app é "governada" por um mascote que interage com a criança.
