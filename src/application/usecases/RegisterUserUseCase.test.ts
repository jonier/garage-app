import { RegisterUserUseCase } from "./RegisterUserUseCase";
import { UserRepository } from "@/domain/repositories/UserRepository";

const makeRepo = (): UserRepository => ({
  findByEmail: jest.fn(async () => null),
  create: jest.fn(async (input) => ({
    id: "1",
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
  })),
});

test("registers a new user and returns safe fields", async () => {
  const repo = makeRepo();
  const uc = new RegisterUserUseCase(repo);

  const user = await uc.execute({
    firstName: "Jonier",
    lastName: "Murillo",
    email: "jonier@test.com",
    password: "SuperSecret123!",
  });

  expect(user).toEqual({
    id: "1",
    firstName: "Jonier",
    lastName: "Murillo",
    email: "jonier@test.com",
  });

  // asegura que no devolvemos password
  expect((user as any).passwordHash).toBeUndefined();
});
