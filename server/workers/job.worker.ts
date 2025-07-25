import { Worker } from "bullmq";
import jobsModel from "../models/jobs.model";
import importLogsModel from "../models/import.logs.model";
import connectionRedis from "../config/redis";

const stats = {
  totalFetched: 0,
  totalImported: 0,
  newJobs: 0,
  updatedJobs: 0,
  failedJobs: 0,
  errorMessages: [] as string[],
};

// Todo: Create a new worker instance for the "job-import" queue and fetch jobs from the queue and save them to the database
export const worker = new Worker(
  "job-import",
  async (job) => {
    const {
      title,
      ["job_listing:company"]: company,
      description,
      pubDate: postDate,
      link: sourceUrl,
      ["job_listing:location"]: location,
    } = job.data.job;
    stats.totalFetched++;

    try {
      // Check if the job already exists
      const existing = await jobsModel.findOne({ title, company });

      if (existing) {
        await jobsModel.updateOne(
          { _id: existing._id },
          {
            title,
            company,
            location,
            description,
            postDate,
            sourceUrl,
          }
        );
        console.log("Job updated: ", existing);
        stats.updatedJobs++;
      } else {
        // Create a new job
        const job = await jobsModel.create({
          title,
          company,
          location,
          description,
          postDate,
          sourceUrl,
        });
        console.log("Job created: ", job);
        stats.newJobs++;
      }

      stats.totalImported++;
    } catch (err) {
      if (err instanceof Error) {
        stats.errorMessages.push(err.message);
      } else {
        stats.errorMessages.push(String(err));
      }
      stats.failedJobs++;
    }
  },
  { connection: connectionRedis }
);

// Todo: Save stats every 30 seconds to the database
setTimeout(async () => {
  // save stats to the database
  const log = await importLogsModel.create({
    timestamp: new Date(),
    ...stats,
  });

  console.log("Stats saved😎: ", log);
}, 30000);
