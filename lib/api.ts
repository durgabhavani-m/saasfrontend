/**
 * Central API base for backend requests.
 * - Local dev (NEXT_PUBLIC_API_URL not set): uses same-origin /api (proxied by Next.js)
 * - Production: set NEXT_PUBLIC_API_URL to your Render backend URL (e.g. https://your-app.onrender.com/api)
 */
export function getApiBase(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  return url ?? "";
}

/** Full URL for an API path (e.g. /auth/login, /products) */
export function apiUrl(path: string): string {
  const base = getApiBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : `/api${p}`;
}
