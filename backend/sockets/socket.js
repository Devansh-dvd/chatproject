import { Message } from "../models/messages.models.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    socket.on("join_channel", (channelId) => {
      socket.join(channelId);
      console.log(`joined channel: ${channelId}`);
    });

    socket.on("leave_channel", (channelId) => {
      socket.leave(channelId);
      console.log(`left channel: ${channelId}`);
    });

    socket.on("send_message", async (data) => {
      console.log(".....");
      console.log("Received message data:", data);
      try {
        const message = await Message.create({
          channelId: data.channelId,
          senderId: data.userId,
          message: data.text,
          messageType: data.messageType || "text",
        });

        await message.populate("senderId", "username ProfilePicture");

        io.to(data.channelId).emit("receive_message", message);
      } catch (err) {
        console.error("Error saving message:", err);
        socket.emit("message_error", { error: "Failed to send message" });
      }
    });

    socket.on("delete_message", async (data) => {
      try {
        console.log("Received delete message data:", data);
        const message = await Message.findById(data.messageId);

        if (!message)
          return socket.emit("message_error", { error: "Message not found" });

        if (message.senderId.toString() !== data.userId)
          return socket.emit("message_error", { error: "Unauthorized" });

        message.deleted = true;
        await message.save();

        io.to(data.channelId).emit("message_deleted", {
          messageId: data.messageId,
        });
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
};

export default socketHandler;