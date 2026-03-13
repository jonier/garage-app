import { sanitizeObject } from "@/infrastructure/security/sanitize";
import { z } from "zod";
import { GetAddressFromGoogleUseCase } from "@/application/usecases/GetAddressFromGoogleUseCase";

const schema = z.object({
  address: z.string().min(5),
});

export class MapsController {
  static async handle(req: Request) {
    const body = sanitizeObject(await req.json());
    console.log("Maps endpoint called");
    console.log("Received body:", body);
    const validated = schema.parse(body);

    const usecase = new GetAddressFromGoogleUseCase();
    const result = await usecase.execute(validated.address);

    return Response.json(result);
  }
}
