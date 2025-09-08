// src/app/api/videos/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import VideoSlot from "@/app/models/VideoSlot";

export async function GET() {
  await dbConnect();
  try {
    const slots = await VideoSlot.find().sort({ slotId: 1 }).lean();
    return NextResponse.json(slots);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
