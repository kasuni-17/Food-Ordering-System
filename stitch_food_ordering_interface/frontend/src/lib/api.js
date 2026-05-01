const DEFAULT_API_BASE = "http://localhost:5174";

export function getApiBase() {
  return import.meta.env.VITE_API_BASE ?? DEFAULT_API_BASE;
}

async function http(path, options) {
  const res = await fetch(`${getApiBase()}${path}`, {
    headers: { "content-type": "application/json" },
    ...options
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = body?.error ?? `Request failed: ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export function fetchRestaurants() {
  return http("/api/restaurants", { method: "GET" });
}

export function fetchMenu(restaurantId, searchQuery = "") {
  const params = new URLSearchParams();
  if (restaurantId) params.append("restaurantId", restaurantId);
  if (searchQuery) params.append("search", searchQuery);
  const q = params.toString() ? `?${params.toString()}` : "";
  return http(`/api/menu${q}`, { method: "GET" });
}

export function createOrder(payload) {
  return http("/api/orders", { method: "POST", body: JSON.stringify(payload) });
}

export function getOrder(orderId) {
  return http(`/api/orders/${encodeURIComponent(orderId)}`, { method: "GET" });
}

