import { type Platform, type Post } from "@prisma/client";
import { z } from "zod";
import { isFileImage, isFileVideo } from "~/utils/post";

const customFileSchema = z.custom<File>(
  (value) => {
    if (typeof File !== "undefined" && value instanceof File) {
      return true;
    }
    return false;
  },
  { message: "Please select a file" }
);

const basePostSchema = z.object({
  platforms: z
    .array(z.string())
    .min(1, { message: "Please select at least one platform" }),
  message: z
    .string()
    .min(1, {
      message: "Please enter a message",
    })
    .max(280, { message: "Message must be less than 280 characters" }),
  file: customFileSchema,
  scheduledAt: z.number().min(0, { message: "Please select a valid date" }),
});

export const postSchema = basePostSchema
  .refine((data) => isFileImage(data.file) || isFileVideo(data.file), {
    message: "File must be an image or video",
    path: ["file"],
  })
  .refine((data) => data.file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
    path: ["file"],
  })
  .refine((data) => data.scheduledAt > Date.now(), {
    message: "Please select a future date",
    path: ["scheduledAt"],
  });

export const serverPostSchema = basePostSchema.omit({ file: true }).extend({
  file: z.string().url({ message: "Invalid file url" }),
});

export type ValidServerPostState = z.infer<typeof serverPostSchema>;
export type ValidPostState = z.infer<typeof postSchema>;

export type PrismaPost = Omit<Post, "scheduledAt" | "createdAt"> & {
  createdAt: number;
  scheduledAt: number;
  platforms: Platform[];
};

export type Option = {
  value: string;
  label: string;
};

export type PostState = Omit<ValidPostState, "file"> & {
  file: File | null;
};

export type PlatformType = "twitter" | "facebook" | "instagram";
