import mongoose from "mongoose";
import admin from "../models/adminModel";
import bcrypt from "bcryptjs";

// Ensure environment variables are read
const DEV_URI = process.env.MONGO_URI;
const PROD_URI = process.env.MONGO_ATLAS_URI;
const ENV = process.env.NODE_ENV || "development";

// Choose correct URI
const URI = ENV === "development" ? DEV_URI : PROD_URI;

export async function connectToDatabse() {
  if (!URI) {
    throw new Error(
      "❌ MongoDB URI is missing. Check your environment variables."
    );
  }

  try {
    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB");

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    // Setup default admin if needed
    await defaultAdminCreation();
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
}

async function defaultAdminCreation() {
  const email = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASS;

  if (!email || !plainPassword) {
    console.warn(
      "⚠️ ADMIN_EMAIL or ADMIN_PASS not set in environment. Skipping admin creation."
    );
    return;
  }

  const existingAdmin = await admin.findOne({ email });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const defaultAdmin = new admin({
      email,
      password: hashedPassword,
    });

    await defaultAdmin.save();
    console.log(`✅ Default admin created with email: ${email}`);
  } else {
    console.log("ℹ️ Default admin already exists.");
  }
}
