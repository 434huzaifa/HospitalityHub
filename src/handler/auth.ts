import { Request, Response } from "express-serve-static-core";
import { z } from "zod";
import { User } from "../schema/user";
import { errorHandler } from "../util";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userAuthBody } from "../validator/auth";
dotenv.config();
type IUserAuthBody = z.infer<typeof userAuthBody>;
export async function authUser(
    req: Request<{}, {}, IUserAuthBody>,
    res: Response
  ) {
    try {
      userAuthBody.parse(req.body);
      const result = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      }).select("-password");
      if (!process.env.TOKEN) {
        console.log("JWT TOKEN NOT FOUND");
        throw new Error("JWT TOKEN NOT FOUND");
      }
      if (result) {
        const token = jwt.sign(result?.toObject(), String(process.env.TOKEN), {
          expiresIn: "1h",
        });
        res.status(200).send({token:token,expiresIn:"1h"});
      } else {
        res.status(400).send({ msg: "User not found" });
      }
    } catch (error) {
      errorHandler(res, error);
    }
  }