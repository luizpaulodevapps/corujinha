# Corujinha — Cloud Functions Contracts
## Backend Functions Design Document

Versão: 1.0
Empresa: Stack Infra
Produto: Corujinha
Status: Engineering Foundation

---

# 1. Princípios

- Toda função tem: **input validado**, **output tipado**, **auth verificado**, **side effects documentados**, **logs obrigatórios**
- Funções críticas nunca são chamadas diretamente do frontend — sempre via `httpsCallable`
- Toda função retorna um envelope padrão: `{ success, data?, error? }`
- Erros são tipados e não expõem stack traces em produção

---

# 2. Envelope Padrão

```ts
// Response envelope
type CFResponse<T> = {
  success: true
  data: T
} | {
  success: false
  error: {
    code: string
    message: string
  }
}
```

---

# 3. Auth Guard Padrão

Toda função verifica antes de executar:

```ts
// Verificações obrigatórias
1. context.auth != null        → UNAUTHENTICATED
2. context.auth.token.role     → verificar role esperada
3. context.auth.token.familyId → verificar ownership
```

---

# 4. Functions Catalogue

---

## 4.1 `onUserCreated` (Auth Trigger)

**Trigger:** `functions.auth.user().onCreate`

**Responsabilidade:** Inicializar usuário no Firestore após signup.

```ts
// Input: Firebase Auth UserRecord
// Output: void

// Side effects:
- Cria documento em /users/{uid}
- Seta Custom Claims: { role: 'parent' }
- Envia email de boas-vindas

// Logs:
- INFO: user_created { uid, email }
```

---

## 4.2 `setChildClaim` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `parent`

**Responsabilidade:** Setar custom claim de role=child para login infantil via PIN.

```ts
// Input
{
  childId: string
  pin: string
}

// Output
{
  success: true,
  data: {
    customToken: string   // token para autenticar a criança
  }
}

// Validações:
- Verificar que pai pertence à mesma família do childId
- Verificar hash do PIN
- Gerar custom token com claims: { role: 'child', familyId, childId }

// Side effects:
- Nenhum (apenas autenticação)

// Logs:
- INFO: child_login_attempt { childId, familyId }
- WARN: child_login_failed_pin { childId } (sem expor PIN)
```

---

## 4.3 `createFamily` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `parent`

**Responsabilidade:** Criar família durante onboarding.

```ts
// Input
{
  familyName: string
}

// Output
{
  success: true,
  data: {
    familyId: string
  }
}

// Validações:
- Usuário não pode já ter familyId
- familyName: 2-50 chars

// Side effects:
- Cria /families/{familyId}
- Atualiza /users/{uid}.familyId
- Seta Custom Claim familyId no token

// Logs:
- INFO: family_created { familyId, parentId }
```

---

## 4.4 `createChild` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `parent`

**Responsabilidade:** Criar perfil de criança na família.

```ts
// Input
{
  displayName: string
  age: number
  pin: string           // 6 dígitos numéricos
}

// Output
{
  success: true,
  data: {
    childId: string
  }
}

// Validações:
- displayName: 2-30 chars
- age: 4-17
- pin: exatamente 6 dígitos

// Side effects:
- Cria /children/{childId} com xp=0, level=1, streak=0
- Cria /wallets/{walletId} com balance=0
- Cria /avatars/{avatarId} com defaults
- Adiciona childId em /families/{familyId}.childIds

// Logs:
- INFO: child_created { childId, familyId }
```

---

## 4.5 `approveTaskExecution` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `parent`

**Responsabilidade:** Aprovar conclusão de tarefa pela criança e distribuir recompensas.

```ts
// Input
{
  executionId: string
}

// Output
{
  success: true,
  data: {
    coinsGranted: number
    xpGranted: number
    newBalance: number
    newXp: number
    newLevel: number | null     // se subiu de nível
    achievementsUnlocked: string[]
  }
}

// Validações:
- executionId existe
- status == 'completed'
- pai pertence à mesma família da execution
- execução não expirada

// Side effects:
1. Atualiza /taskExecutions/{id}: status='approved', approvedBy, approvedAt
2. Incrementa /wallets/{walletId}.balance
3. Cria /transactions/{id}: type='earn', source='task_approval'
4. Incrementa /children/{childId}.xp
5. Recalcula level (se necessário)
6. Verifica e desbloqueia achievements
7. Atualiza streak se tarefa diária
8. Cria /notifications para a criança
9. Envia push notification para a criança

// Logs:
- INFO: task_approved { executionId, childId, coinsGranted, xpGranted }
- INFO: level_up { childId, newLevel } (se aplicável)
```

---

## 4.6 `rejectTaskExecution` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `parent`

**Responsabilidade:** Rejeitar conclusão de tarefa.

```ts
// Input
{
  executionId: string
  reason: string          // obrigatório
}

// Output
{
  success: true,
  data: { executionId: string }
}

// Validações:
- executionId existe e status == 'completed'
- reason: 5-200 chars
- pai pertence à família

// Side effects:
1. Atualiza /taskExecutions/{id}: status='rejected', rejectionReason
2. Cria /notifications para a criança com motivo
3. Envia push notification

// Logs:
- INFO: task_rejected { executionId, childId, reason }
```

---

## 4.7 `requestRewardRedemption` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `child`

**Responsabilidade:** Criança solicitar resgate de recompensa.

```ts
// Input
{
  rewardId: string
}

// Output
{
  success: true,
  data: {
    redemptionId: string
    newBalance: number
  }
}

// Validações:
- rewardId existe e active == true
- reward pertence à família da criança
- balance da criança >= reward.costCoins
- stock disponível (se limitado)

// Side effects:
1. Reserva saldo (debita wallet temporariamente)
2. Cria /rewardRedemptions/{id}: status='pending'
3. Cria /transactions/{id}: type='spend', source='reward_redemption'
4. Cria /notifications para os pais
5. Envia push notification para os pais

// Logs:
- INFO: redemption_requested { redemptionId, childId, rewardId, cost }
```

---

## 4.8 `approveRewardRedemption` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `parent`

**Responsabilidade:** Pai confirmar entrega da recompensa.

```ts
// Input
{
  redemptionId: string
}

// Output
{
  success: true,
  data: { redemptionId: string }
}

// Validações:
- redemptionId existe e status == 'pending'
- pai pertence à família

// Side effects:
1. Atualiza /rewardRedemptions/{id}: status='approved'
2. Decrementa stock (se limitado) em /rewards
3. Cria /notifications para criança
4. Envia push notification

// Logs:
- INFO: redemption_approved { redemptionId, childId }
```

---

## 4.9 `rejectRewardRedemption` (HTTPS Callable)

**Trigger:** `https.onCall`
**Auth:** `parent`

**Responsabilidade:** Pai recusar pedido de resgate.

```ts
// Input
{
  redemptionId: string
  reason: string
}

// Output
{
  success: true,
  data: { newBalance: number }
}

// Side effects:
1. Atualiza /rewardRedemptions: status='rejected'
2. Estorna saldo: incrementa /wallets.balance
3. Cria /transactions: type='refund'
4. Notifica criança

// Logs:
- INFO: redemption_rejected { redemptionId, childId, refunded }
```

---

## 4.10 `checkAndGrantAchievements` (Internal)

**Trigger:** Chamada interna por outras functions (não exposta ao cliente)

**Responsabilidade:** Verificar e conceder achievements após eventos.

```ts
// Input
{
  childId: string
  event: 'task_approved' | 'level_up' | 'streak_updated' | 'xp_updated'
}

// Output
{
  unlocked: string[]    // IDs dos achievements desbloqueados
}

// Side effects:
1. Busca achievements ainda não desbloqueados para a criança
2. Verifica triggers de cada achievement
3. Cria /childAchievements para os conquistados
4. Concede XP bônus dos achievements
5. Cria notificações para achievements desbloqueados

// Logs:
- INFO: achievement_unlocked { childId, achievementId, rarity }
```

---

## 4.11 `updateStreak` (Scheduled)

**Trigger:** `functions.pubsub.schedule('every day 00:00')` (São Paulo timezone)

**Responsabilidade:** Verificar e atualizar streaks diárias de todas as crianças.

```ts
// Input: nenhum (scheduled)
// Output: void

// Lógica:
- Para cada child ativo:
  - Verificou alguma tarefa daily aprovada ontem?
  - SIM: incrementa currentStreak
  - NÃO: reseta currentStreak = 0
  - Atualiza longestStreak se necessário
  - Verifica achievements de streak

// Side effects:
- Batch update em /children
- Notificações de streak milestone (7, 30, 100 dias)

// Logs:
- INFO: streak_update_completed { totalChildren, updated, reset }
```

---

## 4.12 `generateDailyTaskExecutions` (Scheduled)

**Trigger:** `functions.pubsub.schedule('every day 06:00')` (São Paulo timezone)

**Responsabilidade:** Criar as execuções diárias/semanais de tasks para as crianças.

```ts
// Input: nenhum (scheduled)
// Output: void

// Lógica:
- Busca todas as tasks ativas com recurrenceType 'daily' ou 'weekly'
- Para cada task assignada, cria /taskExecutions com status='pending'
- dueDate = hoje às 23:59

// Side effects:
- Batch create em /taskExecutions
- Push notifications para crianças sobre missões do dia

// Logs:
- INFO: daily_tasks_generated { totalFamilies, totalExecutions }
```

---

## 4.13 `expireTaskExecutions` (Scheduled)

**Trigger:** `functions.pubsub.schedule('every day 00:05')` (São Paulo timezone)

**Responsabilidade:** Marcar como expiradas as execuções não concluídas.

```ts
// Input: nenhum (scheduled)
// Output: void

// Lógica:
- Busca /taskExecutions onde status=='pending' e dueDate < now
- Atualiza status='expired'
- Reseta streak das crianças afetadas (se daily)

// Logs:
- INFO: tasks_expired { total }
```

---

## 4.14 `sendPushNotification` (Internal)

**Trigger:** Chamada interna

**Responsabilidade:** Enviar push via Firebase Messaging.

```ts
// Input
{
  recipientId: string
  recipientType: 'parent' | 'child'
  title: string
  body: string
  data?: Record<string, string>
}

// Output: void

// Lógica:
- Busca fcmTokens do destinatário
- Remove tokens inválidos automaticamente
- Envia via Firebase Admin Messaging
```

---

# 5. Estrutura de Pastas (Cloud Functions)

```txt
/functions
  /src
    /auth
      onUserCreated.ts
      setChildClaim.ts
    /family
      createFamily.ts
      createChild.ts
    /tasks
      approveTaskExecution.ts
      rejectTaskExecution.ts
      generateDailyTaskExecutions.ts
      expireTaskExecutions.ts
    /wallet
      requestRewardRedemption.ts
      approveRewardRedemption.ts
      rejectRewardRedemption.ts
    /gamification
      checkAndGrantAchievements.ts
      updateStreak.ts
    /notifications
      sendPushNotification.ts
    /shared
      authGuard.ts
      validate.ts
      logger.ts
      response.ts
  index.ts
```

---

# 6. Logging Strategy

```ts
// Níveis obrigatórios
logger.info(event, payload)   // operações bem-sucedidas
logger.warn(event, payload)   // situações anômalas não-críticas
logger.error(event, error)    // falhas (sem stack trace em prod)

// Campos obrigatórios em todo log
{
  event: string,
  uid: string | null,
  familyId: string | null,
  timestamp: string
}
```

---

# 7. Error Codes

| Code | Significado |
|---|---|
| `UNAUTHENTICATED` | Não autenticado |
| `UNAUTHORIZED` | Role ou ownership incorretos |
| `NOT_FOUND` | Recurso não existe |
| `INVALID_INPUT` | Dados de entrada inválidos |
| `INSUFFICIENT_BALANCE` | Saldo insuficiente |
| `ALREADY_EXISTS` | Recurso já criado |
| `EXPIRED` | Execução ou token expirado |
| `INTERNAL` | Erro interno (não expor detalhes) |
