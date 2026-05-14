# Corujinha — UX Architecture
## Frontend Architecture & Component Strategy

Versão: 1.0
Empresa: Stack Infra
Produto: Corujinha
Status: Engineering Foundation

---

# 1. Arquitetura de Apps

## Visão Geral

```txt
Monorepo (Turborepo)
├── apps/
│   ├── landing/      → Next.js (App Router)
│   ├── parent/       → Next.js (App Router) + PWA
│   ├── child/        → Next.js (App Router) + PWA
│   └── admin/        → Next.js (App Router)
└── packages/
    ├── ui/           → Design System (componentes shared)
    ├── domain/       → Types, schemas, business logic
    ├── services/     → Service layer (Firebase calls abstraídas)
    ├── firebase/     → Firebase config e inicialização
    ├── gamification/ → XP, levels, streaks engine
    ├── wallet/       → Wallet e transactions logic
    └── shared/       → Utils, hooks, constants
```

---

# 2. Estrutura de Cada App

## 2.1 App Router Structure (Next.js 14+)

```txt
/apps/parent/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx         → layout sem navegação
│   ├── (app)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── missions/
│   │   │   ├── page.tsx       → lista de pendentes
│   │   │   └── [id]/
│   │   │       └── page.tsx   → detalhe da execução
│   │   ├── rewards/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── children/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx         → layout com navegação
│   ├── onboarding/
│   │   └── page.tsx
│   ├── layout.tsx             → root layout (providers)
│   ├── loading.tsx
│   └── not-found.tsx
├── components/                → componentes específicos do parent app
├── hooks/                     → hooks específicos do parent app
├── lib/                       → utilitários locais
├── public/
│   ├── manifest.json
│   └── sw.js
└── middleware.ts              → auth guard de rotas
```

---

## 2.2 Child App Structure

```txt
/apps/child/
├── app/
│   ├── (auth)/
│   │   ├── select/            → seleção de avatar (quem é você?)
│   │   │   └── page.tsx
│   │   ├── pin/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (play)/
│   │   ├── home/              → missões do dia
│   │   │   └── page.tsx
│   │   ├── shop/              → marketplace
│   │   │   └── page.tsx
│   │   ├── achievements/      → conquistas
│   │   │   └── page.tsx
│   │   ├── avatar/            → customização
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   └── layout.tsx
├── components/
├── hooks/
└── middleware.ts
```

---

# 3. Layer Architecture

## Regra obrigatória: 4 camadas

```txt
Component
  ↓
Hook (useXxx)
  ↓
Service (xxxService)
  ↓
Repository (xxxRepository)
  ↓
Firebase
```

**Nunca:** componente → Firebase diretamente.

---

## 3.1 Exemplo Completo: Aprovar Tarefa

```ts
// ─── Component ───
// apps/parent/components/MissionApprovalCard.tsx

const MissionApprovalCard = ({ execution }) => {
  const { approve, isLoading } = useTaskApproval(execution.id)
  return <Button onClick={approve} loading={isLoading}>Aprovar</Button>
}

// ─── Hook ───
// apps/parent/hooks/useTaskApproval.ts

export function useTaskApproval(executionId: string) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => taskService.approveExecution(executionId),
    onSuccess: () => {
      toast.success('Missão aprovada! 🎉')
      queryClient.invalidateQueries({ queryKey: ['missions', 'pending'] })
    },
    onError: (err) => toast.error(err.message)
  })

  return { approve: mutateAsync, isLoading: isPending }
}

// ─── Service ───
// packages/services/src/taskService.ts

export const taskService = {
  async approveExecution(executionId: string) {
    return cloudFunctions.call('approveTaskExecution', { executionId })
  }
}

// ─── Cloud Function call ───
// packages/firebase/src/functions.ts

export const cloudFunctions = {
  async call<T>(name: string, data: unknown): Promise<T> {
    const fn = httpsCallable(functions, name)
    const result = await fn(data)
    if (!result.data.success) throw new Error(result.data.error.message)
    return result.data.data as T
  }
}
```

---

# 4. State Management

## Estratégia por tipo de estado

| Tipo de estado | Solução | Pacote |
|---|---|---|
| Server state (Firestore) | React Query + onSnapshot | `@tanstack/react-query` |
| UI state local | useState / useReducer | React |
| UI state global | Zustand | `zustand` |
| Form state | React Hook Form + Zod | `react-hook-form` + `zod` |
| Auth state | Zustand + Firebase Auth | combinados |

---

## 4.1 Zustand Stores

```ts
// ─── Auth Store ───
interface AuthStore {
  user: User | null
  family: Family | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setFamily: (family: Family | null) => void
}

// ─── Child Session Store (child app) ───
interface ChildSessionStore {
  child: Child | null
  wallet: Wallet | null
  setChild: (child: Child) => void
  setWallet: (wallet: Wallet) => void
  clearSession: () => void
}

// ─── UI Store ───
interface UIStore {
  sidebarOpen: boolean
  activeModal: string | null
  toggleSidebar: () => void
  openModal: (id: string) => void
  closeModal: () => void
}
```

---

## 4.2 React Query Keys Strategy

```ts
// /packages/shared/src/queryKeys.ts

export const queryKeys = {
  // Family
  family: (familyId: string) => ['family', familyId],
  children: (familyId: string) => ['children', familyId],
  child: (childId: string) => ['child', childId],

  // Tasks
  tasks: (familyId: string) => ['tasks', familyId],
  task: (taskId: string) => ['task', taskId],
  taskExecutions: {
    pending: (familyId: string) => ['taskExecutions', 'pending', familyId],
    byChild: (childId: string) => ['taskExecutions', 'child', childId],
    history: (familyId: string) => ['taskExecutions', 'history', familyId],
  },

  // Wallet
  wallet: (childId: string) => ['wallet', childId],
  transactions: (walletId: string) => ['transactions', walletId],

  // Rewards
  rewards: (familyId: string) => ['rewards', familyId],
  redemptions: {
    pending: (familyId: string) => ['redemptions', 'pending', familyId],
    byChild: (childId: string) => ['redemptions', 'child', childId],
  },

  // Gamification
  achievements: () => ['achievements'],
  childAchievements: (childId: string) => ['childAchievements', childId],

  // Avatar
  avatar: (childId: string) => ['avatar', childId],
}
```

---

# 5. Auth Architecture

## 5.1 Parent Auth Flow

```txt
signup/login
  → Firebase Auth (email/password)
  → onUserCreated CF trigger
  → Custom Claims set (role, familyId)
  → Token refresh no cliente
  → Middleware Next.js valida token
  → Redirect para dashboard
```

## 5.2 Child Auth Flow

```txt
select avatar
  → Pai seleciona filho (no dispositivo)
  → Digita PIN
  → CF: setChildClaim(childId, pin)
  → Custom token gerado com claims child
  → signInWithCustomToken no cliente
  → Child session iniciada
  → Redirect para home infantil
```

## 5.3 Middleware de Auth (Next.js)

```ts
// middleware.ts (por app)

export function middleware(request: NextRequest) {
  const token = request.cookies.get('__session')?.value

  // Rotas protegidas
  if (isProtectedRoute(request.nextUrl.pathname)) {
    if (!token) return redirectToLogin(request)
    // Verificação de role específica por rota
  }

  // Rota de onboarding obrigatório
  if (isAppRoute(request.nextUrl.pathname)) {
    const decoded = decodeToken(token)
    if (!decoded?.familyId) return redirectToOnboarding(request)
  }
}
```

---

# 6. Realtime Data Architecture

## Padrão para Firestore realtime com React Query

```ts
// /packages/shared/src/hooks/useRealtimeQuery.ts

export function useRealtimeQuery<T>(
  queryKey: QueryKey,
  buildQuery: (db: Firestore) => Query,
  options?: UseQueryOptions<T[]>
) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const q = buildQuery(db)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
      queryClient.setQueryData(queryKey, data)
    })
    return () => unsubscribe()
  }, [JSON.stringify(queryKey)])

  return useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData<T[]>(queryKey) ?? [],
    staleTime: Infinity, // dados vêm do realtime
    ...options
  })
}
```

---

# 7. Form Validation

## Zod Schemas (em `/packages/domain`)

```ts
// createTaskSchema
export const createTaskSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().max(300).optional(),
  iconEmoji: z.string().length(1).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  rewardCoins: z.number().int().min(1).max(1000),
  rewardXp: z.number().int().min(1).max(500),
  recurrenceType: z.enum(['daily', 'weekly', 'one-time', 'recurring']),
  recurrenceDays: z.array(z.number().min(0).max(6)).optional(),
  assignedChildIds: z.array(z.string()).min(1),
  requiresProof: z.boolean(),
})

// createChildSchema
export const createChildSchema = z.object({
  displayName: z.string().min(2).max(30),
  age: z.number().int().min(4).max(17),
  pin: z.string().regex(/^\d{6}$/, 'PIN deve ter 6 dígitos'),
})

// rejectExecutionSchema
export const rejectExecutionSchema = z.object({
  reason: z.string().min(5).max(200),
})
```

---

# 8. Error Handling Strategy

## Hierarquia de erros

```ts
// packages/shared/src/errors.ts

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public recoverable: boolean = true
  ) {
    super(message)
  }
}

export class AuthError extends AppError {}
export class NetworkError extends AppError {}
export class ValidationError extends AppError {}
export class PermissionError extends AppError { recoverable = false }
```

## Error Boundary por app

```tsx
// Toda page crítica tem ErrorBoundary
<ErrorBoundary fallback={<ErrorState onRetry={reset} />}>
  <SuspenseBoundary fallback={<SkeletonPage />}>
    <PageContent />
  </SuspenseBoundary>
</ErrorBoundary>
```

---

# 9. PWA Configuration

## manifest.json (por app)

```json
// Parent App
{
  "name": "Corujinha para Pais",
  "short_name": "Corujinha",
  "theme_color": "#7C3AED",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/dashboard",
  "scope": "/"
}

// Child App
{
  "name": "Corujinha Play",
  "short_name": "Play",
  "theme_color": "#1A1040",
  "background_color": "#0F0A2E",
  "display": "fullscreen",
  "orientation": "portrait",
  "start_url": "/home",
  "scope": "/"
}
```

---

# 10. Testing Strategy

## Cobertura por prioridade (MVP)

| Tipo | Prioridade | Ferramentas |
|---|---|---|
| Integration tests (fluxos críticos) | 🔴 Alta | Playwright |
| Unit tests (services e utils) | 🟡 Média | Vitest |
| Component tests | 🟢 Baixa | Testing Library |
| E2E full (staging) | 🟡 Média | Playwright |

## Fluxos críticos a cobrir (MVP)

```txt
1. Signup → onboarding → criar filho → criar tarefa
2. Login filho → completar tarefa → aguardar aprovação
3. Pai recebe notificação → aprovar tarefa → coins enviadas
4. Filho solicita resgate → pai aprova → confirmação
5. Streak funcionando corretamente
6. XP e level calculados corretamente
```

---

# 11. CI/CD Pipeline

## GitHub Actions

```yaml
# .github/workflows/ci.yml

on: [push, pull_request]

jobs:
  validate:
    steps:
      - lint (ESLint)
      - typecheck (tsc --noEmit)
      - test (vitest)
      - build (turbo build)

  deploy-preview:
    if: pull_request
    steps:
      - deploy to Vercel preview

  deploy-staging:
    if: push to main
    steps:
      - deploy to staging (Vercel + Firebase staging)

  deploy-production:
    if: push to release/*
    steps:
      - run E2E tests (Playwright)
      - deploy to production
```

---

# 12. Package Dependencies (MVP)

## Shared entre apps

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "framer-motion": "11.x",
  "zustand": "4.x",
  "@tanstack/react-query": "5.x",
  "react-hook-form": "7.x",
  "zod": "3.x",
  "firebase": "10.x"
}
```

## Dev

```json
{
  "turbo": "latest",
  "vitest": "latest",
  "@playwright/test": "latest",
  "eslint": "8.x",
  "prettier": "3.x",
  "@testing-library/react": "latest"
}
```
