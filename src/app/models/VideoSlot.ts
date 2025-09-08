// models/VideoSlot.ts
import mongoose from "mongoose";

export type IVideoSlot = {
  slotId: number;
  title?: string;
  description?: string;
  duration?: number;
  durationText?: string;
  views?: number;
  type: "portrait" | "landscape";
  category?: string;
  isLive?: boolean;
  thumbnailUrl?: string;
  videoUrl?: string;
  videoType?: string;
};

const VideoSlotSchema = new mongoose.Schema<IVideoSlot>(
  {
    slotId: { type: Number, required: true, unique: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    durationText: { type: String, default: "" },
    views: { type: Number, default: 0 },
    type: { type: String, enum: ["portrait", "landscape"], required: true },
    category: { type: String, default: "" },
    isLive: { type: Boolean, default: false },
    thumbnailUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    videoType: { type: String, default: "mp4" },
  },
  { timestamps: true }
);

export default (mongoose.models.VideoSlot as mongoose.Model<IVideoSlot>) ||
  mongoose.model<IVideoSlot>("VideoSlot", VideoSlotSchema);
