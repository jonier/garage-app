import { Types } from "mongoose";
import { UserModel } from "@/infrastructure/db/mongoose/models/UserModel";
import {
  UserRepository,
  CreateUserInput,
  UserDTO,
  UserAuthDTO,
} from "@/domain/repositories/UserRepository";

type UserLean = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

export class MongooseUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await UserModel.findOne({ email }).lean<UserLean | null>();
    if (!user) return null;

    return {
      id: String(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async findAuthByEmail(email: string): Promise<UserAuthDTO | null> {
    const user = await UserModel.findOne({ email }).lean<UserLean | null>();
    if (!user) return null;

    return {
      id: String(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
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
