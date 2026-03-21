import { connectMongo } from "@/infrastructure/db/mongoose/connection";
import { verifyAuthToken } from "@/infrastructure/security/jwt";
import { UserModel } from "@/infrastructure/db/mongoose/models/UserModel";
import { BusinessModel } from "@/infrastructure/db/mongoose/models/BusinessModel";
import { z } from "zod";

type AvailabilityItem = {
  day: string;
  opensAt: string;
  closesAt: string;
  isClosed: boolean;
};

const updateSchema = z.object({
  user: z
    .object({
      firstName: z.string().trim().min(1).max(60),
      lastName: z.string().trim().min(1).max(60),
      email: z.string().trim().email().max(120),
    })
    .optional(),
  business: z
    .object({
      name: z.string().trim().min(1).max(120),
      ownerName: z.string().trim().min(1).max(120),
      phone: z.string().trim().min(1).max(30),
      businessEmail: z.string().trim().email().max(120),
      formattedAddress: z.string().trim().min(1).max(200),
      street: z.string().trim().min(1).max(120),
      city: z.string().trim().min(1).max(80),
      province: z.string().trim().min(1).max(80),
      country: z.string().trim().min(1).max(80),
      postalCode: z.string().trim().min(1).max(20),
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

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

    const user = await UserModel.findById(payload.sub)
      .select("firstName lastName email createdAt")
      .lean<{
        _id: unknown;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
      } | null>();

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const business = await BusinessModel.findOne({ ownerId: payload.sub })
      .select(
        "name ownerName phone businessEmail formattedAddress street city province country postalCode lat lng availability createdAt"
      )
      .lean<{
        _id: unknown;
        name: string;
        ownerName: string;
        phone: string;
        businessEmail: string;
        formattedAddress: string;
        street: string;
        city: string;
        province: string;
        country: string;
        postalCode: string;
        lat: number;
        lng: number;
        availability: AvailabilityItem[];
        createdAt: Date;
      } | null>();

    return Response.json(
      {
        user: {
          id: String(user._id),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
        },
        business: business
          ? {
              id: String(business._id),
              name: business.name,
              ownerName: business.ownerName,
              phone: business.phone,
              businessEmail: business.businessEmail,
              formattedAddress: business.formattedAddress,
              street: business.street,
              city: business.city,
              province: business.province,
              country: business.country,
              postalCode: business.postalCode,
              lat: business.lat,
              lng: business.lng,
              availability: business.availability,
              createdAt: business.createdAt,
            }
          : null,
      },
      { status: 200 }
    );
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

export async function PATCH(req: Request) {
  try {
    await connectMongo();

    const token = extractBearerToken(req);
    const payload = verifyAuthToken(token);
    const parsed = updateSchema.parse(await req.json());

    if (parsed.user) {
      await UserModel.findByIdAndUpdate(payload.sub, {
        firstName: parsed.user.firstName,
        lastName: parsed.user.lastName,
        email: parsed.user.email.toLowerCase(),
      });
    }

    if (parsed.business) {
      await BusinessModel.findOneAndUpdate(
        { ownerId: payload.sub },
        {
          name: parsed.business.name,
          ownerName: parsed.business.ownerName,
          phone: parsed.business.phone,
          businessEmail: parsed.business.businessEmail.toLowerCase(),
          formattedAddress: parsed.business.formattedAddress,
          street: parsed.business.street,
          city: parsed.business.city,
          province: parsed.business.province,
          country: parsed.business.country,
          postalCode: parsed.business.postalCode,
          lat: parsed.business.lat,
          lng: parsed.business.lng,
        }
      );
    }

    const user = await UserModel.findById(payload.sub)
      .select("firstName lastName email createdAt")
      .lean<{
        _id: unknown;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
      } | null>();

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const business = await BusinessModel.findOne({ ownerId: payload.sub })
      .select(
        "name ownerName phone businessEmail formattedAddress street city province country postalCode lat lng availability createdAt"
      )
      .lean<{
        _id: unknown;
        name: string;
        ownerName: string;
        phone: string;
        businessEmail: string;
        formattedAddress: string;
        street: string;
        city: string;
        province: string;
        country: string;
        postalCode: string;
        lat: number;
        lng: number;
        availability: AvailabilityItem[];
        createdAt: Date;
      } | null>();

    return Response.json(
      {
        user: {
          id: String(user._id),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
        },
        business: business
          ? {
              id: String(business._id),
              name: business.name,
              ownerName: business.ownerName,
              phone: business.phone,
              businessEmail: business.businessEmail,
              formattedAddress: business.formattedAddress,
              street: business.street,
              city: business.city,
              province: business.province,
              country: business.country,
              postalCode: business.postalCode,
              lat: business.lat,
              lng: business.lng,
              availability: business.availability,
              createdAt: business.createdAt,
            }
          : null,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }

    if (err instanceof Error && err.message === "Missing auth token") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (err instanceof Error && err.message.includes("jwt")) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return Response.json({ error: "Email already in use" }, { status: 409 });
    }

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
