// src/app/api/clientproject/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabse } from "@/app/dbConfig/dbconfig"; // keep the name that matches your export
import Project from "@/app/models/projectModel";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (server-side only)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * GET /api/projects/:id
 * Fetch a single project by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabse();

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );
    }

    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: project }, { status: 200 });
  } catch (err: any) {
    console.error("GET /api/clientproject/[id] error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects/:id
 * Update a project (multipart/form-data expected if including an image)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabse();

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );
    }

    // Expect multipart/form-data when uploading image; formData() works in server runtime
    const formData = await req.formData();

    // Convert formData to plain object (skip file fields)
    const updateData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key === "image") return; // handle file separately
      if (key === "tags" && typeof value === "string") {
        updateData.tags = (value as string).split(",").map((t) => t.trim());
      } else {
        // value might be a File or string — cast to string where appropriate
        if (typeof value === "string") updateData[key] = value;
        else if ((value as File).name) {
          // ignore files here
        } else {
          updateData[key] = value;
        }
      }
    });

    // Handle image upload if present
    const imageValue = formData.get("image");
    if (imageValue && typeof (imageValue as any).arrayBuffer === "function") {
      // it's a file-like object
      const fileLike = imageValue as unknown as File;
      const arrayBuffer = await fileLike.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary using upload_stream
      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "projects", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });

      if (uploadResult && uploadResult.secure_url) {
        updateData.image = uploadResult.secure_url;
      } else {
        console.warn("Cloudinary upload returned no secure_url:", uploadResult);
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project updated successfully", data: updatedProject },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/clientproject/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message || error },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/:id
 * Delete a project by ID
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabse();

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );
    }

    const deleted = await Project.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE /api/clientproject/[id] error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
