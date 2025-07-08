import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (_, res) => {
  res.send("Job Importer Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
