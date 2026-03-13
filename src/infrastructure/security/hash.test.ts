import { hashPassword, verifyPassword } from "./hash";

test("hashes and verifies password correctly", async () => {
  const password = "SuperSecret123!";
  const hash = await hashPassword(password);

  expect(hash).not.toBe(password);

  const isValid = await verifyPassword(password, hash);
  expect(isValid).toBe(true);
});
