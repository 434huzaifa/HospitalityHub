import { Router } from "express";
import { authUser, deleteUser, insertUser } from "../handler/user";

const userRouter=Router()
userRouter.post("/user",insertUser)
userRouter.post("/userauth",authUser)
userRouter.delete("/user",deleteUser)
export default userRouter;