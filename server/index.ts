import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import "./config/cronJob";
import "./workers/job.worker";

dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data from req.body
app.use(express.json({ limit: "50kb" }));

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
