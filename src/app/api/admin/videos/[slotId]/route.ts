import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import dbConnect from "@/lib/mongodb";
import VideoSlot from "@/app/models/VideoSlot";
import cloudinary from "@/lib/cloudinary";
import { requireAdminFromReq } from "@/lib/auth";

/** Stream buffer -> Cloudinary upload via upload_stream **/
function uploadBufferToCloudinary(buffer: Buffer, options: any) {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (err: any, result: any) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slotId: string } }
) {
  // Verify admin JWT cookie
  try {
    await requireAdminFromReq(req);
  } catch {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const slotId = Number(params.slotId);
  if (!slotId || slotId < 1 || slotId > 8) {
    return NextResponse.json(
      { message: "slotId must be 1..8" },
      { status: 400 }
    );
  }

  // parse multipart FormData
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (err: any) {
    return NextResponse.json(
      { message: "Invalid form data", error: String(err) },
      { status: 400 }
    );
  }

  const videoFile = formData.get("video") as File | null;
  const thumbFile = formData.get("thumbnail") as File | null;

  await dbConnect();

  const updateDoc: any = {};
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const category = formData.get("category")?.toString();
  const isLive = formData.get("isLive")?.toString() === "true";

  if (title !== undefined) updateDoc.title = title;
  if (description !== undefined) updateDoc.description = description;
  if (category !== undefined) updateDoc.category = category;
  updateDoc.isLive = isLive;

  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "videos/slots";
  const publicIdBase = `slot_${slotId}`;

  try {
    // upload video if present
    if (videoFile) {
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      const vres = await uploadBufferToCloudinary(buffer, {
        resource_type: "video",
        folder,
        public_id: publicIdBase,
        overwrite: true,
      });
      updateDoc.videoUrl = vres.secure_url;
      updateDoc.videoType = vres.format || "mp4";
      if (vres.duration) {
        const d = Math.round(vres.duration);
        updateDoc.duration = d;
        updateDoc.durationText = `${Math.floor(d / 60)}:${String(
          d % 60
        ).padStart(2, "0")}`;
      }
    }

    // upload thumbnail if present
    if (thumbFile) {
      const buffer = Buffer.from(await thumbFile.arrayBuffer());
      const tres = await uploadBufferToCloudinary(buffer, {
        resource_type: "image",
        folder,
        public_id: `${publicIdBase}_thumb`,
        overwrite: true,
      });
      updateDoc.thumbnailUrl = tres.secure_url;
    }

    // upsert the slot
    const slot = await VideoSlot.findOneAndUpdate(
      { slotId },
      {
        $set: updateDoc,
        $setOnInsert: {
          type: slotId <= 4 ? "portrait" : "landscape",
          views: 0,
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, slot });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
