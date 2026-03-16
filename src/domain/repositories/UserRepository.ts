export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserAuthDTO = UserDTO & {
  passwordHash: string;
};

export interface UserRepository {
  findByEmail(email: string): Promise<UserDTO | null>;
  findAuthByEmail(email: string): Promise<UserAuthDTO | null>;
  create(input: CreateUserInput): Promise<UserDTO>;
}
