import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

import http from "http";
import { Server } from "socket.io";

dotenv.config({
    path: "./.env"
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("join_channel", (channelId) => {

        socket.join(channelId);

        console.log("Joined channel:", channelId);
    });

    socket.on("send_message", (data) => {

        io.to(data.channelId).emit(
            "receive_message",
            data
        );
    });

    socket.on("disconnect", () => {

        console.log("Disconnected");
    });
});

connectDB()
.then(() => {

    server.listen(process.env.PORT || 8000, () => {

        console.log(
            `Server running on port ${
                process.env.PORT || 8000
            }`
        );
    });

})
.catch((err) => {

    console.log("DB connection failed:", err);
});