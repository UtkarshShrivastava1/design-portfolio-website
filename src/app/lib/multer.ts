// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { promisify } from "util";

// // ---------- Multer Config ----------
// const uploadDir = path.join(process.cwd(), "src/uploads");

// // Ensure uploads folder exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// // File filter (only videos allowed here)
// function fileFilter(req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
//   if (file.mimetype.startsWith("video/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only video files are allowed!"));
//   }
// }

// const upload = multer({ storage, fileFilter });

// // Convert multer middleware to promise
// const uploadMiddleware = upload.single("video"); // field name "video"
// const runMiddleware = promisify(uploadMiddleware);