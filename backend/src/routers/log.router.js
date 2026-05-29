import express from "express";
import cors from "cors";
import { logController } from "../controllers/log.controller.js";

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/", logController);

export default router;