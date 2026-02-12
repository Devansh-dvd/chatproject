import mongoose, { Schema } from "mongoose";

const requestStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

export const RequestStatus = mongoose.model(
  "RequestStatus",
  requestStatusSchema
);
