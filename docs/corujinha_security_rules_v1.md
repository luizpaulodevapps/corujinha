# Corujinha — Security Rules
## Firebase Firestore & Storage Rules Document

Versão: 1.0
Empresa: Stack Infra
Produto: Corujinha
Status: Engineering Foundation

---

# 1. Princípios de Segurança

- **Zero trust no frontend.** Toda operação crítica é validada server-side.
- **Least privilege.** Cada role acessa APENAS o necessário.
- **Wallet é intocável.** Apenas Cloud Functions escrevem em `wallets` e `transactions`.
- **Dados infantis são protegidos.** Children só são acessados por membros da mesma família.
- **Audit trail.** Operações sensíveis são logadas obrigatoriamente.

---

# 2. Roles

| Role | Quem é |
|---|---|
| `parent` | Pai/mãe — acesso ao app parental |
| `child` | Criança — acesso ao app infantil (PIN-based) |
| `admin` | Stack Infra — acesso total ao painel admin |

Roles são armazenados em `users/{userId}.role` e validados via Custom Claims do Firebase Auth.

---

# 3. Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ─────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────

    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated()
        && request.auth.token.role == 'admin';
    }

    function isParent() {
      return isAuthenticated()
        && request.auth.token.role == 'parent';
    }

    function isChild() {
      return isAuthenticated()
        && request.auth.token.role == 'child';
    }

    function getUserFamilyId() {
      return request.auth.token.familyId;
    }

    function isSameFamily(familyId) {
      return getUserFamilyId() == familyId;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    function incomingData() {
      return request.resource.data;
    }

    function existingData() {
      return resource.data;
    }

    function notUpdating(field) {
      return !(field in request.resource.data.diff(resource.data).affectedKeys());
    }

    // ─────────────────────────────────────────────
    // USERS
    // ─────────────────────────────────────────────

    match /users/{userId} {
      // Leitura: próprio usuário ou admin
      allow read: if isOwner(userId) || isAdmin();

      // Criação: apenas o próprio (via signup)
      allow create: if isOwner(userId)
        && incomingData().role in ['parent']
        && incomingData().keys().hasAll(['email', 'displayName', 'role', 'createdAt']);

      // Update: próprio usuário, não pode mudar role
      allow update: if isOwner(userId)
        && notUpdating('role')
        && notUpdating('familyId');

      // Delete: nunca (soft delete via deletedAt)
      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // FAMILIES
    // ─────────────────────────────────────────────

    match /families/{familyId} {
      // Leitura: membros da família ou admin
      allow read: if isSameFamily(familyId) || isAdmin();

      // Criação: pai autenticado (via onboarding)
      allow create: if isParent()
        && incomingData().parentIds.hasAll([request.auth.uid]);

      // Update: pai da família, campos permitidos apenas
      allow update: if isParent()
        && isSameFamily(familyId)
        && notUpdating('createdAt')
        && notUpdating('parentIds'); // parentIds apenas via CF

      // Delete: nunca
      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // CHILDREN
    // ─────────────────────────────────────────────

    match /children/{childId} {
      // Leitura: pais da mesma família, a própria criança, ou admin
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Criação: apenas pais
      allow create: if isParent()
        && isSameFamily(incomingData().familyId);

      // Update: pais da família (dados gerais) OU a própria criança (campos limitados)
      allow update: if (
          isParent() && isSameFamily(existingData().familyId)
          && notUpdating('xp')
          && notUpdating('level')
          && notUpdating('currentStreak')
        ) || (
          isChild() && isOwner(childId)
          && incomingData().diff(resource.data).affectedKeys()
               .hasOnly(['fcmTokens', 'lastActivityAt', 'updatedAt'])
        ) || isAdmin();

      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // TASKS
    // ─────────────────────────────────────────────

    match /tasks/{taskId} {
      // Leitura: membros da família
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Criação: apenas pais
      allow create: if isParent()
        && isSameFamily(incomingData().familyId)
        && incomingData().createdBy == request.auth.uid;

      // Update: apenas pais da família
      allow update: if isParent()
        && isSameFamily(existingData().familyId)
        && notUpdating('createdBy')
        && notUpdating('familyId');

      // Delete: nunca (soft delete)
      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // TASK EXECUTIONS
    // ─────────────────────────────────────────────

    match /taskExecutions/{executionId} {
      // Leitura: membros da família
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Criação: a própria criança (ao iniciar/completar)
      allow create: if isChild()
        && isOwner(incomingData().childId)
        && incomingData().status == 'pending';

      // Update: criança pode completar; pai pode aprovar/rejeitar
      allow update: if (
          // Criança completando a tarefa
          isChild()
          && isOwner(existingData().childId)
          && existingData().status == 'pending'
          && incomingData().status == 'completed'
          && notUpdating('taskRewardCoins')
          && notUpdating('taskRewardXp')
        ) || (
          // Pai aprovando ou rejeitando
          isParent()
          && isSameFamily(existingData().familyId)
          && existingData().status == 'completed'
          && incomingData().status in ['approved', 'rejected']
          && incomingData().approvedBy == request.auth.uid
        ) || isAdmin();

      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // WALLETS — SOMENTE LEITURA NO CLIENTE
    // ─────────────────────────────────────────────

    match /wallets/{walletId} {
      // Leitura: pais da família ou a própria criança
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Escrita: BLOQUEADA para clientes. Apenas Cloud Functions via Admin SDK.
      allow write: if false;
    }

    // ─────────────────────────────────────────────
    // TRANSACTIONS — IMUTÁVEIS
    // ─────────────────────────────────────────────

    match /transactions/{transactionId} {
      // Leitura: membros da família
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Escrita: BLOQUEADA para clientes. Apenas Cloud Functions.
      allow write: if false;
    }

    // ─────────────────────────────────────────────
    // REWARDS
    // ─────────────────────────────────────────────

    match /rewards/{rewardId} {
      // Leitura: membros da família
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Criação/Update: apenas pais
      allow create, update: if isParent()
        && isSameFamily(incomingData().familyId)
        && notUpdating('createdBy');

      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // REWARD REDEMPTIONS
    // ─────────────────────────────────────────────

    match /rewardRedemptions/{redemptionId} {
      // Leitura: membros da família
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Criação: criança solicitando resgate (status inicial: pending)
      allow create: if isChild()
        && isOwner(incomingData().childId)
        && incomingData().status == 'pending';

      // Update: pai aprovando/rejeitando/entregando
      allow update: if isParent()
        && isSameFamily(existingData().familyId)
        && existingData().status == 'pending'
        && incomingData().status in ['approved', 'rejected'];

      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // ACHIEVEMENTS (definições globais)
    // ─────────────────────────────────────────────

    match /achievements/{achievementId} {
      // Leitura: qualquer autenticado
      allow read: if isAuthenticated();

      // Escrita: apenas admin
      allow write: if isAdmin();
    }

    // ─────────────────────────────────────────────
    // CHILD ACHIEVEMENTS
    // ─────────────────────────────────────────────

    match /childAchievements/{childAchievementId} {
      // Leitura: membros da família
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Escrita: apenas Cloud Functions
      allow write: if false;
    }

    // ─────────────────────────────────────────────
    // AVATARS
    // ─────────────────────────────────────────────

    match /avatars/{avatarId} {
      // Leitura: membros da família
      allow read: if isSameFamily(existingData().familyId) || isAdmin();

      // Update: a própria criança (trocar itens equipados)
      allow update: if isChild()
        && isOwner(existingData().childId)
        && incomingData().diff(resource.data).affectedKeys()
             .hasOnly(['equippedItems', 'updatedAt']);

      // Criação: Cloud Function (durante onboarding da criança)
      allow create: if false;

      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // NOTIFICATIONS
    // ─────────────────────────────────────────────

    match /notifications/{notificationId} {
      // Leitura: próprio destinatário ou admin
      allow read: if isOwner(existingData().recipientId) || isAdmin();

      // Criação: Cloud Functions apenas
      allow create: if false;

      // Update: marcar como lido (apenas o destinatário)
      allow update: if isOwner(existingData().recipientId)
        && incomingData().diff(resource.data).affectedKeys().hasOnly(['read']);

      allow delete: if false;
    }

    // ─────────────────────────────────────────────
    // DEFAULT: NEGAR TUDO
    // ─────────────────────────────────────────────

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

# 4. Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Fotos de perfil de usuários
    match /users/{userId}/profile/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024   // 5MB max
        && request.resource.contentType.matches('image/.*');
    }

    // Provas de tarefas (fotos enviadas pelas crianças)
    match /families/{familyId}/task-proofs/{fileName} {
      allow read: if request.auth.token.familyId == familyId;
      allow write: if request.auth.token.familyId == familyId
        && request.auth.token.role == 'child'
        && request.resource.size < 10 * 1024 * 1024  // 10MB max
        && request.resource.contentType.matches('image/.*');
    }

    // Imagens de recompensas
    match /families/{familyId}/rewards/{fileName} {
      allow read: if request.auth.token.familyId == familyId;
      allow write: if request.auth.token.familyId == familyId
        && request.auth.token.role == 'parent'
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }

    // Assets do avatar (globais, read-only para clientes)
    match /avatars/{assetPath=**} {
      allow read: if request.auth != null;
      allow write: if false; // apenas via deploy/admin
    }

    // Default: negar
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

# 5. Custom Claims Strategy

Claims definidos via Cloud Function no momento do login/signup:

```ts
// Exemplo de claims setados
{
  role: 'parent' | 'child' | 'admin',
  familyId: string | null,
  childId: string | null    // apenas para children
}
```

**Fluxo:**
```txt
User login
→ Cloud Function: onUserLogin trigger
→ Busca role e familyId no Firestore
→ Seta Custom Claims via Admin SDK
→ Token atualizado no cliente
```

---

# 6. Checklist de Segurança por Feature

| Feature | Validação Client | Validação Rules | Validação CF |
|---|---|---|---|
| Completar tarefa | ✅ | ✅ | ✅ |
| Aprovar tarefa | ✅ | ✅ | ✅ wallet/XP |
| Resgatar recompensa | ✅ | ✅ | ✅ débito wallet |
| Atualizar wallet | ❌ bloqueado | ❌ bloqueado | ✅ exclusivo |
| Criar família | ✅ | ✅ | ✅ init wallet |
| Upload de prova | ✅ | ✅ Storage | — |
| Marcar notif. lida | ✅ | ✅ | — |

---

# 7. Proteção de Dados Infantis (LGPD / COPPA)

- Dados de crianças nunca são expostos fora do contexto familiar
- `pinCode` nunca armazenado em plaintext — sempre hash (bcrypt via CF)
- Logs de acesso a dados infantis mantidos por 12 meses
- Deleção de dados: soft delete + anonimização após 90 dias de inatividade familiar
- Nenhum dado de criança é usado para analytics externo sem consentimento explícito dos pais
