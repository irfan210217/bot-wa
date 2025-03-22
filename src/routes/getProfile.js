import express from "express";
import {createDeposit, balance, statusDeposit} from "../controller/getProfile.js";

const router = express.Router();

router.post('/api/balance', balance);
router.post('/api/deposit', createDeposit);
router.post('/api/deposit/status', statusDeposit);


export default router;