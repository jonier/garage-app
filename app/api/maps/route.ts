import { MapsController } from "@/presentation/api/controllers/MapsController";

export async function POST(req: Request) {
  return MapsController.handle(req);
}
