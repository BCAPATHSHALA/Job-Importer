# System Design Explanation & Technical Decisions

## Problem Understanding

When I first received the task, I didn’t have prior experience with Redis or BullMQ, and also lacked a clear understanding of XML-to-JSON parsing. However, I took the time to:

- Carefully study the task requirements.
- Create a rough architecture using Excalidraw based on the tech stack I already understood.
- Identify gaps in my knowledge (Redis, BullMQ, and XML parsing).
- Learn Redis and BullMQ through documentation and YouTube tutorials.

## Project Overview

**Goal:** Build a backend service that imports job listings from external APIs (XML format), stores them in MongoDB, and makes them available through REST APIs and a Next.js UI.

## Technology Stack

| Layer       | Tech Used           |
| ----------- | ------------------- |
| Frontend    | Next.js (Admin UI)  |
| Backend     | Node.js (Express)   |
| Database    | MongoDB + Mongoose  |
| Queue       | BullMQ              |
| Queue Store | Redis (Redis Cloud) |
| Scheduler   | node-cron           |
| XML Parser  | xml2js              |

## Architecture & Flow

![Architecture](./JOB-IMPORTER-SYSTEM-DESIGN.png "JOB IMPORTER SYSTEM DESIGN")

1. **Step I:** Run a cron job every hour to fetch jobs from a real API and convert XML to JSON using the xml2js package
2. **Step II:** Add each job to the BullMQ queue with the "job-import" type and store them in Redis
3. **Step III:** Start a BullMQ worker to listen to the "job-import" queue and process jobs as they arrive
4. **Step IV:** Insert or update jobs in MongoDB using the worker and log import stats every 30 seconds
5. **Step V:** Access jobs and logs through API endpoints: /api/jobs, /api/jobs/:id, and /api/logs
   - `/api/jobs` – get all jobs
   - `/api/jobs/:id` – get single job details
   - `/api/logs` – get import logs
6. **Step VI:** View job listings and import history on the Next.js UI

## Why These Decisions?

| Decision               | Reason                                                      |
| ---------------------- | ----------------------------------------------------------- |
| **BullMQ + Redis**     | Queueing long-running jobs avoids blocking the main thread  |
| **MongoDB + Mongoose** | Easy to scale, schema-less flexibility for job fields       |
| **xml2js**             | Simple XML-to-JSON transformation                           |
| **node-cron**          | Lightweight scheduler for running job fetching every minute |
| **Next.js UI**         | Admin-friendly frontend to view job import history          |

## Scalability Considerations

- Modular design with services and routes separated.
- Worker and cron job can be containerized/microserviced later.
- BullMQ supports retries, backoffs, concurrency — suitable for future scale.
- Redis Cloud used for reliable queue storage without local setup.

## Repository Structure

```
/job-importer
├── /client            # Next.js admin UI
├── /server            # Node.js Express backend
│   ├── /controllers   # Route controllers
│   ├── /routes        # API route definitions
│   ├── /models        # Mongoose schemas
│   ├── /services      # Job fetch, processing logic
│   ├── /queues        # BullMQ job queues
│   ├── /workers       # BullMQ job processors
│   ├── /config        # DB, Redis, Cron setup
│   ├── .env           # Environment variables
│   ├── .gitignore     # Ignored files
│   ├── package.json   # Project configuration
│   ├── tsconfig.json  # TypeScript configuration
│   ├── pnpm-lock.yaml # pnpm lock file
│   └── index.ts       # App entry point
├── /docs              # Documentation folder
│   └── architecture.md
└── README.md          # Setup & usage guide
```

## Summary

This project helped me learn and apply Redis, BullMQ, and XML parsing under a real-world scenario. The system is now stable, modular, and scalable — ready for production or future enhancements.

> "I started with no Redis or BullMQ knowledge. By understanding the problem deeply, learning from docs and YouTube, and gradually building each part — I was able to deliver a complete job importer system."
