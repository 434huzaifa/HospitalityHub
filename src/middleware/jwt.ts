import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../util";
import z from "zod";
import { userResponse } from "../validator/user";

type IUser = z.infer<typeof userResponse>;

export async function JWTmiddlware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];
    if (!process.env.TOKEN) {
      console.log("JWT MISSING");
      throw new Error("JWT TOKEN NOT FOUND");
    }
    const decode = jwt.verify(token, String(process.env.TOKEN)) as IUser;
    console.log("~ decode", decode);
    req.cookies = decode;
    next();
  } catch (error) {
    errorHandler(res, error);
  }
}
