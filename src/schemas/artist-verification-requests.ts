import { MAX_WORDS, MIN_WORDS } from '@/lib/constants'
import { z as zod } from 'zod'

export const reviewArtistVerificationRequestBody = zod
  .object({
    status: zod.enum(['approved', 'rejected', 'pending']),
    reason: zod
      .string()
      .refine(
        (value) => {
          if (!value) return true
          const wordCount = value.trim().split(/\s+/).length
          return wordCount > MIN_WORDS && wordCount <= MAX_WORDS
        },
        {
          message: `Rejection reason's words' count must be between ${MIN_WORDS} and ${MAX_WORDS} words.`,
        }
      )
      .optional(),
  })
  .refine(
    (value) => {
      if (value.status === 'rejected' && !value.reason) {
        return false
      }
      return true
    },
    {
      message: 'Rejection reason is required when status is rejected.',
      path: ['reason'],
    }
  )
