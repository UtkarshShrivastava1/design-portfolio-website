import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  video: { type: String, required: true }, // filename or videoURL after upload
  thumbnailURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, default: "video" },
  portrait: { type: String, required: true },
  originalFilename: { type: String }, // for reference
});

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;

