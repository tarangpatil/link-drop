// encode to URL-safe base64
export function encodeChatRoom(payload: unknown): string {
  return Buffer.from(JSON.stringify(payload), "utf-8").toString("base64url");
}

// decode from URL-safe base64
export function decodeChatRoom<T = unknown>(encoded: string): T {
  const json = Buffer.from(encoded, "base64url").toString("utf-8");

  return JSON.parse(json) as T;
}
