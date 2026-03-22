export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function makeBundleId(): string {
  const random = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return `bundle-${ts}-${random}`;
}