import { NextRequest, NextResponse } from "next/server";
import {connectToDatabse} from "@/app/dbConfig/dbconfig";
import Blog from "@/app/models/blogModel";



export async function PATCH(
  req: NextRequest,
{ params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabse();
 const id = (await params).id
  try {
    const body = await req.json();
    const { title, content, category, imageURL } = body;

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (imageURL) updateData.imageURL = imageURL;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Updated", data: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabse();
  const id = (await params).id

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}


