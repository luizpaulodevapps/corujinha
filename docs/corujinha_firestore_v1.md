# Corujinha — Firestore Modeling
## Data Architecture Document

Versão: 1.0
Empresa: Stack Infra
Produto: Corujinha
Status: Engineering Foundation

---

# 1. Princípios de Modelagem

- Denormalize estrategicamente (leitura > escrita)
- Nunca fazer joins em tempo real; duplicar campos essenciais
- Toda collection crítica tem `createdAt` e `updatedAt`
- Soft delete obrigatório: `deletedAt` (nunca deletar dados reais)
- Todos os IDs são strings UUID gerados no cliente ou Firebase

---

# 2. Collections

## 2.1 `users`

Usuário base (pais e admins).

```ts
users/{userId}

{
  id: string                  // Firebase Auth UID
  email: string
  displayName: string
  photoURL: string | null
  role: 'parent' | 'admin'
  familyId: string | null     // denormalizado para queries rápidas
  onboardingCompleted: boolean
  fcmTokens: string[]         // tokens para push notification
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}
```

**Indexes:**
- `familyId ASC, createdAt DESC`

---

## 2.2 `children`

Perfis infantis (não são Firebase Auth users diretamente).

```ts
children/{childId}

{
  id: string
  familyId: string
  parentIds: string[]
  displayName: string
  avatarId: string | null
  pinCode: string             // hash do PIN de acesso (6 dígitos)
  age: number
  xp: number                  // total acumulado
  level: number               // calculado via cloud function
  currentStreak: number
  longestStreak: number
  lastActivityAt: Timestamp | null
  fcmTokens: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}
```

**Indexes:**
- `familyId ASC, level DESC`
- `familyId ASC, xp DESC`

---

## 2.3 `families`

Núcleo familiar.

```ts
families/{familyId}

{
  id: string
  name: string
  parentIds: string[]
  childIds: string[]
  settings: {
    currency: string          // ex: "coins"
    weeklyGoal: number        // missões por semana
    autoApprove: boolean      // aprovação automática de tarefas simples
    notifications: {
      taskCompleted: boolean
      rewardRedeemed: boolean
      streakMilestone: boolean
    }
  }
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}
```

---

## 2.4 `tasks`

Missões definidas pelos pais.

```ts
tasks/{taskId}

{
  id: string
  familyId: string
  createdBy: string           // userId do pai
  title: string
  description: string
  iconEmoji: string           // ex: "🧹"
  difficulty: 'easy' | 'medium' | 'hard'
  rewardCoins: number
  rewardXp: number
  recurrenceType: 'daily' | 'weekly' | 'one-time' | 'recurring'
  recurrenceDays: number[]    // [1,2,3,4,5] = seg-sex (0=dom)
  assignedChildIds: string[]
  requiresProof: boolean      // criança precisa enviar foto
  active: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}
```

**Indexes:**
- `familyId ASC, active ASC, recurrenceType ASC`
- `familyId ASC, assignedChildIds ARRAY_CONTAINS`

---

## 2.5 `taskExecutions`

Instâncias de execução de uma tarefa por uma criança.

```ts
taskExecutions/{executionId}

{
  id: string
  taskId: string
  taskTitle: string           // denormalizado
  taskRewardCoins: number     // denormalizado
  taskRewardXp: number        // denormalizado
  familyId: string
  childId: string
  childName: string           // denormalizado
  status: 'pending' | 'completed' | 'approved' | 'rejected' | 'expired'
  proofImageUrl: string | null
  rejectionReason: string | null
  approvedBy: string | null   // userId do pai
  completedAt: Timestamp | null
  approvedAt: Timestamp | null
  dueDate: Timestamp          // quando expira
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Indexes:**
- `familyId ASC, status ASC, dueDate ASC`
- `childId ASC, status ASC, createdAt DESC`
- `familyId ASC, childId ASC, status ASC`

---

## 2.6 `wallets`

Uma wallet por criança.

```ts
wallets/{walletId}

{
  id: string
  childId: string             // 1:1 com children
  familyId: string
  balance: number             // nunca negativo
  totalEarned: number         // lifetime total
  totalSpent: number          // lifetime total
  updatedAt: Timestamp
  createdAt: Timestamp
}
```

**Regra:** Wallet só é modificada via Cloud Function. Nunca pelo cliente.

---

## 2.7 `transactions`

Histórico imutável de movimentações.

```ts
transactions/{transactionId}

{
  id: string
  walletId: string
  childId: string
  familyId: string
  type: 'earn' | 'spend' | 'bonus' | 'refund' | 'adjustment'
  amount: number              // sempre positivo
  direction: 'credit' | 'debit'
  source: 'task_approval' | 'reward_redemption' | 'bonus' | 'manual'
  referenceId: string | null  // taskExecutionId ou rewardRedemptionId
  description: string
  createdAt: Timestamp        // imutável
}
```

**Indexes:**
- `walletId ASC, createdAt DESC`
- `childId ASC, type ASC, createdAt DESC`
- `familyId ASC, createdAt DESC`

**Regra:** Transactions são IMUTÁVEIS. Nunca update/delete.

---

## 2.8 `rewards`

Catálogo de recompensas criadas pelos pais.

```ts
rewards/{rewardId}

{
  id: string
  familyId: string
  createdBy: string
  title: string
  description: string
  iconEmoji: string
  imageUrl: string | null
  category: 'digital' | 'physical' | 'experience' | 'privilege'
  costCoins: number
  stock: number | null        // null = ilimitado
  active: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}
```

**Indexes:**
- `familyId ASC, active ASC, category ASC`

---

## 2.9 `rewardRedemptions`

Resgates de recompensas.

```ts
rewardRedemptions/{redemptionId}

{
  id: string
  rewardId: string
  rewardTitle: string         // denormalizado
  rewardCostCoins: number     // denormalizado
  familyId: string
  childId: string
  childName: string           // denormalizado
  status: 'pending' | 'approved' | 'rejected' | 'delivered'
  rejectionReason: string | null
  approvedBy: string | null
  approvedAt: Timestamp | null
  deliveredAt: Timestamp | null
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Indexes:**
- `familyId ASC, status ASC, createdAt DESC`
- `childId ASC, status ASC, createdAt DESC`

---

## 2.10 `achievements`

Conquistas do sistema (definições).

```ts
achievements/{achievementId}

{
  id: string
  title: string
  description: string
  iconEmoji: string
  badgeImageUrl: string
  category: 'streak' | 'tasks' | 'xp' | 'social' | 'special'
  trigger: {
    type: 'streak_days' | 'total_tasks' | 'total_xp' | 'level_reached'
    threshold: number
  }
  rewardXp: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  createdAt: Timestamp
}
```

---

## 2.11 `childAchievements`

Achievements desbloqueados por criança.

```ts
childAchievements/{childAchievementId}

{
  id: string
  childId: string
  familyId: string
  achievementId: string
  achievementTitle: string    // denormalizado
  achievementRarity: string   // denormalizado
  unlockedAt: Timestamp
}
```

**Indexes:**
- `childId ASC, unlockedAt DESC`

---

## 2.12 `avatars`

Avatar de cada criança.

```ts
avatars/{avatarId}

{
  id: string
  childId: string             // 1:1
  familyId: string
  baseType: string            // ex: "owl_1", "owl_2"
  equippedItems: {
    hat: string | null
    outfit: string | null
    accessory: string | null
    background: string | null
  }
  unlockedItemIds: string[]
  updatedAt: Timestamp
  createdAt: Timestamp
}
```

---

## 2.13 `notifications`

Notificações in-app.

```ts
notifications/{notificationId}

{
  id: string
  familyId: string
  recipientId: string         // userId ou childId
  recipientType: 'parent' | 'child'
  type: 'task_completed' | 'task_approved' | 'task_rejected'
       | 'reward_requested' | 'reward_approved' | 'xp_gained'
       | 'level_up' | 'streak_milestone' | 'achievement_unlocked'
  title: string
  body: string
  referenceId: string | null
  referenceType: string | null
  read: boolean
  createdAt: Timestamp
}
```

**Indexes:**
- `recipientId ASC, read ASC, createdAt DESC`
- `familyId ASC, createdAt DESC`

---

# 3. Subcollections

Usar subcollections apenas quando os dados são exclusivos de um documento pai e o volume por documento pode ser alto.

| Subcollection | Pai | Uso |
|---|---|---|
| Evitar no MVP | — | Preferir collections flat com familyId |

---

# 4. Estratégia de Queries

## Queries mais frequentes

```txt
1. Tarefas pendentes de um filho
   taskExecutions WHERE childId == X AND status == 'pending'

2. Tarefas aguardando aprovação de uma família
   taskExecutions WHERE familyId == X AND status == 'completed'

3. Histórico de transações de uma wallet
   transactions WHERE walletId == X ORDER BY createdAt DESC

4. Notificações não lidas
   notifications WHERE recipientId == X AND read == false

5. Recompensas disponíveis da família
   rewards WHERE familyId == X AND active == true
```

---

# 5. Regras de Denormalização

| Campo duplicado | Origem | Destino | Motivo |
|---|---|---|---|
| `taskTitle` | tasks | taskExecutions | Evitar join na listagem |
| `taskRewardCoins` | tasks | taskExecutions | Garantir valor histórico |
| `childName` | children | taskExecutions | Exibição rápida |
| `rewardTitle` | rewards | rewardRedemptions | Histórico imutável |
| `familyId` | families | tasks, wallets, etc | Filtro universal |

---

# 6. Estratégia de Paginação

Usar `startAfter` com cursor em todas as listagens:

```ts
// Exemplo: buscar próximas execuções
query(
  collection(db, 'taskExecutions'),
  where('familyId', '==', familyId),
  where('status', '==', 'completed'),
  orderBy('createdAt', 'desc'),
  startAfter(lastDoc),
  limit(20)
)
```

Page size padrão: **20 documentos**.

---

# 7. Estratégia de Realtime vs Fetch

| Feature | Estratégia | Motivo |
|---|---|---|
| Task executions pendentes | `onSnapshot` | UX tempo real |
| Notificações | `onSnapshot` | UX tempo real |
| Balance da wallet | `onSnapshot` | Crítico |
| Histórico de transações | `getDocs` + paginação | Volume alto |
| Catálogo de rewards | `getDocs` + cache | Muda pouco |
| Achievements | `getDocs` + cache | Estático |

---

# 8. Estrutura de Ambiente

```txt
corujinha-dev      → desenvolvimento local
corujinha-staging  → QA e testes de integração
corujinha-prod     → produção
```

Todos os ambientes têm as mesmas collections.
Dados de seed apenas em dev/staging.
