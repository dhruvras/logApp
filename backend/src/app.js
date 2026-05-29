import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logRouter from "./routers/log.router.js"
import dataRouter from "./routers/data.router.js"
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/log", logRouter);
app.use("/data", dataRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;