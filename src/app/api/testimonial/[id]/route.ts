import { NextRequest, NextResponse } from "next/server";
import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import Testimonial from "@/app/models/testimonialModel";

// Update testimonial (PATCH)
export async function PATCH(
  req: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabse();
  const id = (await params).id;
  const body = await req.json();

  try {
    const updated = await Testimonial.findByIdAndUpdate(
      id,
      { $set: body },
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

// Delete testimonial (DELETE)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabse();
  const id = (await params).id;

  try {
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted", data: deleted });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting", error }, { status: 500 });
  }
}