import morgan from "morgan";
import express from "express";
import cors from "cors"
import { connectDB } from "./config/db";
import router from "./routes/IndexRouter";

const app = express();

app.use(express.json())
app.use(morgan("tiny"));
app.use(cors());

connectDB();

app.use("/api/v1", router)

export const viteNodeApp = app;