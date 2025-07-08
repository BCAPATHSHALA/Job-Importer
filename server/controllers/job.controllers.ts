import { Request, Response } from "express";
import jobsModel, { IJob } from "../models/jobs.model";

// Function to get all jobs
const getAllJobs = async (_: Request, res: Response) => {
  try {
    const jobs: IJob[] = await jobsModel.find().sort({ postDate: -1 });
    res.json(jobs);
  } catch (error: unknown) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

// Function to get a specific job by ID
const getJobById = async (req: Request, res: Response) => {
  try {
    const job: IJob | null = await jobsModel.findById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: "Error fetching job" });
  }
};

export { getAllJobs, getJobById };
