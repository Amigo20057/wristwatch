export function serializePrisma<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_key, value) => {
      if (typeof value === "bigint") return value.toString();

      if (value && typeof value === "object") {
        if (value instanceof Date) return value.toISOString();

        if (
          typeof value.toString === "function" &&
          (value as Record<string, unknown>).constructor?.name === "Decimal"
        ) {
          return value.toString();
        }
      }

      return value;
    })
  );
}
