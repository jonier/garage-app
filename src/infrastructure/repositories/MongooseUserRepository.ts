import { UserModel } from "@/infrastructure/db/mongoose/models/UserModel";
import { UserRepository, CreateUserInput, UserDTO } from "@/domain/repositories/UserRepository";

export class MongooseUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return null;

    return {
      id: String(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async create(input: CreateUserInput): Promise<UserDTO> {
    const created = await UserModel.create(input);
    return {
      id: String(created._id),
      firstName: created.firstName,
      lastName: created.lastName,
      email: created.email,
    };
  }
}
