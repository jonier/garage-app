import { RegisterController } from "@/presentation/api/controllers/RegisterController";

export async function POST(req: Request) {
  return RegisterController.handle(req);
}