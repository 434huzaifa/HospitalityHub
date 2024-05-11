import { Router } from "express";
import { insertUser } from "../handler/user";

const userRouter=Router()
userRouter.post("/user",insertUser)

export default userRouter;