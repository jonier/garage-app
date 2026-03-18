import { BusinessModel } from "@/infrastructure/db/mongoose/models/BusinessModel";
import { BusinessRepository, CreateBusinessInput, BusinessDTO } from "@/domain/repositories/BusinessRepository";

export class MongooseBusinessRepository implements BusinessRepository {
  async create(input: CreateBusinessInput): Promise<BusinessDTO> {
    const created = await BusinessModel.create({
      name: input.name,
      ownerName: input.ownerName,
      phone: input.phone,
      businessEmail: input.businessEmail,
      availability: input.availability ?? [],

      formattedAddress: input.formattedAddress,
      street: `${input.streetNumber} ${input.route}`.trim(),
      city: input.city,
      province: input.province,
      country: input.country,
      postalCode: input.postalCode,
      lat: input.lat,
      lng: input.lng,

      ownerId: input.ownerId,
    });

    return {
      id: String(created._id),
      name: created.name,
      ownerId: String(created.ownerId),
    };
  }
}