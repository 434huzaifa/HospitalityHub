import { Request, Response } from "express-serve-static-core";
import { z } from "zod";
import {
  userAuthBody,
  userCreateBody,
  userQuery,
  userResponse,
} from "../validator/user";
import { User } from "../schema/user";
import { errorHandler } from "../util";
type IUserAuthBody = z.infer<typeof userAuthBody>;
type IUserCreateBody = z.infer<typeof userCreateBody>;
type IUserQuery = z.infer<typeof userQuery>;
export async function insertUser(
  req: Request<{}, {}, IUserCreateBody>,
  res: Response
) {
  try {
    userCreateBody.parse(req.body);
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function authUser(
  req: Request<{}, {}, IUserAuthBody>,
  res: Response
) {
  try {
    userAuthBody.parse(req.body);
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ msg: "User not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function deleteUser(
  req: Request<{}, {}, {}, IUserQuery>,
  res: Response
) {
  try {
    userQuery.parse(req.query)
    const result = await User.findByIdAndDelete(req.query.id);
    if (result) {
      res.status(200).send({ msg: `${result.name} Successfully Deleted` });
    } else {
      res.status(400).send({ msg: "No User found with this ID." });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}
