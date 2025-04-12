import { Router } from "express";
import { sendAndGetPrediction } from "../controllers/fheClientController";

const router = Router();
router.post("/sendandgetprediction", sendAndGetPrediction);

export default router;
