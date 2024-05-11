import { Request, Response } from "express-serve-static-core";
import { errorHandler } from "../util";
import { z } from "zod";
import { userAuthBody, userCreateBody, userResponse } from "../validator/user";
import { User } from "../schema/user";

type IUserAuthBody = z.infer<typeof userAuthBody>;
type IUserResponse = z.infer<typeof userResponse>;
type IUserCreateBody = z.infer<typeof userCreateBody>;

export async function insertUser(
  req: Request<{}, {}, IUserCreateBody>,
  res: Response
) {
  try {
    userCreateBody.parse(req.body);
    const user= new User(req.body)
    const result= await user.save()
    res.status(201).send(result)
  } catch (error) {
    errorHandler(res, error);
  }
}
