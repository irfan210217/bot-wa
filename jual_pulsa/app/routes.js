import express from "express";
import { start } from "./bot-whatsapp.js"


const router = express.Router();

router.get('/bot', start);

export default router;