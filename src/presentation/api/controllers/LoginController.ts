import { z } from "zod";
import { sanitizeObject } from "@/infrastructure/security/sanitize";
import { connectMongo } from "@/infrastructure/db/mongoose/connection";
import { MongooseUserRepository } from "@/infrastructure/repositories/MongooseUserRepository";
import { LoginUserUseCase } from "@/application/usecases/LoginUserUseCase";
import { signAuthToken } from "@/infrastructure/security/jwt";

const schema = z.object({
  email: z.string().email().max(120),
  password: z.string().min(8).max(200),
});

export class LoginController {
  static async handle(req: Request) {
    try {
      await connectMongo();

      const raw = sanitizeObject(await req.json());
      const dto = schema.parse(raw);

      const useCase = new LoginUserUseCase(new MongooseUserRepository());
      const user = await useCase.execute(dto);

      const token = signAuthToken({ sub: user.id, email: user.email });

      return Response.json({ user, token }, { status: 200 });
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return Response.json(
          { error: "Invalid input", details: err.issues },
          { status: 400 }
        );
      }

      if (err instanceof Error && err.message === "Invalid credentials") {
        return Response.json({ error: "Invalid credentials" }, { status: 401 });
      }

      return Response.json({ error: "Server error" }, { status: 500 });
    }
  }
}
