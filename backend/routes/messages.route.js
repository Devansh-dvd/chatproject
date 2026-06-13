import express from "express";
import { Message } from "../models/message.model.js";

const router = express.Router();

router.get("/:channelId", async (req, res) => {
  try {
    const messages = await Message.find({
      channelId: req.params.channelId,
    })
      .populate("senderId", "username ProfilePicture")
      .sort({ createdAt: 1 });

    res.json({ data: messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;