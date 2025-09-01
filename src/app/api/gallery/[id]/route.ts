import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/app/models/galleryModel";
import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import cloudinary from "@/app/lib/config";
// import cloudinary from 'cloudinary'

export async function PATCH(
  req: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabse();
  const id = (await params).id;

  try {
    const formData = await req.formData();
    const description = formData.get("description") as string | null;
    const file = formData.get("image") as File | null;

    let imageURL: string | undefined;

    // If a new image file is provided, upload it and get the URL
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const uploadResult = await cloudinary.cloudinary.uploader.upload(dataUri, {
        folder: "gallery",
        resource_type: "image",
      });
      imageURL = uploadResult.secure_url;
    }

   const updateData: Record<string, unknown> = {};
    if (description !== null) updateData.description = description;
    if (imageURL) updateData.imageURL = imageURL;

    const updated = await Gallery.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Updated", data: updated });
  } catch (error) {
    return NextResponse.json({ message: "Error updating", error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabse();
  const id = (await params).id;

  try {
    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted", data: deleted });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting", error }, { status: 500 });
  }
}

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   await connectToDatabse();
//   const { id } = params;

//   try {
//     const deleted = await Gallery.findByIdAndDelete(id);
//     if (!deleted) {
//       return NextResponse.json({ message: "Not found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "Deleted", data: deleted });
//   } catch (error) {
//     return NextResponse.json({ message: "Error deleting", error }, { status: 500 });
//   }
// }