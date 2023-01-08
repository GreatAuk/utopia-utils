import { describe, expect, it } from 'vitest'
import { randomString } from './randomString'

describe('randomString', () => {
  it('should return a random string', () => {
    const str = randomString(10)
    expect(str).toHaveLength(10)
  })

  it('should return a random string with custom chars', () => {
    const str = randomString(10, 'abcdef')
    expect(str).toHaveLength(10)
    expect(str).toMatch(/^[abcdef]+$/)
  })
})
