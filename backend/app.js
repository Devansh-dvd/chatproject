import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import channelRouter from "./routes/channel.routes.js";
import messageRouter from "./routes/messages.routes.js";  

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/channel", channelRouter);
app.use("/api/messages", messageRouter);  

export default app;