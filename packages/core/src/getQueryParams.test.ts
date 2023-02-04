import { describe, expect, it } from 'vitest'

import { getQueryParams } from './getQueryParams'

describe('getQueryParams', () => {
  it('should works', () => {
    const { name, surname, id } = getQueryParams<{
      name: string
      surname: string
      id: string
    }>('http://url.com/page?name=Adam&surname=Smith')
    expect(name).toBe('Adam')
    expect(surname).toBe('Smith')
    expect(id).toBe(null)
  })
})
