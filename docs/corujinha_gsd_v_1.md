# Corujinha — GSD
## Get Shit Done Framework

Versão: 1.0
Empresa: Stack Infra
Produto: Corujinha

---

# 1. Objetivo do GSD

O objetivo do GSD é organizar a execução do produto de forma:

- modular
- rápida
- escalável
- IA-friendly
- orientada por domínio

O foco principal é:

> reduzir caos estrutural e acelerar entregas.

---

# 2. Filosofia de Desenvolvimento

A Corujinha será construída utilizando:

```txt
Brand Concept
→ Product Vision
→ SDD
→ GSD
→ IA Assisted Development
→ Ship Fast
→ Learn
→ Iterate
```

---

# 3. Regras de Desenvolvimento

## Regras Obrigatórias

- Desenvolver por domínio
- Um contexto por sprint
- Um objetivo por entrega
- Nunca misturar múltiplos domínios
- Todo módulo precisa ser desacoplado
- Todo código deve ser reutilizável

---

# 4. Development Workflow

## Fluxo Oficial

```txt
Contexto
→ Planejamento
→ Execução
→ Revisão
→ Refatoração
→ Deploy
```

---

# 5. Estrutura do Projeto

```txt
/apps
  /landing
  /parent
  /child
  /admin

/packages
  /ui
  /domain
  /firebase
  /services
  /gamification
  /wallet
  /shared
```

---

# 6. Stack Oficial

## Frontend

- Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- Zustand
- React Query

---

## Backend

- Firebase Auth
- Firestore
- Cloud Functions
- Firebase Storage
- Firebase Messaging

---

# 7. Estratégia PWA

A plataforma será construída inicialmente como:

```txt
PWA-first
```

Objetivos:

- velocidade de entrega
- baixo custo operacional
- experiência mobile
- instalação simplificada
- atualizações instantâneas

---

# 8. Estratégia Multi-App

## Aplicações

```txt
app.corujinha.com.br
→ institucional

pais.corujinha.com.br
→ experiência parental

play.corujinha.com.br
→ experiência infantil

admin.corujinha.com.br
→ Stack Infra master admin
```

---

# 9. Core Domains

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

# 10. MVP Definition

## Parent App

### MVP

- cadastro
- login
- onboarding familiar
- criar tarefas
- aprovar tarefas
- gerenciar recompensas

---

## Child App

### MVP

- login simplificado
- visualizar missões
- completar tarefas
- ganhar moedas
- ganhar XP
- visualizar progresso

---

## System

### MVP

- wallet
- gamificação básica
- notificações
- progressão

---

# 11. Sprint Strategy

## Sprint 01 — Foundation

Objetivo:

- setup monorepo
- setup firebase
- setup auth
- estrutura base

Entregas:

- Next.js apps
- Firebase config
- shared packages
- auth middleware

---

## Sprint 02 — Family System

Objetivo:

- onboarding familiar
- criação de famílias
- vínculo pais/filhos

Entregas:

- family model
- family service
- onboarding UI

---

## Sprint 03 — Task Engine

Objetivo:

- sistema de missões
- criação de tarefas
- execução infantil

Entregas:

- task service
- task execution
- mission UI

---

## Sprint 04 — Wallet

Objetivo:

- economia virtual
- moedas
- transações

Entregas:

- wallet service
- transactions
- cloud functions

---

## Sprint 05 — Gamification

Objetivo:

- XP
- níveis
- streaks
- badges

Entregas:

- XP engine
- progression system
- achievements

---

## Sprint 06 — Notifications

Objetivo:

- retenção
- push notifications

Entregas:

- Firebase Messaging
- notification engine

---

## Sprint 07 — Avatar System

Objetivo:

- customização
- vínculo emocional

Entregas:

- avatar editor
- inventory
- unlockables

---

## Sprint 08 — Marketplace

Objetivo:

- troca de recompensas
- experiências

Entregas:

- marketplace UI
- reward redemption
- approval flow

---

# 12. Code Standards

## Obrigatório

- TypeScript strict mode
- Repository Pattern
- Service Layer
- Domain separation
- Atomic components
- Reusable hooks

---

# 13. Firebase Rules

## Obrigatório

- Nunca acessar Firebase diretamente em componentes
- Toda regra crítica via Cloud Functions
- Middleware por role
- Logs críticos obrigatórios

---

# 14. Architecture Principles

## A Corujinha NÃO é:

- CRUD de tarefas
- ERP infantil
- banco digital simples

---

## A Corujinha É:

```txt
Game Loop Platform
```

---

# 15. Core Game Loop

```txt
Missão
→ esforço
→ aprovação
→ recompensa
→ evolução
→ pertencimento
→ retorno diário
```

Toda experiência deve reforçar este loop.

---

# 16. UX Strategy

## Parent App

Experiência:

- clean
- premium
- minimalista
- rápida

---

## Child App

Experiência:

- divertida
- viva
- emocional
- gamificada
- recompensadora

---

# 17. IA Development Rules

## Regras para Antigravity/IA

- Trabalhar um domínio por vez
- Contexto isolado
- Objetivos claros
- Prompts pequenos
- Entregas atômicas
- Revisão obrigatória

---

# 18. Prompt Structure

## Estrutura padrão

```txt
Objetivo
Contexto
Stack
Regras
Entrega esperada
Critérios de validação
```

---

# 19. Validation Rules

Todo módulo deve validar:

- performance
- responsividade
- segurança
- acessibilidade
- PWA compatibility
- mobile-first

---

# 20. Release Strategy

## Estratégia inicial

- releases rápidas
- deploy incremental
- validação contínua
- feedback rápido

---

# 21. Roadmap

## Phase 1

- auth
- family
- tasks
- wallet
- XP

---

## Phase 2

- avatar
- marketplace
- achievements
- analytics

---

## Phase 3

- IA educativa
- parceiros
- escolas
- experiências físicas
- conteúdo audiovisual

---

# 22. Long-Term Goal

A Stack Infra busca transformar a Corujinha em:

- plataforma SaaS
- ecossistema infantil
- IP escalável
- universo gamificado
- marca educacional

---

# 23. Final Statement

O GSD da Corujinha existe para:

- acelerar desenvolvimento
- reduzir caos estrutural
- organizar contexto
- melhorar qualidade
- maximizar velocidade com IA

---

Desenvolvido por Stack Infra.

