function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }

  if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const sortedKeys = Object.keys(obj).sort();
    const result: Record<string, unknown> = {};

    for (const key of sortedKeys) {
      result[key] = sortValue(obj[key]);
    }

    return result;
  }

  return value;
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(sortValue(value), null, 2);
}