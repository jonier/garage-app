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

export interface UserRepository {
  findByEmail(email: string): Promise<UserDTO | null>;
  create(input: CreateUserInput): Promise<UserDTO>;
}
