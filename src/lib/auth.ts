// src/lib/auth.ts
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Admin from "@/app/models/adminModel";
import type { NextRequest } from "next/server";

export async function requireAdminFromReq(req: NextRequest) {
  // Get token from cookie (NextRequest)
  const token = req.cookies.get("token")?.value;
  if (!token) {
    throw new Error("NOT_AUTH");
  }

  let payload: any;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  } catch (e) {
    throw new Error("NOT_AUTH");
  }

  // Ensure DB connected and admin exists
  await dbConnect();
  const admin = await Admin.findById(payload.id);
  if (!admin) throw new Error("NOT_AUTH");

  return admin;
}
