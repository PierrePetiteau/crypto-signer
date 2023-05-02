interface FetchOptions {
  headers?: Record<string, string>;
  body?: any;
  method?: "GET" | "POST";
}

async function fetchJson<T>(url: string, options?: FetchOptions): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    method: options?.method,
    cache: "no-store",
    next: { revalidate: 0 },
    body: JSON.stringify(options?.body),
  });

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export { fetchJson };
