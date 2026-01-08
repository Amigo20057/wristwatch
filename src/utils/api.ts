type Routes = "auth" | "cart" | "currency" | "rates";
type Methods = "POST" | "GET" | "PATCH" | "DELETE";

const BASE_URL = "/api";

export async function api<TResponse = unknown, TBody = unknown>(
  route: Routes,
  method: Methods,
  body?: TBody,
  headers?: HeadersInit
): Promise<TResponse> {
  const res = await fetch(`${BASE_URL}/${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP error ${res.status}`);
  }

  return res.json();
}
