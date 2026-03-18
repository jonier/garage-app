import { z } from "zod";
import { connectMongo } from "@/infrastructure/db/mongoose/connection";
import { verifyAuthToken } from "@/infrastructure/security/jwt";
import { sanitizeObject } from "@/infrastructure/security/sanitize";
import { BusinessModel } from "@/infrastructure/db/mongoose/models/BusinessModel";
import { AppointmentModel } from "@/infrastructure/db/mongoose/models/AppointmentModel";

const createSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  customer: z.string().min(2).max(120),
  service: z.string().min(2).max(120),
  notes: z.string().max(500).optional().default(""),
});

function extractBearerToken(req: Request): string {
  const authHeader = req.headers.get("authorization") || "";
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    throw new Error("Missing auth token");
  }
  return token;
}

async function resolveBusinessIdByUserId(userId: string): Promise<string> {
  const business = await BusinessModel.findOne({ ownerId: userId })
    .select("_id")
    .lean<{ _id: unknown } | null>();
  if (!business) {
    throw new Error("Business not found for current user");
  }
  return String(business._id);
}

export async function GET(req: Request) {
  try {
    await connectMongo();

    const token = extractBearerToken(req);
    const payload = verifyAuthToken(token);
    const businessId = await resolveBusinessIdByUserId(payload.sub);

    const url = new URL(req.url);
    const date = url.searchParams.get("date");

    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json({ error: "Invalid date format" }, { status: 400 });
    }

    const query = date ? { businessId, date } : { businessId };

    const appointments = await AppointmentModel.find(query)
      .sort({ date: 1, time: 1 })
      .lean();

    return Response.json(
      appointments.map((appt) => ({
        id: String(appt._id),
        date: appt.date,
        time: appt.time,
        customer: appt.customer,
        service: appt.service,
        notes: appt.notes || "",
      }))
    );
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Missing auth token") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (err instanceof Error && err.message.includes("jwt")) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    if (err instanceof Error && err.message === "Business not found for current user") {
      return Response.json({ error: err.message }, { status: 404 });
    }

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongo();

    const token = extractBearerToken(req);
    const payload = verifyAuthToken(token);
    const businessId = await resolveBusinessIdByUserId(payload.sub);

    const raw = sanitizeObject(await req.json());
    const dto = createSchema.parse(raw);

    const created = await AppointmentModel.create({
      businessId,
      date: dto.date,
      time: dto.time,
      customer: dto.customer,
      service: dto.service,
      notes: dto.notes,
    });

    return Response.json(
      {
        id: String(created._id),
        date: created.date,
        time: created.time,
        customer: created.customer,
        service: created.service,
        notes: created.notes || "",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Missing auth token") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (err instanceof Error && err.message.includes("jwt")) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    if (err instanceof Error && err.message === "Business not found for current user") {
      return Response.json({ error: err.message }, { status: 404 });
    }

    if (err instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid input", details: err.issues },
        { status: 400 }
      );
    }

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
