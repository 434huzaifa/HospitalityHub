import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z)

export const authResponse=z.object({
    token:z.string(),
    expireIn:z.string(),
})

export const userAuthBody = z.object({
    email: z.string().email().toLowerCase().trim().openapi({example:"saadhuzaifa@gmail.com"}),
    password: z.string().min(3).openapi({example:"saad123"}),
  });