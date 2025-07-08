import cron from "node-cron";
import { fetchJobsAndQueue } from "../services/fetchjobs.service";

// Schedule job every minute
cron.schedule("* * * * *", async () => {
  console.log("Cron Job: Fetching jobs...");
  await fetchJobsAndQueue();
});
