import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { isValidObjectId } from "mongoose";
extendZodWithOpenApi(z);

export const roomCreateBody = z.object({
  name: z.string().min(3),
  capacity: z.number(),
  isAc: z.boolean().optional(),
});

export const roomResponse = z.object({
  id: z.string().openapi({ title: "This is ObjectId generated by database" }),
  name: z.string(),
  capacity: z.number(),
  isAc: z.boolean(),
  __v: z.number().openapi({ title: "This is v generated by database" }),
  createdAt: z.string().datetime().openapi({ title: "This is createdAt generated by database" }),
  updatedAt: z.string().datetime().openapi({ title: "This is updatedAt generated by database" }),
});

export const roomQuery = z.object({
  id: z.string().refine(
    (value) => {
      // const regex = /^[0-9a-fA-F]{24}$/; // ObjectId validator using RegEx
      // return regex.test(value);
      return isValidObjectId(value);
    },
    {
      message: "Invalid ObjectId",
    }
  ),
});

export const roomUpdateBody = z
  .object({
    name: z.string().min(3).optional(),
    capacity: z.number().optional(),
    isAc: z.boolean().optional(),
  })
  .refine((data) => data.name || data.capacity || data.isAc, {
    message: "At least one field is required. name or capacity  or isAc",
  });
