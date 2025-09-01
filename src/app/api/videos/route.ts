import { NextResponse } from "next/server";
import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import Video from "@/app/models/videoModel";
import { writeFile } from "fs/promises";
import path from "path";

// Handle POST (upload video + save to DB)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Get uploaded files
    const videoFile = formData.get("video") as File | null;
    const portraitFile = formData.get("portrait") as File | null;

    if (!videoFile) {
      return NextResponse.json({ error: "No video uploaded" }, { status: 400 });
    }

    // Save video file locally
    const videoBytes = Buffer.from(await videoFile.arrayBuffer());
    const videoFileName = Date.now() + "-" + videoFile.name;
    const videoPath = path.join(process.cwd(), "public/uploads", videoFileName);
    await writeFile(videoPath, videoBytes);

    let portraitFileName = null;
    if (portraitFile) {
      const portraitBytes = Buffer.from(await portraitFile.arrayBuffer());
      portraitFileName = Date.now() + "-" + portraitFile.name;
      const portraitPath = path.join(process.cwd(), "public/uploads", portraitFileName);
      await writeFile(portraitPath, portraitBytes);
    }

    // Other fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    // ✅ Connect DB
    await connectToDatabse();

    const newVideo = await Video.create({
      title,
      description,
      category,
      videoUrl: `/uploads/${videoFileName}`,
      portraitUrl: portraitFileName ? `/uploads/${portraitFileName}` : null,
    });

    return NextResponse.json(
      { message: "Upload success", video: newVideo },
      { status: 200 }
    );
    // console.log("New video saved:", newVideo); // unreachable after return
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET( ) {
  await connectToDatabse();
  try {

    const videos = await Video.find().sort({ createdAt: -1 });

    return NextResponse.json({ videos });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch videos", error }, { status: 500 });
  }
}