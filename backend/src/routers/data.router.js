
import { getAllData } from "../controllers/data.controller.js"
import express from "express"

const router = express.Router()

router.get("/", getAllData)


export default router