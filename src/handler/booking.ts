import { Request, Response } from "express-serve-static-core";
import { z } from "zod";
import { errorHandler } from "../util";
import {
  bookingCreateBody,
  bookingQuery,
  bookingUpdateBody,
} from "../validator/booking";
import { Booking } from "../schema/booking";

type IBookingCreateBody = z.infer<typeof bookingCreateBody>;
type IBookingQuery = z.infer<typeof bookingQuery>;
type IBookingUpdateBody = z.infer<typeof bookingUpdateBody>;

export async function insertBooking(
  req: Request<{}, {}, IBookingCreateBody>,
  res: Response
) {
  try {
    await bookingCreateBody.parseAsync(req.body);
    const booking = new Booking(req.body);
    const result = await booking.save();
    res.status(201).send(result);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getSingleBooking(
  req: Request<{}, {}, {}, IBookingQuery>,
  res: Response
) {
  try {
    bookingQuery.parse(req.query);
    const booking = await Booking.findById(req.query.id);
    if (booking) {
      res.status(200).send(booking);
    } else {
      res.status(404).send({ msg: "Booking not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getAllBooking(req: Request, res: Response) {
  const booking = await Booking.find();
  if (booking.length != 0) {
    res.status(200).send(booking);
  } else {
    res.status(404).send({ msg: "No booking inserted" });
  }
}

export async function deleteBooking(
  req: Request<{}, {}, {}, IBookingQuery>,
  res: Response
) {
  try {
    bookingQuery.parse(req.query);
    const booking = await Booking.findByIdAndDelete(req.query.id);
    if (booking) {
      res
        .status(200)
        .send({ msg: `${booking.name}'s booking has been deleted.` });
    } else {
      res.status(400).send({ msg: "Booking not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function updateBooking(
  req: Request<{}, {}, IBookingUpdateBody, IBookingQuery>,
  res: Response
) {
  try {
    bookingQuery.parse(req.query);
    await bookingUpdateBody.parseAsync(req.body);
    const result = await Booking.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(400).send({ msg: "Update Failed." });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}
