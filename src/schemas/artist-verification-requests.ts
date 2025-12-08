import { z } from "zod";
import { MAX_WORDS, MIN_WORDS } from "@/lib/constants";

export const reviewArtistVerificationRequestBody = z
  .object({
    status: z.enum(["approved", "rejected", "pending"]),
    reason: z
      .string()
      .refine(
        (value) => {
          if (!value) return true;
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount > MIN_WORDS && wordCount <= MAX_WORDS;
        },
        {
          message: `Rejection reason's words' count must be between ${MIN_WORDS} and ${MAX_WORDS} words.`,
        },
      )
      .optional(),
  })
  .refine(
    (value) => {
      if (value.status === "rejected" && !value.reason) {
        return false;
      }
      return true;
    },
    {
      message: "Rejection reason is required when status is rejected.",
      path: ["reason"],
    },
  );
