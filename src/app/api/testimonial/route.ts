import { NextRequest, NextResponse } from "next/server";
import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import cloudinary from "@/app/lib/config";
import Testimonial from "@/app/models/testimonialModel";

// ✅ POST: Submit a new testimonial
export async function POST(req: NextRequest) {
  try {
    await connectToDatabse();

    const formData = await req.formData();

    const userName = formData.get("userName") as string;
    const designation = formData.get("designation") as string;
    const headline = formData.get("headline") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    if (!userName || !designation || !imageFile) {
      return NextResponse.json(
        { message: "Required fields are missing." },
        { status: 400 }
      );
    }

    // ✅ Upload image to Cloudinary
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${imageFile.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "testimonials",
      resource_type: "image",
    });

    const profilePictureURL = result.secure_url;

    // ✅ Save testimonial to DB
    const newTestimonial = await Testimonial.create({
      userName,
      designation,
      headline,
      description,
      profilePictureURL,
    });

    return NextResponse.json(
      {
        message: "Testimonial submitted successfully.",
        data: newTestimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return NextResponse.json(
      { message: "Error submitting testimonial." },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch all testimonials
export async function GET() {
  try {
    await connectToDatabse();

    const testimonials = await Testimonial.find();

    return NextResponse.json({ testimonials }, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { message: "Error fetching testimonials." },
      { status: 500 }
    );
  }
}
