import { Request, Response } from "express-serve-static-core";
import { z } from "zod";
import { errorHandler } from "../util";
import { roomCreateBody, roomQuery, roomUpdateBody } from "../validator/room";
import { Room } from "../schema/room";

type IRoomCreateBody = z.infer<typeof roomCreateBody>;
type IRoomQuery = z.infer<typeof roomQuery>;
type IRoomUpdateBody = z.infer<typeof roomUpdateBody>;
export async function insertRoom(
  req: Request<{}, {}, IRoomCreateBody>,
  res: Response
) {
  try {
    roomCreateBody.parse(req.body);
    const room = new Room(req.body);
    const result = await room.save();
    res.status(201).send(result);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getSingleRoom(
  req: Request<{}, {}, {}, IRoomQuery>,
  res: Response
) {
  try {
    roomQuery.parse(req.query);
    const room = await Room.findById(req.query.id);
    if (room) {
      res.status(200).send(room);
    } else {
      res.status(404).send({ msg: "Room not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getAllRoom(req: Request, res: Response) {
  const room = await Room.find();
  if (room.length != 0) {
    res.status(200).send(room);
  } else {
    res.status(404).send({ msg: "No room inserted" });
  }
}

export async function deleteRoom(
  req: Request<{}, {}, {}, IRoomQuery>,
  res: Response
) {
  try {
    roomQuery.parse(req.query);
    const room = await Room.findByIdAndDelete(req.query.id);
    if (room) {
      res.status(200).send({ msg: `${room.name} has been deleted.` });
    } else {
      res.status(400).send({ msg: "Room not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function updateRoom(
  req: Request<{}, {}, IRoomUpdateBody, IRoomQuery>,
  res: Response
) {
  try {
    roomQuery.parse(req.query);
    roomUpdateBody.parse(req.body);
    const result = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators:true
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
