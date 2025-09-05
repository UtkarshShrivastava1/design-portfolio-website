import { NextResponse } from "next/server";
import {connectToDatabse }from "@/app/dbConfig/dbconfig"; // your db connection file
import Project from "@/app/models/projectModel";
import  {v2 as cloudinary}  from "cloudinary";

// 📌 POST: Create a new project

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    await connectToDatabse();

    const formData = await req.formData();

    // ✅ File handling
    const imageFile = formData.get("image") as File | null;
    let imageUrl = "";

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image", folder: "projects" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploaded.secure_url;
    }

    // ✅ Safely parse tags and tools
    let tags: string[] = [];
    let tools: string[] = [];

    try {
      const rawTags = formData.get("tags");
      if (rawTags) {
        tags = JSON.parse(rawTags as string); // frontend sends JSON.stringify([...])
      }
    } catch {
      // fallback if sent as comma string
      tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || [];
    }

    try {
      const rawTools = formData.get("tools");
      if (rawTools) {
        tools = JSON.parse(rawTools as string);
      }
    } catch {
      tools = (formData.get("tools") as string)?.split(",").map((t) => t.trim()) || [];
    }

    // ✅ Create project
    const newProject = await Project.create({
      title: formData.get("title") || "",
      category: formData.get("category") || "",
      description: formData.get("description") || "",
      tags,
      year: formData.get("year") || "",
      client: formData.get("client") || "",
      duration: formData.get("duration") || "",
      tools,
      color: formData.get("color") || "#000000",
      link: formData.get("link") || "",
      githubUrl: formData.get("githubUrl") || "",
      videoDemoUrl: formData.get("videoDemoUrl") || "",
      status: formData.get("status") || "Draft",
      image: imageUrl,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error in POST /api/projects:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// 📌 GET: Fetch all projects
export async function GET() {
  try {
    await connectToDatabse();
    const projects = await Project.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
