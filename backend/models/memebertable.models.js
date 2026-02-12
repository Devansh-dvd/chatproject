import mongoose, { Schema } from "mongoose";

const MemberTableSchema = new mongoose.Schema(
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

    nickname: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const MemberTable = mongoose.model(
  "MemberTable",
  MemberTableSchema
);
