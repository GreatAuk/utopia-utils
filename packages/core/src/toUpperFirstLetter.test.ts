import { describe, expect, it } from 'vitest'
import { toUpperFirstLetter } from './toUpperFirstLetter'

describe('toUpperFirstLetter', () => {
  it('should capitalize the first letter of a lowercase string', () => {
    expect(toUpperFirstLetter('hello')).toBe('Hello')
    expect(toUpperFirstLetter('world')).toBe('World')
  })

  it('should keep the first letter uppercase if already uppercase', () => {
    expect(toUpperFirstLetter('Hello')).toBe('Hello')
    expect(toUpperFirstLetter('WORLD')).toBe('WORLD')
  })

  it('should handle single character strings', () => {
    expect(toUpperFirstLetter('a')).toBe('A')
    expect(toUpperFirstLetter('Z')).toBe('Z')
  })

  it('should handle empty string', () => {
    expect(toUpperFirstLetter('')).toBe('')
  })

  it('should handle strings starting with numbers or special characters', () => {
    expect(toUpperFirstLetter('123abc')).toBe('123abc')
    expect(toUpperFirstLetter('!hello')).toBe('!hello')
    expect(toUpperFirstLetter(' world')).toBe(' world')
  })

  it('should handle mixed case strings', () => {
    expect(toUpperFirstLetter('hELLO')).toBe('HELLO')
    expect(toUpperFirstLetter('wOrLd')).toBe('WOrLd')
  })

  it('should handle strings with spaces', () => {
    expect(toUpperFirstLetter('hello world')).toBe('Hello world')
    expect(toUpperFirstLetter('foo bar baz')).toBe('Foo bar baz')
  })

  it('should handle Chinese characters', () => {
    expect(toUpperFirstLetter('中文')).toBe('中文')
    expect(toUpperFirstLetter('你好world')).toBe('你好world')
  })
})
