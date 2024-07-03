import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../controllers/payment.controller.js";
const path = require('path');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

router.post("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);

export default router;