import { sanitizeObject } from "./sanitize";

test("sanitizeObject removes keys containing $ or .", () => {
  const payload = {
    name: "ok",
    "$where": "malicious",
    nested: { "a.b": "bad", safe: "yes", deep: { "$gt": "" } }
  };

  const sanitized = sanitizeObject(payload);

  expect((sanitized as any).$where).toBeUndefined();
  expect((sanitized as any).nested["a.b"]).toBeUndefined();
  expect((sanitized as any).nested.deep["$gt"]).toBeUndefined();
  expect((sanitized as any).nested.safe).toBe("yes");
});
