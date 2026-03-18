import { RegisterBusinessOwnerDTO } from "@/application/dtos/RegisterBusinessOwnerDTO";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { BusinessRepository } from "@/domain/repositories/BusinessRepository";
import { hashPassword } from "@/infrastructure/security/hash";

export class RegisterBusinessOwnerUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly businessRepo: BusinessRepository
  ) { }

  async execute(dto: RegisterBusinessOwnerDTO) {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      // mensaje genérico para evitar enumeración
      throw new Error("Unable to register user");
    }

    const passwordHash = await hashPassword(dto.password);

    const user = await this.userRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash,
    });

    try {
      const business = await this.businessRepo.create({
        name: dto.businessName,
        ownerName: dto.ownerName,
        phone: dto.phone,
        businessEmail: dto.businessEmail,
        availability: dto.availability,

        formattedAddress: dto.address.formattedAddress,
        streetNumber: dto.address.streetNumber,
        route: dto.address.route,
        city: dto.address.city,
        province: dto.address.province,
        country: dto.address.country,
        postalCode: dto.address.postalCode,
        lat: dto.address.lat,
        lng: dto.address.lng,

        ownerId: user.id,
      });

      return { user, business };
    } catch (e) {
      // Compensación simple (para no dejar data a medias)
      // (Necesitarías implementar userRepo.deleteById para hacerlo perfecto)
      throw e;
    }
  }
}