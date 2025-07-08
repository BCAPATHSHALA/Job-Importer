import { Router } from "express";
import { getAllJobs } from "../controllers/job.controllers";

const router = Router();

// Get all jobs
router.get("/", getAllJobs);

export default router;
