import { LoginController } from "@/presentation/api/controllers/LoginController";

export async function POST(req: Request) {
  return LoginController.handle(req);
}
