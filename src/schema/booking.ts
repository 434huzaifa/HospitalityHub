import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: null,
    },
    number: {
      type: String,
      default: null,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkedIn: {
      type: Date,
      required: true,
    },
    checkedOut: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export const Booking = model("Booking", bookingSchema);
