import { Router } from "express";
import { getAllImportLogs } from "../controllers/log.controllers";

const router = Router();

// Get all import logs
router.get("/", getAllImportLogs);

export default router;
