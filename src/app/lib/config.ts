import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Upload Video Function
const uploadVideo = async (filePath: string) => {
  try {
    if (!filePath) throw new Error("No file path provided");

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("Video uploaded successfully:", result);
    return result;
  } catch (error) {
    // Delete file if upload fails
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
    console.error("Error uploading video:", error);
    return null;
  }
};

// Export both
export { cloudinary, uploadVideo };
