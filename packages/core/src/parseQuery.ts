import { isArray } from '@utopia-utils/share'
export type LocationQueryValue = string | null

export type LocationQuery = Record<
  string,
  LocationQueryValue | LocationQueryValue[]
>

const PLUS_RE = /\+/g // %2B

/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/parseQuery.ts
 */
export function decode(text: string | number): string {
  try {
    return decodeURIComponent(`${text}`)
  }
  catch (err) {
    console.warn(`Error decoding "${text}". Using original value`)
  }
  return `${text}`
}

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams
 * @forked from vue-router https://github.com/vuejs/router/blob/main/packages/router/src/query.ts#L93
 *
 * @param search - search string to parse
 * @returns a query object
 * @example
 * ```
    const params = parseQuery<{
      id: string
      name: string[]
    }>('?id=2&name=Adam&name=Smith&sex')

    expect(params.id).toBe('2')
    expect(params.name).toEqual(['Adam', 'Smith'])
    expect(params.sex).toBe(null)
  ```
 */
export function parseQuery<T extends LocationQuery>(search: string) {
  const query: LocationQuery = {}
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?')
    return query as T
  const hasLeadingIM = search[0] === '?'
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, ' ')
    // allow the = character
    const eqPos = searchParam.indexOf('=')
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos))
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1))

    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key]
      if (!isArray(currentValue))
        currentValue = query[key] = [currentValue]

      // we force the modification
      ;(currentValue as LocationQueryValue[]).push(value)
    }
    else {
      query[key] = value
    }
  }
  return query as T
}
