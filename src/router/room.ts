import { Router } from "express";
import { deleteRoom, getAllRoom, getSingleRoom, insertRoom, updateRoom } from "../handler/room";
import { JWTmiddlware } from "../middleware/jwt";

const roomRouter=Router()

roomRouter.post("/room",JWTmiddlware,insertRoom)
roomRouter.get("/room",JWTmiddlware,getSingleRoom)
roomRouter.get("/roomall",JWTmiddlware,getAllRoom)
roomRouter.delete("/room",JWTmiddlware,deleteRoom)
roomRouter.put("/room",JWTmiddlware,updateRoom)

export default roomRouter;