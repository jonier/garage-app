import { connectMongo } from "@/infrastructure/db/mongoose/connection";
import { BusinessModel } from "@/infrastructure/db/mongoose/models/BusinessModel";

type BusinessLocationDTO = {
  id: string;
  name: string;
  formattedAddress: string;
  city: string;
  province: string;
  country: string;
  lat: number;
  lng: number;
};

export async function GET() {
  try {
    await connectMongo();

    const businesses = await BusinessModel.find({})
      .select("name formattedAddress city province country lat lng")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean<Array<{
        _id: unknown;
        name: string;
        formattedAddress: string;
        city: string;
        province: string;
        country: string;
        lat: number;
        lng: number;
      }>>();

    const locations: BusinessLocationDTO[] = businesses.map((business) => ({
      id: String(business._id),
      name: business.name,
      formattedAddress: business.formattedAddress,
      city: business.city,
      province: business.province,
      country: business.country,
      lat: business.lat,
      lng: business.lng,
    }));

    return Response.json(locations, { status: 200 });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
