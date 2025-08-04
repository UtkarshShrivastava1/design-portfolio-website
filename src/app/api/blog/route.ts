import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/lib/config";
import Blog from "@/app/models/blogModel";



export async function POST(req: NextRequest) {
  try {
    await connectToDatabse();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("imageFile");

    if (!title || !category || !content) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "";

    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "gallery",
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    } else {
      return NextResponse.json({ message: "Invalid or missing image file" }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      category,
      content,
      imageURL: imageUrl,
    });

    await newBlog.save();

    return NextResponse.json({ message: "Blog posted successfully" });
  } catch (error: unknown) {
    console.error("Error posting blog:", error);
    const errorMessage = typeof error === "object" && error !== null && "message" in error
      ? (error as { message: string }).message
      : String(error);
    return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
  }
}



export async function GET() {
    try {
        await connectToDatabse();
        const response = await Blog.find();
        
        return NextResponse.json({
            message:"Blog fetched",
            response
        })
    } catch (error:unknown) {
        console.log(error)
    }
    
}