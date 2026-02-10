import mongoose, { Schema } from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      required: true,
    },

    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Channel = mongoose.model("Channel", channelSchema);
