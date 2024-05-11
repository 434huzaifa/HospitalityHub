import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { isValidObjectId } from "mongoose";
extendZodWithOpenApi(z);
export const userCreateBody = z.object({
  name: z.string().trim().min(3),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(3),
});

export const userAuthBody = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(3),
});

export const userResponse = z.object({
  id: z.string().openapi({ title: "This ObjectId" }),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  __v: z.number(),
});

export const userQuery = z.object({
  id: z.string().refine(
    (value) => {
      // const regex = /^[0-9a-fA-F]{24}$/;
      // return regex.test(value);
      return isValidObjectId(value)
    },
    {
      message: "Invalid ObjectId",
    }
  ),
});
