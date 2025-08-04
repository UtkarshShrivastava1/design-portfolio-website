import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import cloudinary from "@/app/lib/config";
import Gallery from "@/app/models/galleryModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabse();

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const catogery = formData.get("catogery");
    const file = formData.get("file");

    

    let imageUrl = "";
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "gallery",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    } else {
      return NextResponse.json(
        {
          message: "No file uploaded or file type is invalid",
        },
        { status: 400 }
      );
    }

    const newImage = new Gallery({
      title,
      description,
      catogery,
      imageURL: imageUrl,
    });
    await newImage.save();

    // console.log(newImage);

    return NextResponse.json(
      {
        message: "Gallery item uploaded successfully",
        data: newImage,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({
      message: "Error submitting Form",
    });
  }
}

// psot route for  testimonial




// get all route for testimonial
export async function GET() {
  try {
    await connectToDatabse();
    const gallery = await Gallery.find();
    // console.log("Gallery From backend : ", gallery );

    return NextResponse.json({
      message: "Found",
      gallery,
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({
      message: "Error founding gallery",
    });
  }
}
