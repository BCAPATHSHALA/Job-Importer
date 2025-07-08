import { Router } from "express";
import { getAllJobs, getJobById } from "../controllers/job.controllers";

const router = Router();

// Get all jobs
router.get("/", getAllJobs);

// Get a specific job by ID
router.get("/:id", getJobById);

export default router;
