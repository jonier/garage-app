
import { RegisterUserDTO } from "@/application/dtos/RegisterUserDTO";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { hashPassword } from "@/infrastructure/security/hash";

export class RegisterUserUseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async execute(dto: RegisterUserDTO) {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      // mensaje genérico (evita enumeración de usuarios)
      throw new Error("Unable to register user");
    }

    const passwordHash = await hashPassword(dto.password);

    const user = await this.userRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash,
    });

    return user;
  }
}
