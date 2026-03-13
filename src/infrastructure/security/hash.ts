import bcrypt from "bcrypt";

/**
 * Genera un hash seguro para almacenar en base de datos.
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // puedes subirlo en producción
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compara un password plano con su hash almacenado.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
