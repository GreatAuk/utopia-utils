import { describe, expect, it } from 'vitest'

import { isValidUrl } from './isValidUrl'

describe('isValidUrl', () => {
  it('should work fine', () => {
    expect(isValidUrl('invalidURL')).toBe(false)
    expect(isValidUrl('htt//domain')).toBe(false)
    expect(isValidUrl('www.domain.com')).toBe(false)
    expect(isValidUrl('http://www.domain.com')).toBe(true)
    expect(isValidUrl('tcp://www.domain.com')).toBe(true)
    expect(isValidUrl('https://www.domain.com/remove-an-item-from-an-array-in-javascript/?id=23#name=utopia')).toBe(true)
  })
})
