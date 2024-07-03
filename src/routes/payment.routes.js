import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../controllers/payment.controller.js";
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const router = Router();

// Obtén la ruta absoluta del archivo HTML
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..', '..');

router.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'public', 'index.html'));
});


router.post("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);

export default router;