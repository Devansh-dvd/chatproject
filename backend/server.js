import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users/", userRouter);

export default app; 