import mongoose from 'mongoose';

// 1. Create a global object to cache the connection promise
// In plain JS, we just check if the property exists on the global object
let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

export async function connectDB() {
  // Read environment variable at connection time
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  if (cached.conn) {
    return cached.conn; // Return cached connection if available
  }

  if (!cached.promise) {
    // 2. If no promise exists, create a new connection promise
    const opts = {
      bufferCommands: false, // Recommended for Next.js
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
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