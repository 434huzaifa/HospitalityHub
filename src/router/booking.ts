import { Router } from "express";
import { insertBooking ,getSingleBooking,deleteBooking,getAllBooking,updateBooking} from "../handler/booking";
import { JWTmiddlware } from "../middleware/jwt";

const bookingRouter=Router()

bookingRouter.post("/booking",JWTmiddlware,insertBooking)
bookingRouter.get("/booking",JWTmiddlware,getSingleBooking)
bookingRouter.get("/bookingall",JWTmiddlware,getAllBooking)
bookingRouter.delete("/booking",JWTmiddlware,deleteBooking)
bookingRouter.put("/booking",JWTmiddlware,updateBooking)

export default bookingRouter;