import { sanitizeObject } from "@/infrastructure/security/sanitize";
import { z } from "zod";
import { RegisterBusinessOwnerUseCase } from "@/application/usecases/RegisterBusinessOwnerUseCase";
import { MongooseUserRepository } from "@/infrastructure/repositories/MongooseUserRepository";
import { MongooseBusinessRepository } from "@/infrastructure/repositories/MongooseBusinessRepository";
import { connectMongo } from "@/infrastructure/db/mongoose/connection";

const addressSchema = z.object({
  formattedAddress: z.string().min(5),
  streetNumber: z.string().optional().default(""),
  route: z.string().optional().default(""),
  city: z.string().min(1),
  province: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
});

const schema = z.object({
  address: addressSchema,
  businessName: z.string().min(2).max(120),
  ownerName: z.string().min(2).max(120),
  phone: z.string().min(5).max(30),
  businessEmail: z.string().email().max(120),

  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  email: z.string().email().max(120),
  password: z.string().min(8).max(200),
});

export class RegisterController {
  static async handle(req: Request) {
    try {
      await connectMongo();

      const raw = sanitizeObject(await req.json());
      const dto = schema.parse(raw);

      const usecase = new RegisterBusinessOwnerUseCase(
        new MongooseUserRepository(),
        new MongooseBusinessRepository()
      );

      const result = await usecase.execute(dto);

      // (Opcional) devolver token más adelante
      return Response.json(result, { status: 201 });
    } catch (err: any) {
      // Zod
      if (err?.name === "ZodError") {
        return Response.json(
          { error: "Invalid input", details: err.issues },
          { status: 400 }
        );
      }

      return Response.json(
        { error: err?.message ?? "Server error" },
        { status: 500 }
      );
    }
  }
}