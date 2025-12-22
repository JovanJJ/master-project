import mongoose from 'mongoose';
import type { ConnectOptions } from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

// 1. Create a global object to cache the connection promise
let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

export async function connectDB() {
  // Read environment variable at connection time, not module load time
  const MONGODB_URI = process.env.MONGO_URI;
  
  if (!MONGODB_URI) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  if (cached.conn) {
    return cached.conn; // Return cached connection if available
  }

  if (!cached.promise) {
    // 2. If no promise exists, create a new connection promise
    const opts: ConnectOptions = {
      bufferCommands: false, // Recommended for Next.js
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // 3. Wait for the connection promise to resolve
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}