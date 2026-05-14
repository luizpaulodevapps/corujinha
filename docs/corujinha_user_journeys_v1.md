# Corujinha — User Journeys
## UX Journey Maps Document

Versão: 1.0
Empresa: Stack Infra
Produto: Corujinha
Status: Engineering Foundation

---

# 1. Personas

## Persona 1 — Pai/Mãe (Parent)

```txt
Nome: Marina, 34 anos
Perfil: Mãe de 2 filhos (8 e 11 anos)
Motivação: Ensinar responsabilidade e educação financeira de forma prática
Dores: Batalha diária para que os filhos façam tarefas sem briga
Expectativa: App rápido, que ela usa em 2 minutos no celular
```

## Persona 2 — Criança (Child)

```txt
Nome: Pedro, 9 anos
Perfil: Viciado em Roblox, adora desafios
Motivação: Ganhar moedas para trocar por tempo no videogame
Dores: Acha tarefas chatas; precisa de recompensa imediata
Expectativa: App divertido igual a um jogo
```

---

# 2. Journey 1 — Onboarding do Pai (First Time)

## Trigger
> Pai baixou o app e quer começar a usar.

## Fluxo

```txt
[1] Landing Page
    → CTA "Começar Grátis"
    → Tela de Cadastro

[2] Cadastro
    → Nome, Email, Senha
    → Verificação de email
    → Login automático pós-verificação

[3] Onboarding Guiado (3 passos)
    → Passo 1: "Como se chama sua família?"
      - Input: nome da família
      - Ex: "Família Silva"
    → Passo 2: "Adicione seu primeiro filho"
      - Nome, idade, PIN de acesso
    → Passo 3: "Crie sua primeira missão"
      - Template sugerido: "Arrumar a cama" (daily, 10 coins, 20 XP)
      - Opção de pular e criar depois

[4] Dashboard Principal
    → Estado initial: empty state amigável
    → Tooltip guiando para criar mais tarefas
    → Filho já aparece no dashboard com streak=0
```

## Emoções por Etapa

| Etapa | Emoção esperada |
|---|---|
| Cadastro | Neutro / confiança |
| Nome da família | Leve emoção / identidade |
| Criar filho | Entusiasmo / antecipação |
| Criar missão | Empoderamento |
| Dashboard | Satisfação / curiosidade |

## Critérios de Sucesso
- Onboarding completo em < 3 minutos
- Primeira tarefa criada sem suporte
- Zero frustração técnica

---

# 3. Journey 2 — Login da Criança (Recorrente)

## Trigger
> Criança chega em casa da escola e quer ver suas missões.

## Fluxo

```txt
[1] Tela Inicial do Child App (play.corujinha.com.br)
    → Exibição de avatares da família
    → "Quem é você?" — selecionar avatar

[2] PIN Screen
    → Input de PIN (4-6 dígitos com UI de jogo)
    → Feedback de erro: shake + mensagem amigável

[3] Home da Criança
    → Saudação personalizada: "Olá, Pedro! 👋"
    → Destaque: missões do dia
    → Barra de XP e nível
    → Saldo de moedas animado
    → Streak atual

[4] Estado: Missões Disponíveis
    → Cards coloridos e grandes
    → Ordem: mais fáceis primeiro
    → Indicador de recompensa visível

[5] Completar Missão
    → Criança marca como concluída
    → Opção de tirar foto como prova (se exigido)
    → Feedback: "Missão enviada! Aguardando aprovação 🕒"

[6] Aguardar Aprovação
    → Missão muda de cor (pending → waiting)
    → Push notification quando aprovada
```

## Emoções por Etapa

| Etapa | Emoção esperada |
|---|---|
| Seleção de avatar | Identificação / diversão |
| PIN | Seriedade / autonomia |
| Home | Excitação / motivação |
| Ver missões | Desafio positivo |
| Completar | Satisfação / orgulho |
| Feedback pending | Paciência (confiança de que será recompensado) |

---

# 4. Journey 3 — Aprovação de Tarefa (Pai, Recorrente)

## Trigger
> Pai recebe notificação: "Pedro completou uma missão!"

## Fluxo

```txt
[1] Push Notification
    → "Pedro concluiu: Arrumar a cama ✅"
    → Tap abre diretamente na tarefa

[2] Tela de Aprovação
    → Foto de prova (se enviada)
    → Detalhes: tarefa, horário, criança
    → Botões: "Aprovar" | "Recusar"

[3A] Caminho: Aprovação
    → Tap em "Aprovar"
    → Feedback imediato: "Recompensa enviada! 🎉"
    → Mostra: +10 coins, +20 XP enviados ao Pedro
    → Volta ao dashboard

[3B] Caminho: Recusa
    → Modal: "Por que recusar?"
    → Input de motivo obrigatório
    → Tap em confirmar
    → Feedback: "Pedro será notificado"

[4] Notificação para Criança
    → 3A: "Parabéns! Você ganhou 10 🪙 e 20 XP!"
    → 3B: "Tarefa recusada: [motivo]"
```

## Critérios de Sucesso
- Aprovação em < 30 segundos
- Pai nunca precisa abrir o app "do zero" para aprovar

---

# 5. Journey 4 — Resgate de Recompensa (Criança)

## Trigger
> Pedro acumulou moedas suficientes para trocar.

## Fluxo

```txt
[1] Child Home
    → Ícone de loja / marketplace
    → Badge com saldo atual de coins

[2] Marketplace
    → Grade de recompensas disponíveis
    → Destaque: o que pode pagar (opacidade nas que não pode)
    → Categorias: digital, físico, experiência

[3] Recompensa Selecionada
    → Modal com detalhes
    → Custo em coins destacado
    → Botão "Quero essa! 🎮"

[4] Confirmação
    → "Tem certeza? Isso vai usar X moedas"
    → Saldo atual e saldo após resgate

[5] Pedido Enviado
    → Animação de celebração
    → "Pedido enviado! Seus pais vão aprovar 🎉"
    → Saldo atualizado na UI

[6] Pai Aprova / Entrega
    → Pai recebe notificação
    → Aprova no app
    → Criança recebe confirmação: "Recompensa liberada!"
```

---

# 6. Journey 5 — Criação de Tarefa (Pai, Recorrente)

## Trigger
> Pai quer adicionar uma nova missão para os filhos.

## Fluxo

```txt
[1] Dashboard → "+ Nova Missão"
    → Modal ou página de criação

[2] Formulário de Missão
    → Título (ex: "Lavar a louça")
    → Emoji/ícone (picker)
    → Descrição opcional
    → Dificuldade: Fácil / Médio / Difícil
    → Recompensa: coins e XP (sugeridos por dificuldade)
    → Recorrência: Diária / Semanal / Única
    → Se semanal: dias da semana
    → Precisa de foto como prova? Toggle

[3] Atribuição
    → Quem deve fazer? (select filhos)
    → Todos ou específico

[4] Preview
    → Como a criança vai ver essa missão
    → Confirmar criação

[5] Sucesso
    → "Missão criada! Os filhos já podem ver 🚀"
    → Retorna ao dashboard
```

---

# 7. Journey 6 — Level Up (Criança)

## Trigger
> Pedro acumula XP suficiente para subir de nível.

## Fluxo

```txt
[1] Aprovação de tarefa recebida
    → XP adicionado normalmente

[2] XP Bar Animada
    → Barra preenche até o fim
    → Efeito: overflow / transbordo para nível novo

[3] Tela de Level Up (full screen)
    → Fundo: explosão de partículas coloridas
    → Avatar em destaque
    → "NÍVEL X ALCANÇADO!" (animação de texto)
    → Badge do novo nível
    → XP bônus do level up

[4] Unlock (se houver)
    → "Item novo desbloqueado para o seu avatar!"
    → Preview do item

[5] CTA
    → "Ver minhas missões" → volta para home
```

---

# 8. Journey 7 — Achievement Desbloqueado (Criança)

## Trigger
> Pedro completa 7 dias seguidos de streak.

## Fluxo

```txt
[1] Streak atualizada
    → Sistema detecta milestone

[2] Notificação push
    → "🔥 Conquista desbloqueada!"

[3] Toast in-app (se criança estiver online)
    → Badge animado com glow
    → "Semana Perfeita!" (rarity: Rare)
    → Tap para expandir

[4] Modal de Achievement
    → Ilustração da conquista
    → Nome e descrição
    → Raridade com cor (common / rare / epic / legendary)
    → XP bônus ganho
    → "Incrível! Continue assim 💪"

[5] Galeria de Conquistas
    → Achievement aparece na coleção
    → Com data de desbloqueio
```

---

# 9. UX States por Tela

## Parent App

| Tela | Loading | Empty | Error |
|---|---|---|---|
| Dashboard | Skeletons de cards | "Adicione seu primeiro filho" | "Erro ao carregar. Tentar novamente" |
| Tarefas pendentes | Skeleton list | "Nenhuma tarefa pendente 🎉" | Retry button |
| Histórico | Skeleton list paginada | "Nenhuma atividade ainda" | Retry |
| Recompensas | Skeleton grid | "Crie sua primeira recompensa" | Retry |
| Perfil filho | Skeleton | — | Retry |

## Child App

| Tela | Loading | Empty | Error |
|---|---|---|---|
| Missões do dia | Alien loader animado | "Sem missões hoje! Descanse 🦉" | Mascote triste + retry |
| Marketplace | Skeleton grid | "Loja vazia... em breve!" | Mascote + retry |
| Conquistas | Skeleton grid | "Nenhuma conquista ainda. Bora!" | Retry |
| Histórico | Skeleton list | "Histórico vazio" | Retry |

---

# 10. Micro-Interações Obrigatórias

| Ação | Micro-Interação |
|---|---|
| Completar missão | Checkmark animado + vibração haptica |
| Ganhar coins | Chuva de coins animada |
| Ganhar XP | XP bar preenche com brilho |
| Level up | Tela de celebração full-screen |
| Achievement | Badge gira com partículas |
| Aprovação | Verde + ícone de checkmark expandindo |
| Rejeição | Shake sutil + vermelho |
| Streak aumenta | Chama animada cresce |
| Botão tap | Scale down 0.96 + release |
| Pull to refresh | Mascote corujinha animada |

---

# 11. Navegação

## Parent App

```txt
Bottom Nav (mobile):
  🏠 Dashboard
  ✅ Missões (badge: pendentes)
  🎁 Recompensas
  👶 Filhos
  ⚙️ Configurações

Sidebar (desktop):
  Mesmo conteúdo expandido
```

## Child App

```txt
Bottom Nav (sempre visível):
  🏠 Home (missões do dia)
  🏪 Loja
  🏆 Conquistas
  👤 Avatar

Sem sidebar — mobile-first absoluto
```
