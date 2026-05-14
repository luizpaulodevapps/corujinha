import { z } from 'zod'

// ─── Family ───────────────────────────────────────────────────────────────────

export const createFamilySchema = z.object({
  familyName: z.string().min(2, 'Mínimo 2 caracteres').max(50, 'Máximo 50 caracteres'),
})

// ─── Child ────────────────────────────────────────────────────────────────────

export const createChildSchema = z.object({
  displayName: z.string().min(2, 'Mínimo 2 caracteres').max(30, 'Máximo 30 caracteres'),
  age: z
    .number({ invalid_type_error: 'Idade inválida' })
    .int()
    .min(4, 'Idade mínima: 4 anos')
    .max(17, 'Idade máxima: 17 anos'),
  pin: z
    .string()
    .regex(/^\d{6}$/, 'PIN deve ter exatamente 6 dígitos numéricos'),
  birthDate: z.string().optional(),
})

export const childLoginSchema = z.object({
  childId: z.string().min(1),
  pin: z.string().regex(/^\d{6}$/),
})

// ─── Task ─────────────────────────────────────────────────────────────────────

export const createTaskSchema = z.object({
  title: z.string().min(2, 'Mínimo 2 caracteres').max(80, 'Máximo 80 caracteres'),
  description: z.string().max(300).optional(),
  iconEmoji: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  rewardCoins: z
    .number()
    .int()
    .min(1, 'Mínimo 1 moeda')
    .max(1000, 'Máximo 1000 moedas'),
  rewardXp: z
    .number()
    .int()
    .min(1, 'Mínimo 1 XP')
    .max(500, 'Máximo 500 XP'),
  recurrenceType: z.enum(['daily', 'weekly', 'one-time', 'recurring']),
  recurrenceDays: z.array(z.number().min(0).max(6)).optional(),
  assignedChildIds: z.array(z.string()).min(1, 'Selecione ao menos um filho'),
  requiresProof: z.boolean(),
})

export const updateTaskSchema = createTaskSchema.partial().extend({
  active: z.boolean().optional(),
})

// ─── Task Execution ───────────────────────────────────────────────────────────

export const rejectTaskExecutionSchema = z.object({
  executionId: z.string().min(1),
  reason: z
    .string()
    .min(5, 'Descreva o motivo (mín. 5 caracteres)')
    .max(200, 'Máximo 200 caracteres'),
})

// ─── Reward ───────────────────────────────────────────────────────────────────

export const createRewardSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().max(300).optional(),
  iconEmoji: z.string().optional(),
  category: z.enum(['digital', 'physical', 'experience', 'privilege']),
  costCoins: z
    .number()
    .int()
    .min(1, 'Mínimo 1 moeda')
    .max(10000, 'Máximo 10.000 moedas'),
  stock: z.number().int().min(1).nullable(),
})

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateFamilyInput = z.infer<typeof createFamilySchema>
export type CreateChildInput = z.infer<typeof createChildSchema>
export type ChildLoginInput = z.infer<typeof childLoginSchema>
export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type RejectTaskExecutionInput = z.infer<typeof rejectTaskExecutionSchema>
export type CreateRewardInput = z.infer<typeof createRewardSchema>
