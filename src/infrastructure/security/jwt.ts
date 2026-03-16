import jwt from "jsonwebtoken";

export type AuthTokenPayload = {
  sub: string;
  email: string;
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }
  return secret;
}

export function signAuthToken(
  payload: AuthTokenPayload,
  expiresIn: string | number = "7d"
): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
}
