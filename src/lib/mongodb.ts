// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Define a global cache type
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Attach to globalThis to persist across hot reloads in dev
const globalWithMongoose = globalThis as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose._mongooseCache || {
  conn: null,
  promise: null,
};

if (!cached.promise) {
  cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
    return mongooseInstance;
  });
  globalWithMongoose._mongooseCache = cached;
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  cached.conn = await cached.promise;
  return cached.conn;
}
