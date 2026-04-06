const DEFAULT_PROXY_BASE_URL = "/api/proxy";

const stripTrailingSlash = (value: string): string => value.trim().replace(/\/+$/, "");

const isLocalhostTarget = (hostname: string): boolean =>
  hostname === "localhost" || hostname === "127.0.0.1";

export const getApiBaseUrl = (): string => {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!configuredBaseUrl) {
    return DEFAULT_PROXY_BASE_URL;
  }

  const normalizedBaseUrl = stripTrailingSlash(configuredBaseUrl);

  // In the browser, force cross-origin URLs through Next.js rewrites to avoid CORS failures.
  if (typeof window !== "undefined" && /^https?:\/\//i.test(normalizedBaseUrl)) {
    try {
      const targetUrl = new URL(normalizedBaseUrl);
      if (!isLocalhostTarget(targetUrl.hostname) && targetUrl.origin !== window.location.origin) {
        return DEFAULT_PROXY_BASE_URL;
      }
    } catch {
      return DEFAULT_PROXY_BASE_URL;
    }
  }

  return normalizedBaseUrl;
};