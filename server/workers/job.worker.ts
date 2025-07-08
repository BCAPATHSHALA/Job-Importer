import { Worker } from "bullmq";
import IORedis from "ioredis";
import jobsModel from "../models/jobs.model";
import importLogsModel from "../models/import.logs.model";

const connection = new IORedis(process.env.REDIS_URL!);

const stats = {
  totalFetched: 0,
  totalImported: 0,
  newJobs: 0,
  updatedJobs: 0,
  failedJobs: 0,
  errorMessages: [] as string[],
};

// Create a new worker instance for the "job-import" queue
export const worker = new Worker(
  "job-import",
  async (job) => {
    const { title, company, location, description, postDate, sourceUrl } =
      job.data;

    stats.totalFetched++;

    try {
      // create a new job in the database
      await jobsModel.create({
        title,
        company,
        location,
        description,
        postDate,
        sourceUrl,
      });
      stats.newJobs++;
    } catch (err) {
      if (err instanceof Error) {
        stats.errorMessages.push(err.message);
      } else {
        stats.errorMessages.push(String(err));
      }
      stats.failedJobs++;
    }
  },
  { connection }
);

// Save stats every 30 seconds to the database
setTimeout(() => {
  // save stats to the database
  importLogsModel.create({
    timestamp: new Date(),
    ...stats,
  });
}, 30000);
