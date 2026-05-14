# Corujinha — Design System
## UI/UX Foundation Document

Versão: 1.0
Empresa: Stack Infra
Produto: Corujinha
Status: Engineering Foundation

---

# 1. Filosofia

A Corujinha tem **duas experiências visuais distintas** que compartilham tokens base mas divergem em personalidade:

| Dimensão | Parent App | Child App |
|---|---|---|
| Tom | Premium, clean, analítico | Vivo, emocional, gamificado |
| Densidade | Baixa | Alta |
| Animações | Sutis | Expressivas |
| Cores | Neutros + acento | Vibrantes + gradientes |
| Typography | Sans-serif elegante | Rounded, bold |

---

# 2. Tokens Base (Shared)

## 2.1 Color Palette

```css
/* ─── Brand Core ─── */
--color-brand-primary:     #7C3AED;   /* Violet 600 */
--color-brand-secondary:   #A78BFA;   /* Violet 400 */
--color-brand-accent:      #F59E0B;   /* Amber 400 — moedas/XP */
--color-brand-success:     #10B981;   /* Emerald 500 */
--color-brand-warning:     #F59E0B;   /* Amber 400 */
--color-brand-danger:      #EF4444;   /* Red 500 */

/* ─── Neutrals ─── */
--color-neutral-50:        #FAFAFA;
--color-neutral-100:       #F4F4F5;
--color-neutral-200:       #E4E4E7;
--color-neutral-300:       #D4D4D8;
--color-neutral-400:       #A1A1AA;
--color-neutral-500:       #71717A;
--color-neutral-600:       #52525B;
--color-neutral-700:       #3F3F46;
--color-neutral-800:       #27272A;
--color-neutral-900:       #18181B;
--color-neutral-950:       #09090B;

/* ─── Semantic ─── */
--color-surface:           #FFFFFF;
--color-surface-raised:    #F4F4F5;
--color-border:            #E4E4E7;
--color-text-primary:      #18181B;
--color-text-secondary:    #52525B;
--color-text-muted:        #A1A1AA;
--color-text-inverse:      #FFFFFF;
```

## 2.2 Child App Colors (Override)

```css
/* ─── Child Theme ─── */
--color-child-bg:          #0F0A2E;   /* deep space */
--color-child-surface:     #1A1040;
--color-child-primary:     #8B5CF6;   /* violet */
--color-child-secondary:   #EC4899;   /* pink */
--color-child-accent:      #F59E0B;   /* gold/coins */
--color-child-success:     #34D399;
--color-child-xp:          #60A5FA;   /* blue — XP bar */
--color-child-star:        #FBBF24;   /* estrelas */

/* Gradientes child */
--gradient-child-hero:     linear-gradient(135deg, #1A1040 0%, #2D1B69 50%, #0F0A2E 100%);
--gradient-child-card:     linear-gradient(135deg, #2D1B69 0%, #1E1050 100%);
--gradient-child-xp:       linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%);
--gradient-child-coins:    linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
--gradient-child-success:  linear-gradient(135deg, #10B981 0%, #34D399 100%);
```

---

## 2.3 Typography

```css
/* ─── Parent App Font ─── */
--font-parent: 'Inter', system-ui, sans-serif;

/* ─── Child App Font ─── */
--font-child: 'Nunito', 'Fredoka One', system-ui, sans-serif;

/* ─── Scale ─── */
--text-xs:   0.75rem;    /* 12px */
--text-sm:   0.875rem;   /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg:   1.125rem;   /* 18px */
--text-xl:   1.25rem;    /* 20px */
--text-2xl:  1.5rem;     /* 24px */
--text-3xl:  1.875rem;   /* 30px */
--text-4xl:  2.25rem;    /* 36px */
--text-5xl:  3rem;       /* 48px */

/* ─── Weight ─── */
--font-normal:    400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;
--font-extrabold: 800;

/* ─── Line Height ─── */
--leading-tight:  1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

---

## 2.4 Spacing

```css
/* Sistema 4pt */
--space-1:  0.25rem;   /* 4px */
--space-2:  0.5rem;    /* 8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

---

## 2.5 Border Radius

```css
--radius-sm:   0.25rem;  /* 4px  — badges, chips */
--radius-md:   0.5rem;   /* 8px  — inputs, cards pequenos */
--radius-lg:   0.75rem;  /* 12px — cards */
--radius-xl:   1rem;     /* 16px — modals */
--radius-2xl:  1.5rem;   /* 24px — cards child */
--radius-full: 9999px;   /* pills, avatars */
```

---

## 2.6 Shadow

```css
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
--shadow-md:  0 4px 6px -1px rgba(0,0,0,0.10);
--shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.10);
--shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.15);
--shadow-glow-violet: 0 0 20px rgba(124,58,237,0.4);
--shadow-glow-gold:   0 0 20px rgba(245,158,11,0.5);
```

---

## 2.7 Motion

```css
/* ─── Duration ─── */
--duration-fast:    150ms;
--duration-normal:  250ms;
--duration-slow:    400ms;
--duration-slower:  600ms;

/* ─── Easing ─── */
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-in:       cubic-bezier(0.4, 0, 1, 1);
--ease-out:      cubic-bezier(0, 0, 0.2, 1);
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

---

## 2.8 Z-Index

```css
--z-base:      0;
--z-raised:    10;
--z-dropdown:  100;
--z-sticky:    200;
--z-overlay:   300;
--z-modal:     400;
--z-toast:     500;
--z-tooltip:   600;
```

---

# 3. Componentes

## 3.1 Componentes Shared (`/packages/ui`)

### Button

```ts
// Variantes
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'

// Tamanhos
type ButtonSize = 'sm' | 'md' | 'lg'

// Props
{
  variant: ButtonVariant
  size: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}
```

### Card

```ts
{
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}
```

### Input

```ts
{
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
}
```

### Badge

```ts
{
  variant: 'default' | 'success' | 'warning' | 'danger' | 'xp' | 'coins'
  size?: 'sm' | 'md'
  dot?: boolean
}
```

### Avatar

```ts
{
  src?: string
  fallback: string          // initials
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ring?: boolean
  ringColor?: string
  childAvatar?: boolean     // usa assets de avatar infantil
}
```

### Modal

```ts
{
  open: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  closeOnBackdrop?: boolean
}
```

### ProgressBar

```ts
{
  value: number             // 0-100
  max?: number
  variant?: 'default' | 'xp' | 'coins' | 'streak'
  animated?: boolean
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}
```

### Toast / Notification

```ts
{
  type: 'success' | 'error' | 'warning' | 'info' | 'xp' | 'achievement'
  title: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
}
```

---

## 3.2 Componentes Parent App (`/apps/parent`)

### MissionCard

```ts
// Exibe tarefa aguardando aprovação
{
  execution: TaskExecution
  onApprove: () => void
  onReject: () => void
  loading?: boolean
}
```

### ChildSummaryCard

```ts
// Resumo de uma criança no dashboard
{
  child: Child
  wallet: Wallet
  pendingTasks: number
  onClick: () => void
}
```

### RewardCard

```ts
{
  reward: Reward
  onEdit: () => void
  onToggleActive: () => void
}
```

---

## 3.3 Componentes Child App (`/apps/child`)

### MissionBubble

```ts
// Card visual de missão (gamificado, grande, colorido)
{
  execution: TaskExecution
  onComplete: () => void
  status: 'available' | 'completed' | 'approved' | 'expired'
}
```

### XPBar

```ts
// Barra de progresso de XP com animação
{
  currentXp: number
  nextLevelXp: number
  level: number
  animated?: boolean
}
```

### CoinDisplay

```ts
// Display de moedas com efeito bounce
{
  amount: number
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
}
```

### StreakBadge

```ts
// Badge de streak com fogo animado
{
  days: number
  active: boolean
}
```

### AvatarDisplay

```ts
// Avatar customizável da criança
{
  avatar: Avatar
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  showLevel?: boolean
  level?: number
}
```

### RewardShopCard

```ts
// Card de recompensa no marketplace
{
  reward: Reward
  canAfford: boolean
  onRedeem: () => void
  loading?: boolean
}
```

### AchievementBadge

```ts
// Badge de conquista com efeito glow
{
  achievement: Achievement
  unlocked: boolean
  unlockedAt?: Timestamp
}
```

---

# 4. UX States Obrigatórios

Todo componente de listagem DEVE implementar:

| Estado | Descrição | Componente |
|---|---|---|
| `loading` | Skeleton animado | `<Skeleton>` |
| `empty` | Ilustração + CTA | `<EmptyState>` |
| `error` | Mensagem + retry | `<ErrorState>` |
| `success` | Feedback visual | Toast / inline |

---

## 4.1 EmptyState

```ts
{
  illustration?: string       // emoji ou asset
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  variant?: 'parent' | 'child'
}
```

---

## 4.2 Skeleton

```ts
// Usar para todos os loadings de dados
// Mimetizar o layout real do componente

<SkeletonCard />
<SkeletonList rows={3} />
<SkeletonText lines={2} />
```

---

# 5. Animações (Framer Motion)

## Presets padrão

```ts
// Page transition
export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -16 }
}

// Card entry (staggered)
export const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
}

// XP gain popup (child)
export const xpPopupVariants = {
  initial: { opacity: 0, scale: 0.5, y: 20 },
  animate: { opacity: 1, scale: 1.1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: -30 },
  transition: { type: 'spring', stiffness: 400, damping: 15 }
}

// Coin bounce (child)
export const coinBounceVariants = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.3, 0.9, 1.1, 1] },
  transition: { duration: 0.5, ease: 'easeInOut' }
}

// Achievement unlock (child)
export const achievementVariants = {
  initial: { opacity: 0, scale: 0, rotate: -180 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }
}
```

---

# 6. Breakpoints (Mobile-First)

```ts
const breakpoints = {
  sm: '640px',    // tablet pequeno
  md: '768px',    // tablet
  lg: '1024px',   // desktop
  xl: '1280px',   // desktop wide
}

// Estratégia:
// Parent app: funciona bem em desktop e tablet
// Child app: mobile-first absoluto (375px mínimo)
```

---

# 7. Google Fonts

```html
<!-- Parent App -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Child App -->
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap" rel="stylesheet">
```

---

# 8. Acessibilidade

- Todos os componentes interativos têm `role` e `aria-label`
- Contraste mínimo WCAG AA: 4.5:1 para texto normal
- Focus visible em todos os elementos navegáveis
- Suporte a `prefers-reduced-motion` nos presets de animação
- Touch targets mínimos: 44x44px (especialmente no child app)
