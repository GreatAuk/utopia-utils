import { describe, expect, it } from 'vitest'

import { isMobile } from './isMobile'

describe('isMobile', () => {
  it('should work', () => {
    expect(isMobile()).toBe(false)
  })
})
