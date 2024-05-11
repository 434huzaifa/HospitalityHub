import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
extendZodWithOpenApi(z)
export const errorResponse=z.object({
    msg:z.string()
})