import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  postDate: Date;
  sourceUrl: string;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  postDate: { type: Date, required: true },
  sourceUrl: { type: String, required: true },
});

export default mongoose.model<IJob>("Job", JobSchema);
