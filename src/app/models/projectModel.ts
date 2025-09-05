// src/app/models/Project.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  status: string;
  likes: number;
  views: number;
  year: string;
  client: string;
  duration: string;
  tools: string[];
  color: string;
  link?: string;
  githubUrl?: string;
  videoDemoUrl?: string;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, default: "Live" },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    year: { type: String },
    client: { type: String },
    duration: { type: String },
    tools: [{ type: String }],
    color: { type: String },
    link: { type: String },
    githubUrl: { type: String },
    videoDemoUrl: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite during hot-reload in Next.js
export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
