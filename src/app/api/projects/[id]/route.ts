import { NextResponse } from "next/server";
import {connectToDatabse }from "@/app/dbConfig/dbconfig"; // adjust if your db config is elsewhere
import Project from "@/app/models/projectModel"; // your Mongoose model
import {v2 as cloudinary} from "cloudinary";

// ✅ GET: Fetch a single project by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabse();
    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ data: project }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabse();
    const formData = await req.formData();

    // Convert formData -> plain object
    const updateData: any = {};
    formData.forEach((value, key) => {
      if (key === "tags") {
        updateData[key] = (value as string).split(",").map((t) => t.trim());
      } else if (key !== "image") {
        updateData[key] = value;
      }
    });

    // Handle image upload if present
    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "projects" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      updateData.image = uploadResult.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project updated successfully", data: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}



// ✅ DELETE: Delete project by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabse ();
    const deleted = await Project.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
