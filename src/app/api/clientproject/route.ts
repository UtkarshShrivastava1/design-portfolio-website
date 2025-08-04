import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import cloudinary from "@/app/lib/config";
import ClientProject from "@/app/models/clientProjectModel";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Enable body parser to handle FormData
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabse();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const workDid = formData.get("workDid") as string;
    const testimonial = formData.get("testimonial") as string;
    const projectsCount = parseInt(formData.get("projectsCount") as string, 10);

    const uploadedProjects = [];

    for (let i = 0; i < projectsCount; i++) {
      const thumbnail = formData.get(`project_${i}_thumbnail`) as File;
      const youtubeLink = formData.get(`project_${i}_youtubeLink`) as string;
      const instagramLink = formData.get(`project_${i}_instagramLink`) as string;

      // Convert File to Buffer
      const arrayBuffer = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "client_projects",
            public_id: uuidv4(),
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      const cloudinaryURL = (uploadResult as { secure_url: string }).secure_url;

      uploadedProjects.push({
        thumbnailURL: cloudinaryURL,
        youtubeLink,
        instagramLink,
      });
    }

    // Save to MongoDB
    const newClientProject = new ClientProject({
      name,
      company,
      workDid,
      testimonial,
      projects: uploadedProjects,
    });

    const savedProject = await newClientProject.save();

    return NextResponse.json(
      {
        message: "Client project added successfully",
        data: savedProject,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving project:", error);
    return NextResponse.json(
      {
        message: "Failed to add client project",
        error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


export async function GET(){
  try {
    await connectToDatabse();
    const response = await ClientProject.find();

    return NextResponse.json({
      message:"Client Project fetched",
      data:response
    },{status:200})
    
  } catch (error:unknown) {
    console.log(error)
    return NextResponse.json({
      message:"Error Fetching Client"
    },{status:500})
  }
}