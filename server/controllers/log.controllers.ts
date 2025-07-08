import { Request, Response } from "express";
import importLogsModel from "../models/import.logs.model";

// Function to get all import logs
const getAllImportLogs = async (_: Request, res: Response) => {
  const logs = await importLogsModel.find().sort({ timestamp: -1 });
  res.json(logs);
};

export { getAllImportLogs };
