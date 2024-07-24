import { Router } from "express";
import { getAllPlayers } from "../controllers/patientController.js";

const router = Router();


// route to get All players
router.get('/patients', getAllPlayers);

export default router;
