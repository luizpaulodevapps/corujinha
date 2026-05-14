# Corujinha — SDD
## Software Design Document

Versão: 2.0
Empresa: Stack Infra
Produto: Corujinha
Status: Estruturação

---

# 1. Product Overview

## Visão Geral

A Corujinha é uma plataforma gamificada de desenvolvimento infantil focada em:

- educação financeira
- criação de hábitos
- responsabilidade
- rotina
- autonomia
- recompensas
- progressão infantil

A plataforma transforma tarefas e hábitos em experiências gamificadas através de:

- missões
- XP
- moedas
- objetivos
- conquistas
- recompensas
- progressão visual

---

# 2. Product Mission

> Transformar pequenas responsabilidades em grandes conquistas.

---

# 3. Product Vision

A Corujinha busca construir:

- um ecossistema infantil
- uma plataforma gamificada
- uma IP educacional
- uma experiência emocional
- um sistema de desenvolvimento comportamental

---

# 4. Multi-App Architecture

## Estrutura de Aplicações

A plataforma será dividida em múltiplas experiências.

```txt
app.corujinha.com.br
→ Landing institucional

pais.corujinha.com.br
→ Dashboard dos pais

play.corujinha.com.br
→ Universo infantil gamificado

admin.corujinha.com.br
→ Painel master Stack Infra
```

---

## Objetivos da Separação

- Segurança
- Escalabilidade
- UX especializada
- Separação de contexto
- Performance
- Modularização
- Controle de permissões

---

# 5. Arquitetura Técnica

## Frontend

- Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- Zustand
- React Query
- PWA

---

## Backend

- Firebase Auth
- Firestore
- Cloud Functions
- Firebase Storage
- Firebase Messaging
- Firebase Analytics

---

## Monorepo

```txt
/apps
  /landing
  /parent
  /child
  /admin

/packages
  /ui
  /domain
  /services
  /firebase
  /gamification
  /wallet
  /shared
```

---

# 6. PWA Strategy

## Estratégia Mobile

A plataforma será PWA-first.

Objetivos:

- Baixo custo operacional
- Atualização instantânea
- Instalação simplificada
- Compatibilidade Android/iOS
- Alta velocidade de entrega

---

## Recursos PWA

- Offline cache
- Push notifications
- Install prompt
- Home screen support
- Background sync
- Responsive navigation

---

# 7. User Roles

## Parent

Permissões:

- Criar tarefas
- Aprovar tarefas
- Gerenciar recompensas
- Gerenciar filhos
- Gerenciar wallet
- Visualizar analytics

---

## Child

Permissões:

- Visualizar missões
- Completar tarefas
- Visualizar recompensas
- Evoluir avatar
- Participar de objetivos

---

## Master Admin

Painel Stack Infra.

Permissões:

- Gerenciar sistema
- Moderar marketplace
- Visualizar métricas globais
- Gerenciar parceiros
- Controle operacional

---

# 8. Core Domains

```txt
Auth
Family
Tasks
TaskExecutions
Gamification
Wallet
Rewards
Marketplace
Education
Notifications
Analytics
Avatar
```

---

# 9. Auth System

## Estratégia de Sessão

- Firebase Auth centralizado
- Middleware por role
- Session persistence
- Role-based routing

---

## Login por Contexto

### Pais

```txt
pais.corujinha.com.br
```

---

### Crianças

```txt
play.corujinha.com.br
```

---

### Admin

```txt
admin.corujinha.com.br
```

---

# 10. Family Domain

## Estrutura

```ts
Family {
  id: string
  name: string
  parentIds: string[]
  childIds: string[]
  settings: object
  createdAt: timestamp
}
```

---

# 11. Task Engine

## Objetivo

Transformar tarefas em missões.

---

## Tipos

- Daily
- Weekly
- One-time
- Recurring

---

## Estrutura

```ts
Task {
  id: string
  familyId: string
  title: string
  description: string
  difficulty: string
  rewardCoins: number
  rewardXp: number
  recurrenceType: string
  createdBy: string
  active: boolean
}
```

---

# 12. Task Execution Engine

## Fluxo

```txt
Mission Assigned
→ Child Completes
→ Parent Reviews
→ Reward Granted
→ XP Updated
→ Achievement Check
```

---

## Estrutura

```ts
TaskExecution {
  id: string
  taskId: string
  childId: string
  status: string
  approvedBy: string
  completedAt: timestamp
}
```

---

# 13. Wallet System

## Objetivo

Gerenciar economia virtual infantil.

---

## Regras

- Crianças não transferem moedas
- Toda movimentação gera histórico
- Aprovação parental obrigatória
- Saldo nunca negativo

---

## Estrutura

```ts
Wallet {
  id: string
  childId: string
  balance: number
}
```

---

## Transactions

```ts
Transaction {
  id: string
  walletId: string
  type: string
  amount: number
  source: string
  createdAt: timestamp
}
```

---

# 14. Gamification Engine

## Objetivo

Gerar retenção saudável.

---

## Elementos

- XP
- Levels
- Streaks
- Badges
- Objectives
- Rewards
- Collections
- Avatar progression

---

## Core Loop

```txt
Missão
→ esforço
→ recompensa
→ evolução
→ pertencimento
→ retorno diário
```

---

# 15. Avatar System

## Objetivo

Criar vínculo emocional.

---

## Recursos

- roupas
- acessórios
- customização
- evolução visual
- itens desbloqueáveis

---

# 16. Marketplace

## Objetivo

Permitir troca de moedas por experiências.

---

## Recompensas Digitais

- Roblox
- Minecraft
- Gift Cards
- Jogos

---

## Recompensas Físicas

- Cinema
- Museus
- Parques
- Eventos

---

# 17. Education Engine

## Objetivo

Ensinar educação financeira através da prática.

---

## Conceitos

- Economia
- Planejamento
- Objetivos
- Consumo consciente
- Recompensa atrasada

---

# 18. Notification System

## Push Notifications

- Missão disponível
- Missão aprovada
- Nova recompensa
- Streak ativo
- Objetivo concluído

---

# 19. Firestore Modeling

## Collections

```txt
users
families
children
tasks
taskExecutions
wallets
transactions
rewards
achievements
notifications
avatars
```

---

# 20. Firebase Architecture Rules

## Regras Obrigatórias

- Nunca acessar Firebase diretamente em componentes
- Toda regra crítica deve usar Cloud Functions
- Separar services/repositories/domains
- Validação server-side obrigatória

---

## Estrutura Recomendada

```txt
component
→ hook
→ service
→ repository
→ firebase
```

---

# 21. Security

## Regras

- Role-based access
- Firebase Rules
- Logs críticos
- Proteção antifraude
- Aprovação parental obrigatória
- Proteção de dados infantis

---

# 22. Analytics

## Métricas

- Daily retention
- Weekly retention
- Streak average
- Completed missions
- XP progression
- Family engagement
- Reward redemption

---

# 23. UX Principles

## Parent Experience

- clean
- premium
- simples
- rápida
- analítica

---

## Child Experience

- divertida
- viva
- emocional
- gamificada
- recompensadora

---

# 24. Long-Term Vision

A Corujinha evoluirá para:

- plataforma educacional
- marketplace infantil
- IA educativa
- ecossistema familiar
- IP infantil escalável
- experiências físicas
- conteúdo audiovisual

---

# 25. Final Statement

A Corujinha combina:

- gamificação
- educação financeira
- tecnologia
- hábitos
- desenvolvimento infantil

em um ecossistema emocional e escalável.

