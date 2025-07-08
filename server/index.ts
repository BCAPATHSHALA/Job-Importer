import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import "./config/cronJob";
import "./workers/job.worker";
import jobRoutes from "./routes/job.routes";
import logRoutes from "./routes/log.routes";

dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data from req.body
app.use(express.json({ limit: "50kb" }));

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET"],
  })
);

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/logs", logRoutes);

app.get("/", (_, res) => {
  res.send("Job Importer Running");
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    // Start our Express server
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port:::::::::: ${PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log(`Mongodb connection failed !!! ${err}`);
  });
