import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(bodyParser.json());
app.use(cookieParser());

