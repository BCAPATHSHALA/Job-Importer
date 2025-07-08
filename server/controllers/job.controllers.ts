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

export { getAllJobs };
