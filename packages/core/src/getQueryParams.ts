/**
 * It takes a URL and returns an object with the query parameters as properties
 * @param {string} url - The URL to parse.
 * @returns A proxy object that wraps a URLSearchParams object.
 */
export function getQueryParams<T extends Record<string, string>>(url: string) {
  const url_ = new URL(url)
  const params = new Proxy(new URLSearchParams(url_.search), {
    get: (searchParams, prop) => typeof prop === 'string' ? searchParams.get(prop) : null,
  })

  return params as unknown as T
}
