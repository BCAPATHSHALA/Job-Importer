import mongoose, { Schema, Document } from "mongoose";

export interface IImportLog extends Document {
  timestamp: Date;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: number;
  errorMessages: string[];
}

const ImportLogSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  totalFetched: { type: Number, required: true },
  totalImported: { type: Number, required: true },
  newJobs: { type: Number, required: true },
  updatedJobs: { type: Number, required: true },
  failedJobs: { type: Number, required: true },
  errorMessages: [{ type: String }],
});

export default mongoose.model<IImportLog>("ImportLog", ImportLogSchema);
