import { describe, expect, it } from 'vitest'
import { encryptPhone } from './encryptPhone'

describe('encryptPhone', () => {
  it('should encrypt a phone number', () => {
    expect(encryptPhone('13800138000')).toBe('138****8000')
  })
})
