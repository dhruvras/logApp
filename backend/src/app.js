import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./routers/api.router.js"

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api", aiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;