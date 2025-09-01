// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";
// import { connectToDatabse} from "@/app/dbConfig/dbconfig";
// import Video from "@/app/models/videoModel";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("video") as File | null;
//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Save file to uploads folder
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const uploadDir = path.join(process.cwd(), "src/uploads");
//     await fs.mkdir(uploadDir, { recursive: true });

//     const filePath = path.join(uploadDir, file.name);
//     await fs.writeFile(filePath, buffer);

//     // Save metadata to DB
//     await connectToDatabse();
//     const video = await Video.create({
//       title,
//       description,
//       filePath,
//     });

//     return NextResponse.json({
//       message: "Upload success",
//       video,
//     });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
