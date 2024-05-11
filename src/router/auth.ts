import { Router } from "express";
import { authUser } from "../handler/auth";
const authRouter=Router()

authRouter.post("/userauth",authUser)

export default authRouter;