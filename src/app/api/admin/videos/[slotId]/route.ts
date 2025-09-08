// src/app/api/admin/videos/[slotId]/route.ts
import { NextResponse } from "next/server";
import { Readable } from "stream";
import dbConnect from "@/lib/mongodb";
import VideoSlot from "@/app/models/VideoSlot";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import adminModel from "@/app/models/adminModel";

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

/** helper to extract token cookie from a standard Request */
function extractTokenFromRequest(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie") || "";
  if (!cookieHeader) return null;
  // simple cookie parse
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slotId: string } }
) {
  // --- AUTH: verify admin token from cookie ---
  try {
    const token = extractTokenFromRequest(req);
    if (!token)
      return NextResponse.json(
        { message: "Forbidden - no token" },
        { status: 403 }
      );

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret)
      return NextResponse.json(
        { message: "Server missing JWT secret" },
        { status: 500 }
      );

    let payload: any;
    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.json(
        { message: "Forbidden - invalid token" },
        { status: 403 }
      );
    }

    // payload should include admin id (your login issues a token with id)
    const adminId = payload?.id;
    if (!adminId)
      return NextResponse.json(
        { message: "Forbidden - malformed token" },
        { status: 403 }
      );

    // make sure admin exists (optional but good)
    await dbConnect();
    const adminUser = await adminModel.findById(adminId).lean();
    if (!adminUser)
      return NextResponse.json(
        { message: "Forbidden - admin not found" },
        { status: 403 }
      );
  } catch (err) {
    console.error("Auth check failed:", err);
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // --- validate slotId ---
  const slotId = Number(params.slotId);
  if (!slotId || slotId < 1 || slotId > 8) {
    return NextResponse.json(
      { message: "slotId must be 1..8" },
      { status: 400 }
    );
  }

  // parse multipart/form-data
  let formData: FormData;
  try {
    // Request.formData() is available in Next App Router
    // but can throw if not a multipart request
    // So guard with try/catch
    // @ts-ignore - DOM FormData type present
    formData = await (req as any).formData();
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

    // upsert the slot — force type from slotId to be safe
    const slot = await VideoSlot.findOneAndUpdate(
      { slotId },
      {
        $set: { ...updateDoc, type: slotId <= 4 ? "portrait" : "landscape" },
        $setOnInsert: { views: 0 },
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
