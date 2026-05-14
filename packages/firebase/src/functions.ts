import { httpsCallable } from 'firebase/functions'
import { getFirebaseFunctions } from './app'

// ─── Response Envelope ────────────────────────────────────────────────────────

export type CFSuccess<T> = { success: true; data: T }
export type CFError = { success: false; error: { code: string; message: string } }
export type CFResponse<T> = CFSuccess<T> | CFError

// ─── Caller ───────────────────────────────────────────────────────────────────

export class CloudFunctionError extends Error {
  constructor(
    public readonly code: string,
    message: string
  ) {
    super(message)
    this.name = 'CloudFunctionError'
  }
}

export async function callFunction<TInput, TOutput>(
  name: string,
  data: TInput
): Promise<TOutput> {
  const functions = getFirebaseFunctions()
  const fn = httpsCallable<TInput, CFResponse<TOutput>>(functions, name)

  const result = await fn(data)
  const response = result.data

  if (!response.success) {
    throw new CloudFunctionError(response.error.code, response.error.message)
  }

  return response.data
}
