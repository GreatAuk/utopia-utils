import { parseQuery } from './parseQuery'
import type { LocationQuery } from './parseQuery'
/**
 * It takes a URL and returns an object with the query parameters as properties
 * @param {string} url - The URL to parse.
 * @returns {LocationQuery} a query object
 */
export function getQueryParams<T extends LocationQuery>(location: string) {
  let query: LocationQuery = {}

  const searchPos = location.indexOf('?')
  let searchString = location.slice(
    searchPos + 1,
    location.length,
  )

  const hashPos = searchString.indexOf('#')
  if (hashPos > -1) // maybe http://url.com/page?name=Adam&surname=Smith&id#home
    searchString = searchString.slice(0, hashPos)

  query = parseQuery(searchString)

  return query as Partial<T>
}
