import axios from "axios";
import { parseStringPromise } from "xml2js";
import { jobQueue } from "../queues/job.queue";

// Define the URLs to fetch jobs from
const urls = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
  "https://jobicy.com/?feed=job_feed&job_categories=business",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
];

// Function to fetch jobs and queue them
export const fetchJobsAndQueue = async () => {
  let totalFetched = 0;

  for (const url of urls) {
    try {
      // Step 1: Fetch the RSS feed from the URL
      const response = await axios.get(url);

      // Step 2: Parse the RSS feed and extract the jobs from xml to JSON format
      const json = await parseStringPromise(response.data, {
        explicitArray: false,
      });
      
      console.log(`Fetched ${json.rss.channel.item.length} jobs from ${url}`);

      // Step 3: Queue the jobs for processing
      const jobs = json.rss.channel.item || [];
      totalFetched += jobs.length;

      // Step 4: Add each job to the queue with the "import" job type
      for (const job of jobs) {
        const result = await jobQueue.add("job-import", { job });
        console.log(`Job queued: ${result.id}`);
      }
    } catch (err) {
      console.error(`Failed to fetch from ${url}:`, err);
    }
  }
  console.log(`Total jobs queued: ${totalFetched}`);
};
