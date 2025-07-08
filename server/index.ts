import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config({ path: ".env" });
const app = express();

app.get("/", (_, res) => {
  res.send("Job Importer Running");
});

const PORT = process.env.PORT || 5000;

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
