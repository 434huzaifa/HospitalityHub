import { Response } from "express";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export function errorHandler(res: Response, error: any) {
  if (error instanceof ZodError) {
    const formattedError = fromZodError(error);
    res.status(400).send({ msg: formattedError.message });
  } else {
    res
      .status(500)
      .send({ msg: `An unexpected error occurred. ${String(error.message)}` });
  }
  return;
}
