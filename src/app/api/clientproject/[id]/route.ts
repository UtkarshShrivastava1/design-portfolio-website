import { NextRequest, NextResponse } from "next/server";
import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import ClientProject from "@/app/models/clientProjectModel";
import cloudinary from "@/app/lib/config"; // Adjust this import as needed

// DELETE /api/clientproject/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabse();
  const { id } = params;

  try {
    const deleted = await ClientProject.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete project:", error);

    return NextResponse.json({ message: "Failed to delete project" }, { status: 500 });
  }
}

// PUT /api/clientproject/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabse();
  const { id } = params;

  try {
    const formData = await req.formData();

    // Prepare update object
    const updateData: Record<string, unknown> = {};
    // Handle all text fields dynamically
    for (const [key, value] of formData.entries()) {
      if (key !== "thumbnail") {
        // For nested fields like projects.0.instagramLink, you can send the key as "projects.0.instagramLink"
        updateData[key] = value;
      }
    }

    // Handle image upload if present
    const file = formData.get("thumbnail") as File | null;
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const uploadResult = await cloudinary.cloudinary.uploader.upload(dataUri, {
        folder: "clientprojects",
        resource_type: "image",
      });
      // Update the first project's thumbnailURL
      updateData["projects.0.thumbnailURL"] = uploadResult.secure_url;
    }

    // Update the document
    const updated = await ClientProject.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
  }
}