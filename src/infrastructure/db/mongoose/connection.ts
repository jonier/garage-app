import mongoose from "mongoose";

const rawMongoUri = (process.env.MONGODB_URI ?? process.env.MONTODB_IRI)?.trim();

if (!rawMongoUri) {
  throw new Error(
    "Missing Mongo URI. Use MONGODB_URI in .env.local (or fix typo MONTODB_IRI)."
  );
}

const MONGODB_URI: string = rawMongoUri;

declare global {

  var __mongooseConn:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

const cached = global.__mongooseConn ?? { conn: null, promise: null };
global.__mongooseConn = cached;

export async function connectMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}