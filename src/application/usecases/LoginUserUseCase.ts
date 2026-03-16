import { LoginUserDTO } from "@/application/dtos/LoginUserDTO";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { verifyPassword } from "@/infrastructure/security/hash";

export class LoginUserUseCase {
  constructor(private readonly userRepo: UserRepository) { }

  async execute(dto: LoginUserDTO) {
    const authUser = await this.userRepo.findAuthByEmail(dto.email);

    // Generic message prevents user enumeration.
    if (!authUser) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await verifyPassword(dto.password, authUser.passwordHash);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return {
      id: authUser.id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
    };
  }
}
