import { connectMongo } from "@/infrastructure/db/mongoose/connection";

export async function GET() {
  await connectMongo();
  return Response.json({ ok: true, message: "Mongo connected" });
}
