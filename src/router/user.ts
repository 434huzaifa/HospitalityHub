import { Router } from "express";
import {deleteUser, insertUser } from "../handler/user";
import { JWTmiddlware } from "../middleware/jwt";

const userRouter=Router()
userRouter.post("/user",insertUser)
userRouter.delete("/user",JWTmiddlware,deleteUser)
export default userRouter;