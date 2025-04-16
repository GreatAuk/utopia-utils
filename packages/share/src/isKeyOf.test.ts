import { describe, expect, it } from 'vitest'

import { isKeyOf } from './isKeyOf'

describe('isKeyOf', () => {
  it('should return true when key exists in object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(isKeyOf(obj, 'a')).toBe(true)
    expect(isKeyOf(obj, 'b')).toBe(true)
    expect(isKeyOf(obj, 'c')).toBe(true)
  })

  it('should return false when key does not exist in object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(isKeyOf(obj, 'd')).toBe(false)
    expect(isKeyOf(obj, 'e')).toBe(false)
    expect(isKeyOf(obj, 'foo')).toBe(false)
  })

  it('should work with numeric keys', () => {
    const obj = { 1: 'one', 2: 'two' }
    expect(isKeyOf(obj, 1)).toBe(true)
    expect(isKeyOf(obj, 2)).toBe(true)
    expect(isKeyOf(obj, 3)).toBe(false)
  })

  it('should work with symbol keys', () => {
    const symKey = Symbol('key')
    const obj = { [symKey]: 'value' }
    expect(isKeyOf(obj, symKey)).toBe(true)
    expect(isKeyOf(obj, Symbol('another'))).toBe(false)
  })

  it('should work with inherited properties', () => {
    const proto = { a: 1 }
    const obj = Object.create(proto)
    obj.b = 2

    expect(isKeyOf(obj, 'a')).toBe(true)
    expect(isKeyOf(obj, 'b')).toBe(true)
    expect(isKeyOf(obj, 'toString')).toBe(true)
  })
})