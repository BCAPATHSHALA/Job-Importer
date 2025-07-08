import cron from "node-cron";
import { fetchJobsAndQueue } from "../services/fetchjobs.service";

// Schedule job every hour
cron.schedule("0 * * * *", async () => {
  console.log("Cron Job: Fetching jobs...");
  await fetchJobsAndQueue();
});
