export interface Timestamp {
  seconds: number
  nanoseconds: number
}

// ─── User ─────────────────────────────────────────────────────────────────────

export type UserRole = 'parent' | 'admin'

export interface User {
  id: string
  email: string
  displayName: string
  photoURL: string | null
  role: UserRole
  familyId: string | null
  onboardingCompleted: boolean
  fcmTokens: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}

// ─── Family ───────────────────────────────────────────────────────────────────

export interface FamilySettings {
  currency: string
  weeklyGoal: number
  autoApprove: boolean
  notifications: {
    taskCompleted: boolean
    rewardRedeemed: boolean
    streakMilestone: boolean
  }
}

export interface Family {
  id: string
  name: string
  parentIds: string[]
  childIds: string[]
  settings: FamilySettings
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}

// ─── Child ────────────────────────────────────────────────────────────────────

export interface Child {
  id: string
  familyId: string
  parentIds: string[]
  displayName: string
  username: string
  avatarId: string | null
  pinCode: string
  qrToken: string
  age: number
  xp: number
  level: number
  currentStreak: number
  longestStreak: number
  lastActivityAt: Timestamp | null
  fcmTokens: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}

// ─── Task ─────────────────────────────────────────────────────────────────────

export type TaskDifficulty = 'easy' | 'medium' | 'hard'
export type TaskRecurrenceType = 'daily' | 'weekly' | 'one-time' | 'recurring'

export interface Task {
  id: string
  familyId: string
  createdBy: string
  title: string
  description: string
  category: string
  iconEmoji: string
  difficulty: TaskDifficulty
  rewardCoins: number
  rewardXp: number
  recurrenceType: TaskRecurrenceType
  recurrenceDays: number[]
  assignedChildIds: string[]
  requiresProof: boolean
  active: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}

// ─── Task Execution ───────────────────────────────────────────────────────────

export type TaskExecutionStatus =
  | 'pending'
  | 'completed'
  | 'approved'
  | 'rejected'
  | 'expired'

export interface TaskExecution {
  id: string
  taskId: string
  taskTitle: string
  taskRewardCoins: number
  taskRewardXp: number
  familyId: string
  childId: string
  childName: string
  status: TaskExecutionStatus
  proofImageUrl: string | null
  rejectionReason: string | null
  approvedBy: string | null
  completedAt: Timestamp | null
  approvedAt: Timestamp | null
  dueDate: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

export interface Wallet {
  id: string
  childId: string
  familyId: string
  balance: number
  totalEarned: number
  totalSpent: number
  updatedAt: Timestamp
  createdAt: Timestamp
}

// ─── Transaction ──────────────────────────────────────────────────────────────

export type TransactionType = 'earn' | 'spend' | 'bonus' | 'refund' | 'adjustment'
export type TransactionDirection = 'credit' | 'debit'
export type TransactionSource =
  | 'task_approval'
  | 'reward_redemption'
  | 'bonus'
  | 'manual'
  | 'refund'

export interface Transaction {
  id: string
  walletId: string
  childId: string
  familyId: string
  type: TransactionType
  amount: number
  direction: TransactionDirection
  source: TransactionSource
  referenceId: string | null
  description: string
  createdAt: Timestamp
}

// ─── Reward ───────────────────────────────────────────────────────────────────

export type RewardCategory = 'digital' | 'physical' | 'experience' | 'privilege'

export interface Reward {
  id: string
  familyId: string
  createdBy: string
  title: string
  description: string
  iconEmoji: string
  imageUrl: string | null
  category: RewardCategory
  costCoins: number
  stock: number | null
  active: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp | null
}

// ─── Reward Redemption ────────────────────────────────────────────────────────

export type RedemptionStatus = 'pending' | 'approved' | 'rejected' | 'delivered'

export interface RewardRedemption {
  id: string
  rewardId: string
  rewardTitle: string
  rewardCostCoins: number
  familyId: string
  childId: string
  childName: string
  status: RedemptionStatus
  rejectionReason: string | null
  approvedBy: string | null
  approvedAt: Timestamp | null
  deliveredAt: Timestamp | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Achievement ──────────────────────────────────────────────────────────────

export type AchievementCategory = 'streak' | 'tasks' | 'xp' | 'social' | 'special'
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'
export type AchievementTriggerType =
  | 'streak_days'
  | 'total_tasks'
  | 'total_xp'
  | 'level_reached'

export interface Achievement {
  id: string
  title: string
  description: string
  iconEmoji: string
  badgeImageUrl: string
  category: AchievementCategory
  trigger: {
    type: AchievementTriggerType
    threshold: number
  }
  rewardXp: number
  rarity: AchievementRarity
  createdAt: Timestamp
}

export interface ChildAchievement {
  id: string
  childId: string
  familyId: string
  achievementId: string
  achievementTitle: string
  achievementRarity: AchievementRarity
  unlockedAt: Timestamp
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export interface AvatarEquipped {
  hat: string | null
  outfit: string | null
  accessory: string | null
  background: string | null
}

export interface Avatar {
  id: string
  childId: string
  familyId: string
  baseType: string
  equippedItems: AvatarEquipped
  unlockedItemIds: string[]
  updatedAt: Timestamp
  createdAt: Timestamp
}

// ─── Notification ─────────────────────────────────────────────────────────────

export type NotificationType =
  | 'task_completed'
  | 'task_approved'
  | 'task_rejected'
  | 'reward_requested'
  | 'reward_approved'
  | 'xp_gained'
  | 'level_up'
  | 'streak_milestone'
  | 'achievement_unlocked'

export type NotificationRecipientType = 'parent' | 'child'

export interface Notification {
  id: string
  familyId: string
  recipientId: string
  recipientType: NotificationRecipientType
  type: NotificationType
  title: string
  body: string
  referenceId: string | null
  referenceType: string | null
  read: boolean
  createdAt: Timestamp
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export type ChatMessageType = 'text' | 'image' | 'system' | 'action'

export interface ChatMessage {
  id: string
  familyId: string
  senderId: string
  senderName: string
  senderPhotoURL: string | null
  senderRole: UserRole
  type: ChatMessageType
  content: string
  metadata?: {
    referenceId?: string
    referenceType?: 'task' | 'reward' | 'achievement'
    actionType?: 'approval' | 'rejection' | 'milestone'
  }
  readBy: string[]
  createdAt: Timestamp
}

// ─── Mascot ───────────────────────────────────────────────────────────────────

export interface Mascot {
  id: string
  name: string
  description: string
  imageUrl: string
  thumbnailUrl: string
  active: boolean
  isDefault: boolean
  traits: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete'
export type SubscriptionPlan = 'free' | 'premium' | 'family_plus'

export interface Subscription {
  id: string
  familyId: string
  status: SubscriptionStatus
  plan: SubscriptionPlan
  currentPeriodEnd: Timestamp
  cancelAtPeriodEnd: boolean
  stripeCustomerId: string
  stripeSubscriptionId: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Partner ──────────────────────────────────────────────────────────────────

export type PartnerCategory = 'educational' | 'entertainment' | 'health' | 'services'

export interface Partner {
  id: string
  name: string
  category: PartnerCategory
  description: string
  logoUrl: string
  websiteUrl: string
  contactEmail: string
  active: boolean
  commissionRate: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Media (Corujinha TV & Music) ─────────────────────────────────────────────

export type MediaType = 'video' | 'audio' | 'story'
export type MediaCategory = 'educational' | 'entertainment' | 'music' | 'sleep'

export interface Media {
  id: string
  title: string
  description: string
  type: MediaType
  category: MediaCategory
  url: string
  thumbnailUrl: string
  duration?: string
  premium: boolean
  createdAt: Timestamp
}

// ─── Licensed Product (Official Store) ────────────────────────────────────────

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  category: 'toys' | 'books' | 'clothing' | 'accessories'
  partnerId?: string
  active: boolean
  createdAt: Timestamp
}
