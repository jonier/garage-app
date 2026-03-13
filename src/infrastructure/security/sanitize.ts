export function sanitizeObject<T>(input: T): T {
  if (input === null || input === undefined) return input;

  if (Array.isArray(input)) {
    return input.map((v) => sanitizeObject(v)) as T;
  }

  if (typeof input === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(input as any)) {
      if (k.includes("$") || k.includes(".")) continue;
      out[k] = sanitizeObject(v);
    }
    return out as T;
  }

  return input;
}
