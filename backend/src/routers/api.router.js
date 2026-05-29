import express from "express";
import cors from "cors";
import { aiController } from "../controllers/api.controller.js";

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/content", aiController);

export default router;