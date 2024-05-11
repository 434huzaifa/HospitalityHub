import { z } from "zod";

export const userCreateBody=z.object({
    name: z.string().trim().min(3),
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(3),
  });

export const userAuthBody = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(3),
});

export const userResponse = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
