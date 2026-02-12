import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    messageType: {
      type: String,
      required: true,
      enum: ["text", "image", "file"],
      default: "text",
    },

    message: {
      type: String,
      required: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
