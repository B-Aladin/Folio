import { z } from "zod";
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES } from "./constants";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const UploadSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  author: z.string().min(1, "Author is required").max(100, "Author name is too long"),
  persona: z.string().min(1, "Please select a voice persona"),
  pdfFile: z
    .any()
    .refine((file) => !!file && file instanceof File, "PDF file is required")
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, `Max file size is 50MB.`)
    .refine(
      (file) => !file || ACCEPTED_PDF_TYPES.includes(file?.type),
      "Only .pdf files are accepted."
    ),
  coverImage: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Cover image must be a file"
    )
    .refine(
      (file) => !file || file?.size <= 5 * 1024 * 1024,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp files are accepted."
    ),
});
