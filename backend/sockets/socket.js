import { Message } from "../models/messages.models.js";

const onlineUsers = new Map();

const socketHandler = (io) => {

    io.on("connection", (socket) => {

        console.log(`User Connected: ${socket.id}`);

        socket.on("user_online", (userId) => {

            onlineUsers.set(userId, socket.id);

            console.log("Online Users:", onlineUsers);
        });


        socket.on("join_channel", async (channelId) => {

            try {

                socket.join(channelId);

                console.log(
                    `Socket ${socket.id} joined channel ${channelId}`
                );

                io.to(channelId).emit(
                    "user_joined",
                    {
                        message: "A user joined the channel"
                    }
                );

            } catch (error) {

                console.log(error.message);
            }
        });

        socket.on("leave_channel", (channelId) => {

            socket.leave(channelId);

            console.log(
                `Socket ${socket.id} left channel ${channelId}`
            );
        });

        socket.on("send_message", async (data) => {


            try {

                const savedMessage = await Message.create({
                    channelId: data.channelId,
                    senderId: data.senderId,
                    messageType: data.messageType || "text",
                    message: data.message
                });

                const populatedMessage =
                    await Message.findById(savedMessage._id)
                    .populate("senderId", "username ProfilePicture tags");

                io.to(data.channelId).emit(
                    "receive_message",
                    populatedMessage
                );

            } catch (error) {

                console.log(error.message);
            }
        });


        socket.on("typing_start", (data) => {

            socket.to(data.channelId).emit(
                "user_typing",
                {
                    user: data.user
                }
            );
        });

        socket.on("typing_stop", (data) => {

            socket.to(data.channelId).emit(
                "user_stop_typing",
                {
                    user: data.user
                }
            );
        });

        socket.on("delete_message", async (messageId) => {

            try {

                await Message.findByIdAndDelete(messageId);

                io.emit("message_deleted", messageId);

            } catch (error) {

                console.log(error.message);
            }
        });


        socket.on("edit_message", async (data) => {

            try {

                const updatedMessage =
                    await Message.findByIdAndUpdate(
                        data.messageId,
                        { message: data.newMessage },
                        { new: true }
                    ).populate("senderId", "username ProfilePicture tags");

                io.emit(
                    "message_edited",
                    updatedMessage
                );

            } catch (error) {

                console.log(error.message);
            }
        });

        socket.on("disconnect", () => {

            console.log(`Disconnected: ${socket.id}`);

            for (let [userId, socketId] of onlineUsers.entries()) {

                if (socketId === socket.id) {

                    onlineUsers.delete(userId);

                    break;
                }
            }

            console.log("Online Users:", onlineUsers);
        });
    });
};

export default socketHandler;