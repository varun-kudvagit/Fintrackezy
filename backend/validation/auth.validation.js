import { z } from "zod";

const emailSchema = z.string().trim().email("Invalid email address").max(50);

const passwordSchema = z
  .string()
  .trim()
  .min(4, "Password must have minimum 4 characters");

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name Can't be Empty").max(255),
  email: emailSchema,
  password: passwordSchema,
  profileImage: z.string().optional(), // Added profileImage as optional
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
