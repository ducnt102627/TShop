import morgan from "morgan";
import express from "express";
import cors from "cors"
import { connectDB } from "./config/db";
import router from "./routes/IndexRouter";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json())
app.use(morgan("tiny"));
console.log(process.env.URL_FRONTEND);

app.use(cors(
    { origin: process.env.URL_FRONTEND }
));
app.use(cookieParser());

connectDB();

app.use("/api/v1", router)

export const viteNodeApp = app;