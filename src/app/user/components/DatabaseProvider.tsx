// src/lib/db-init.ts
import { connectToDatabse } from "../dbConfig/dbconfig";

let isConnected = false;

export async function initializeDatabase() {
  if (!isConnected) {
    try {
      await connectToDatabse();
      isConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }
}

// For server components - call this in your page components that need DB
export async function ensureDbConnection() {
  if (typeof window === "undefined") {
    await initializeDatabase();
  }
}

// Alternative: API route approach
// src/app/api/init-db/route.ts
/*
import { NextResponse } from 'next/server';
import { connectToDatabse } from '../../../dbConfig/dbconfig';

export async function GET() {
  try {
    await connectToDatabse();
    return NextResponse.json({ status: 'Connected' });
  } catch (error) {
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
  }
}
*/
