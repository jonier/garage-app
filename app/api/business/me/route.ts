import { connectMongo } from "@/infrastructure/db/mongoose/connection";
import { verifyAuthToken } from "@/infrastructure/security/jwt";
import { BusinessModel } from "@/infrastructure/db/mongoose/models/BusinessModel";

function extractBearerToken(req: Request): string {
  const authHeader = req.headers.get("authorization") || "";
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    throw new Error("Missing auth token");
  }
  return token;
}

export async function GET(req: Request) {
  try {
    await connectMongo();

    const token = extractBearerToken(req);
    const payload = verifyAuthToken(token);

    const business = await BusinessModel.findOne({ ownerId: payload.sub })
      .select("name formattedAddress city province country lat lng")
      .lean<{
        _id: unknown;
        name: string;
        formattedAddress: string;
        city: string;
        province: string;
        country: string;
        lat: number;
        lng: number;
      } | null>();

    if (!business) {
      return Response.json({ error: "Business not found" }, { status: 404 });
    }

    return Response.json({
      id: String(business._id),
      name: business.name,
      formattedAddress: business.formattedAddress,
      city: business.city,
      province: business.province,
      country: business.country,
      lat: business.lat,
      lng: business.lng,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Missing auth token") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (err instanceof Error && err.message.includes("jwt")) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
